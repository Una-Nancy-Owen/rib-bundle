import { StHorizontalGroup } from '@ui/style'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { LogoImg } from 'rib-bundle'
import { styled } from 'styled-components'

type LogoOption = {
  value: string
  label: string
}

export const LogoSelectorPanel = memo(() => {
  const [logoImg, setLogoImg] = useState<LogoImg>()
  const selectRef = useRef<HTMLSelectElement>(null)
  const [options, setOptions] = useState<LogoOption[]>()
  const selectIndex = useRef<number>(0)

  useEffect(() => {
    nodecg.Replicant('logoArray').on('change', (newValue) => {
      if (newValue != null) {
        let logoOptions: LogoOption[] = []
        for (let i = 0; i < newValue.length; i++) {
          const logoOption: LogoOption = {
            value: newValue[i].url,
            label: newValue[i].name,
          }
          logoOptions.push(logoOption)
        }
        if (0 < logoOptions.length) {
          setOptions(logoOptions)
        }
      }
    })

    nodecg.Replicant('logo').on('change', (newValue) => {
      if (newValue != null) {
        setLogoImg(newValue)
      }
    })

    nodecg.Replicant('logoIndex').on('change', (newValue) => {
      if (selectIndex.current != null) {
        selectIndex.current = newValue
      }
    })
  }, [])

  const selectHandler = useCallback(() => {
    if (selectRef.current != null) {
      const index = selectRef.current.selectedIndex
      if (selectIndex.current != null) {
        if (selectIndex.current != index) {
          nodecg.sendMessage('setCurrentLogoIndex', index)
        }
      }
    }
  }, [])

  if (options != null && logoImg != null) {
    const option = options.map((option, index) => (
      <StOption key={`options${index}`} value={option.value}>
        {option.label}
      </StOption>
    ))
    return (
      <StLogoSelector>
        <h2>大会ロゴ</h2>
        <StLogoImg src={logoImg.url} />
        <StSelect ref={selectRef} onChange={selectHandler}>
          {option}
        </StSelect>
      </StLogoSelector>
    )
  } else {
    return null
  }
})

const StLogoSelector = styled(StHorizontalGroup)`
  align-items: flex-end;
  justify-content: space-between;
  margin: 0 5px 10px;
  padding: 10px;
  background-color: rgb(221 94 94);
  border-radius: 4px;
  @media only screen and (max-width: 500px) {
    flex-direction: column;
  }
  & > h2 {
    padding-left: 20px;
    font-size: 1.1rem;
    font-weight: 700;
    align-self: flex-start;
  }
`

const StLogoImg = styled.img`
  width: 350px;
  max-height: 120px;
  object-fit: contain;
`

const StSelect = styled.select`
  color: #333;
  padding: 5px;
  border-radius: 4px;
  height: 38px;
  margin: 6px 10px;
`

const StOption = styled.option`
  color: #333;
  width: 80%;
`
