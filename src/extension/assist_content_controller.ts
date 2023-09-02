import { NodeCG } from "./nodecg";
import { AssistContent } from "rib-bundle"

export class AssistContentController {
    constructor(private nodecg: NodeCG) {
    }
    private contentsList: AssistContent[][] = [];
    private intervalCounter: number = 0; // 表示するコンテンツを切り替えるインターバルのカウンター
    private categoryIndex: number = 0; // 表示しているコンテンツのカテゴリのインデックス
    private itemIndex: number = 0; // 表示しているコンテンツのアイテムのインデックス
    private illustItemsCounter: number = 0; // コンテンツがイラストの時に、連続で何枚表示しているかを数えるカウンター
    private prevIllustIndex: number = 0; // コンテンツがイラストの時に、前回表示したコンテンツのインデックスをキャッシュする変数
    private currentGroupIdIndex: number = 0; // コンテンツが見どころの時に、表示している見どころのgroupの開始インデックスをキャッシュする変数
    readonly ASSIST_CHANGE_INTERVAL: number = 1; // 表示するコンテンツの切り替えるインターバル(秒)
    readonly ILLUST_CONTINUOUS_NUM: number = 10; // イラストを連続で表示する枚数
    private initialized: boolean = false;
    private intervalId: NodeJS.Timer | null = null;

    public getAssistContent(): AssistContent { // 表示するコンテンツを返す
        const contents = this.contentsList[this.categoryIndex][this.itemIndex];
        const data: AssistContent = {
            group: contents.group,
            header: contents.header,
            content: contents.content,
            url: contents.url,
        }
        return data;
    }

    private setRandomIllustIndex(): void { // 前回と異なるアイテムのインデックスをセットする(イラスト用)
        const itemLength = this.contentsList[this.categoryIndex].length; // 表示中のカテゴリのコンテンツの長さを代入
        let randIndex: number = Math.floor(Math.random() * itemLength); // 表示中のカテゴリのコンテンツの長さの範囲内でランダムなインデックスを生成
        while (randIndex === this.itemIndex) { // ランダムなインデックスが現在のアイテムのインデックスと同じ時
            randIndex = Math.floor(Math.random() * itemLength); // ランダムなインデックスを再生成
        }
        this.itemIndex = randIndex; // 生成したランダムなインデックスをアイテムのインデックスに代入
    }

    public setGroupID(id: number): void { // 表示するコンテンツのidをセットする
        if (this.contentsList[this.categoryIndex][this.itemIndex].group < 0) { // 現在表示しているコンテンツがイラストだった時
            this.changeCategory(); // 表示するカテゴリを変更する
        }
        for (let i = 0; i < this.contentsList[this.categoryIndex].length; i++) {
            if (this.contentsList[this.categoryIndex][i].group === id) { // セットするidとコンテンツのidが一致した時
                this.currentGroupIdIndex = i; // 表示するコンテンツのidをキャッシュする
                this.itemIndex = i; // idのインデックスを表示するアイテムのインデックスに代入する
                break; // コンテンツのidとセットするidが一致したらループを抜ける
            }
        }
    }

    // 表示するコンテンツがイラストではない時、IDを保持して同じIDのコンテンツを表示する必要がある
    private changeCategory() { // 表示するコンテンツのカテゴリを変更
        this.itemIndex = 0; // アイテムのインデックスを0に初期化
        this.illustItemsCounter = 0; // イラストの連続表示枚数を0に初期化
        if (this.contentsList.length <= ++this.categoryIndex) { // カテゴリのインデックスを1つ進めた時にコンテンツリストのカテゴリの長さを超えた時
            this.categoryIndex = 0; // カテゴリのインデックスを0に初期化
        }
    }

    public setContent(hightlight: AssistContent[], illust: AssistContent[]): void {
        this.contentsList = [hightlight, illust];
        this.reset();
        this.initialized = true;
    }

    public isInitialized(): boolean {
        return this.initialized;
    }

    public reset(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        this.intervalId = null;
        this.intervalCounter = 0;
        this.categoryIndex = 0;
        this.itemIndex = 0;
        this.illustItemsCounter = 0;
        this.prevIllustIndex = 0;
        this.currentGroupIdIndex = 0;
    }

    public resume(): void {
        this.nodecg.sendMessage('setAssistContent', this.getAssistContent());
        this.intervalId = setInterval(() => {
            if (this.countUp()) {
                const content = this.getAssistContent();
                this.nodecg.sendMessage('setAssistContent', content);
            }
        }, 1000);
    }

    public start(): void {
        this.reset();
        this.resume();
    }

    public stop(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        this.intervalId = null;
    }

    public countUp(): boolean { // インターバルのカウンターを進めた時に表示するコンテンツを変更するかどうか
        if (this.ASSIST_CHANGE_INTERVAL <= ++this.intervalCounter) { // インターバルカウンター1つ進めた時にインターバルカウンターがアシストコンテントの変更インターバルを超えた時
            this.intervalCounter = 0; // インターバルカウンターを0に初期化
            if (this.contentsList[this.categoryIndex][this.itemIndex].group < 0) { // 表示しているコンテンツがイラストの時
                if (this.ILLUST_CONTINUOUS_NUM <= ++this.illustItemsCounter) { // イラストの連続表示枚数を1増やした時に、イラストの連続表示枚数が10を超えた時
                    this.prevIllustIndex = this.itemIndex; // 現在表示しているイラストのインデックスをキャッシュする
                    this.changeCategory(); // 表示するコンテンツのカテゴリを変更
                    this.itemIndex = this.currentGroupIdIndex; // 
                } else {// イラストの連続表示枚数が10を超えていない時
                    this.setRandomIllustIndex(); // 現在表示しているイラスト以外のイラストをランダムでセットする
                }
            } else { // 表示しているコンテンツがイラスト以外の時
                const currentID = this.contentsList[this.categoryIndex][this.itemIndex].group;
                if (this.contentsList[this.categoryIndex].length <= ++this.itemIndex) { // アイテムのインデックスを1つ進めた時に、アイテムのインデックスが表示カテゴリの長さを超えた時
                    this.changeCategory(); // 表示するコンテンツのカテゴリを変更
                    if (this.contentsList[this.categoryIndex][this.itemIndex].group < 0) { // 次に表示されるコンテンツのカテゴリがイラストの時
                        this.itemIndex = this.prevIllustIndex; // 表示するアイテムのインデックスを前回表示したイラストのインデックスで初期化
                        this.setRandomIllustIndex(); // 前回表示したイラスト以外のイラストをランダムでセットする
                    }
                } else { // アイテムのインデックスを1つ進めた時に、アイテムのインデックスが表示カテゴリの長さの範囲内だった時
                    if (currentID !== this.contentsList[this.categoryIndex][this.itemIndex].group) { // 現在表示しているidとインデックスを一つ進めた時のidが違う時
                        this.changeCategory(); // 表示するコンテンツのカテゴリを変更
                        this.itemIndex = this.prevIllustIndex; // 表示するアイテムのインデックスを前回表示したイラストのインデックスで初期化
                        this.setRandomIllustIndex(); // 前回表示したイラスト以外のイラストをランダムでセットする
                    }
                }
            }
            return true; // 表示するコンテンツを変更する
        }
        return false; // 表示するコンテンツを変更しない
    };
}