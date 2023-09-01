"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var needleUtility_1 = require("./needleUtility");
var jsonUtility_1 = require("./jsonUtility");
var discordMessageReceiver_1 = require("./discordMessageReceiver");
var AssistContentController_1 = require("./AssistContentController");
dotenv_1.default.config();
function default_1(nodecg) {
    return __awaiter(this, void 0, void 0, function () {
        var assistContentController, assistContentRep, currentRunnerGroupRep, runnerGroupIndexRep, currentRunnerGroupIndex, nextRunnerGroupIndexRep, runnerGroupArrayRep, highlightRep, illustRep;
        return __generator(this, function (_a) {
            assistContentController = new AssistContentController_1.AssistContentController(nodecg);
            assistContentRep = nodecg.Replicant('assistContent', {
                defaultValue: {
                    header: "no header",
                    content: "no content",
                    url: "no url",
                    group: -10
                }
            });
            currentRunnerGroupRep = nodecg.Replicant('currentRunnerGroup');
            runnerGroupIndexRep = nodecg.Replicant('currentRunnerGroupIndex');
            currentRunnerGroupIndex = nodecg.Replicant('currentRunnerGroupIndex');
            nextRunnerGroupIndexRep = nodecg.Replicant('nextRunnerGroupIndex');
            runnerGroupArrayRep = nodecg.Replicant('runnerGroups');
            highlightRep = nodecg.Replicant('highlight');
            illustRep = nodecg.Replicant('illust');
            nodecg.listenFor('setNextRunnerGroupIndex', function (index) {
                var runnerGroupArray = nodecg.readReplicant('runnerGroups');
                if (runnerGroupArray == undefined)
                    return;
                if (runnerGroupArray.length < index)
                    return;
                nextRunnerGroupIndexRep.value = index;
            });
            nodecg.listenFor('setCurrentRunnerGroupIndex', function (index) {
                var runnerGroups = runnerGroupArrayRep.value;
                if (index < 0 || runnerGroups == undefined)
                    return;
                if (runnerGroups.length <= index)
                    return;
                runnerGroupIndexRep.value = index;
                var nextGroup = {
                    runners: [],
                    commentators: []
                };
                for (var i = 0; i < runnerGroups[index].runners.length; i++) {
                    var runner = runnerGroups[index].runners[i];
                    var copiedRunner = {
                        group: runner.group,
                        name: runner.name,
                        commentator: runner.commentator,
                        title: runner.title,
                        platform: runner.platform,
                        category: runner.category,
                        estimatedTime: runner.estimatedTime,
                        icon: runner.icon
                    };
                    nextGroup.runners.push(copiedRunner);
                }
                for (var i = 0; i < runnerGroups[index].commentators.length; i++) {
                    var comentator = runnerGroups[index].commentators[i];
                    var copiedCommentator = {
                        group: comentator.group,
                        name: comentator.name,
                        commentator: comentator.commentator,
                        title: comentator.title,
                        platform: comentator.platform,
                        category: comentator.category,
                        estimatedTime: comentator.estimatedTime,
                        icon: comentator.icon
                    };
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
                var nextIndex = Number(index) + Number(1);
                var groupsLength = runnerGroups.length;
                nextRunnerGroupIndexRep.value = nextIndex < groupsLength ? nextIndex : -1;
            });
            nodecg.listenFor('getRunnerGroupArrayFromSheet', function (sheetsKey) {
                (0, needleUtility_1.getSheetData)(sheetsKey).then(function (result) {
                    if (result.complete) {
                        (0, jsonUtility_1.RawJsonToRunnerDataArray)(result.body).then(function (data) {
                            var runnerGroupArray = (0, jsonUtility_1.RunnerDataArrayToRunnersGroupArray)(data);
                            runnerGroupArrayRep.value = runnerGroupArray;
                            if (runnerGroupIndexRep.value != undefined) {
                                if (runnerGroupArray.length <= runnerGroupIndexRep.value) {
                                    runnerGroupIndexRep.value = 0;
                                }
                            }
                            else {
                                runnerGroupIndexRep.value = 0;
                            }
                        });
                    }
                    else {
                        // 正しく受信できなかった場合
                        console.log('スプレッドシートからデータが受信できませんでした。');
                    }
                });
            });
            nodecg.listenFor('setAssistContent', function (assistContent) {
                if (assistContentController.isInitialized()) {
                    if (assistContent.group == -10) {
                        assistContentController.stop();
                        setTimeout(function () {
                            assistContentController.start();
                        }, 15000);
                    }
                }
                assistContentRep.value = assistContent;
            });
            nodecg.listenFor('getHighlightArrayFromSheet', function (sheetsKey) {
                (0, needleUtility_1.getSheetData)(sheetsKey).then(function (result) {
                    if (result.complete) {
                        (0, jsonUtility_1.RawJsonToAssistContentArray)(result.body).then(function (data) {
                            highlightRep.value = data;
                        });
                    }
                    else {
                        // 正しく受信できなかった場合
                        console.log('スプレッドシートからデータが受信できませんでした。');
                    }
                });
            });
            nodecg.listenFor('getIllustArrayFromSheet', function (sheetsKey) {
                (0, needleUtility_1.getSheetData)(sheetsKey).then(function (result) {
                    if (result.complete) {
                        (0, jsonUtility_1.RawJsonToAssistContentArray)(result.body).then(function (data) {
                            for (var i = 0; i < data.length; i++) {
                                data[i].url = '';
                            }
                            illustRep.value = data;
                        });
                    }
                    else {
                        // 正しく受信できなかった場合
                        console.log('スプレッドシートからデータが受信できませんでした。');
                    }
                });
            });
            nodecg.listenFor('setBanner', function (url) {
                (0, needleUtility_1.urlIsExists)(url).then(function (isExists) {
                    if (isExists) {
                        var bannerRep = nodecg.Replicant('banner');
                        bannerRep.value = url;
                    }
                });
            });
            nodecg.listenFor('startAssistContentController', function () {
                if (highlightRep.value == undefined || highlightRep.value == null)
                    return;
                if (illustRep.value == undefined || illustRep.value == null)
                    return;
                if (0 < highlightRep.value.length && 0 < illustRep.value.length) {
                    assistContentController.setContent(highlightRep.value, illustRep.value);
                    assistContentController.start();
                }
            });
            (0, discordMessageReceiver_1.initDiscordMessageReceiver)(nodecg);
            return [2 /*return*/];
        });
    });
}
exports.default = default_1;
;
