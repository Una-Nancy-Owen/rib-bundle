import { memo, useEffect, useState } from 'react'
import { styled } from 'styled-components'

export const IllustListView = memo(() => {
  const [illustsNum, setIllustsNum] = useState<number>(0)

  useEffect(() => {
    nodecg.Replicant('illust').on('change', (newValue) => {
      if (newValue != null) {
        setIllustsNum(newValue.length)
      }
    })
  }, [])
  return <StIllustsNum>支援イラスト: {illustsNum}枚</StIllustsNum>
})

const StIllustsNum = styled.ul`
  margin: 10px 0;
  font-size: 1.1rem;
  font-weight: 700;
`
