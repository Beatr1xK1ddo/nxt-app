import React, {useCallback, useEffect, useMemo, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, MenuComponent, MenuItemStyled} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";

import {FlexHolder, TabElement, TabHolder} from "../../../common";
import {Main} from "./main";
import {VideoEncoder} from "./video-encoder";
import {AudioEncoder} from "./audio-encoder";
import {MpegTsMuxer} from "./mpeg-ts-muxer";
import {Advanced} from "./advanced";
import {RtpMuxer} from "./rtp-muxer";
import "./index.css";
import {ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {EDataProcessingStatus} from "@nxt-ui/cp/types";

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
    const [value, setValue] = React.useState<number>(0);
    const [open, setOpen] = React.useState<boolean>(false);
    const status = useSelector(ipbeEditSelectors.selectStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === EDataProcessingStatus.fetchRequired) {
            dispatch(ipbeEditActions.fetchIpbe(391));
        }
    }, [dispatch, status]);

    const tabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const updateIpbeRequest = useCallback(async () => {
        dispatch(ipbeEditActions.updateIpbe());
    }, [dispatch]);

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

    const openMenuHanndler = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <div className="form-container">
            <Button data-name="btn-info" data-type="btn-icon">
                <Icon name="info" />
            </Button>
            <TabHolder value={value} onChange={tabChange} aria-label="tabs">
                {tabs.map((item) => (
                    <TabElement label={item.heading} id={`tab-${item.id}`} />
                ))}
            </TabHolder>
            <div className="main-tab-holder">
                {tabs.map((item) => (
                    <TabPanel value={value} index={item.id}>
                        {item.content}
                    </TabPanel>
                ))}
                <MenuComponent
                    id="basic-menu"
                    anchorEl={btnRef.current}
                    open={open}
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
                    <Button icon="arrow" iconAfter onClick={openMenuHanndler} btnRef={btnRef}>
                        Save &nbsp; |
                    </Button>
                    <Button data-type="btn-border" style={{color: "var(--grey-dark)"}} icon="copy" iconBefore>
                        Clone
                    </Button>
                </FlexHolder>
            </div>
        </div>
    );
}
