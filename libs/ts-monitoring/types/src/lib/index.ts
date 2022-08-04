export interface IProgramPidData {
    pid: number;
    streamType: number;
    streamTypeStr: string;
    pcrPid: boolean;
    ecmPid: boolean;
    caSystemIds: Array<number>; // not sure taht numbers
    streamId: number;
    streamIdStr: string;
    pcrIntervalValid: boolean;
    pcrInterval: number;
    rate: number;
    ratePercent: number;
}

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

export interface ITsMonitoringData {
    seqNo: number;
    statsSeqNo: number;
    time: number;
    programs: {
        programs: Array<IProgramData>;
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
    syncLosses: number;
    syncLossTime: number;
    syncLossSinceTime: number;
    syncByteErrors: number;
    syncByteErrorTime: number;
    syncByteErrorByte: number;
    patErrors: number;
    patErrorTime: number;
    patErrorTableId: number;
    patErrorNotDetectedFor: number;
    patErrorScramblingControl: number;
    ccErrorTime: number;
    ccErrors: number;
    ccErrorPid: number;
    ccErrorRequiredCc: number;
    ccErrorFoundCc: number;
    pmtErrors: number;
    pmtErrorTime: number;
    pmtErrorPmtPid: number;
    pmtErrorNotDetectedFor: number;
    pmtErrorScramblingControl: number;
    pidErrorTime: number;
    pidErrors: number;
    pidErrorPid: number;
    pidErrorProgramNumber: number;
    pidErrorPidType: number;
    pidErrorNotDetectedFor: number;
    patErrorType: string;
    patErrorTableIdStr: string;
    pidErrorPidTypeStr: string;
    pmtErrorType: string;
};

export type IP2ErrorData = {
    transportErrors: number;
    transportErrorTime: number;
    transportErrorPid: number;
    crcErrors: number;
    crcErrorTime: number;
    crcErrorPid: number;
    crcErrorTableId: number;
    pcrRepetitionErrors: number;
    pcrRepetitionErrorTime: number;
    pcrRepetitionErrorPid: number;
    pcrRepetitionErrorPcrDiff: number;
    pcrDiscontinuityErrors: number;
    pcrDiscontinuityErrorTime: number;
    pcrDiscontinuityErrorPid: number;
    pcrDiscontinuityErrorPcrDiff: number;
    catErrors: number;
    catErrorTime: number;
    catErrorTableId: number;
    crcErrorTableIdStr: string;
    catErrorType: string;
    catErrorTableIdStr: string;
};

export type ITsMonitoringErrorData = {
    time: number;
    mediaRcvedPackets: number;
    mediaRcvedBytes: number;
    mediaInfo: {
        lastRcvedFrom: string;
    };
    mediaStats: {
        syncLosses: number;
        syncLossTime: number;
        syncLossSinceTime: number;
        otherErrors: number;
        otherErrorTime: number;
        otherErrorSysError: number;
        otherErrorRequiredPort: number;
        otherErrorFoundPort: number;
        otherErrorPacketLength: number;
        otherErrorType: string;
        otherErrorRequiredIp: string;
        otherErrorFoundIp: string;
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
    patErrorNotDetectedFor: ITableErrorState;
    patErrorScramblingControl: ITableErrorState;
    ccErrors: ITableErrorState;
    ccErrorRequiredCc: ITableErrorState;
    ccErrorFoundCc: ITableErrorState;
    pmtErrors: ITableErrorState;
    pmtErrorNotDetectedFor: ITableErrorState;
    pmtErrorScramblingControl: ITableErrorState;
    pidErrors: ITableErrorState;
    pidErrorProgramNumber: ITableErrorState;
    pidErrorPidType: ITableErrorState;
    pidErrorNotDetectedFor: ITableErrorState;
};

export type IP2ErrorMapped = {
    transportErrors: ITableErrorState;
    crcErrors: ITableErrorState;
    pcrRepetitionErrors: ITableErrorState;
    pcrRepetitionErrorPcrDiff: ITableErrorState;
    pcrDiscontinuityErrors: ITableErrorState;
    pcrDiscontinuityErrorPcrDiff: ITableErrorState;
    catErrors: ITableErrorState;
};

export type ITableErrorState = {
    time: number;
    name: string;
    errors: number;
    error: boolean;
};
