import styled from "@emotion/styled";
import {ChangeEventHandler, FC, useCallback, useEffect, useState} from "react";
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
    const [filteredLogs, setFilteredLogs] = useState<Array<ILogRecordState>>([]);
    const [logsArray, setLogsArray] = useState<Array<ILogRecordState>>([]);
    const {logs, logsTypes, subscribe, subscribed, unsubscribe, globalStatus} = useAppLogs(
        nodeId,
        appType,
        appId,
        subscribedLogType
    );

    const toggleSubscribeHandler = useCallback(() => {
        if (!subscribed) {
            subscribe();
        } else {
            unsubscribe();
        }
    }, [subscribe, subscribed, unsubscribe]);

    const onSearchHandler = useCallback((e) => {
        setSearch(e.currentTarget.value);
    }, []) as ChangeEventHandler<HTMLInputElement>;

    useEffect(() => {
        if (search) {
            const filtered = logsArray.filter((log) => {
                const message = log.message.toLocaleLowerCase();
                const searchValue = search.toLocaleLowerCase();
                return message.includes(searchValue);
            });
            setFilteredLogs(filtered.reverse());
        } else {
            setFilteredLogs(logsArray.reverse());
        }
    }, [search, logsArray]);

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

    return (
        <div className="logger-container">
            <TsLogContainer
                onSubscribe={toggleSubscribeHandler}
                hiddenSearch={!logsArray.length}
                onChange={onSearchHandler}
                value={search}
                subscribed={subscribed}>
                {filteredLogs && filteredLogs.length ? (
                    filteredLogs.map((log) => (
                        <TabPanel key={log.id} value={subscribedLogType[0]} index={subscribedLogType[0]}>
                            <em className="log-time">{log.created}</em>
                            <strong>{log.message}</strong>
                        </TabPanel>
                    ))
                ) : (
                    <div>{globalStatus}</div>
                )}
            </TsLogContainer>
        </div>
    );
};
