import { SheetsKey } from 'rib-bundle'
import { FormEvent, memo, useCallback, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { SquareButton } from '@ui/style'
import { colBlue } from '@ui/color'

type ImportOption = {
  // プルダウンメニュー用の型
  value: string
  label: string
}

const importOptions: ImportOption[] = [
  // プルダウンメニューの項目の配列
  { value: '', label: 'ー選択してくださいー' }, // 初期選択肢。これを選択中の時はテキストボックスとボタンを無効化。
  { value: 'All', label: '全て' },
  { value: 'Runner', label: '走者データ' },
  { value: 'Highlight', label: '見どころ' },
  { value: 'Illust', label: '支援イラスト' },
  { value: 'Logo', label: '大会ロゴ' },
]

export const SheetsImportForm = memo(() => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true) // フォームの有効状態を管理するためのフック
  const inputRef = useRef<HTMLInputElement>(null) // テキストボックスの入力内容を保持するためのフック
  const selectRef = useRef<HTMLSelectElement>(null) // 選択中のプルダウンメニューの文字列を保持するためのフック
  const sheetIdRegex = /(?<=^https:\/\/docs\.google\.com\/spreadsheets\/d\/).+(?=\/)/ // 入力したURLからGoogle SpreadsheetsのシートIDを取得するためのRegex
  const gidRegex = /(?<=gid=)[0-9]+/ // 入力したURLの中からGIDを取得するためのRegex

  const importFormHandler = useCallback((e: FormEvent) => {
    e.preventDefault()
    if (inputRef.current != null && selectRef.current != null) {
      const urlText = inputRef.current.value // テキストボックスから内容を取り出す
      if (sheetIdRegex.test(urlText) && gidRegex.test(urlText)) {
        // 入力したURLがパターンに一致した時
        const sheetId = urlText.match(sheetIdRegex) // パターンに一致するシートIDを取得
        const gId = urlText.match(gidRegex) // パターンに一致するGIDを取得
        if (sheetId != null && gId != null) {
          // シートIDとGIDがnullでない時
          const sheetsKey: SheetsKey = {
            sheetId: sheetId[0],
            gId: gId[0],
          }
          const value = selectRef.current.value
          if (value == importOptions[1].value) {
            nodecg.sendMessage('importRunnerGroupArray', sheetsKey)
            sleep(1000)
            nodecg.sendMessage('importHighlight', sheetsKey)
            sleep(1000)
            nodecg.sendMessage('importIllust', sheetsKey)
            sleep(1000)
            nodecg.sendMessage('importLogo', sheetsKey)
          } else if (value == importOptions[2].value) {
            nodecg.sendMessage('importRunnerGroupArray', sheetsKey) // 走者情報を取得するためにメッセージを送る
          } else if (value == importOptions[3].value) {
            nodecg.sendMessage('importHighlight', sheetsKey) // 見どころ情報を取得するためにメッセージを送る
          } else if (value == importOptions[4].value) {
            nodecg.sendMessage('importIllust', sheetsKey) // 支援イラスト情報を取得するためにメッセージを送る
          } else if (value == importOptions[5].value) {
            nodecg.sendMessage('importLogo', sheetsKey) // 大会ロゴを取得
          }
        }
      }
    }
  }, [])

  const selectHandler = useCallback(() => {
    if (selectRef.current != null) {
      if (selectRef.current!.value != '') {
        // 選択中のプルダウンメニューが初期選択肢でない場合
        setIsDisabled(false) // フォームを有効化
        setTimeout(() => {
          // 少しタイミングをズラしてテキストボックスにフォーカスする
          if (inputRef.current != null) {
            inputRef.current.focus()
          }
        }, 0)
      } else {
        // 選択中のプルダルンメニューが初期選択肢の場合はフォームを無効化
        setIsDisabled(true)
      }
    }
  }, [])

  const options = importOptions.map((option, index) => (
    <option key={`options${index}`} value={option.value}>
      {option.label}
    </option>
  ))
  return (
    <StImportFormContainer>
      <h2>データのインポート</h2>
      <StForm onSubmit={importFormHandler}>
        <select ref={selectRef} onChange={selectHandler}>
          {options}
        </select>
        <input type='text' name='url' ref={inputRef} disabled={isDisabled} />
        <SquareButton $color={colBlue} type='submit' disabled={isDisabled}>
          Import
        </SquareButton>
      </StForm>
    </StImportFormContainer>
  )
})

const sleep = (time: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

const StImportFormContainer = styled.div`
  & > h2 {
    font-size: 1.1rem;
    font-weight: 700;
  }
`

const StForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  option {
    color: #333;
    width: 80%;
  }
  & > select {
    color: #333;
    padding: 5px;
    border-radius: 4px;
    height: 38px;
    margin: 6px 10px;
  }
  & > input {
    color: #333;
    width: 70%;
    padding: 5px;
    border-radius: 4px;
    height: 38px;
    margin: 6px 10px;
  }
  & > button {
    margin-left: auto;
  }
`
