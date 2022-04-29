import {SyntheticEvent, useState} from "react";
import {GridTwoRows, FlexHolder, LogBox} from "../index";
import {
    Button,
    CircularProgressWithLabel,
    MenuComponent,
    MenuItemComponent,
} from "@nxt-ui/components";
import {TabElement, TabHolder, TabPanel} from "../index";
import {Icon} from "@nxt-ui/icons";
import img01 from "./assets/img01-small.png";
import ImgGraph01 from "./assets/ico-graph01.png";
import ImgGraph02 from "./assets/ico-graph02.png";
import ImgGraph03 from "./assets/ico-graph03.png";
import "./app-log.css";

const postsSpeed = [
    {id: 1, content: <a href="/">239.0.0.4:1234</a>},
    {
        id: 2,
        content: (
            <div>
                <img src={ImgGraph01} alt="title" />
                <p className="speed-ok">7 Mbps</p>
            </div>
        ),
    },
    {id: 3, content: <a href="/">239.0.0.4:1234</a>},
    {
        id: 4,
        content: (
            <div>
                <img src={ImgGraph02} alt="title" />
                <p className="speed-ok">12 Mbps</p>
            </div>
        ),
    },
    {id: 5, content: <a href="/">239.0.0.4:1234</a>},
    {
        id: 6,
        content: (
            <div>
                <img src={ImgGraph03} alt="title" />
                <p className="speed-bad">3.5 Mbps</p>
            </div>
        ),
    },
];
const postsSystemInfo = [
    {
        id: 1,
        content: <span className="text-c text-light">Cpu/Governor mode</span>,
    },
    {
        id: 2,
        content: <strong className="text-c text-bold">1.8% (powersave)</strong>,
    },
    {id: 3, content: <span className="text-c text-light">Load Average</span>},
    {
        id: 4,
        content: <strong className="text-c text-bold">1.49 (CPU cores: 32)</strong>,
    },
    {
        id: 5,
        content: <span className="text-c text-light">Memory</span>,
    },
    {
        id: 6,
        content: <strong className="text-c text-bold">2.37 GB/31.33 GB</strong>,
    },
];
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
                    kernel: [7722841.356673] obecli[2738148]: segfault at 7fdd58000ed8 ip
                    00007f9d83dfc7e4 sp 00007f9d6c7cff48 error 4 in
                    libc-2.31.so[7f9d83c93000+178000]
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
                    kernel: [7722841.356673] obecli[2738148]: segfault at 7fdd58000ed8 ip
                    00007f9d83dfc7e4 sp 00007f9d6c7cff48 error 4 in
                    libc-2.31.so[7f9d83c93000+178000]
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

export function AppLog() {
    const [value, setValue] = useState(0);
    const tabChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const tabs = [
        {
            id: 0,
            heading: "ENCODER LOG",
            content: (
                <LogBox>
                    {postsLog.map((post) => (
                        <li key={post.id}>{post.content}</li>
                    ))}
                </LogBox>
            ),
        },
        {id: 1, heading: "DECODER LOG", content: "DECODER LOG content"},
    ];

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = () => {
        // setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <section className="app-log">
            <FlexHolder className="app-info align-top">
                <img src={img01} alt="img title" />
                <CircularProgressWithLabel value={84} />
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
                    // onClick={}
                >
                    <Icon name="properties" />
                </Button>
                <MenuComponent
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}>
                    {menuLog.map((item) => (
                        <MenuItemComponent onClick={(e) => console.log(e.target)} key={item.id}>
                            {item.content}
                        </MenuItemComponent>
                    ))}
                </MenuComponent>
            </FlexHolder>

            <GridTwoRows>
                {postsSpeed.map((post) => (
                    <li key={post.id}>{post.content}</li>
                ))}
            </GridTwoRows>
            <GridTwoRows>
                {postsSystemInfo.map((post) => (
                    <li key={post.id}>{post.content}</li>
                ))}
            </GridTwoRows>

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
