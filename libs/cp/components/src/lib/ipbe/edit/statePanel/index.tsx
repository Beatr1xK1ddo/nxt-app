import {useCallback, useState, useRef, useEffect, ChangeEventHandler, useMemo} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

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
import {EAppType, ILogRecordState} from "@nxt-ui/cp/types";
import {useAppLogs} from "@nxt-ui/cp/hooks";

import Destinations from "../../../common/destinations";
import {ServerLoginTooltip, AppStatusButton} from "../../../common";
import NodeSystemState from "./nodeSystemState";

import "./index.css";

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
    const {logs, logsTypes} = useAppLogs(nodeId, EAppType.IPBE, basicApp.id, subscribedLogType);

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

    useEffect(() => {
        if (search) {
            const filtered = logsArray.filter((log) => {
                const message = log.message.toLocaleLowerCase();
                const searchValue = search.toLocaleLowerCase();
                return message.includes(searchValue);
            });
            setFilteredLogs(filtered);
        }
    }, [search, logsArray]);

    const editPage = useMemo(() => location.pathname !== "/ipbe", [location.pathname]);

    const renderLogs = useMemo(() => (search ? filteredLogs : logsArray), [search, filteredLogs, logsArray]);

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

    return (
        <section className="app-log">
            <FlexHolder className="app-info">
                <Thumbnail app={basicApp} />
                <CircularProgressWithLabel value={84} />
                <AppStatusDisplay app={basicApp} nodeId={nodeId} />
                <Button data-type="btn-icon">
                    <NxtDatePicker />
                    <span className="counter">2</span>
                </Button>
                <Button data-type="btn-icon">
                    <TooltipComponent className="card-text" arrow title={<ServerLoginTooltip nodeId={nodeId} />}>
                        <div>
                            <Icon name="desktop" />
                        </div>
                    </TooltipComponent>
                </Button>
                <Button style={{margin: "0 0 0 auto"}} data-type="btn-icon" onClick={handleMenuOpen} btnRef={btnRef}>
                    <Icon name="properties" />
                </Button>
                <MenuComponent anchorEl={btnRef.current} open={menuOpen} onClose={handleMenuClose}>
                    <MenuItemStyled>Channel</MenuItemStyled>
                    <MenuItemStyled>History</MenuItemStyled>
                    <MenuItemStyled>Logs</MenuItemStyled>
                </MenuComponent>
            </FlexHolder>
            {editPage && (
                <div className="bitrate-log-holder">
                    <Destinations nodeId={nodeId} destinations={destinations} />
                </div>
            )}
            <div className="node-system-sate">
                <NodeSystemState />
            </div>
            {editPage && (
                <>
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
                    <LogContainer onChange={setSearchHandler} value={search} hiddenSearch={!renderLogs.length}>
                        {renderLogs.map((log) => (
                            <TabPanel key={log.id} value={subscribedLogType[0]} index={subscribedLogType[0]}>
                                <em className="log-time">{log.created}</em>
                                <strong>{log.message}</strong>
                            </TabPanel>
                        ))}
                    </LogContainer>
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
