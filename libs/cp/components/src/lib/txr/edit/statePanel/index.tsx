import {SyntheticEvent, useCallback, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {format} from "date-fns";

import {Button, CircularProgressWithLabel, MenuComponent, MenuItemStyled, TooltipComponent} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {
    DeleteModal,
    FlexHolder,
    ServerLoginTooltip,
    TabElement,
    TabHolder,
    Thumbnail,
    AppRestartButton,
    AppStatusButton,
    AppStatusDisplay,
} from "@nxt-ui/cp/components";
import {useEditMode} from "@nxt-ui/cp/hooks";
import {commonActions, txrEditSelectors} from "@nxt-ui/cp-redux";
import {EApiAppType, EAppGeneralStatusChange, EAppType} from "@nxt-ui/cp/types";
import Destinations from "../../../common/destinations";

import "./index.css";

export function StatePanelTxr() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const id = useSelector(txrEditSelectors.main.id);
    const name = useSelector(txrEditSelectors.main.name);
    const basicApplication = useSelector(txrEditSelectors.basicApplication);

    const {txNodeId, rxNodeId} = useSelector(txrEditSelectors.main.txrNodes);
    const {updatedAt} = useSelector(txrEditSelectors.main.values);
    const lastUpdate = format(updatedAt ? new Date(updatedAt) : new Date(), "yyyy-MM-dd H:mm:ss");
    const destinations = useSelector(txrEditSelectors.main.txrDestination);

    const btnRef = useRef<HTMLDivElement | null>(null);
    const [logsTab, setLogsTab] = useState<string>("0");
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);

    const handleTabChange = (event: SyntheticEvent, tab: string) => setLogsTab(tab);

    const handleDeleteTxr = useCallback(() => {
        if (id) {
            dispatch(commonActions.applicationActions.removeApplications({data: {id, name}, appType: EAppType.TXR}));
            navigate(`/txrs/`);
        }
    }, [id, dispatch, navigate, name]);

    const handleRestartAction = useCallback(() => {
        if (typeof id === "number") {
            dispatch(
                commonActions.applicationActions.changeStatuses({
                    statuses: {id, statusChange: EAppGeneralStatusChange.start},
                    appType: EAppType.TXR,
                })
            );
        }
    }, [id, dispatch]);

    const tabs = [
        {
            id: "0",
            heading: "TX LOG",
            // content: <LogContainer posts={postsLog} />,
            content: <span>test log content</span>,
        },
        {id: "1", heading: "RX LOG", content: "DECODER LOG content"},
    ];

    const handleMenuOpen = useCallback(() => setMenuOpen(true), []);

    const handleMenuClose = useCallback(() => setMenuOpen(false), []);

    const handleDialogOpen = () => {
        setRemoveDialogOpen(true);
    };

    const handleDialogClose = () => {
        setRemoveDialogOpen(false);
    };
    const editMode = useEditMode();

    return (
        <section className="app-log app-log-txr">
            <FlexHolder className="app-info" justify="flex-start">
                <Thumbnail app={basicApplication} />
                <CircularProgressWithLabel value={84} />
                {basicApplication.id && <AppStatusDisplay app={basicApplication} nodeId={txNodeId} />}
                {/* <ApplicationStatus /> */}
                <Button data-type="btn-icon">
                    <Icon name="calendar" />
                    <span className="counter">2</span>
                </Button>
                <Button data-type="btn-icon">
                    <TooltipComponent
                        className="white-tooltip"
                        arrow={true}
                        title={<ServerLoginTooltip appId={id} nodeId={txNodeId} />}>
                        <div>
                            <Icon name="desktop" />
                        </div>
                    </TooltipComponent>
                </Button>
                <Button data-type="btn-icon">
                    <TooltipComponent
                        className="white-tooltip"
                        arrow={true}
                        title={<ServerLoginTooltip appId={id} nodeId={rxNodeId} />}>
                        <div>
                            <Icon name="desktop" />
                        </div>
                    </TooltipComponent>
                </Button>
                <span className="upd-info">
                    Last update <br />
                    <strong>{lastUpdate}</strong>
                </span>
                <Button style={{margin: "0 0 0 auto"}} data-type="btn-icon" onClick={handleMenuOpen} btnRef={btnRef}>
                    <Icon name="properties" />
                </Button>
                <MenuComponent anchorEl={btnRef.current} open={menuOpen} onClose={handleMenuClose}>
                    <MenuItemStyled>
                        <a href={`${window.location.origin}/channel/tree/txr/${basicApplication.id}`}>Channel</a>
                    </MenuItemStyled>
                    <MenuItemStyled>
                        <a href={`${window.location.origin}/monitor/history/${EApiAppType.TXR}/${basicApplication.id}`}>
                            Monitoring History
                        </a>
                    </MenuItemStyled>
                    <MenuItemStyled>
                        <a
                            href={`${window.location.origin}/log/list?log_filter[entityId]=${basicApplication.id}&log_filter[entityType]=Nl\\DavinciBundle\\Entity\\Txr”`}>
                            Logs
                        </a>
                    </MenuItemStyled>
                </MenuComponent>
            </FlexHolder>
            <div className="bitrate-log-holder">
                <Destinations app={basicApplication} nodeId={rxNodeId} destinations={destinations} />
                <Destinations app={basicApplication} nodeId={txNodeId} destinations={destinations} />
            </div>
            <TabHolder value={logsTab} onChange={handleTabChange} aria-label="tabs">
                {tabs.map((item) => (
                    <TabElement key={item.id} label={item.heading} id={`tab-${item.id}`} />
                ))}
            </TabHolder>
            <FlexHolder justify="flex-start">
                <AppRestartButton app={basicApplication} nodeId={txNodeId} appType={EAppType.TXR} />
                <AppStatusButton app={basicApplication} nodeId={txNodeId} appType={EAppType.TXR} />

                {editMode && (
                    <TooltipComponent className="card-text" arrow={true} title={<div>Delete</div>}>
                        <div>
                            <Button
                                data-type="btn-icon"
                                style={{color: "var(--danger)", marginLeft: "auto"}}
                                onClick={handleDialogOpen}>
                                <Icon name="delete" />
                            </Button>
                        </div>
                    </TooltipComponent>
                )}
                <DeleteModal
                    text="Delete transfer"
                    title="Confirm action"
                    open={removeDialogOpen}
                    onAprove={handleDeleteTxr}
                    onClose={handleDialogClose}
                />
            </FlexHolder>
        </section>
    );
}
