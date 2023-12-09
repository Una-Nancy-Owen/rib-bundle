import { AssistContent, LogoImg, RunnerData, RunnerGroup } from 'rib-bundle'

export const copyRunnerGroup = (data: RunnerGroup): RunnerGroup => {
  let runnerGroup: RunnerGroup = {
    group: -1,
    commentators: [],
    runners: [],
    graphicsType: 'Undefined',
    title: [],
    platform: '',
    category: '',
    estimatedTime: '',
  }
  data.runners.forEach((runner, index) => {
    if (index == 0) {
      runnerGroup.group = runner.group
      runnerGroup.graphicsType = runner.graphicsType
      runnerGroup.platform = runner.platform
      runnerGroup.category = runner.category
      runnerGroup.estimatedTime = runner.estimatedTime
      if (runner.title.includes('\\n')) {
        runnerGroup.title = runner.title.split('\\n')
      } else {
        runnerGroup.title.push(runner.title)
      }
    }
    const copyRunner = copyRunnerData(runner)
    runnerGroup.runners.push(copyRunner)
  })
  data.commentators.forEach((commentator, index) => {
    if (index == 0) {
      runnerGroup.graphicsType = commentator.graphicsType
    }
    const copyCommentator = copyRunnerData(commentator)
    runnerGroup.commentators.push(copyCommentator)
  })
  return runnerGroup
}

export const copyRunnerData = (runner: RunnerData): RunnerData => {
  const copyRunner: RunnerData = {
    group: runner.group,
    name: runner.name,
    commentator: runner.commentator,
    icon: runner.icon,
    title: runner.title,
    platform: runner.platform,
    category: runner.category,
    estimatedTime: runner.estimatedTime,
    graphicsType: runner.graphicsType,
  }
  return copyRunner
}

export const copyAssistContent = (assistContent: AssistContent): AssistContent => {
  const copyAssistContent: AssistContent = {
    group: assistContent.group,
    header: assistContent.header,
    content: assistContent.content,
    url: assistContent.url,
  }
  return copyAssistContent
}

export const copyLogoImg = (logoImg: LogoImg): LogoImg => {
  const copyLogoImg: LogoImg = {
    name: logoImg.name,
    url: logoImg.url,
  }
  return copyLogoImg
}
