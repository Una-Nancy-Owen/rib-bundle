import { CreateNodecgInstance, CreateNodecgConstructor } from 'ts-nodecg/browser';
import { ReplicantMap, MessageMap } from 'rib-bundle';

declare global {
    const nodecg: CreateNodecgInstance<
        'rib-bundle',
        undefined,
        ReplicantMap,
        MessageMap
    >;
    const NodeCG: CreateNodecgConstructor<
        'rib-bundle',
        undefined,
        ReplicantMap,
        MessageMap
    >;
}