import {
    IP1ErrorMapped,
    IP2ErrorMapped,
    ITsMonitoringMappedData,
    ITsMonitoringProgram,
    ITsMonitoringStats,
    Optional,
} from "@nxt-ui/cp/types";
import * as d3 from "d3";

export const tsMonitoringMapper = (data: Optional<ITsMonitoringProgram>): Optional<Array<ITsMonitoringMappedData>> => {
    const result = data?.programs.programs.map((value) => {
        const children = value.pids.map((item) => ({
            pid: item.pid,
            streamTypeStr: item.streamTypeStr,
            rate: item.rate,
            ratePercent: item.ratePercent,
            streamId: item.streamId,
        }));
        return {
            pmtPid: value.pmtPid,
            pcrPid: value.pcrPid,
            programNumber: value.programNumber,
            rate: value.rate,
            ratePercent: value.ratePercent,
            serviceName: value.serviceDescriptor.serviceName,
            providerName: value.serviceDescriptor.providerName,
            children,
        };
    });
    return result || null;
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

export const tsP1ErrorMapper = (data: Optional<ITsMonitoringStats>): Optional<IP1ErrorMapped> => {
    if (data) {
        const {p1Stats} = data;
        const result = {
            syncLosses: {
                time: p1Stats.syncLosses.timestamp,
                name: "syncLosses",
                errors: p1Stats.syncLosses.amount,
                error: Boolean(p1Stats.syncLosses.amount),
                description: p1Stats.syncLosses.description,
            },
            syncByteErrors: {
                time: p1Stats.syncByteErrors.timestamp,
                name: "syncByteErrors",
                errors: p1Stats.syncByteErrors.amount,
                error: Boolean(p1Stats.syncByteErrors.amount),
                description: p1Stats.syncByteErrors.description,
            },
            patErrors: {
                time: p1Stats.patErrors.timestamp,
                name: "patErrorTime",
                errors: p1Stats.patErrors.amount,
                error: Boolean(p1Stats.patErrors.amount),
                description: p1Stats.patErrors.description,
            },
            // patErrorNotDetectedFor: {
            //     time: commonTime,
            //     name: "patErrorNotDetectedFor",
            //     errors: p1Stats.patErrorNotDetectedFor.amount,
            //     error: Boolean(p1Stats.patErrorNotDetectedFor.amount),
            // },
            ccErrors: {
                time: p1Stats.ccErrors.timestamp,
                name: "ccErrors",
                errors: p1Stats.ccErrors.amount,
                error: Boolean(p1Stats.ccErrors.amount),
                description: p1Stats.ccErrors.description,
            },
            // ccErrorRequiredCc: {
            //     time: commonTime,
            //     name: "ccErrorRequiredCc",
            //     errors: p1Stats.ccErrorRequiredCc,
            //     error: Boolean(p1Stats.ccErrorRequiredCc),
            // },
            // ccErrorFoundCc: {
            //     time: commonTime,
            //     name: "ccErrorFoundCc",
            //     errors: p1Stats.ccErrorFoundCc,
            //     error: Boolean(p1Stats.ccErrorFoundCc),
            // },
            pmtErrors: {
                time: p1Stats.pmtErrors.timestamp,
                name: "pmtErrors",
                errors: p1Stats.pmtErrors.amount,
                error: Boolean(p1Stats.pmtErrors.amount),
                description: p1Stats.pmtErrors.description,
            },
            // pmtErrorNotDetectedFor: {
            //     time: commonTime,
            //     name: "pmtErrorNotDetectedFor",
            //     errors: p1Stats.pmtErrorNotDetectedFor,
            //     error: Boolean(p1Stats.pmtErrorNotDetectedFor),
            // },
            // pmtErrorScramblingControl: {
            //     time: commonTime,
            //     name: "pmtErrorScramblingControl",
            //     errors: p1Stats.pmtErrorScramblingControl,
            //     error: Boolean(p1Stats.pmtErrorScramblingControl),
            // },
            pidErrors: {
                time: p1Stats.pidErrors.timestamp,
                name: "pidErrors",
                errors: p1Stats.pidErrors.amount,
                error: Boolean(p1Stats.pidErrors.amount),
                description: p1Stats.pidErrors.description,
            },
            // pidErrorProgramNumber: {
            //     time: commonTime,
            //     name: "pidErrorProgramNumber",
            //     errors: p1Stats.pidErrorProgramNumber,
            //     error: Boolean(p1Stats.pidErrorProgramNumber),
            // },
            // pidErrorPidType: {
            //     time: commonTime,
            //     name: "pidErrorPidType",
            //     errors: p1Stats.pidErrorPidType,
            //     error: Boolean(p1Stats.pidErrorPidType),
            // },
            // pidErrorNotDetectedFor: {
            //     time: commonTime,
            //     name: "pidErrorNotDetectedFor",
            //     errors: p1Stats.pidErrorNotDetectedFor,
            //     error: Boolean(p1Stats.pidErrorNotDetectedFor),
            // },
        };
        return result;
    } else {
        return null;
    }
};

export const tsP2ErrorMapper = (data: Optional<ITsMonitoringStats>): Optional<IP2ErrorMapped> => {
    if (data) {
        const {p2Stats} = data;
        const result = {
            transportErrors: {
                time: p2Stats.transportErrors.timestamp,
                name: "transportErrorTime",
                errors: p2Stats.transportErrors.amount,
                error: Boolean(p2Stats.transportErrors.amount),
                description: p2Stats.transportErrors.description,
            },
            crcErrors: {
                time: p2Stats.crcErrors.timestamp,
                name: "crcErrors",
                errors: p2Stats.crcErrors.amount,
                error: Boolean(p2Stats.crcErrors.amount),
                description: p2Stats.crcErrors.description,
            },
            pcrRepetitionErrors: {
                time: p2Stats.pcrRepetitionErrors.timestamp,
                name: "pcrRepetitionErrors",
                errors: p2Stats.pcrRepetitionErrors.amount,
                error: Boolean(p2Stats.pcrRepetitionErrors.amount),
                description: p2Stats.pcrRepetitionErrors.description,
            },
            // pcrRepetitionErrorPcrDiff: {
            //     time: commonTime,
            //     name: "pcrRepetitionErrorPcrDiff",
            //     errors: p2Stats.pcrRepetitionErrorPcrDiff,
            //     error: Boolean(p2Stats.pcrRepetitionErrorPcrDiff),
            // },
            pcrDiscontinuityErrors: {
                time: p2Stats.pcrDiscontinuityErrors.timestamp,
                name: "pcrDiscontinuityErrors",
                errors: p2Stats.pcrDiscontinuityErrors.amount,
                error: Boolean(p2Stats.pcrDiscontinuityErrors.amount),
                description: p2Stats.pcrDiscontinuityErrors.description,
            },
            // pcrDiscontinuityErrorPcrDiff: {
            //     time: commonTime,
            //     name: "pcrDiscontinuityErrorPcrDiff",
            //     errors: p2Stats.pcrDiscontinuityErrorPcrDiff,
            //     error: Boolean(p2Stats.pcrDiscontinuityErrorPcrDiff),
            // },
            catErrors: {
                time: p2Stats.catErrors.timestamp,
                name: "catErrors",
                errors: p2Stats.catErrors.amount,
                error: Boolean(p2Stats.catErrors.amount),
                description: p2Stats.catErrors.description,
            },
        };
        return result;
    } else {
        return null;
    }
};

export const isTsStatsData = (data: any): data is ITsMonitoringStats => {
    return data && "p1Stats" in data && "p2Stats" in data;
};

export const generateEmptyMoments = (count: number, moment: number) => {
    const momentStart = moment || new Date().getTime();
    return d3
        .range(count)
        .map((_, index) => ({
            moment: momentStart - (index + 1) * 1000,
            muxrate: 0,
            bitrate: 0,
        }))
        .reverse();
};
