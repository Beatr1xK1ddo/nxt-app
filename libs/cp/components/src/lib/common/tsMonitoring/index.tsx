import {MonitoringTable} from "./tsTable";
import {TsMonitoringTree} from "./tsTree";
import styled from "@emotion/styled";
import {FC, forwardRef} from "react";
import {MonitoringLogs} from "./tsLogs";
import {useRealtimeMonitoring, useRealtimeTsMonitoring} from "@nxt-ui/cp/hooks";
import {BitrateMonitoring} from "@nxt-ui/cp/components";
import {BasicApplication, IDestination, Optional} from "@nxt-ui/cp/types";
import {Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";

const TsMonitoringWrap = styled.div`
    border-radius: 0.625rem;
    padding: 0.625rem;
    margin: auto;
    width: 97%;
    height: auto;
    max-width: 80rem;
    max-height: 95%;
    background-color: var(--white);
    overflow: auto;
    box-sizing: border-box;
    position: relative;
    button[data-type] {
        position: absolute;
        right: 0.375rem;
        top: 0.375rem;
        padding: 0;
        color: var(--blacked);
        width: 1.5rem;
        height: 1.5rem;
    }
    h1 {
        line-height: 1.875rem;
        margin: 0;
    }
    .ts-monitor-right .MuiAccordionDetails-root {
        padding: 0.125rem 0.25rem;
    }
    .MuiTreeItem-label {
        font: var(--font);
    }
    .log-search-form {
        padding: 0 0 0.3125rem;
        background: none;
    }
    .monitoring-holder {
    }
    .monitoring-column-holder {
        overflow: hidden;
        height: calc(100% - 1.875rem);
        display: grid;
        grid-template-columns: 21rem 1fr;
        grid-template-rows: 1fr 15.9375rem;
        gap: 0.3125rem 0.125rem;
        grid-auto-flow: row;
        grid-template-areas:
            "ts-monitoring-tree ts-monitor-right"
            "chart-holder ts-monitor-logs";
        @media (max-width: 48rem) {
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
            max-height: 22.1875rem;
            grid-area: ts-monitoring-tree;
        }

        .ts-monitor-right {
            grid-area: ts-monitor-right;
            overflow: auto;
            .MuiPaper-root {
                padding-bottom: 0.1875rem;
            }
            h2 {
                margin: 0;
            }
        }

        .chart-holder {
            grid-area: chart-holder;
            box-sizing: border-box;
            padding: 0.625rem 0 0;
            height: 100%;
            overflow: auto;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            .bitrateMonitoringStatistics {
                padding: 0;
            }
            @media (max-width: 48rem) {
                margin: 0 0 0.5rem;
            }
            .plot {
                overflow: hidden;
            }
        }

        .ts-monitor-logs {
            grid-area: ts-monitor-logs;
            overflow: hidden;
            height: 15.9375rem;
            .logger-container {
                overflow: hidden;
                max-height: 15.9375rem;
            }
            .log-list > div {
                padding: 0.25rem 0;
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

export const TsMonitoring = forwardRef<HTMLDivElement, ITsMonitoringProps>(
    ({app, closeMonitoringWrap, destination, nodeId}, ref) => {
        const {id: appId} = app;

        const {outputIp: ip, outputPort: port} = destination;

        const {programs, p1Errors, p2Errors} = useRealtimeTsMonitoring(nodeId, ip, port);

        const {monitoring: monitoringData} = useRealtimeMonitoring(nodeId, ip, port, false);

        return (
            <TsMonitoringWrap className="" ref={ref}>
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
            </TsMonitoringWrap>
        );
    }
);
