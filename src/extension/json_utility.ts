import { RunnerData, RunnerGroup, AssistContent, GoogleSheetsDataRAWJson } from 'rib-bundle'

export async function rawJsonToRunnerDataArray(props: GoogleSheetsDataRAWJson): Promise<RunnerData[]> {
    const sheetData = await sheetDataToObj(props.values);
    return sheetData as RunnerData[];
}

export async function rawJsonToAssistContentArray(props: GoogleSheetsDataRAWJson): Promise<AssistContent[]> {
    const sheetData = await sheetDataToObj(props.values);
    return sheetData as AssistContent[];
}


export function sheetDataToObj(props: Array<Array<string>>) {
    const [header, ...rows] = props;
    return rows.map((row) => row.reduce((acc, cell, i) => ({ ...acc, [header[i]]: cell }), {})
    );
}

export function rawJsonToRunnerGroupArray(props: GoogleSheetsDataRAWJson): RunnerGroup[] {
    const sheetData = sheetDataToObj(props.values);
    const runnerDataList = sheetData as RunnerData[];
    const runnerGroupList = runnerDataArrayToRunnersGroupArray(runnerDataList);
    return runnerGroupList;
}

export function runnerDataArrayToRunnersGroupArray(props: RunnerData[]): RunnerGroup[] {
    let runnerGroupList: RunnerGroup[] = [];
    for (let i = 0; i < props.length; i++) {
        const groupId = i;
        let runnerGroup: RunnerGroup = {
            runners: [],
            commentators: []
        };
        for (let k = 0; k < props.length; k++) {
            let rawData = props[k];
            const data: RunnerData = {
                group: rawData.group,
                name: rawData.name,
                commentator: String(rawData.commentator) == 'TRUE' ? true : false,
                title: rawData.title,
                platform: rawData.platform,
                category: rawData.category,
                estimatedTime: rawData.estimatedTime,
                icon: rawData.icon
            }
            if (data.group == groupId) {
                if (!data.commentator) {
                    runnerGroup.runners.push(data);
                } else {
                    runnerGroup.commentators.push(data);
                }
            }
        }
        if (0 < runnerGroup.runners.length) {
            runnerGroupList.push(runnerGroup);
        } else {
            break;
        }
    }
    return runnerGroupList;
}