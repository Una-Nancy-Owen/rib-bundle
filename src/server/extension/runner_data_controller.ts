import { getSheetDataByGIDAsync, getSheetDataByTitleAsync } from './google_sheets_loader'
import { NodeCG } from '../server'
import { LoadCSVFile } from './csv_file_loader'
import { rawJsonToRunnerDataArray, runnerDataArrayToRunnersGroupArray } from './json_utility'
import { GoogleSheetsRAWJson } from 'rib-bundle'

export const runnerDataController = (nodecg: NodeCG) => {
  const runnerGroupArrayRep = nodecg.Replicant('runnerGroupArray')
  const currentRunnerGroupRep = nodecg.Replicant('currentRunnerGroup')
  const currentGroupIndexRep = nodecg.Replicant('groupIndex')
  const nextRunnerGroupRep = nodecg.Replicant('nextRunnerGroup')
  const nextGroupIndexRep = nodecg.Replicant('nextGroupIndex')

  const setCurrentRunnerGroupIndex = (index: number) => {
    if (runnerGroupArrayRep.value != null) {
      if (index < runnerGroupArrayRep.value.length) {
        currentGroupIndexRep.value = index
        currentRunnerGroupRep.value = JSON.parse(JSON.stringify(runnerGroupArrayRep.value[index]))
      }
      if (index + 1 < runnerGroupArrayRep.value.length) {
        nextGroupIndexRep.value = index + 1
        nextRunnerGroupRep.value = JSON.parse(JSON.stringify(runnerGroupArrayRep.value[index + 1]))
      } else {
        nextGroupIndexRep.value = index + 1
        nextRunnerGroupRep.value = undefined
      }
    }
  }

  nodecg.listenFor('importRunnerGroupArray', async (sheetsKey) => {
    getSheetDataByTitleAsync(sheetsKey, 'Runner').then((result) => {
      rawJsonToRunnerDataArray(result.body as GoogleSheetsRAWJson).then((dataArray) => {
        const runnerGroupArray = runnerDataArrayToRunnersGroupArray(dataArray)
        if (runnerGroupArray != null) {
          if (0 < runnerGroupArray.length) {
            runnerGroupArrayRep.value = runnerGroupArray
            currentRunnerGroupRep.value = JSON.parse(JSON.stringify(runnerGroupArray[0]))
            currentGroupIndexRep.value = 0
            if (1 < runnerGroupArray.length) {
              nextGroupIndexRep.value = 1
              nextRunnerGroupRep.value = JSON.parse(JSON.stringify(runnerGroupArray[1]))
            } else {
              nextGroupIndexRep.value = 0
            }
            nodecg.log.info('runnerGroupArray replicant is changed')
          } else {
            nodecg.log.info(`Unable to read valid data from Google Sheets`)
          }
        }
      })
    })
  })

  nodecg.listenFor('loadCSVData', async () => {
    const dataArray = await LoadCSVFile().catch((e) => {
      nodecg.log.error(`Failed to load CSV file\n${e}`)
      return null
    })
    if (dataArray != null) {
      nodecg.log.info('CSV file loading is completed')
      const runnerGroupArray = runnerDataArrayToRunnersGroupArray(dataArray)
      if (0 < runnerGroupArray.length) {
        runnerGroupArrayRep.value = runnerGroupArray
        currentRunnerGroupRep.value = JSON.parse(JSON.stringify(runnerGroupArray[0]))
        currentGroupIndexRep.value = 0
        if (1 < runnerGroupArray.length) {
          nextGroupIndexRep.value = 1
          nextRunnerGroupRep.value = JSON.parse(JSON.stringify(runnerGroupArray[1]))
        } else {
          nextGroupIndexRep.value = 0
        }
        nodecg.log.info('runnerGroupArray replicant is changed')
      } else {
        nodecg.log.info(`Unable to read valid data from CSV file`)
      }
    }
  })

  nodecg.listenFor('setNextRunnerGroupIndex', (index) => {
    if (runnerGroupArrayRep.value != null) {
      nextGroupIndexRep.value = index
      nextRunnerGroupRep.value = JSON.parse(JSON.stringify(runnerGroupArrayRep.value[index]))
    }
  })

  nodecg.listenFor('setCurrentRunnerGroupIndex', (index) => {
    setCurrentRunnerGroupIndex(index)
  })
}
