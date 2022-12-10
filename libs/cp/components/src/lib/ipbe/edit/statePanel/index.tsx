import {
    useCallback,
    useState,
    useRef,
    useEffect,
    ChangeEventHandler,
    useMemo,
    CSSProperties,
    FC,
    createContext,
    useContext,
} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {VariableSizeList as List} from "react-window";

import {Button, CircularProgressWithLabel, MenuComponent, MenuItemStyled, TooltipComponent} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {
    AppRestartButton,
    AppStatusDisplay,
    DeleteModal,
    FlexHolder,
    NxtDatePicker,
    TabElement,
    TabHolder,
    TabPanel,
    Thumbnail,
    DeleteApplication,
    LogContainer,
} from "@nxt-ui/cp/components";
import {commonActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {EApiAppType, EAppType, ILogRecordState} from "@nxt-ui/cp/types";
import {useAppLogs} from "@nxt-ui/cp/hooks";

import {ServerLoginTooltip, AppStatusButton} from "../../../common";
import NodeSystemState from "./nodeSystemState";

import "./index.css";
import AppDestinations from "./destinations";

type IVirtualizedTabHolderProps = {
    log: ILogRecordState;
    active: string;
    index: number;
};

type IVirtuqlizedContext = {
    setSize(index: number, size: number): void;
};

export const VirtualizationContext = createContext<IVirtuqlizedContext>({} as IVirtuqlizedContext);

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

export function StatePanel() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const btnRef = useRef<HTMLDivElement | null>(null);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const [filteredLogs, setFilteredLogs] = useState<Array<ILogRecordState>>([]);
    const [logsArray, setLogsArray] = useState<Array<ILogRecordState>>([]);
    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
    const [subscribedLogType, setSubscribedLogType] = useState<Array<string>>([]);
    const basicApp = useSelector(ipbeEditSelectors.selectBasicApplication);
    const destinations = useSelector(ipbeEditSelectors.main.destinations);
    const nodeId = useSelector(ipbeEditSelectors.main.node);
    const name = useSelector(ipbeEditSelectors.main.name);
    const {logs, logsTypes, unsubscribe, subscribed, subscribe, programmStop, globalStatus} = useAppLogs(
        nodeId,
        EAppType.IPBE,
        basicApp.id,
        subscribedLogType
    );
    const listRef = useRef<List>(null);

    useEffect(() => {
        const values = logs.get(subscribedLogType[0]);
        if (values) {
            setLogsArray(values);
        } else {
            setLogsArray([]);
        }
    }, [logs, subscribedLogType]);

    useEffect(() => {
        if (!subscribedLogType.length && logsTypes.length) {
            setSubscribedLogType([logsTypes[0].value]);
        }
    }, [subscribedLogType, logsTypes]);

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

    const editPage = useMemo(() => location.pathname !== "/ipbe", [location.pathname]);

    const scrollBottom = useCallback(() => {
        listRef.current?.scrollToItem(filteredLogs.length, "end");
    }, [filteredLogs]);

    const sizeMap = useRef<{[key: string]: number}>({});

    const getSize = useCallback((index) => sizeMap.current[index] || 45, [sizeMap]);

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

    const handleTabChange = useCallback((_, tab: string) => setSubscribedLogType([tab]), []);

    const handleMenuOpen = useCallback(() => setMenuOpen(true), []);

    const setSearchHandler = useCallback((e) => {
        setSearch(e.currentTarget.value);
    }, []) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const handleMenuClose = useCallback(() => setMenuOpen(false), []);

    const handleDialogOpen = useCallback(() => setRemoveDialogOpen(true), []);

    const handleDialogClose = useCallback(() => setRemoveDialogOpen(false), []);

    const handleDeleteIpbe = useCallback(() => {
        if (basicApp.id) {
            dispatch(
                commonActions.applicationActions.removeApplications({
                    data: {id: basicApp.id, name},
                    appType: EAppType.IPBE,
                })
            );
            navigate(`/ipbes/`);
        }
    }, [basicApp.id, dispatch, navigate, name]);

    const toggleSubscribeHandler = useCallback(() => {
        if (!subscribed) {
            subscribe();
        } else {
            unsubscribe();
        }
    }, [subscribe, subscribed, unsubscribe]);

    return (
        <section className="app-log">
            <FlexHolder className="app-info">
                <Thumbnail app={basicApp} />
                <CircularProgressWithLabel value={84} />
                {basicApp.id && <AppStatusDisplay app={basicApp} nodeId={nodeId} />}
                <NxtDatePicker />
                <TooltipComponent
                    className="card-text"
                    arrow
                    title={<ServerLoginTooltip appId={basicApp.id} nodeId={nodeId} />}>
                    <span className="server-info-el">
                        <Icon name="desktop" />
                    </span>
                </TooltipComponent>
                <Button style={{margin: "0 0 0 auto"}} data-type="btn-icon" onClick={handleMenuOpen} btnRef={btnRef}>
                    <Icon name="properties" />
                </Button>
                <MenuComponent anchorEl={btnRef.current} open={menuOpen} onClose={handleMenuClose}>
                    <MenuItemStyled>
                        <a href={`https://qa.nextologies.com/channel/tree/ipbe2/${basicApp.id}`}>Channel</a>
                    </MenuItemStyled>
                    <MenuItemStyled>
                        <a href={`https://qa.nextologies.com/monitor/history/${EApiAppType.IPBE}/${basicApp.id}`}>
                            Monitoring History
                        </a>
                    </MenuItemStyled>
                    <MenuItemStyled>
                        <a
                            href={`https://qa.nextologies.com/log/list?log_filter[entityId]=${basicApp.id}&log_filter[entityType]=Nl\\DavinciBundle\\Entity\\Ipbe”`}>
                            Logs
                        </a>
                    </MenuItemStyled>
                </MenuComponent>
            </FlexHolder>
            {editPage && (
                <div className="bitrate-log-holder">
                    <AppDestinations app={basicApp} nodeId={nodeId} destinations={destinations} />
                </div>
            )}
            <div className="node-system-sate">
                <NodeSystemState />
            </div>
            {editPage && (
                <>
                    <div>{globalStatus}</div>
                    <TabHolder value={subscribedLogType[0]} onChange={handleTabChange} aria-label="tabs">
                        {logsTypes.map((log) => (
                            <TabElement
                                value={log.value}
                                key={log.id}
                                label={log.value}
                                id={`tab-${subscribedLogType[0]}`}
                            />
                        ))}
                    </TabHolder>
                    <VirtualizationContext.Provider value={{setSize}}>
                        <LogContainer
                            subscribed={subscribed}
                            onChange={setSearchHandler}
                            onSubscribe={toggleSubscribeHandler}
                            value={search}
                            hiddenSearch={!filteredLogs.length && !logsArray.length}>
                            {!!filteredLogs.length && (
                                <div>
                                    <List
                                        className="testing-scroll"
                                        style={{padding: 0}}
                                        ref={listRef}
                                        height={350}
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
                                </div>
                            )}
                        </LogContainer>
                    </VirtualizationContext.Provider>
                </>
            )}
            {editPage && (
                <FlexHolder justify="flex-start">
                    <AppRestartButton app={basicApp} nodeId={nodeId} appType={EAppType.IPBE} />
                    <AppStatusButton app={basicApp} nodeId={nodeId} appType={EAppType.IPBE} />
                    <DeleteApplication style={{marginLeft: "auto"}} onClick={handleDialogOpen} />
                    <DeleteModal
                        text="Delete SDI to IP encoder"
                        title="Confirm action"
                        open={removeDialogOpen}
                        onAprove={handleDeleteIpbe}
                        onClose={handleDialogClose}
                    />
                </FlexHolder>
            )}
        </section>
    );
}
