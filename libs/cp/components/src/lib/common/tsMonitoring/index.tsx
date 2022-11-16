import {MonitoringTable} from "./tsTable";
import {TsMonitoringTree} from "./tsTree";
import styled from "@emotion/styled";
import {FC} from "react";
import {MonitoringLogs} from "./tsLogs";
import {useRealtimeMonitoring, useRealtimeTsMonitoring} from "@nxt-ui/cp/hooks";
import {BitrateMonitoring} from "@nxt-ui/cp/components";
import {BasicApplication, IDestination, Optional} from "@nxt-ui/cp/types";

const TsMonitoringContainer = styled.div`
    height: 100%;
    max-height: 320px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    @media (max-width: 780px) {
        display: block;
        height: auto;
        max-height: inherit;
        .ts-monitoring-tree {
            width: 100%;
            padding: 0;
            margin: 0 0 15px;
        }
    }
`;
const TsMonitoringWrap = styled.div`
    border-radius: 10px;
    padding: 10px;
    margin: auto;
    width: 90%;
    height: 90%;
    max-width: 1200px;
    background-color: var(--white);
    overflow: auto;
    .chart-holder {
        width: 37%;
        box-sizing: border-box;
        padding: 0 15px 0 0;
    }
    .ts-monitoring-tree {
        flex-shrink: 0;
        flex-grow: 1;
        width: 37%;
        max-height: 320px;
        padding: 0 15px 0 0;
        box-sizing: border-box;
        overflow: auto;
    }
    .ts-monitor-right {
        width: 100%;
        max-width: 800px;
        height: 100%;
        max-height: 400px;
        overflow: auto;
    }
`;

const TsMonitoringFooter = styled.div`
    display: flex;
    justify-content: space-between;
    height: 100%;
    max-height: 305px;
    overflow: hidden;
    box-sizing: border-box;
    padding: 10px 0 0 0;
    @media (max-width: 940px) {
    }
    > div:nth-child(2) {
        width: 63%;
        overflow-y: auto;
    }
    @media (max-width: 780px) {
        max-height: inherit;
        display: block;
        height: auto;
        > div:nth-child(2) {
            width: 100%;
        }
        .chart-holder {
            width: 100%;
            padding: 0;
            margin: 0 0 15px;
        }
    }
`;

type ITsMonitoringProps = {
    app: BasicApplication;
    destination: IDestination;
    nodeId: Optional<number>;
};

export const TsMonitoring: FC<ITsMonitoringProps> = ({app, destination, nodeId}) => {
    const {id: appId} = app;
    const {outputIp: ip, outputPort: port} = destination;

    const {programs, p1Errors, p2Errors} = useRealtimeTsMonitoring(nodeId, ip, port);
    const {monitoring: monitoringData} = useRealtimeMonitoring(nodeId, ip, port, false);
    return (
        <TsMonitoringWrap className="ts-monitor-wrap">
            <h1>Monitoring</h1>
            <TsMonitoringContainer>
                <TsMonitoringTree programs={programs} />
                <div className="ts-monitor-right">
                    <MonitoringTable header={<h2>PRIORITY 1</h2>} values={p1Errors} />
                    <MonitoringTable header={<h2>PRIORITY 2</h2>} values={p2Errors} />
                </div>
            </TsMonitoringContainer>
            <TsMonitoringFooter>
                <div className="chart-holder">
                    <h2>CHART</h2>

                    {monitoringData && (
                        <BitrateMonitoring data={monitoringData} options={{size: {width: 600, height: 450}}} />
                    )}
                </div>
                <MonitoringLogs nodeId={nodeId} appType={app.type} appId={appId} />
            </TsMonitoringFooter>
        </TsMonitoringWrap>
    );
};
