export enum EStatusTypes {
    active = 'active',
    error = 'error',
    stopped = 'stopped',
}

export type IStatusProps = {
    status: EStatusTypes;
};
