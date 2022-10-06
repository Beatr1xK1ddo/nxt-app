import {MonitoringTable} from "./tsTable";
import {TsMonitoringTree} from "./tsTree";
import styled from "@emotion/styled";
import {useRealtimeTsMonitoring} from "@nxt-ui/cp/hooks";

const TsMonitoringContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

export const TsMonitoring = () => {
    const nodeId = 2753;
    const ip = "238.10.234.22";
    const port = 1234;

    const {programs, p1Errors, p2Errors} = useRealtimeTsMonitoring(nodeId, ip, port);

    return (
        <TsMonitoringContainer>
            <TsMonitoringTree programs={programs} />
            <MonitoringTable header="PRIORITY 1" values={p1Errors} />
            <MonitoringTable header="PRIORITY 2" values={p2Errors} />
        </TsMonitoringContainer>
    );
};
