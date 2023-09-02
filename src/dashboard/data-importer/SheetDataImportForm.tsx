import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button } from '../ui';
import { ImportOption } from 'rib-bundle';
import styled from 'styled-components';

// #region styles

// #endregion styles

export const SheetDataImportForm = React.memo(
  (props: {
    inputRef: React.MutableRefObject<HTMLInputElement>; // テキストボックスの入力内容を保持するためのフック
    formHandler: React.FormEventHandler<HTMLFormElement>; // Importボタンを押した時のハンドラー
    selectedRef: React.MutableRefObject<string>; // 選択中のプルダウンメニューの文字列を保持するためのフック
    importOptions: ImportOption[];
  }) => {
    const [isDisabled, setIsDisabled] = useState<boolean>(true); // フォームの有効状態を管理するためのフック
    const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
      // プルダウンメニューを変更した時のイベント
      const selected = props.importOptions.find((option) => option.value === e.target.value); // importOptionの配列に存在するvalueと選択中のプルダウンメニューのvalueが一致したらvalueを代入
      const _isDisabled = selected?.value === ''; // 選択中のプルダウンメニューがデフォルトの時はtrueを返す
      props.selectedRef.current = _isDisabled ? '' : selected!.value; // 選択中のプルダウンメニューがデフォルトの時は''、それ以外の場合は選択中のvalueを代入
      if (isDisabled !== _isDisabled) {
        // 現在のフォームの有効状態と新しい有効状態が違う時
        setIsDisabled(_isDisabled); // フォームの有効状態を変更する
      }
      if (!_isDisabled) {
        // フォームが有効状態の時
        setTimeout(() => {
          // 同タイミングだとできないのでタイミングをずらしてフォーカスする
          if (props.inputRef.current) {
            props.inputRef.current.focus(); // テキストボックスにフォーカスする
            console.log(selected?.value);
          }
        }, 0);
      }
    };
    return (
      <Form onSubmit={props.formHandler}>
        {' '}
        {/* Google SpreadsheetsのURL入力用のフォーム */}
        <Select onChange={handleSelectOption}>
          {' '}
          {/* 取得するデータの種類を選択するためのプルダウンメニュー */}
          {props.importOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        {/* URL入力用テキストボックス */}
        <Input type='text' name='url' ref={props.inputRef} disabled={isDisabled} />
        {/* Submitボタン */}
        <Button type='submit' disabled={isDisabled}>
          Import
        </Button>
      </Form>
    );
  }
);
