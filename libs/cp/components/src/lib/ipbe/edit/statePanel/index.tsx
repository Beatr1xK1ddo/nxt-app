import {useCallback, useState, useRef, useEffect} from "react";

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
} from "@nxt-ui/cp/components";

import NodeSystemState from "./nodeSystemState";
import Destinations from "../../../common/destinations";

import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import {commonActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {useNavigate} from "react-router-dom";
import {EAppType, ILogRecordState} from "@nxt-ui/cp/types";
import {ServerLoginTooltip} from "../../../common/node/serverLoginTooltip";
import {AppStatusButton} from "../../../common/application/statusButton/index";
import {useAppLogs} from "@nxt-ui/cp/hooks";

export function StatePanel() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const btnRef = useRef<HTMLDivElement | null>(null);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
    const [logsArray, setLogsArray] = useState<Array<ILogRecordState>>([]);
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

    const handleTabChange = useCallback((_, tab: string) => setSubscribedLogType([tab]), []);

    const handleMenuOpen = useCallback(() => setMenuOpen(true), []);

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
                <Thumbnail type="ipbe" id={basicApp.id} />
                <CircularProgressWithLabel value={84} />
                <AppStatusDisplay app={basicApp} nodeId={nodeId} />
                <Button data-type="btn-icon">
                    <NxtDatePicker />
                    <span className="counter">2</span>
                </Button>
                <Button data-type="btn-icon">
                    <TooltipComponent className="white-tooltip" arrow title={<ServerLoginTooltip nodeId={nodeId} />}>
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

            <div className="bitrate-log-holder">
                <Destinations nodeId={nodeId} destinations={destinations} />
            </div>
            <div className="node-system-sate">
                <NodeSystemState />
            </div>

            <TabHolder value={subscribedLogType[0]} onChange={handleTabChange} aria-label="tabs">
                {logsTypes.map((log) => (
                    <TabElement value={log.value} key={log.id} label={log.value} id={`tab-${subscribedLogType[0]}`} />
                ))}
            </TabHolder>
            {logsArray.map((log) => (
                <TabPanel key={log.id} value={subscribedLogType[0]} index={subscribedLogType[0]}>
                    <em className="log-time">{log.created}</em>
                    <strong>{log.message}</strong>
                </TabPanel>
            ))}
            {nodeId && (
                <FlexHolder justify="flex-start">
                    <AppRestartButton app={basicApp} nodeId={nodeId} appType={EAppType.IPBE} />
                    <AppStatusButton app={basicApp} nodeId={nodeId} appType={EAppType.IPBE} />
                    <Button
                        data-type="btn-icon"
                        style={{color: "var(--danger)", marginLeft: "auto"}}
                        onClick={handleDialogOpen}>
                        <Icon name="delete" />
                    </Button>
                    <DeleteModal
                        text="Delete ipbe"
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
