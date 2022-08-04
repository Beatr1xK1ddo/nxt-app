import {
    IP1ErrorMapped,
    IP2ErrorMapped,
    ITsMonitoringData,
    ITsMonitoringErrorData,
    ITsMonitoringMappedData,
} from "@nxt-ui/ts-monitoring/types";
import {Optional} from "@nxt-ui/cp/types";

export const tsMonitoringMapper = (data: Optional<ITsMonitoringData>): Optional<Array<ITsMonitoringMappedData>> => {
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

export const tsP1ErrorMapper = (data: Optional<ITsMonitoringErrorData>): Optional<IP1ErrorMapped> => {
    if (data) {
        const {time, p1Stats} = data;
        const commonTime = time * 1000;
        const result = {
            syncLosses: {
                time: p1Stats.syncLossTime ? p1Stats.syncLossTime * 1000 : commonTime,
                name: "syncLosses",
                errors: p1Stats.syncLosses,
                error: Boolean(p1Stats.syncLosses),
            },
            syncByteErrors: {
                time: p1Stats.syncByteErrorTime ? p1Stats.syncByteErrorTime * 1000 : commonTime,
                name: "syncByteErrors",
                errors: p1Stats.syncByteErrors,
                error: Boolean(p1Stats.syncByteErrors),
            },
            patErrors: {
                time: p1Stats.patErrorTime ? p1Stats.patErrorTime * 1000 : commonTime,
                name: "patErrorTime",
                errors: p1Stats.patErrors,
                error: Boolean(p1Stats.patErrors),
            },
            patErrorNotDetectedFor: {
                time: commonTime,
                name: "patErrorNotDetectedFor",
                errors: p1Stats.patErrorNotDetectedFor,
                error: Boolean(p1Stats.patErrorNotDetectedFor),
            },
            patErrorScramblingControl: {
                time: commonTime,
                name: "patErrorScramblingControl",
                errors: p1Stats.patErrorScramblingControl,
                error: Boolean(p1Stats.patErrorScramblingControl),
            },
            ccErrors: {
                time: p1Stats.ccErrorTime ? p1Stats.ccErrorTime * 1000 : commonTime,
                name: "ccErrors",
                errors: p1Stats.ccErrors,
                error: Boolean(p1Stats.ccErrors),
            },
            ccErrorRequiredCc: {
                time: commonTime,
                name: "ccErrorRequiredCc",
                errors: p1Stats.ccErrorRequiredCc,
                error: Boolean(p1Stats.ccErrorRequiredCc),
            },
            ccErrorFoundCc: {
                time: commonTime,
                name: "ccErrorFoundCc",
                errors: p1Stats.ccErrorFoundCc,
                error: Boolean(p1Stats.ccErrorFoundCc),
            },
            pmtErrors: {
                time: p1Stats.pmtErrorTime ? p1Stats.pmtErrorTime * 1000 : commonTime,
                name: "pmtErrors",
                errors: p1Stats.pmtErrors,
                error: Boolean(p1Stats.pmtErrors),
            },
            pmtErrorNotDetectedFor: {
                time: commonTime,
                name: "pmtErrorNotDetectedFor",
                errors: p1Stats.pmtErrorNotDetectedFor,
                error: Boolean(p1Stats.pmtErrorNotDetectedFor),
            },
            pmtErrorScramblingControl: {
                time: commonTime,
                name: "pmtErrorScramblingControl",
                errors: p1Stats.pmtErrorScramblingControl,
                error: Boolean(p1Stats.pmtErrorScramblingControl),
            },
            pidErrors: {
                time: p1Stats.pidErrorTime ? p1Stats.pidErrorTime * 1000 : commonTime,
                name: "pidErrors",
                errors: p1Stats.pidErrors,
                error: Boolean(p1Stats.pidErrors),
            },
            pidErrorProgramNumber: {
                time: commonTime,
                name: "pidErrorProgramNumber",
                errors: p1Stats.pidErrorProgramNumber,
                error: Boolean(p1Stats.pidErrorProgramNumber),
            },
            pidErrorPidType: {
                time: commonTime,
                name: "pidErrorPidType",
                errors: p1Stats.pidErrorPidType,
                error: Boolean(p1Stats.pidErrorPidType),
            },
            pidErrorNotDetectedFor: {
                time: commonTime,
                name: "pidErrorNotDetectedFor",
                errors: p1Stats.pidErrorNotDetectedFor,
                error: Boolean(p1Stats.pidErrorNotDetectedFor),
            },
        };
        return result;
    } else {
        return null;
    }
};

export const tsP2ErrorMapper = (data: Optional<ITsMonitoringErrorData>): Optional<IP2ErrorMapped> => {
    if (data) {
        const {time, p2Stats} = data;
        const commonTime = time * 1000;
        const result = {
            transportErrors: {
                time: p2Stats.transportErrorTime ? p2Stats.transportErrorTime * 1000 : commonTime,
                name: "transportErrorTime",
                errors: p2Stats.transportErrorTime,
                error: Boolean(p2Stats.transportErrorTime),
            },
            crcErrors: {
                time: p2Stats.crcErrorTime ? p2Stats.crcErrorTime * 1000 : commonTime,
                name: "crcErrors",
                errors: p2Stats.crcErrors,
                error: Boolean(p2Stats.crcErrors),
            },
            pcrRepetitionErrors: {
                time: p2Stats.pcrRepetitionErrorTime ? p2Stats.pcrRepetitionErrorTime * 1000 : commonTime,
                name: "pcrRepetitionErrors",
                errors: p2Stats.pcrRepetitionErrors,
                error: Boolean(p2Stats.pcrRepetitionErrors),
            },
            pcrRepetitionErrorPcrDiff: {
                time: commonTime,
                name: "pcrRepetitionErrorPcrDiff",
                errors: p2Stats.pcrRepetitionErrorPcrDiff,
                error: Boolean(p2Stats.pcrRepetitionErrorPcrDiff),
            },
            pcrDiscontinuityErrors: {
                time: p2Stats.pcrDiscontinuityErrorTime ? p2Stats.pcrDiscontinuityErrorTime * 1000 : commonTime,
                name: "pcrDiscontinuityErrors",
                errors: p2Stats.pcrDiscontinuityErrors,
                error: Boolean(p2Stats.pcrDiscontinuityErrors),
            },
            pcrDiscontinuityErrorPcrDiff: {
                time: commonTime,
                name: "pcrDiscontinuityErrorPcrDiff",
                errors: p2Stats.pcrDiscontinuityErrorPcrDiff,
                error: Boolean(p2Stats.pcrDiscontinuityErrorPcrDiff),
            },
            catErrors: {
                time: p2Stats.catErrorTime ? p2Stats.catErrorTime * 1000 : commonTime,
                name: "catErrors",
                errors: p2Stats.catErrors,
                error: Boolean(p2Stats.catErrors),
            },
        };
        return result;
    } else {
        return null;
    }
};
