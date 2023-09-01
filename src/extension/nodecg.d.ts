import { CreateNodecgInstance } from 'ts-nodecg/server';
import { ReplicantMap, MessageMap } from 'rib-bundle';
export type NodeCG = CreateNodecgInstance<
    'rib-bundle',
    undefined,
    ReplicantMap,
    MessageMap
>;