import React, {useCallback, useMemo, useRef} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

import {Button, MenuComponent, MenuItemStyled} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {ipbeEditActions} from "@nxt-ui/cp-redux";
import {FlexHolder, TabElement, TabHolder} from "@nxt-ui/cp/components";

import {VideoEncoder} from "./video-encoder";
import {AudioEncoder} from "./audio-encoder";
import {MpegTsMuxer} from "./mpeg-ts-muxer";
import {Advanced} from "./advanced";
import {RtpMuxer} from "./rtp-muxer";
import {Main} from "./main";

import "./index.css";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`main-form-tabpanel-${index}`} {...other}>
            {value === index && children}
        </div>
    );
}

export function IpbeEditForm() {
    const dispatch = useDispatch();

    const {id} = useParams<"id">();

    const [tab, setTab] = React.useState<number>(0);
    const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    const handleSave = useCallback(async () => {
        if (id) {
            dispatch(ipbeEditActions.updateIpbe());
        } else {
            dispatch(ipbeEditActions.createIpbe());
        }
    }, [dispatch, id]);

    const tabs = useMemo(() => {
        return [
            {
                id: 0,
                heading: "MAIN",
                content: <Main />,
            },
            {
                id: 1,
                heading: "VIDEO ENCODER",
                content: <VideoEncoder />,
            },
            {
                id: 2,
                heading: "AUDIO ENCODER",
                content: <AudioEncoder />,
            },
            {
                id: 3,
                heading: "MPEG-TS Muxer",
                content: <MpegTsMuxer />,
            },
            {
                id: 4,
                heading: "RTP Muxer",
                content: <RtpMuxer />,
            },
            {
                id: 5,
                heading: "Advanced",
                content: <Advanced />,
            },
        ];
    }, []);

    const MenuArr = [
        {id: 1, content: "menu item 1"},
        {id: 2, content: "menu item 2"},
    ];
    const btnRef = useRef<HTMLDivElement | null>(null);

    const handleClose = useCallback(() => {
        setMenuOpen(false);
    }, []);

    return (
        <div className="form-container">
            <Button data-name="btn-info" data-type="btn-icon">
                <Icon name="info" />
            </Button>
            <TabHolder value={tab} onChange={handleTabChange} aria-label="tabs">
                {tabs.map((item) => (
                    <TabElement key={item.id} label={item.heading} id={`tab-${item.id}`} />
                ))}
            </TabHolder>
            <div className="main-tab-holder">
                {tabs.map((item) => (
                    <TabPanel key={item.id} value={item.id} index={item.id}>
                        {item.content}
                    </TabPanel>
                ))}
                <MenuComponent
                    id="basic-menu"
                    anchorEl={btnRef.current}
                    open={menuOpen}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                    className="test">
                    {MenuArr.map((item) => (
                        <MenuItemStyled key={item.id}>{item.content}</MenuItemStyled>
                    ))}
                </MenuComponent>
                <FlexHolder justify="flex-start" className="btn-footer-holder">
                    <Button icon="arrow" iconafter onClick={handleSave} btnRef={btnRef}>
                        Save &nbsp; |
                    </Button>
                    <Button data-type="btn-border" style={{color: "var(--grey-dark)"}} icon="copy" iconbefore>
                        Clone
                    </Button>
                </FlexHolder>
            </div>
        </div>
    );
}
