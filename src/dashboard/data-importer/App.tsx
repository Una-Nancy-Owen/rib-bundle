import React, { useState, useEffect, useCallback, useRef } from 'react';
import RunnerGroupArrayUl from './List';
import { ImportOption, RunnerGroup, SheetsKey } from 'rib-bundle';
import Checker from './Checker';
import { BannerImportForm, SheetDataImportForm } from './Form';

export function App() {
  const SheetDataFormInputRef = useRef<HTMLInputElement>(null!); // テキストボックスの入力内容を保持するためのフック
  const BannerFormInputRef = useRef<HTMLInputElement>(null!); // テキストボックスの入力内容を保持するためのフック
  const selectedRef = useRef<string>(null!); // 選択中のプルダウンメニューの文字列を保持するためのフック
  const [isInitialized, setIsInitialized] = useState<boolean>(false); // 初期化状態を管理するためのフック
  const [runnerGroupArray, setRunnerGroupArray] = useState<RunnerGroup[]>(); // 走者情報のリストを管理するためのフック

  const importOptions: ImportOption[] = [
    // プルダウンメニューの項目の配列
    { value: '', label: 'ー選択してくださいー' }, // 初期選択肢。これを選択中の時はテキストボックスとボタンを無効化。
    { value: 'runner', label: '走者データ' },
    { value: 'highlight', label: '見どころ' },
    { value: 'illust', label: '支援イラスト' },
  ];

  useEffect(() => {
    // 最初に一度だけ呼ばれる
    nodecg.Replicant('runnerGroups').on('change', (newVal) => {
      // 走者情報のレプリカントに変更が検知された時
      if (newVal == undefined) {
        // 新しいデータが未定義だった時
        setIsInitialized(false); // データが初期化されていない状態にセットして再レンダリング
        return;
      }
      setRunnerGroupArray(newVal); // 新しい走者情報を代入する
      setIsInitialized(true); // データが初期化された状態にセットして再レンダリング
      console.log('runnerDataListRep is changed.');
    });
    return () => {};
  }, []);

  const sheetDataFormHandleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    // Importボタンを押した時のハンドラー
    e.preventDefault();
    const sheetIdRegex = /(?<=^https:\/\/docs\.google\.com\/spreadsheets\/d\/).+(?=\/)/; // 入力したURLからGoogle SpreadsheetsのシートIDを取得するためのRegex
    const gidRegex = /(?<=gid=)[0-9]+/; // 入力したURLの中からGIDを取得するためのRegex
    const urlText = SheetDataFormInputRef.current.value; // テキストボックスから内容を取り出す
    if (sheetIdRegex.test(urlText) && gidRegex.test(urlText)) {
      // 入力したURLがパターンに一致した時
      const sheetId = urlText.match(sheetIdRegex); // パターンに一致するシートIDを取得
      const gId = urlText.match(gidRegex); // パターンに一致するGIDを取得
      if (sheetId != null && gId != null) {
        // シートIDとGIDがnullでない時
        let sheetsKey: SheetsKey = {
          sheetId: sheetId[0],
          gId: gId[0],
        };
        if (selectedRef.current === importOptions[1].value) {
          nodecg.sendMessage('getRunnerGroupArrayFromSheet', sheetsKey); // 走者情報を取得するためにメッセージを送る
        } else if (selectedRef.current === importOptions[2].value) {
          nodecg.sendMessage('getHighlightArrayFromSheet', sheetsKey); // 見どころ情報を取得するためにメッセージを送る
        } else if (selectedRef.current === importOptions[3].value) {
          nodecg.sendMessage('getIllustArrayFromSheet', sheetsKey); // 支援イラスト情報を取得するためにメッセージを送る
        }
      }
    } else {
      // 入力したURLがパターンと一致しない時
      console.log(selectedRef.current);
      console.log('An invalid URL was detected.'); // コンソールに無効なURLであることをメッセージで出力
    }
  }, []);

  const bannerFormHandler = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const extensionRegex = /(.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|bmp|BMP|webp|WEBP|)$)/;
    const urlText = BannerFormInputRef.current.value;
    if (extensionRegex.test(urlText)) {
      nodecg.sendMessage('setBanner', urlText);
    }
  }, []);

  const EmptyList = () => {
    return (
      <>
        <p>RunnerData has not been imported.</p>
      </>
    );
  };
  if (isInitialized && runnerGroupArray != undefined) {
    return (
      <>
        {/* 入力フォームに入力内容の参照とImportボタンを押した時のハンドラーとプルダウンメニューの選択中の項目の文字列の参照を渡す */}
        <SheetDataImportForm importOptions={importOptions} inputRef={SheetDataFormInputRef} formHandler={sheetDataFormHandleSubmit} selectedRef={selectedRef} />
        <Checker />
        <BannerImportForm inputRef={BannerFormInputRef} formHandler={bannerFormHandler} />
        <RunnerGroupArrayUl runnerGroupArray={runnerGroupArray} />
      </>
    );
  } else {
    return (
      <>
        {/* 入力フォームに入力内容の参照とImportボタンを押した時のハンドラーと選択中のプルダウンメニューの文字列を保持するためのフックを渡す */}
        <SheetDataImportForm importOptions={importOptions} inputRef={SheetDataFormInputRef} formHandler={sheetDataFormHandleSubmit} selectedRef={selectedRef} />
        <BannerImportForm inputRef={BannerFormInputRef} formHandler={bannerFormHandler} />
        <EmptyList />
      </>
    );
  }
}
