import {SyntheticEvent, useCallback, useState, useRef, useMemo} from "react";

import {Button, CircularProgressWithLabel, MenuComponent, MenuItemStyled} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";

import {FlexHolder, LogContainer, TabElement, TabHolder, TabPanel, Thumbnail} from "@nxt-ui/cp/components";

import NodeSystemState from "./nodeSystemState";
import Destinations from "./destinations";
import ApplicationStatus from "./status";

import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import {ipbeCommonActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {useNavigate} from "react-router-dom";
import {EAppGeneralStatus, EChangeStatus} from "@nxt-ui/cp/types";

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

export function StatePanel() {
    const ipbeId = useSelector(ipbeEditSelectors.main.id);

    const status = useSelector(ipbeEditSelectors.main.status);

    const name = useSelector(ipbeEditSelectors.main.name);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [logsTab, setLogsTab] = useState(0);

    const handleTabChange = (event: SyntheticEvent, tab: number) => setLogsTab(tab);

    const handleDeleteIpbe = useCallback(() => {
        if (ipbeId) {
            dispatch(ipbeCommonActions.removeIpbes([ipbeId]));
            navigate(`/ipbes/`);
        }
    }, [ipbeId, dispatch, navigate]);

    const iconPlayAction = useMemo(() => {
        if (status === EAppGeneralStatus.error || status === EAppGeneralStatus.active) {
            return <Icon name="pause" />;
        }
        return <Icon name="play" />;
    }, [status]);

    const handlePlayAction = useCallback(() => {
        if (typeof ipbeId === "number") {
            if (status === EAppGeneralStatus.error || status === EAppGeneralStatus.active) {
                dispatch(ipbeCommonActions.changeStatuses([{id: ipbeId, statusChange: EChangeStatus.stop}]));
            } else {
                dispatch(ipbeCommonActions.changeStatuses([{id: ipbeId, statusChange: EChangeStatus.start}]));
            }
        }
    }, [status, ipbeId, dispatch]);

    const handleRestartAction = useCallback(() => {
        if (typeof ipbeId === "number") {
            dispatch(ipbeCommonActions.changeStatuses([{id: ipbeId, statusChange: EChangeStatus.start}]));
        }
    }, [ipbeId, dispatch]);

    const tabs = [
        {
            id: 0,
            heading: "ENCODER LOG",
            content: <LogContainer posts={postsLog} />,
        },
        {id: 1, heading: "DECODER LOG", content: "DECODER LOG content"},
    ];

    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const btnRef = useRef<HTMLDivElement | null>(null);

    const handleMenuOpen = useCallback(() => {
        setMenuOpen(true);
    }, []);

    const handleMenuClose = useCallback(() => {
        setMenuOpen(false);
    }, []);

    return (
        <section className="app-log">
            <FlexHolder className="app-info">
                {/* <img src={img01} alt="img title" /> */}
                {/* todo: Dont forget to change channel */}
                <Thumbnail type="ipbe" id={ipbeId} />
                <CircularProgressWithLabel value={84} />
                <ApplicationStatus />
                <Button data-type="btn-icon">
                    <Icon name="calendar" />
                    <span className="counter">2</span>
                </Button>
                <Button data-type="btn-icon">
                    <Icon name="desktop" />
                </Button>
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
                <Destinations />
            </div>
            <div className="node-system-sate">
                <NodeSystemState />
            </div>

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
                <Button data-type="btn-icon" onClick={handlePlayAction}>
                    {iconPlayAction}
                </Button>
                <Button
                    data-type="btn-icon"
                    style={{color: "var(--danger)", marginLeft: "auto"}}
                    onClick={handleDeleteIpbe}>
                    <Icon name="delete" />
                </Button>
            </FlexHolder>
        </section>
    );
}
