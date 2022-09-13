import {SyntheticEvent, useCallback, useState, useRef, useEffect} from "react";

import {Button, CircularProgressWithLabel, MenuComponent, MenuItemStyled, TooltipComponent} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";

import {
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
import {commonActions, commonSelectors, ICpRootState, ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {useNavigate} from "react-router-dom";
import {EAppType, EChangeStatus, INodesListItem} from "@nxt-ui/cp/types";
import {ServerLoginTooltip} from "../../../common/node/serverLoginTooltip";
import {AppStatusButton} from "../../../common/application/statusButton/index";
import {useRealtimeLogDataTypes, useRealtimeLogDataType} from "@nxt-ui/cp/hooks";

export function StatePanel() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const btnRef = useRef<HTMLDivElement | null>(null);
    const [logsTab, setLogsTab] = useState<string>();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
    const basicApp = useSelector(ipbeEditSelectors.selectBasicApplication);
    const destinations = useSelector(ipbeEditSelectors.main.destinations);
    const nodeId = useSelector(ipbeEditSelectors.main.node);
    const name = useSelector(ipbeEditSelectors.main.name);
    const node = useSelector<ICpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, nodeId)
    );
    const {types} = useRealtimeLogDataTypes(nodeId, EAppType.IPBE, basicApp.id);
    const {typeLogs} = useRealtimeLogDataType(nodeId, EAppType.IPBE, basicApp.id, logsTab);

    useEffect(() => {
        if (types.length && !logsTab) {
            setLogsTab(types[0]);
        }
    }, [types, logsTab]);

    const handleTabChange = useCallback((event: SyntheticEvent, tab: string) => setLogsTab(tab), []);

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

    const handleRestartAction = useCallback(() => {
        if (typeof basicApp.id === "number") {
            dispatch(
                commonActions.applicationActions.changeStatuses({
                    statuses: {id: basicApp.id, statusChange: EChangeStatus.start},
                    appType: EAppType.IPBE,
                })
            );
        }
    }, [basicApp.id, dispatch]);

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
                    <TooltipComponent
                        className="white-tooltip"
                        arrow={true}
                        title={<ServerLoginTooltip nodeId={nodeId} />}>
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

            <TabHolder value={logsTab} onChange={handleTabChange} aria-label="tabs">
                {types.map((item, index) => (
                    <TabElement value={item} key={item} label={item} id={`tab-${index}`} />
                ))}
            </TabHolder>
            {typeLogs.map((type) => (
                <TabPanel key={type._id} value={type.subType} index={logsTab}>
                    <em className="log-time">{type.created}</em>
                    <strong>{type.message}</strong>
                </TabPanel>
            ))}
            <FlexHolder justify="flex-start">
                <Button data-type="btn-icon" onClick={handleRestartAction}>
                    <Icon name="loop" />
                </Button>
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
        </section>
    );
}
