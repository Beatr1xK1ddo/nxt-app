import {MonitoringTable} from "./tsTable";
import {TsMonitoringTree} from "./tsTree";
import styled from "@emotion/styled";
import {useRealtimeTsMonitoring} from "@nxt-ui/cp/hooks";
import {useLocation} from "react-router-dom";
import {useMemo} from "react";
import {ITsMonitoringParams} from "@nxt-ui/cp/types";
import "./index.css";
import {MonitoringLogs} from "./tsLogs";

const TsMonitoringContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

type IEntries = [key: keyof ITsMonitoringParams, value: string];

export const TsMonitoring = () => {
    const {search} = useLocation();

    const params = useMemo(() => {
        const result = {} as Partial<ITsMonitoringParams>;
        const params = new URLSearchParams(search).entries();
        for (const entry of params) {
            const [key, value] = entry as IEntries;
            if (key === "port" || key === "nodeId" || key === "appId") {
                const res = parseInt(value);
                if (!isNaN(res)) {
                    result[key] = parseInt(value);
                }
            } else {
                result[key] = value;
            }
        }
        return result;
    }, [search]);

    const {programs, p1Errors, p2Errors} = useRealtimeTsMonitoring(params?.nodeId, params?.ip, params?.port);

    return (
        <>
            <h1>Monitoring</h1>
            <TsMonitoringContainer>
                <TsMonitoringTree programs={programs} />
                <div className="ts-monitor-right">
                    <MonitoringTable header="PRIORITY 1" values={p1Errors} />
                    <MonitoringTable header="PRIORITY 2" values={p2Errors} />
                    <div className="ts-monitoring-footer">
                        <div>CHART</div>
                        <MonitoringLogs
                            nodeId={params?.nodeId ?? null}
                            appType={params?.appType ?? null}
                            appId={params?.appId ?? null}
                        />
                    </div>
                </div>
            </TsMonitoringContainer>
        </>
    );
};
