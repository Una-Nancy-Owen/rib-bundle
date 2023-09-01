import needle, { NeedleResponse } from 'needle'
import { HoraroData, RunnerData, RunnerGroup, AssistContent, SheetsKey, GoogleSheetsDataRAWJson, GoogleSheetsPropertyList, GoogleSheetsPropertyContainer } from 'rib-bundle'
import dotenv from 'dotenv'

dotenv.config()

export async function getSchedule(url: string): Promise<HoraroData> {
    try {
        const res = await needle('get', encodeURI(url));
        if (res.statusCode !== 200) {
            throw new Error(`HTTP status code was ${res.statusCode}`);
        }
        return res.body;
    } catch (err) {
        throw err;
    }
}

export async function getSheetData(sheetsKey: SheetsKey): Promise<NeedleResponse> {
    let response: NeedleResponse = <NeedleResponse>{ complete: false };
    try {
        const propertyApiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetsKey.sheetId}/?key=${process.env.GOOGLE_SHEETS_API_KEY}` // APIキーを使って全シートの情報を取得するためのURL
        const propertyRes = await needle('get', encodeURI(propertyApiUrl)); // needleを使ってGoogle Spreadsheetsのデータを非同期で取得する
        if (propertyRes.statusCode !== 200) { // ステータスコードが200でない場合はエラーを返す
            console.log(`HTTP status code was ${propertyRes.statusCode}`);
        }
        const sheetTitle = GetSheetTitleFromRawPropertyJson(propertyRes.body, sheetsKey.gId); // 取得したデータからGIDが一致するシート名を取得する
        if (sheetTitle !== '') {
            const valuesApiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetsKey.sheetId}/values/${sheetTitle}?key=${process.env.GOOGLE_SHEETS_API_KEY}` // SheetIDと取得したシート名を使った、データを取得するためのURL
            response = await needle('get', encodeURI(valuesApiUrl)); // needleを使ってGoogle Spreadsheetsのデータを非同期で取得する
            if (response.statusCode !== 200) { // ステータスコードが200でない場合はエラーを返す
                console.log(`HTTP status code was ${response.statusCode}`);
            }
        }
    } catch (err) {
        console.log(err);
    } finally {
        return response;
    }
}

export async function urlIsExists(url: string): Promise<boolean> {
    const res = await needle('get', encodeURI(url));
    if (res.statusCode !== 200) {
        return false;
    } else {
        return true;
    }
}

async function getSheetsDataByUsingGID(sheetId: string, gId: string): Promise<NeedleResponse> { // Google Spreadsheetsのデータをneedleを使ってSheetIDとGIDから非同期で取得する関数
    try {
        const propertyApiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/?key=${process.env.GOOGLE_SHEETS_API_KEY}` // APIキーを使って全シートの情報を取得するためのURL
        const propertyRes = await needle('get', encodeURI(propertyApiUrl)); // needleを使ってGoogle Spreadsheetsのデータを非同期で取得する
        if (propertyRes.statusCode !== 200) { // ステータスコードが200でない場合はエラーを返す
            throw new Error(`HTTP status code was ${propertyRes.statusCode}`);
        }
        const sheetTitle = GetSheetTitleFromRawPropertyJson(propertyRes.body, gId); // 取得したデータからGIDが一致するシート名を取得する
        if (sheetTitle === '') { // GIDが一致するシートが見つからなかった場合はエラーを返す
            throw new Error('sheet title was not found');
        }
        const valuesApiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetTitle}?key=${process.env.GOOGLE_SHEETS_API_KEY}` // SheetIDと取得したシート名を使った、データを取得するためのURL
        const valuesRes = await needle('get', encodeURI(valuesApiUrl)); // needleを使ってGoogle Spreadsheetsのデータを非同期で取得する
        if (valuesRes.statusCode !== 200) { // ステータスコードが200でない場合はエラーを返す
            throw new Error(`HTTP status code was ${valuesRes.statusCode}`);
        }
        return valuesRes; // 取得したデータを返す
    } catch (err) { // 各データの取得中にエラーが発生した時
        throw err;
    }
}

function GetSheetTitleFromRawPropertyJson(props: GoogleSheetsPropertyList, gId: string): string {
    let sheetTitle: string = ''; // 取得したシート名を代入する変数
    for (let i = 0; i < props.sheets.length; i++) { // 全シートからGIDの一致するシートを見つける
        const _sheet = props.sheets[i] as GoogleSheetsPropertyContainer;
        const _sheetId = String(_sheet.properties.sheetId);
        if (_sheetId === gId) { // 比較中のページのGIDと入力したシートのGIDが一致した時
            sheetTitle = _sheet.properties.title; // シート名を代入する
            break;
        }
    }
    return sheetTitle; // シート名を返す
}