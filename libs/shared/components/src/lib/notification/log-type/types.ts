export enum ELogTypes {
    event = 'event',
    app = 'app',
    operation = 'operation',
    monitor = 'monitor',
}

export type ILogTypeProps = {
    type: ELogTypes;
};
