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

export interface ITsMonitoringData {
    seqNo: number;
    statsSeqNo: number;
    time: number;
    programs: {
        programs: [
            {
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
        ];
    };
}
