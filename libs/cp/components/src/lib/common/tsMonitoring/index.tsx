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
    .MuiTreeItem-label {
        font: var(--font);
    }
    .log-search-form {
        padding: 0 0 5px;
        background: none;
    }
    .monitoring-holder {
        border-radius: 10px;
        padding: 10px;
        margin: auto;
        width: 97%;
        height: auto;
        max-width: 1280px;
        max-height: 95%;
        background-color: var(--white);
        overflow: auto;
        box-sizing: border-box;
        position: relative;

        > button {
            position: absolute;
            right: 6px;
            top: 6px;
            padding: 0;
            color: var(--blacked);
            width: 24px;
            height: 24px;
        }
    }
    .monitoring-column-holder {
        overflow: hidden;
        height: calc(100% - 30px);
        display: grid;
        grid-template-columns: 336px 1fr;
        grid-template-rows: 1fr 255px;
        gap: 5px 2px;
        grid-auto-flow: row;
        grid-template-areas:
            "ts-monitoring-tree ts-monitor-right"
            "chart-holder ts-monitor-logs";
        @media (max-width: 768px) {
            display: block;
            width: 100%;
            overflow: auto;
            > div {
                display: block;
                width: 100%;
                height: auto;
            }
        }
        .ts-monitoring-tree {
            overflow: auto;
            max-height: 355px;
            grid-area: ts-monitoring-tree;
        }

        .ts-monitor-right {
            grid-area: ts-monitor-right;
            overflow: auto;
            .MuiPaper-root {
                padding-bottom: 3px;
            }
            h2 {
                margin: 0;
            }
        }

        .chart-holder {
            grid-area: chart-holder;
            box-sizing: border-box;
            padding: 10px 0 0;
            height: 100%;
            overflow: auto;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            .bitrateMonitoringStatistics {
                padding: 0;
            }
            @media (max-width: 768px) {
                margin: 0 0 8px;
            }
            .plot {
                overflow: hidden;
            }
        }

        .ts-monitor-logs {
            grid-area: ts-monitor-logs;
            overflow: hidden;
            height: 255px;
            .logger-container {
                overflow: auto;
                max-height: 255px;
            }
            .log-list > div {
                padding: 4px 0;
            }
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
                <h1>
                    {ip}:{port}
                </h1>
                <Button data-type="btn-icon" onClick={closeMonitoringWrap}>
                    <Icon name="clear" />
                </Button>
                <section className="monitoring-column-holder">
                    <TsMonitoringTree programs={programs} />
                    <div className="ts-monitor-right">
                        <MonitoringTable header={<h2>PRIORITY 1</h2>} values={p1Errors} />
                        <MonitoringTable header={<h2>PRIORITY 2</h2>} values={p2Errors} />
                    </div>
                    <div className="chart-holder">
                        <h2>CHART</h2>
                        {monitoringData && (
                            <BitrateMonitoring data={monitoringData} options={{size: {width: 600, height: 283}}} />
                        )}
                    </div>
                    <div className="ts-monitor-logs">
                        <MonitoringLogs nodeId={nodeId} appType={app.type} appId={appId} />
                    </div>
                </section>
            </div>
        </TsMonitoringWrap>
    );
};
