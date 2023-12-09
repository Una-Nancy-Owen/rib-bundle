import { AssistContent, GoogleSheetsRAWJson, LogoImg, RunnerData, RunnerGroup } from 'rib-bundle'

/**
 * 走者データの配列を、走者グループごとに分けた走者グループの配列に変換して返す関数
 * @param dataArray 走者データの配列
 * @returns 走者グループの配列
 */
export const runnerDataArrayToRunnersGroupArray = (dataArray: RunnerData[]): RunnerGroup[] => {
  let runnerGroupList: RunnerGroup[] = []

  for (let i = 0; i < dataArray.length; i++) {
    const groupId = i
    let runnerGroup: RunnerGroup = {
      group: groupId,
      runners: [],
      commentators: [],
      graphicsType: 'Undefined',
      title: [],
      platform: '',
      category: '',
      estimatedTime: '',
    }
    for (let k = 0; k < dataArray.length; k++) {
      let data = dataArray[k]
      if (data.group == groupId) {
        if (String(data.commentator) === 'TRUE' || String(data.commentator) === 'FALSE') {
          data.commentator = String(data.commentator) == 'TRUE' ? true : false
        }
        if (!data.commentator) {
          runnerGroup.runners.push(data)
        } else {
          runnerGroup.commentators.push(data)
        }
      }
    }
    if (0 < runnerGroup.runners.length) {
      if (runnerGroup.runners[0].title.includes('\\n')) {
        runnerGroup.title = runnerGroup.runners[0].title.split('\\n')
      } else {
        runnerGroup.title.push(runnerGroup.runners[0].title)
      }
      runnerGroup.platform = runnerGroup.runners[0].platform
      runnerGroup.category = runnerGroup.runners[0].category
      runnerGroup.estimatedTime = runnerGroup.runners[0].estimatedTime
      runnerGroup.graphicsType = runnerGroup.runners[0].graphicsType
      runnerGroupList.push(runnerGroup)
    } else {
      break
    }
  }
  return runnerGroupList
}

export const formatAssistContentArray = (assistContents: AssistContent[]): AssistContent[] => {
  for (let i = 0; i < assistContents.length; i++) {
    let assistContent = assistContents[i]
    assistContent.content = assistContent.content ?? ''
    assistContent.group = assistContent.group ?? -10
    assistContent.header = assistContent.header ?? ''
    assistContent.url = assistContent.url ?? ''
    assistContents[i] = assistContent
  }
  return assistContents
}

export const assistContentArrayToAssistContentGroupArray = (assistContents: AssistContent[]): AssistContent[][] => {
  let groupArray: AssistContent[][] = []
  for (let i = 0; i < assistContents.length; i++) {
    const groupId = i
    let assistContentGroup: AssistContent[] = []
    for (let k = 0; k < assistContents.length; k++) {
      let content = assistContents[k]
      if (content.group == groupId) {
        const splitContent = content.content.split('\\n')
        let multiLineContent: string = ''
        splitContent.map((val) => (multiLineContent += `${val}\n`))
        multiLineContent = multiLineContent.replace(/\n+$/g, '')
        const assistContent: AssistContent = {
          group: content.group,
          header: content.header,
          content: multiLineContent,
          url: content.url,
        }
        assistContentGroup.push(assistContent)
      }
    }
    if (0 < assistContentGroup.length) {
      groupArray.push(assistContentGroup)
    }
  }
  return groupArray
}

export const rawJsonToRunnerDataArray = async (rawJson: GoogleSheetsRAWJson): Promise<RunnerData[]> => {
  const sheetData = await sheetDataToObj(rawJson.values)
  return sheetData as RunnerData[]
}

export const rawJsonToAssistContentArray = async (rawJson: GoogleSheetsRAWJson): Promise<AssistContent[]> => {
  const sheetData = await sheetDataToObj(rawJson.values)
  return sheetData as AssistContent[]
}

export const rawJsonToLogoArray = async (rawJson: GoogleSheetsRAWJson): Promise<LogoImg[]> => {
  const sheetData = await sheetDataToObj(rawJson.values)
  return sheetData as LogoImg[]
}

const sheetDataToObj = (sheetData: Array<Array<string>>) => {
  const [header, ...rows] = sheetData
  return rows.map((row) => row.reduce((acc, cell, i) => ({ ...acc, [header[i]]: cell }), {}))
}
