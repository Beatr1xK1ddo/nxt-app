import {IProgramPidData, ITsMonitoringProgram, Optional} from "./common";

export type ITsMonitoringParams = {
    nodeId: number;
    ip: string;
    port: number;
    appType: string;
    appId: number;
};

export interface IProgramData {
    programNumber: number;
    pmtPid: number;
    pcrPid: number;
    pids: Array<IProgramPidData>;
    encrypted: boolean;
    rate: number;
    ratePercent: number;
    eitScheduleFlag: number;
    eitPresentFollowingFlag: number;
    runningStatus: number;
    runningStatusStr: string;
    freeCaMode: number;
    serviceDescriptor: {
        type: number;
        typeStr: string;
        serviceType: number;
        serviceTypeStr: string;
        providerNameLength: number;
        providerName: string;
        providerNameBytes: string;
        serviceNameLength: number;
        serviceName: string;
        serviceNameBytes: string;
    };
}

export type ITsMonitoringMappedData = {
    pmtPid: number;
    pcrPid: number;
    programNumber: number;
    rate: number;
    ratePercent: number;
    serviceName: string;
    providerName: string;
    children: Array<ITsMonitoringMappedPid>;
};

export type ITsMonitoringMappedPid = {
    pid: number;
    streamTypeStr: string;
    rate: number;
    ratePercent: number;
    streamId: number;
};

export type IP1ErrorData = {
    syncLosses: {
        amount: number;
        timestamp: number;
        description: string;
        sinceTime: number;
    };
    syncByteErrors: {
        amount: number;
        timestamp: number;
        description: "";
        syncByte: number;
    };
    patErrors: {
        amount: number;
        timestamp: number;
        description: string;
        type: string;
        notDetectedFor: number;
        tableId: number;
        tableIdStr: string;
        scramblingControl: number;
    };
    ccErrors: {
        amount: number;
        timestamp: number;
        description: string;
        pid: number;
        expectedCc: number;
        foundCc: number;
    };
    pmtErrors: {
        amount: number;
        timestamp: number;
        description: string;
        type: string;
        pmtPid: number;
        notDetectedFor: number;
        scramblingControl: number;
    };
    pidErrors: {
        amount: number;
        timestamp: number;
        description: string;
        pid: number;
        programNumber: number;
        pidType: number;
        pidTypeStr: string;
        notDetectedFor: number;
    };
};

export type IP2ErrorData = {
    transportErrors: {
        amount: number;
        timestamp: number;
        description: string;
        pid: number;
    };
    crcErrors: {
        amount: number;
        timestamp: number;
        description: string;
        pid: number;
        tableId: number;
        tableIdStr: string;
    };
    pcrRepetitionErrors: {
        amount: number;
        timestamp: number;
        description: string;
        pid: number;
        pcrDiff: number;
    };
    pcrDiscontinuityErrors: {
        amount: number;
        timestamp: number;
        description: string;
        pid: number;
        pcrDiff: number;
    };
    catErrors: {
        amount: number;
        timestamp: number;
        description: string;
        type: string;
        tableId: number;
        tableIdStr: string;
    };
};

export type ITsMonitoringStats = {
    time: number;
    mediaRcvedPackets: number;
    mediaRcvedBytes: number;
    mediaInfo: {
        lastRcvedFrom: string;
    };
    mediaStats: {
        syncLosses: {
            amount: number;
            timestamp: number;
            description: string;
            sinceTime: number;
        };
        otherErrors: {
            amount: number;
            timestamp: number;
            description: string;
        };
    };
    tsSynced: boolean;
    tsInfo: {
        transportStreamId: number;
        nitPid: number;
        originalNetworkId: number;
    };
    tsTotalRate: number;
    tsDataRate: number;
    tsDataRatePercent: number;
    p1Stats: IP1ErrorData;
    p2Stats: IP2ErrorData;
    programsSeqNo: number;
    programsStatsSeqNo: number;
    tablesSeqNo: number;
};

export type IP1ErrorMapped = {
    syncLosses: ITableErrorState;
    syncByteErrors: ITableErrorState;
    patErrors: ITableErrorState;
    // patErrorNotDetectedFor: ITableErrorState;
    // patErrorScramblingControl: ITableErrorState;
    ccErrors: ITableErrorState;
    // ccErrorRequiredCc: ITableErrorState;
    // ccErrorFoundCc: ITableErrorState;
    pmtErrors: ITableErrorState;
    // pmtErrorNotDetectedFor: ITableErrorState;
    // pmtErrorScramblingControl: ITableErrorState;
    pidErrors: ITableErrorState;
    // pidErrorProgramNumber: ITableErrorState;
    // pidErrorPidType: ITableErrorState;
    // pidErrorNotDetectedFor: ITableErrorState;
};

export type IP2ErrorMapped = {
    transportErrors: ITableErrorState;
    crcErrors: ITableErrorState;
    pcrRepetitionErrors: ITableErrorState;
    // pcrRepetitionErrorPcrDiff: ITableErrorState;
    pcrDiscontinuityErrors: ITableErrorState;
    // pcrDiscontinuityErrorPcrDiff: ITableErrorState;
    catErrors: ITableErrorState;
};

export type ITableErrorState = {
    time: number;
    name: string;
    errors: number;
    error: boolean;
    description: string;
};

export interface ITsMonitoringSubscribedPayload {
    program: Optional<ITsMonitoringProgram>;
    stats: Optional<ITsMonitoringStats>;
}

export type ITsMonitoringDataPayload = ITsMonitoringProgram | ITsMonitoringStats;

export interface IMonitoringOptions {
    size?: {
        width?: number;
        height?: number;
    };
    margin?: {
        top?: number;
        left?: number;
        right?: number;
        bottom?: number;
    };
    showMuxrate?: {
        area?: boolean;
        line?: boolean;
    };
    showBitrate?: {
        area?: boolean;
        line?: boolean;
    };
    showStatistic?: boolean;
    ticks?: {
        x?: {
            format?: string;
            time?: number;
        };
    };
}
