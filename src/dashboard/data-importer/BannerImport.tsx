import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from '../ui';
import styled from 'styled-components';

// #region styles

const BannerImg = styled.img`
  width: 300px;
  height: 300px;
  object-fit: contain;
`;

// #endregion styles

export const BannerImportForm = React.memo(
  (props: {
    inputRef: React.MutableRefObject<HTMLInputElement>; // テキストボックスの入力内容を保持するためのフック
    formHandler: React.FormEventHandler<HTMLFormElement>; // Importボタンを押した時のハンドラー
  }) => {
    const [bannerUrl, setBannerUrl] = useState<string>('');
    useEffect(() => {
      nodecg.Replicant('banner').on('change', (newVal) => {
        if (newVal == undefined) return;
        setBannerUrl(newVal);
      });
    }, []);
    const Banner = bannerUrl == '' ? null : <BannerImg src={bannerUrl} />;
    return (
      <>
        <Form onSubmit={props.formHandler}>
          {/* URL入力用テキストボックス */}
          <Input type='text' name='url' ref={props.inputRef} />
          {/* Submitボタン */}
          <Button type='submit' value='Import'>
            Import
          </Button>
        </Form>
        {Banner}
      </>
    );
  }
);
