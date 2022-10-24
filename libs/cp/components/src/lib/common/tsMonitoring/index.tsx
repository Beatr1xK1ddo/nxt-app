import {MonitoringTable} from "./tsTable";
import {TsMonitoringTree} from "./tsTree";
import styled from "@emotion/styled";
// import {useLocation} from "react-router-dom";
import {FC} from "react";
// import {ITsMonitoringParams} from "@nxt-ui/cp/types";
import "./index.css";
import {MonitoringLogs} from "./tsLogs";
import {useRealtimeMonitoring, useRealtimeTsMonitoring} from "@nxt-ui/cp/hooks";
import {BitrateMonitoring} from "@nxt-ui/cp/components";
import {BasicApplication, IDestination, Optional} from "@nxt-ui/cp/types";

const TsMonitoringContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

// type IEntries = [key: keyof ITsMonitoringParams, value: string];

type ITsMonitoringProps = {
    app: BasicApplication;
    destination: IDestination;
    nodeId: Optional<number>;
};

export const TsMonitoring: FC<ITsMonitoringProps> = ({app, destination, nodeId}) => {
    const {id: appId} = app;
    const {outputIp: ip, outputPort: port} = destination;
    // const {search} = useLocation();

    // const params = useMemo(() => {
    //     const result = {} as Partial<ITsMonitoringParams>;
    //     const params = new URLSearchParams(search).entries();
    //     for (const entry of params) {
    //         const [key, value] = entry as IEntries;
    //         if (key === "port" || key === "nodeId" || key === "appId") {
    //             const res = parseInt(value);
    //             if (!isNaN(res)) {
    //                 result[key] = parseInt(value);
    //             }
    //         } else {
    //             result[key] = value;
    //         }
    //     }
    //     return result;
    // }, [search]);

    const {programs, p1Errors, p2Errors} = useRealtimeTsMonitoring(nodeId, ip, port);
    const {monitoring: monitoringData} = useRealtimeMonitoring(nodeId, ip, port);
    return (
        <div className="ts-monitor-wrap">
            <h1>Monitoring</h1>
            <TsMonitoringContainer>
                <TsMonitoringTree programs={programs} />
                <div className="ts-monitor-right">
                    <MonitoringTable header="PRIORITY 1" values={p1Errors} />
                    <MonitoringTable header="PRIORITY 2" values={p2Errors} />
                    <div className="ts-monitoring-footer">
                        <div>
                            <p>CHART</p>
                            {monitoringData && (
                                <BitrateMonitoring data={monitoringData} options={{size: {width: 600, height: 450}}} />
                            )}
                        </div>
                        <MonitoringLogs nodeId={nodeId} appType={app.type} appId={appId} />
                    </div>
                </div>
            </TsMonitoringContainer>
        </div>
    );
};
