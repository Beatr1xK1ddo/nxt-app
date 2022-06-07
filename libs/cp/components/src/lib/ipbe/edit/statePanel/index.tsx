import {MouseEvent, SyntheticEvent, useMemo, useState} from "react";

import {Button, CircularProgressWithLabel, MenuComponent, MenuItemStyled} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";

import {FlexHolder, GridRow, LogContainer, TabElement, TabHolder, TabPanel} from "../../../common";

import img01 from "./assets/img01-small.png";

import "./index.css";
import {useSelector} from "react-redux";
import {ipbeEditSelectors} from "@nxt-ui/cp-redux";
import Destination from "./destination";
import {useRealtimeNodeData} from "@nxt-ui/cp/hooks";
import {memoryFormatter} from "@nxt-ui/cp/utils";

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
    const {node: nodeId, ipbeDestinations} = useSelector(ipbeEditSelectors.selectMainValues);
    const {systemState, lastPing} = useRealtimeNodeData(nodeId);

    const [value, setValue] = useState(0);
    const tabChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const tabs = [
        {
            id: 0,
            heading: "ENCODER LOG",
            content: <LogContainer posts={postsLog} />,
        },
        {id: 1, heading: "DECODER LOG", content: "DECODER LOG content"},
    ];

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const destinations = useMemo(() => {
        if (nodeId && ipbeDestinations) {
            return ipbeDestinations.map((destination) => <Destination nodeId={nodeId} destination={destination} />);
        } else {
            return null;
        }
    }, [nodeId, ipbeDestinations]);

    const nodeSystemSate = useMemo(() => {
        return (
            <>
                <div>
                    <span>Cpu/Governor mode</span>
                    <strong>{`${systemState.cpu}% (powersave ??)`}</strong>
                </div>
                <div>
                    <span>Load Average</span>
                    <strong>{`${systemState.loadAverage} (CPU cores: ??)`}</strong>
                </div>
                <div>
                    <span>Memory</span>
                    <strong>
                        {`${memoryFormatter(systemState.memoryUsed)}/${memoryFormatter(systemState.memoryTotal)}`}
                    </strong>
                </div>
            </>
        );
    }, [systemState]);

    return (
        <section className="app-log">
            <FlexHolder className="app-info align-top">
                <img src={img01} alt="img title" />
                <CircularProgressWithLabel value={84} />
                {/*<AppStatus status={status} />*/}
                <span className="card-status stopped">Stopped</span>
                <Button data-type="btn-icon">
                    <Icon name="calendar" />
                    <span className="counter">2</span>
                </Button>
                <Button data-type="btn-icon">
                    <Icon name="desktop" />
                </Button>
                <Button
                    data-type="btn-icon"
                    style={{margin: "0 0 0 auto"}}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={() => console.log("df")}>
                    <Icon name="properties" />
                </Button>
                <MenuComponent id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                    {menuLog.map((item) => (
                        <MenuItemStyled key={item.id}>{item.content}</MenuItemStyled>
                    ))}
                </MenuComponent>
            </FlexHolder>

            <div className="bitrate-log-holder">{destinations}</div>
            <div className="node-system-sate">{nodeSystemSate}</div>

            <TabHolder value={value} onChange={tabChange} aria-label="tabs">
                {tabs.map((item) => (
                    <TabElement label={item.heading} id={`tab-${item.id}`} />
                ))}
            </TabHolder>
            {tabs.map((item) => (
                <TabPanel value={value} index={item.id}>
                    {item.content}
                </TabPanel>
            ))}
            <FlexHolder justify="flex-start">
                <Button data-type="btn-icon">
                    <Icon name="loop" />
                </Button>
                <Button data-type="btn-icon">
                    <Icon name="stop" />
                </Button>
                <Button data-type="btn-icon" style={{color: "var(--danger)", marginLeft: "auto"}}>
                    <Icon name="delete" />
                </Button>
            </FlexHolder>
        </section>
    );
}
