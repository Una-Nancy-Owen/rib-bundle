import { GoogleSheetsPropertyContainer, GoogleSheetsPropertyArray, SheetsKey } from 'rib-bundle'
import needle, { NeedleResponse } from 'needle'

export const getSheetDataByGIDAsync = async (sheetsKey: SheetsKey): Promise<NeedleResponse> => {
  let response: NeedleResponse = <NeedleResponse>{ complete: false }
  try {
    const propertyApiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetsKey.sheetId}/?key=${process.env.GOOGLE_SHEETS_API_KEY}` // APIキーを使って全シートの情報を取得するためのURL
    const propertyRes = await needle('get', encodeURI(propertyApiUrl)) // needleを使ってGoogle Spreadsheetsのデータを非同期で取得する
    if (propertyRes.statusCode !== 200) {
      // ステータスコードが200でない場合はエラーを返す
      console.log(`HTTP status code was ${propertyRes.statusCode}`)
    }
    const sheetTitle = getSheetTitleFromJson(propertyRes.body, sheetsKey.gId) // 取得したデータからGIDが一致するシート名を取得する
    if (sheetTitle !== '') {
      const valuesApiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetsKey.sheetId}/values/${sheetTitle}?key=${process.env.GOOGLE_SHEETS_API_KEY}` // SheetIDと取得したシート名を使った、データを取得するためのURL
      response = await needle('get', encodeURI(valuesApiUrl)) // needleを使ってGoogle Spreadsheetsのデータを非同期で取得する
      if (response.statusCode !== 200) {
        // ステータスコードが200でない場合はエラーを返す
        console.log(`HTTP status code was ${response.statusCode}`)
      }
    }
  } catch (err) {
    console.log(err)
  } finally {
    return response
  }
}

export const getSheetDataByTitleAsync = async (sheetsKey: SheetsKey, sheetTitle: string): Promise<NeedleResponse> => {
  let response: NeedleResponse = <NeedleResponse>{ complete: false }
  try {
    const valuesApiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetsKey.sheetId}/values/${sheetTitle}?key=${process.env.GOOGLE_SHEETS_API_KEY}` // SheetIDと取得したシート名を使った、データを取得するためのURL
    response = await needle('get', encodeURI(valuesApiUrl)) // needleを使ってGoogle Spreadsheetsのデータを非同期で取得する
    if (response.statusCode !== 200) {
      // ステータスコードが200でない場合はエラーを返す
      console.log(`HTTP status code was ${response.statusCode}`)
    }
  } catch (err) {
    console.log(err)
  } finally {
    return response
  }
}

const getSheetTitleFromJson = (props: GoogleSheetsPropertyArray, gId: string): string => {
  let sheetTitle: string = '' // 取得したシート名を代入する変数
  for (let i = 0; i < props.sheets.length; i++) {
    // 全シートからGIDの一致するシートを見つける
    const _sheet = props.sheets[i] as GoogleSheetsPropertyContainer
    const _sheetId = String(_sheet.properties.sheetId)
    if (_sheetId === gId) {
      // 比較中のページのGIDと入力したシートのGIDが一致した時
      sheetTitle = _sheet.properties.title // シート名を代入する
      break
    }
  }
  return sheetTitle // シート名を返す
}

export const urlIsExists = async (url: string): Promise<boolean> => {
  const res = await needle('get', encodeURI(url))
  if (res.statusCode !== 200) {
    return false
  } else {
    return true
  }
}
