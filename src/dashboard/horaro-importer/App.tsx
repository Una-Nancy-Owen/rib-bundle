import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Input } from '../ui';

const HoraroForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const UrlInput = styled(Input)``;
const UrlSubmit = styled(Input)`
  &:hover {
    background-color: #eee;
  }
  &:active {
    background-color: #ccc;
  }
`;

export function App() {
  const [urlText, setUrlText] = useState<string>('');

  const getJson = (s: string) => {
    fetch(s, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const regex = /^https:\/\/horaro\.org\/.+json\?.+/;
    if (regex.test(urlText)) {
      console.log(urlText);
      getJson(urlText);
    } else {
      console.log('An invalid URL was detected.');
    }
  };
  const handleChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlText(e.target.value);
  };

  return (
    <>
      <HoraroForm onSubmit={handleSubmit}>
        <UrlInput type='text' name='url' value={urlText} onChange={handleChangeUrl} />
        <UrlSubmit type='submit' value='Import' />
      </HoraroForm>
    </>
  );
}
