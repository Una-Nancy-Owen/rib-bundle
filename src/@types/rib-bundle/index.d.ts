declare module 'rib-bundle' {
  type SignalType = 'Start' | 'Stop' | 'Resume' | 'Reset'

  type TimerSignal = {
    signalType: SignalType
    all: boolean
    index: number
  }

  type Timer = {
    startTime: number
    currentTime: number
    isRunning: boolean
    h: string
    m: string
    s: string
    ms: string
  }

  type TimerState = {
    startedEveryone: boolean
    startedSomeone: boolean
    individibleTimer: boolean[]
    startedTimer: boolean[]
  }

  type Speaker = {
    enabled: boolean[]
  }

  type TimerGroup = {
    timer: Timer[]
    runningNum: number
    showMS: boolean
  }

  type GraphicsType =
    | 'SquareOne'
    | 'SquareTwo'
    | 'SquareThree'
    | 'SquareThreeMetalMax'
    | 'SquareFour'
    | 'WideOne'
    | 'WideTwo'
    | 'WideThree'
    | 'WideFour'
    | 'Undefined'

  type RunnerData = {
    group: number
    name: string
    commentator: boolean
    icon: string
    title: string
    platform: string
    category: string
    estimatedTime: string
    graphicsType: GraphicsType
  }

  type RunnerGroup = {
    group: number
    runners: RunnerData[]
    commentators: RunnerData[]
    title: string[]
    platform: string
    category: string
    estimatedTime: string
    graphicsType: GraphicsType
  }

  type SheetsKey = {
    // Google Sheetsからデータを取得するために必要なシートIDとGID
    sheetId: string
    gId: string
  }

  type GoogleSheetsRAWJson = {
    range: string
    majorDimensions: string
    values: string[][]
  }

  type GoogleSheetsPropertyArray = {
    sheets: GoogleSheetsPropertyContainer[]
  }

  type GoogleSheetsPropertyContainer = {
    properties: GoogleSheetsProperty
  }

  type GoogleSheetsProperty = {
    sheetId: number
    title: string
    index: number
    sheetType: string
    gridProperties: GoogleSheetsGridProperty
  }

  type GoogleSheetsGridProperty = {
    rowCount: number
    columnCount: number
  }

  type AssistContent = {
    group: number
    header: string
    content: string
    url: string
  }

  type LogoImg = {
    name: string
    url: string
  }
}
