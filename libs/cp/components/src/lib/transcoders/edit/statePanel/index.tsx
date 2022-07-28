import {SyntheticEvent, useCallback, useState, useRef} from "react";

import {Button, CircularProgressWithLabel, MenuComponent, MenuItemStyled, TooltipComponent} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";

import {DeleteModal, FlexHolder, LogContainer, TabElement, TabHolder, TabPanel, Thumbnail} from "@nxt-ui/cp/components";

import NodeSystemState from "./nodeSystemState";
import Destinations from "./destinations";
import ApplicationStatus from "./status";

import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import {commonActions, commonSelectors, ICpRootState, ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {useNavigate} from "react-router-dom";
import {EAppType, EChangeStatus, INodesListItem} from "@nxt-ui/cp/types";
import {ServerLoginTooltip} from "../../../common/node/serverLoginTooltip";
import {AppStatusButton} from "../../../common/application/statusButton/index";

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
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const basicApp = useSelector(ipbeEditSelectors.selectBasicApplication);
    const nodeId = useSelector(ipbeEditSelectors.main.node);
    const node = useSelector<ICpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, nodeId)
    );
    const name = useSelector(ipbeEditSelectors.main.name);

    const btnRef = useRef<HTMLDivElement | null>(null);
    const [logsTab, setLogsTab] = useState(0);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);

    const handleTabChange = (event: SyntheticEvent, tab: number) => setLogsTab(tab);

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

    const tabs = [
        {
            id: 0,
            heading: "ENCODER LOG",
            content: <LogContainer posts={postsLog} />,
        },
        {id: 1, heading: "DECODER LOG", content: "DECODER LOG content"},
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
        <section className="app-log">
            <FlexHolder className="app-info">
                <Thumbnail type="ipbe" id={basicApp.id} />
                <CircularProgressWithLabel value={84} />
                <ApplicationStatus />
                <Button data-type="btn-icon">
                    <Icon name="calendar" />
                    <span className="counter">2</span>
                </Button>
                <Button data-type="btn-icon">
                    <TooltipComponent
                        className="white-tooltip"
                        arrow={true}
                        title={<ServerLoginTooltip hostname={node?.hostname} digitCode={node?.digitCode} />}
                    >
                        <div>
                            <Icon name="desktop" />
                        </div>
                    </TooltipComponent>
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
                <AppStatusButton nodeId={nodeId} appType={EAppType.IPBE} app={basicApp} />
                <Button
                    data-type="btn-icon"
                    style={{color: "var(--danger)", marginLeft: "auto"}}
                    onClick={handleDialogOpen}
                >
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