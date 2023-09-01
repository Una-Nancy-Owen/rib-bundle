declare module "rib-bundle" {
    interface SheetsKey { // Google Sheetsからデータを取得するために必要なシートIDとGID
        readonly sheetId: string;
        readonly gId: string;
    }

    interface GoogleSheetsDataRAWJson {
        range: string;
        majorDimensions: string;
        values: string[][];
    }

    interface GoogleSheetsPropertyList {
        sheets: GoogleSheetsPropertyContainer[];
    }

    interface GoogleSheetsPropertyContainer {
        properties: GoogleSheetsProperty;
    }

    interface GoogleSheetsProperty {
        sheetId: number;
        title: string;
        index: number;
        sheetType: string;
        gridProperties: GoogleSheetsGridProperty;
    }

    interface GoogleSheetsGridProperty {
        rowCount: number;
        columnCount: number;
    }

    interface AssistContent { // 右枠に表示されるコンテンツ
        group: number; // 
        header: string;
        content: string;
        url: string;
    }

    interface HoraroItem {
        length: string;
        length_t: string;
        scheduled: string;
        scheduled_t: string;
        data: string[];
    }

    interface HoraroData {
        meta: {
            exported: string;
            hint: string;
            api: string;
            api_link: string;
        }
        schedule: {
            name: string;
            slug: string;
            timezone: string;
            start: string;
            start_t: string;
            website: string;
            twitter: string;
            twitch: string;
            description: string;
            setup: string;
            setup_t: string;
            updated: string;
            url: string;
            event: {
                name: string;
                slug: string;
            }
            columns: string[];
            items: HoraroItem[]
        }
    }

    interface RunnerGroup {
        runners: RunnerData[];
        commentators: RunnerData[];
    }

    interface RunnerData {
        group: number;
        name: string;
        commentator: boolean;
        title: string;
        platform: string;
        category: string;
        estimatedTime: string;
        icon: string;
    }

    type GraphicsType = 'BasicOne' | 'BasicTwo' | 'BasicThree';

    interface ImportOption {
        // プルダウンメニュー用のインターフェース
        value: string;
        label: string;
    }

    interface ReplicantMap {
        runnerGroups: RunnerGroup[];
        currentRunnerGroup: RunnerGroup;
        currentRunnerGroupIndex: number;
        nextRunnerGroupIndex: number;
        highlight: AssistContent[];
        illust: AssistContent[];
        assistContent: AssistContent;
        banner: string;
    }

    interface MessageMap {
        setCurrentRunnerGroupIndex: { data: number },
        setNextRunnerGroupIndex: { data: number },
        getRunnerGroupArrayFromSheet: { data: SheetsKey },
        setAssistContent: { data: AssistContent },
        getHighlightArrayFromSheet: { data: SheetsKey },
        getIllustArrayFromSheet: { data: SheetsKey },
        setBanner: { data: string },
        startAssistContentController: {}
    }
}