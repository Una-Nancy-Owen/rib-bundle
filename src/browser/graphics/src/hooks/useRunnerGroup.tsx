import { RunnerGroup } from 'rib-bundle'
import { useEffect, useState } from 'react'

export default function useRunnerGroup() {
  const [runnerGroup, setRunnerGroup] = useState<RunnerGroup>()
  useEffect(() => {
    nodecg.Replicant('currentRunnerGroup').on('change', (newValue) => {
      if (newValue != null) {
        setRunnerGroup({ ...newValue })
      }
    })
  }, [])
  return runnerGroup
}
