import styled from "@emotion/styled";
import {
    ChangeEventHandler,
    createContext,
    CSSProperties,
    FC,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import {useAppLogs} from "@nxt-ui/cp/hooks";
import {ILogRecordState, Optional} from "@nxt-ui/cp/types";
import {TabPanel} from "@nxt-ui/cp/components";
import {LogContainer} from "../../logContainer";
import {VariableSizeList as List} from "react-window";

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

type IVirtuqlizedContext = {
    setSize(index: number, size: number): void;
};

const VirtualizationContext = createContext<IVirtuqlizedContext>({} as IVirtuqlizedContext);

type IVirtualizedTabHolderProps = {
    log: ILogRecordState;
    active: string;
    index: number;
};

const VirtualizedTabHolder: FC<IVirtualizedTabHolderProps> = ({log, active, index}) => {
    const {setSize} = useContext(VirtualizationContext);
    const root = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (root.current) {
            setSize(index, root.current.getBoundingClientRect().height);
        }
    }, [root, setSize, index]);

    return (
        <div ref={root}>
            <TabPanel value={active} index={active}>
                <em className="log-time">{log.created}</em>
                <strong>{log.message}</strong>
            </TabPanel>
        </div>
    );
};

export const MonitoringLogs: FC<ITsMonitoringLogs> = ({nodeId, appType, appId}) => {
    const [search, setSearch] = useState<string>("");
    const [subscribedLogType, setSubscribedLogType] = useState<Array<string>>([]);
    const [filteredLogs, setFilteredLogs] = useState<Array<ILogRecordState>>([]);
    const [logsArray, setLogsArray] = useState<Array<ILogRecordState>>([]);
    const {logs, logsTypes, subscribe, subscribed, unsubscribe, globalStatus, programmStop} = useAppLogs(
        nodeId,
        appType,
        appId,
        subscribedLogType,
        false
    );

    const listRef = useRef<List>(null);

    const sizeMap = useRef<{[key: string]: number}>({});

    const getSize = useCallback((index) => sizeMap.current[index] || 45, [sizeMap]);

    const scrollBottom = useCallback(() => {
        listRef.current?.scrollToItem(filteredLogs.length, "end");
    }, [filteredLogs]);

    const setSize = useCallback(
        (index: number, size: number) => {
            sizeMap.current = {...sizeMap.current, [index]: size};
            listRef.current?.resetAfterIndex(0);
            if (!programmStop) {
                scrollBottom();
            }
        },
        [sizeMap, scrollBottom, programmStop]
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
            const filtered = logsArray
                .filter((log) => {
                    const message = log.message.toLocaleLowerCase();
                    const searchValue = search.toLocaleLowerCase();
                    return message.includes(searchValue);
                })
                .reverse();
            setFilteredLogs(filtered);
        } else {
            setFilteredLogs([...logsArray].reverse());
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
                <VirtualizationContext.Provider value={{setSize}}>
                    <div>
                        {filteredLogs?.length ? (
                            <List
                                className="testing-scroll"
                                style={{padding: 0}}
                                ref={listRef}
                                height={160}
                                itemCount={filteredLogs.length}
                                itemSize={getSize}
                                width={"100%"}>
                                {({index, style}: {index: number; style: CSSProperties}) => (
                                    <div style={style}>
                                        <VirtualizedTabHolder
                                            index={index}
                                            log={filteredLogs[index]}
                                            active={subscribedLogType[0]}
                                        />
                                    </div>
                                )}
                            </List>
                        ) : (
                            globalStatus
                        )}
                    </div>
                </VirtualizationContext.Provider>
            </TsLogContainer>
        </div>
    );
};
