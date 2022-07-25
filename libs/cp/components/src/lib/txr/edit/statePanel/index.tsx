import {SyntheticEvent, useCallback, useState, useRef} from "react";

import {Button, CircularProgressWithLabel} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";

import {DeleteModal, FlexHolder, LogContainer, TabElement, TabHolder, TabPanel, Thumbnail} from "@nxt-ui/cp/components";

// import ApplicationStatus from "./status";

import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import {commonActions, txrEditSelectors} from "@nxt-ui/cp-redux";
import {useNavigate} from "react-router-dom";
import {EAppType, EChangeStatus} from "@nxt-ui/cp/types";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";

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
    const node = useSelector(txrEditSelectors.main.id);
    const startedAtMs = useSelector(txrEditSelectors.main.startedAtMs);
    // const basicApp = useSelector(txrEditSelectors.selectBasicApplication);
    // const nodeId = useSelector(txrEditSelectors.main.node);
    const name = useSelector(txrEditSelectors.main.name);

    const {status} = useRealtimeAppData(node, "txr2", id, startedAtMs);

    const btnRef = useRef<HTMLDivElement | null>(null);
    const [logsTab, setLogsTab] = useState<string>("0");
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);

    const handleTabChange = (event: SyntheticEvent, tab: string) => setLogsTab(tab);

    const handleDeleteTxr = useCallback(() => {
        if (id) {
            const data = {id, name};
            dispatch(commonActions.applicationActions.removeApplications({data: {id, name}, appType: EAppType.TXR}));
            navigate(`/txrs/`);
        }
    }, [id, dispatch, navigate, name]);

    const handleRestartAction = useCallback(() => {
        if (typeof id === "number") {
            dispatch(
                commonActions.applicationActions.changeStatuses({
                    statuses: {id, statusChange: EChangeStatus.start},
                    appType: EAppType.TXR,
                })
            );
        }
    }, [id, dispatch]);

    const tabs = [
        {
            id: "0",
            heading: "ENCODER LOG",
            content: <LogContainer posts={postsLog} />,
        },
        {id: "1", heading: "DECODER LOG", content: "DECODER LOG content"},
    ];

    const handleMenuOpen = useCallback(() => setMenuOpen(true), []);

    const handleMenuClose = useCallback(() => setMenuOpen(false), []);

    const handleDialogOpen = () => {
        setRemoveDialogOpen(true);
    };

    const handleDialogClose = () => {
        setRemoveDialogOpen(false);
    };

    return (
        <section className="app-log app-log-txr">
            <FlexHolder className="app-info" justify="flex-start">
                <Thumbnail type="txr" id={id} />
                <CircularProgressWithLabel value={84} />
                {/* <ApplicationStatus /> */}
                <Button data-type="btn-icon">
                    <Icon name="calendar" />
                    <span className="counter">2</span>
                </Button>
                <span className="upd-info">
                    Last update <br />
                    <strong>2021-12-22 11:47:22</strong>
                </span>
                {/* <Button data-type="btn-icon">
                    <Icon name="desktop" />
                </Button> */}
                {/* <Button style={{margin: "0 0 0 auto"}} data-type="btn-icon" onClick={handleMenuOpen} btnRef={btnRef}>
                    <Icon name="properties" />
                </Button>
                <MenuComponent anchorEl={btnRef.current} open={menuOpen} onClose={handleMenuClose}>
                    {menuLog.map((item) => (
                        <MenuItemStyled key={item.id}>{item.content}</MenuItemStyled>
                    ))}
                </MenuComponent> */}
            </FlexHolder>

            <TabHolder value={logsTab} onChange={handleTabChange} aria-label="tabs">
                {tabs.map((item) => (
                    <TabElement key={item.id} label={item.heading} id={`tab-${item.id}`} />
                ))}
            </TabHolder>
            {tabs.map((item) => (
                <TabPanel key={item.id} value={logsTab} index={item.id}>
                    {item.content}
                </TabPanel>
            ))}
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
                <Button
                    data-type="btn-icon"
                    style={{color: "var(--danger)", marginLeft: "auto"}}
                    onClick={handleDialogOpen}>
                    <Icon name="delete" />
                </Button>
                <DeleteModal
                    text="Delete txr"
                    title="Confirm action"
                    open={removeDialogOpen}
                    onAprove={handleDeleteTxr}
                    onClose={handleDialogClose}
                />
            </FlexHolder>
        </section>
    );
}
