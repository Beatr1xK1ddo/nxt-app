import {MonitoringTable} from "./tsTable";
import {TsMonitoringTree} from "./tsTree";
import styled from "@emotion/styled";
import {FC} from "react";
import {MonitoringLogs} from "./tsLogs";
import {useRealtimeMonitoring, useRealtimeTsMonitoring} from "@nxt-ui/cp/hooks";
import {BitrateMonitoring} from "@nxt-ui/cp/components";
import {BasicApplication, IDestination, Optional} from "@nxt-ui/cp/types";
import {Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";

const TsMonitoringWrap = styled.div`
    display: flex;
    box-sizing: border-box;
    width: 100%;
    position: relative;
    h1 {
        line-height: 30px;
        margin: 0;
    }
    .ts-monitor-right .MuiAccordionDetails-root {
        padding: 2px 4px;
    }
    .monitoring-holder {
        border-radius: 10px;
        padding: 10px;
        margin: auto;
        width: 97%;
        height: 97%;
        max-width: 1920px;
        max-height: 1600px;
        background-color: var(--white);
        overflow: auto;
        box-sizing: border-box;
        > button {
            position: absolute;
            right: 20px;
            top: 8px;
            padding: 0;
            color: var(--blacked);
        }
    }
    .monitoring-column-holder {
        display: flex;
        overflow: hidden;
        height: calc(100% - 30px);
        @media (max-width: 768px) {
            display: block;
            width: 100%;
            overflow: auto;
            > div {
                display: block;
                width: 100% !important;
                height: auto !important;
                .ts-monitoring-tree,
                .ts-monitor-right {
                    height: auto;
                    overflow: hidden;
                }
            }
        }
        > div {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            height: 100%;
            > div:first-of-type {
                box-sizing: border-box;
                padding: 0 0 10px;
            }
        }
        > div:first-of-type {
            width: 34%;
        }
        > div:last-of-type {
            width: 66%;
            box-sizing: border-box;
            padding: 0 0 0 10px;
        }
        .ts-monitoring-tree {
            height: 65%;
            overflow: auto;
        }
        .chart-holder {
            box-sizing: border-box;
            padding: 10px 0 0;
            height: 35%;
            overflow: auto;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            .bitrateMonitoringStatistics {
                padding: 0;
            }
            .plot {
                overflow: hidden;
                svg {
                    height: 100%;
                }
            }
        }
        .ts-monitor-right {
            height: 65%;
            overflow: auto;
            .MuiPaper-root {
                padding-bottom: 3px;
            }
            h2 {
                margin: 0;
            }
        }
        .ts-monitor-logs {
            height: 35%;
            max-height: 400px;
            overflow: auto;
        }
    }
`;

type ITsMonitoringProps = {
    app: BasicApplication;
    destination: IDestination;
    nodeId: Optional<number>;
    closeMonitoringWrap?(): void;
};

export const TsMonitoring: FC<ITsMonitoringProps> = ({app, closeMonitoringWrap, destination, nodeId}) => {
    const {id: appId} = app;
    const {outputIp: ip, outputPort: port} = destination;

    const {programs, p1Errors, p2Errors} = useRealtimeTsMonitoring(nodeId, ip, port);
    const {monitoring: monitoringData} = useRealtimeMonitoring(nodeId, ip, port, false);

    return (
        <TsMonitoringWrap className="ts-monitor-wrap">
            <div className="monitoring-holder">
                <h1>Monitoring</h1>
                <Button data-type="btn-icon" onClick={closeMonitoringWrap}>
                    <Icon name="clear" />
                </Button>
                <section className="monitoring-column-holder">
                    <div>
                        <TsMonitoringTree programs={programs} />
                        <div className="chart-holder">
                            <h2>CHART</h2>
                            {monitoringData && (
                                <BitrateMonitoring data={monitoringData} options={{size: {width: 600, height: 450}}} />
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="ts-monitor-right">
                            <MonitoringTable header={<h2>PRIORITY 1</h2>} values={p1Errors} />
                            <MonitoringTable header={<h2>PRIORITY 2</h2>} values={p2Errors} />
                        </div>
                        <div className="ts-monitor-logs">
                            <MonitoringLogs nodeId={nodeId} appType={app.type} appId={appId} />
                        </div>
                    </div>
                </section>
            </div>
        </TsMonitoringWrap>
    );
};
