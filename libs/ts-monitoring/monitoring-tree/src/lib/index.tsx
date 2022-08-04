import {tsP1ErrorMapper, tsP2ErrorMapper} from "@nxt-ui/ts-monitoring/utils";
import {useMemo} from "react";
import {MonitoringTable} from "./ts-table";
import {TsMonitoringTree} from "./ts-tree";
import styled from "@emotion/styled";
const valuesTable = {
    time: 1659343698,
    mediaRcvedPackets: 2945485562,
    mediaRcvedBytes: 3876258999592,
    mediaInfo: {
        lastRcvedFrom: "10.3.131.5:44384",
    },
    mediaStats: {
        syncLosses: 0,
        syncLossTime: 0,
        syncLossSinceTime: 0,
        otherErrors: 0,
        otherErrorTime: 0,
        otherErrorType: "unknown",
        otherErrorSysError: 0,
        otherErrorRequiredIp: "0.0.0.0",
        otherErrorFoundIp: "0.0.0.0",
        otherErrorRequiredPort: 0,
        otherErrorFoundPort: 0,
        otherErrorPacketLength: 0,
    },
    tsSynced: true,
    tsInfo: {
        transportStreamId: 1,
        nitPid: -1,
        originalNetworkId: 65281,
    },
    tsTotalRate: 14998890,
    tsDataRate: 7390656,
    tsDataRatePercent: 49.274686,
    p1Stats: {
        syncLosses: 17,
        syncLossTime: 1658550675,
        syncLossSinceTime: 1658550675,
        syncByteErrors: 0,
        syncByteErrorTime: 0,
        syncByteErrorByte: 0,
        patErrors: 0,
        patErrorTime: 0,
        patErrorType: "notDetected",
        patErrorNotDetectedFor: 0,
        patErrorTableId: 0,
        patErrorTableIdStr: "PAT Section",
        patErrorScramblingControl: 0,
        ccErrors: 384,
        ccErrorTime: 1659217541,
        ccErrorPid: 300,
        ccErrorRequiredCc: 6,
        ccErrorFoundCc: 9,
        pmtErrors: 0,
        pmtErrorTime: 0,
        pmtErrorType: "notDetected",
        pmtErrorPmtPid: 0,
        pmtErrorNotDetectedFor: 0,
        pmtErrorScramblingControl: 0,
        pidErrors: 0,
        pidErrorTime: 0,
        pidErrorPid: 0,
        pidErrorProgramNumber: 0,
        pidErrorPidType: 0,
        pidErrorPidTypeStr: "Reserved",
        pidErrorNotDetectedFor: 0,
    },
    p2Stats: {
        transportErrors: 0,
        transportErrorTime: 0,
        transportErrorPid: 0,
        crcErrors: 0,
        crcErrorTime: 0,
        crcErrorPid: 0,
        crcErrorTableId: 0,
        crcErrorTableIdStr: "PAT Section",
        pcrRepetitionErrors: 2781,
        pcrRepetitionErrorTime: 1659315307,
        pcrRepetitionErrorPid: 300,
        pcrRepetitionErrorPcrDiff: 56122000,
        pcrDiscontinuityErrors: 10,
        pcrDiscontinuityErrorTime: 1658770796,
        pcrDiscontinuityErrorPid: 300,
        pcrDiscontinuityErrorPcrDiff: 127940296,
        catErrors: 0,
        catErrorTime: 0,
        catErrorType: "notDetected",
        catErrorTableId: 0,
        catErrorTableIdStr: "PAT Section",
    },
    programsSeqNo: 1,
    programsStatsSeqNo: 2067449,
    tablesSeqNo: 1,
};

const TsMonitoringContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

export const TsMonitoring = () => {
    const mappedData1 = useMemo(() => {
        return tsP1ErrorMapper(valuesTable);
    }, []);

    const mappedData2 = useMemo(() => {
        return tsP2ErrorMapper(valuesTable);
    }, []);

    return (
        <TsMonitoringContainer>
            <TsMonitoringTree />
            <MonitoringTable header="PRIORITY 1" values={mappedData1} />
            <MonitoringTable header="PRIORITY 2" values={mappedData2} />
        </TsMonitoringContainer>
    );
};
