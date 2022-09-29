import {SyntheticEvent, useCallback, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {Button, CircularProgressWithLabel, MenuComponent, MenuItemStyled, TooltipComponent} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {
    DeleteModal,
    FlexHolder,
    LogContainer,
    ServerLoginTooltip,
    TabElement,
    TabHolder,
    Thumbnail,
} from "@nxt-ui/cp/components";
import {useEditMode} from "@nxt-ui/cp/hooks";
import {commonActions, txrEditSelectors} from "@nxt-ui/cp-redux";
import {EAppGeneralStatusChange, EAppType} from "@nxt-ui/cp/types";
import Destinations from "../../../common/destinations";

import "./index.css";

// TODO Kate: check this code

const postsLog = [
    {
        id: 1,
        content: (
            <>
                <em className="log-time">Jan 5 07:35</em>
                <strong>obe[1320344]: using SAR=1/1</strong>
            </>
        ),
    },
    {
        id: 2,
        content: (
            <>
                <em className="log-time">Jan 5 07:33</em>
                <strong>obe[1320344]: Opened DeckLink PCI card 10 (DeckLink Duo 2)</strong>
            </>
        ),
    },
    {
        id: 3,
        content: (
            <>
                <em className="log-time">Jan 5 07:31</em>
                <strong>
                    kernel: [7722841.356673] obecli[2738148]: segfault at 7fdd58000ed8 ip 00007f9d83dfc7e4 sp
                    00007f9d6c7cff48 error 4 in libc-2.31.so[7f9d83c93000+178000]
                </strong>
            </>
        ),
    },
    {
        id: 4,
        content: (
            <>
                <em className="log-time">Jan 5 07:35</em>
                <strong>obe[1320344]: using SAR=1/1</strong>
            </>
        ),
    },
    {
        id: 5,
        content: (
            <>
                <em className="log-time">Jan 5 07:33</em>
                <strong>obe[1320344]: Opened DeckLink PCI card 10 (DeckLink Duo 2)</strong>
            </>
        ),
    },
    {
        id: 6,
        content: (
            <>
                <em className="log-time">Jan 5 07:31</em>
                <strong>
                    kernel: [7722841.356673] obecli[2738148]: segfault at 7fdd58000ed8 ip 00007f9d83dfc7e4 sp
                    00007f9d6c7cff48 error 4 in libc-2.31.so[7f9d83c93000+178000]
                </strong>
            </>
        ),
    },
    {
        id: 7,
        content: (
            <>
                <em className="log-time">Jan 5 07:35</em>
                <strong>obe[1320344]: using SAR=1/1</strong>
            </>
        ),
    },
];
const menuLog = [
    {
        id: 1,
        content: "Channel",
    },
    {
        id: 2,
        content: "History",
    },
    {
        id: 3,
        content: "Logs",
    },
];

export function StatePanelTxr() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const id = useSelector(txrEditSelectors.main.id);
    const name = useSelector(txrEditSelectors.main.name);
    const basicApplication = useSelector(txrEditSelectors.basicApplication);

    const {txNodeId, rxNodeId} = useSelector(txrEditSelectors.main.txrNodes);
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
                {/* <ApplicationStatus /> */}
                <Button data-type="btn-icon">
                    <Icon name="calendar" />
                    <span className="counter">2</span>
                </Button>
                <Button data-type="btn-icon">
                    <TooltipComponent
                        className="white-tooltip"
                        arrow={true}
                        title={<ServerLoginTooltip nodeId={txNodeId} />}>
                        <div>
                            <Icon name="desktop" />
                        </div>
                    </TooltipComponent>
                </Button>
                <Button data-type="btn-icon">
                    <TooltipComponent
                        className="white-tooltip"
                        arrow={true}
                        title={<ServerLoginTooltip nodeId={rxNodeId} />}>
                        <div>
                            <Icon name="desktop" />
                        </div>
                    </TooltipComponent>
                </Button>
                <span className="upd-info">
                    Last update <br />
                    <strong>2021-12-22 11:47:22</strong>
                </span>
                <Button style={{margin: "0 0 0 auto"}} data-type="btn-icon" onClick={handleMenuOpen} btnRef={btnRef}>
                    <Icon name="properties" />
                </Button>
                <MenuComponent anchorEl={btnRef.current} open={menuOpen} onClose={handleMenuClose}>
                    {menuLog.map((item) => (
                        <MenuItemStyled key={item.id}>{item.content}</MenuItemStyled>
                    ))}
                </MenuComponent>
            </FlexHolder>
            <div className="bitrate-log-holder">
                <Destinations nodeId={rxNodeId} destinations={destinations} />
                <Destinations nodeId={txNodeId} destinations={destinations} />
            </div>
            <TabHolder value={logsTab} onChange={handleTabChange} aria-label="tabs">
                {tabs.map((item) => (
                    <TabElement key={item.id} label={item.heading} id={`tab-${item.id}`} />
                ))}
            </TabHolder>
            {/*
            {tabs.map((item) => (
                <TabPanel key={item.id} value={logsTab} index={item.id}>
                    {item.content}
                </TabPanel>
            ))}
*/}
            <FlexHolder justify="flex-start">
                <Button data-type="btn-icon" onClick={handleRestartAction}>
                    <Icon name="loop" />
                </Button>
                <Button data-type="btn-icon">
                    <Icon name="stop" />
                </Button>
                <Button data-type="btn-icon">
                    <Icon name="visibility" />
                </Button>
                {/* <AppStatusButton nodeId={nodeId} appType="txr" app={basicApp} /> */}

                {editMode && (
                    <TooltipComponent
                        className="white-tooltip"
                        arrow={true}
                        title={
                            <div>
                                <p className="heading">Delete</p>
                            </div>
                        }>
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
