import styled from "@emotion/styled";
import {FC, useCallback, useEffect, useState} from "react";
import {useAppLogs} from "@nxt-ui/cp/hooks";
import {ILogRecordState, Optional} from "@nxt-ui/cp/types";
import {TabPanel} from "@nxt-ui/cp/components";
import {LogContainer} from "../../logContainer";
type ITsMonitoringLogs = {
    nodeId: Optional<number>;
    appType: Optional<string>;
    appId: Optional<number>;
};

const TsLogContainer = styled(LogContainer)`
    & .log-search-form {
        background: #fff;
    }
`;

export const MonitoringLogs: FC<ITsMonitoringLogs> = ({nodeId, appType, appId}) => {
    const [search, setSearch] = useState<string>("");
    const [subscribedLogType, setSubscribedLogType] = useState<Array<string>>([]);
    const [logsArray, setLogsArray] = useState<Array<ILogRecordState>>([]);
    const {logs, logsTypes, subscribe, subscribed, unsubscribe} = useAppLogs(nodeId, appType, appId, subscribedLogType);

    useEffect(() => {
        const values = logs.get(subscribedLogType[0]);
        if (values) {
            setLogsArray(values);
        }
    }, [logs, subscribedLogType]);

    useEffect(() => {
        if (!subscribedLogType.length && logsTypes.length) {
            setSubscribedLogType([logsTypes[0].value]);
        }
    }, [subscribedLogType, logsTypes]);

    const toggleSubscribeHandler = useCallback(() => {
        if (!subscribed) {
            subscribe();
        } else {
            unsubscribe();
        }
    }, [subscribe, subscribed, unsubscribe]);

    return (
        <div className="logger-container" onClick={toggleSubscribeHandler}>
            <TsLogContainer hiddenSearch={!logsArray.length} value={search} subscribed={subscribed}>
                {logsArray.map((log) => (
                    <TabPanel key={log.id} value={subscribedLogType[0]} index={subscribedLogType[0]}>
                        <em className="log-time">{log.created}</em>
                        <strong>{log.message}</strong>
                    </TabPanel>
                ))}
            </TsLogContainer>
        </div>
    );
};
