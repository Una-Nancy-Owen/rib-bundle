import { NodeCG } from './nodecg';
import dotenv from 'dotenv';
import { AssistContent, RunnerGroup, SheetsKey, GoogleSheetsDataRAWJson, RunnerData } from "rib-bundle";
import { getSheetData, urlIsExists } from './needleUtility';
import { RawJsonToRunnerDataArray, RawJsonToAssistContentArray, RunnerDataArrayToRunnersGroupArray } from './jsonUtility';
import { initDiscordMessageReceiver } from './discordMessageReceiver';
import { AssistContentController } from './AssistContentController';

dotenv.config()

export default async function (nodecg: NodeCG) {

  let assistContentController = new AssistContentController(nodecg);

  const assistContentRep = nodecg.Replicant('assistContent', {
    defaultValue: {
      header: "no header",
      content: "no content",
      url: "no url",
      group: -10
    }
  });

  // nodecg.listenFor('getHoraroSchedule', (url: string, ack) => {
  //   console.log('getSchedule');
  //   getSchedule(url).then((result) => {
  //     console.log('Horaro Schedule import is complete.');
  //     const horaroRep = nodecg.Replicant<HoraroData>('horaroRep');
  //     horaroRep.value = result;
  //     return;
  //   });
  // });
  const currentRunnerGroupRep = nodecg.Replicant('currentRunnerGroup');
  const runnerGroupIndexRep = nodecg.Replicant('currentRunnerGroupIndex');
  const currentRunnerGroupIndex = nodecg.Replicant('currentRunnerGroupIndex');
  const nextRunnerGroupIndexRep = nodecg.Replicant('nextRunnerGroupIndex');
  const runnerGroupArrayRep = nodecg.Replicant('runnerGroups');
  const highlightRep = nodecg.Replicant('highlight');
  const illustRep = nodecg.Replicant('illust');

  nodecg.listenFor('setNextRunnerGroupIndex', (index) => {
    const runnerGroupArray = nodecg.readReplicant('runnerGroups');
    if (runnerGroupArray == undefined) return;
    if (runnerGroupArray.length < index) return;

    nextRunnerGroupIndexRep.value = index;
  })


  nodecg.listenFor('setCurrentRunnerGroupIndex', (index) => {
    const runnerGroups = runnerGroupArrayRep.value;
    if (index < 0 || runnerGroups == undefined) return;
    if (runnerGroups.length <= index) return;
    runnerGroupIndexRep.value = index;
    let nextGroup: RunnerGroup = {
      runners: [],
      commentators: []
    };
    for (let i = 0; i < runnerGroups[index].runners.length; i++) {
      const runner = runnerGroups[index].runners[i];
      const copiedRunner: RunnerData = {
        group: runner.group,
        name: runner.name,
        commentator: runner.commentator,
        title: runner.title,
        platform: runner.platform,
        category: runner.category,
        estimatedTime: runner.estimatedTime,
        icon: runner.icon
      }
      nextGroup.runners.push(copiedRunner);
    }
    for (let i = 0; i < runnerGroups[index].commentators.length; i++) {
      const comentator = runnerGroups[index].commentators[i];
      const copiedCommentator: RunnerData = {
        group: comentator.group,
        name: comentator.name,
        commentator: comentator.commentator,
        title: comentator.title,
        platform: comentator.platform,
        category: comentator.category,
        estimatedTime: comentator.estimatedTime,
        icon: comentator.icon
      }
      nextGroup.commentators.push(copiedCommentator);
    }
    currentRunnerGroupRep.value = nextGroup;
    if (assistContentController.isInitialized()) {
      assistContentController.stop();
      assistContentController.reset();
      assistContentController.setGroupID(index);
      assistContentController.resume();
    }

    currentRunnerGroupIndex.value = index;
    const nextIndex = Number(index) + Number(1);
    const groupsLength = runnerGroups.length;
    nextRunnerGroupIndexRep.value = nextIndex < groupsLength ? nextIndex : -1;
  });

  nodecg.listenFor('getRunnerGroupArrayFromSheet', (sheetsKey) => {
    getSheetData(sheetsKey).then((result) => {
      if (result.complete) {
        RawJsonToRunnerDataArray(result.body as GoogleSheetsDataRAWJson).then((data) => {
          const runnerGroupArray = RunnerDataArrayToRunnersGroupArray(data);
          runnerGroupArrayRep.value = runnerGroupArray;
          if (runnerGroupIndexRep.value != undefined) {
            if (runnerGroupArray.length <= runnerGroupIndexRep.value) {
              runnerGroupIndexRep.value = 0;
            }
          } else {
            runnerGroupIndexRep.value = 0;
          }
        });
      } else {
        // 正しく受信できなかった場合
        console.log('スプレッドシートからデータが受信できませんでした。');
      }
    })
  });

  nodecg.listenFor('setAssistContent', (assistContent) => {
    if (assistContentController.isInitialized()) {
      if (assistContent.group == -10) {
        assistContentController.stop();
        setTimeout(() => {
          assistContentController.start();
        }, 15000);
      }
    }
    assistContentRep.value = assistContent;
  });

  nodecg.listenFor('getHighlightArrayFromSheet', (sheetsKey) => {
    getSheetData(sheetsKey).then((result) => {
      if (result.complete) {
        RawJsonToAssistContentArray(result.body as GoogleSheetsDataRAWJson).then((data) => {
          highlightRep.value = data;
        });
      } else {
        // 正しく受信できなかった場合
        console.log('スプレッドシートからデータが受信できませんでした。');
      }
    })
  });

  nodecg.listenFor('getIllustArrayFromSheet', (sheetsKey) => {
    getSheetData(sheetsKey).then((result) => {
      if (result.complete) {
        RawJsonToAssistContentArray(result.body as GoogleSheetsDataRAWJson).then((data) => {
          for (let i = 0; i < data.length; i++) {
            data[i].url = '';
          }
          illustRep.value = data;
        });
      } else {
        // 正しく受信できなかった場合
        console.log('スプレッドシートからデータが受信できませんでした。');
      }
    })
  });

  nodecg.listenFor('setBanner', (url) => {
    urlIsExists(url).then((isExists) => {
      if (isExists) {
        const bannerRep = nodecg.Replicant('banner');
        bannerRep.value = url;
      }
    })
  });

  nodecg.listenFor('startAssistContentController', () => {
    if (highlightRep.value == undefined || highlightRep.value == null) return;
    if (illustRep.value == undefined || illustRep.value == null) return;
    if (0 < highlightRep.value.length && 0 < illustRep.value.length) {
      assistContentController.setContent(highlightRep.value as AssistContent[], illustRep.value as AssistContent[]);
      assistContentController.start();
    }
  });

  initDiscordMessageReceiver(nodecg);

};
