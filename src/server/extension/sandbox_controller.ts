import { getSheetDataByGIDAsync, getSheetDataByTitleAsync } from './google_sheets_loader'
import { NodeCG } from '../server'
import { AssistContent, GoogleSheetsRAWJson } from 'rib-bundle'
import {
  assistContentArrayToAssistContentGroupArray,
  formatAssistContentArray,
  rawJsonToAssistContentArray,
} from './json_utility'
import { copyAssistContent } from './copy_util'

type ContentType = 'highlight' | 'illust'

export const sandboxController = (nodecg: NodeCG) => {
  let intervalId: NodeJS.Timeout | null = null
  let groupIndex: number = 0
  let highlightIndex: number = 0
  let illustCounter: number = 0
  let illustIndex: number = 0
  let isFirstTime: boolean = false
  let contentType: ContentType = 'highlight'
  const DELAY: number = 3000
  const ILLUST_MAX_COUNT = 5
  let highlightContent: AssistContent[][] = []
  let illustContent: AssistContent[] = []
  const assistContentRep = nodecg.Replicant('assistContent', {
    defaultValue: {
      header: 'no header',
      content: 'no content',
      url: '',
      group: -10,
    },
  })
  const autoRefreshSandboxRep = nodecg.Replicant('autoRefreshSandbox')
  autoRefreshSandboxRep.value = false
  let autoRefreshSandbox: boolean = autoRefreshSandboxRep.value ?? false

  const updateContent = (assistContent: AssistContent) => {
    assistContentRep.value = copyAssistContent(assistContent)
  }

  /**
   * 右枠の表示をDELAYの一定間隔(ミリ秒)で更新する関数
   */
  const countUp = () => {
    if (!intervalId) {
      intervalId = setInterval(() => {
        changeContent()
      }, DELAY)
    }
  }

  /**
   * 右枠に表示するコンテンツを変更する関数
   */
  const changeContent = () => {
    if (contentType == 'highlight') {
      changeHighlight()
    } else {
      changeIllust()
    }
  }

  /**
   * 右枠に表示する見どころを変更する関数
   * @returns null
   */
  const changeHighlight = () => {
    if (isFirstTime) {
      isFirstTime = false
      highlightIndex = 0
      updateContent(highlightContent[groupIndex][highlightIndex])
    } else if (highlightIndex + 1 < highlightContent[groupIndex].length) {
      highlightIndex++
      updateContent(highlightContent[groupIndex][highlightIndex])
    } else {
      contentType = 'illust'
      illustCounter = 0
      changeIllust()
    }
  }

  /**
   * 右枠に表示するイラストのインデックスをランダムで前回と違うものを返す関数
   * @param prevIndex 前回表示していたイラストのインデックス
   * @returns 新しいイラストのインデックス
   */
  const getRandomIllustIndex = (prevIndex: number): number => {
    const itemLength = illustContent.length
    let randIndex: number = Math.floor(Math.random() * itemLength) // 表示中のカテゴリのコンテンツの長さの範囲内でランダムなインデックスを生成
    while (randIndex == prevIndex) {
      // ランダムなインデックスが現在のアイテムのインデックスと同じ時
      randIndex = Math.floor(Math.random() * itemLength) // ランダムなインデックスを再生成
    }
    return randIndex
  }

  /**
   * 右枠に表示するイラストを更新する関数
   */
  const changeIllust = () => {
    if (ILLUST_MAX_COUNT <= illustCounter) {
      contentType = 'highlight'
      highlightIndex = 0
      updateContent(highlightContent[groupIndex][highlightIndex])
    } else {
      illustCounter++
      illustIndex = getRandomIllustIndex(illustIndex)
      updateContent(illustContent[illustIndex])
    }
  }

  /**
   * 右枠の表示の自動更新を開始する関数
   */
  const start = () => {
    stop()
    highlightIndex = 0
    contentType = 'highlight'
    illustCounter = 0
    isFirstTime = true
    if (0 < highlightContent.length && 0 < illustContent.length) {
      countUp()
    }
  }

  /**
   * 右枠の表示の自動更新を停止する関数
   */
  const stop = () => {
    if (intervalId) {
      clearInterval(intervalId)
    }
    intervalId = null
  }

  nodecg.listenFor('importHighlight', async (sheetsKey) => {
    getSheetDataByTitleAsync(sheetsKey, 'Highlight').then((result) => {
      if (result.complete) {
        rawJsonToAssistContentArray(result.body as GoogleSheetsRAWJson).then((data) => {
          if (0 < data.length) {
            const assistContentArray = formatAssistContentArray(data)
            const assistContentGroupArray = assistContentArrayToAssistContentGroupArray(assistContentArray)
            nodecg.Replicant('highlight').value = assistContentGroupArray
          }
        })
      }
    })
  })

  nodecg.listenFor('importIllust', async (sheetsKey) => {
    getSheetDataByTitleAsync(sheetsKey, 'Illust').then((result) => {
      if (result.complete) {
        rawJsonToAssistContentArray(result.body as GoogleSheetsRAWJson).then((data) => {
          if (0 < data.length) {
            const assistContentArray = formatAssistContentArray(data)
            nodecg.Replicant('illust').value = assistContentArray
          }
        })
      }
    })
  })

  nodecg.listenFor('overrideSandbox', (value) => {
    stop()
    updateContent(value)
    if (autoRefreshSandbox) {
      setTimeout(() => {
        start()
      }, DELAY)
    }
  })

  nodecg.listenFor('toggleAutoRefreshSandBox', (value) => {
    autoRefreshSandboxRep.value = value
    autoRefreshSandbox = value
    if (autoRefreshSandbox) {
      start()
    } else {
      stop()
    }
  })

  nodecg.Replicant('groupIndex').on('change', (newValue) => {
    if (newValue != null) {
      contentType = 'highlight'
      if (newValue < highlightContent.length) {
        groupIndex = newValue
        if (0 < highlightContent.length && 0 < illustContent.length && intervalId) {
          highlightIndex = 0
          updateContent(highlightContent[groupIndex][highlightIndex])
        }
      }
    }
  })

  nodecg.Replicant('highlight').on('change', (newValue) => {
    if (newValue != null) {
      if (0 < newValue.length) {
        highlightContent = newValue
      }
    }
  })

  nodecg.Replicant('illust').on('change', (newValue) => {
    if (newValue != null) {
      if (0 < newValue.length) {
        illustContent = newValue
      }
    }
  })

  if (autoRefreshSandboxRep.value) {
    start()
  }
}
