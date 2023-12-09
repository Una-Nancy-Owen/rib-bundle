import { CreateNodecgInstance, CreateNodecgConstructor } from 'ts-nodecg/browser'
import { ReplicantMap } from '../nodecg/replicant'
import { MessageMap } from '../nodecg/message'
declare global {
  const nodecg: CreateNodecgInstance<'rib-bundle', undefined, ReplicantMap, MessageMap>
  const NodeCG: CreateNodecgConstructor<'rib-bundle', undefined, ReplicantMap, MessageMap>
}
