export * from './card/types';

export enum EStatusTypes {
    active = 'active',
    error = 'error',
    stopped = 'stopped',
    cloned = 'cloned',
    new = 'new',
}

export enum ETimecodeType {
    empty = 'empty',
    notempty = 'notempty',
    rp188 = 'rp188',
    vitc = 'vitc',
}
