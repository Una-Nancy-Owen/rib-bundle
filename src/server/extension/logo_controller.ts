import { GoogleSheetsRAWJson } from 'rib-bundle'
import { NodeCG } from '../server'
import { getSheetDataByTitleAsync } from './google_sheets_loader'
import { rawJsonToLogoArray } from './json_utility'
import { copyLogoImg } from './copy_util'

export const logoController = (nodecg: NodeCG) => {
  const logoRep = nodecg.Replicant('logo')
  const logoArrayRep = nodecg.Replicant('logoArray')
  const logoIndexRep = nodecg.Replicant('logoIndex', { defaultValue: 0 })

  nodecg.listenFor('importLogo', async (sheetsKey) => {
    getSheetDataByTitleAsync(sheetsKey, 'Logo').then((result) => {
      if (result.complete) {
        rawJsonToLogoArray(result.body as GoogleSheetsRAWJson).then((data) => {
          if (0 < data.length) {
            logoArrayRep.value = data
            logoIndexRep.value = 0
            logoRep.value = copyLogoImg(data[0])
          }
        })
      }
    })
  })

  nodecg.listenFor('setCurrentLogoIndex', (value) => {
    if (logoArrayRep.value != null) {
      if (value < logoArrayRep.value.length) {
        logoIndexRep.value = value
        logoRep.value = copyLogoImg(logoArrayRep.value[value])
      }
    }
  })
}
