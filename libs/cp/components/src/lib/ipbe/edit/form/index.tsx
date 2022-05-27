import React, {useEffect, useMemo, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, MenuComponent} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";

import {TabHolder, TabElement, FlexHolder} from "../../../common";
import {Main} from "./main";
import {VideoEncoder} from "./video-encoder";
import {AudioEncoder} from "./audio-encoder";
import {MpegTsMuxer} from "./mpeg-ts-muxer";
import {Advanced} from "./advanced";
import {RtpMuxer} from "./rtp-muxer";
import "./index.css";
import {ipbeEditSelectors, ipbeEditActions} from "@nxt-ui/cp-redux";
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
    const [value, setValue] = React.useState(0);
    const status = useSelector(ipbeEditSelectors.selectIpbeEditStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === EDataProcessingStatus.fetchRequired) {
            dispatch(ipbeEditActions.fetchIpbe(391));
        }
    }, [dispatch, status]);

    const tabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const sendPutRequest = useCallback(async () => {
        console.log("dodelat");
    }, []);

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
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                {/* <button
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}>
                    open menu
                </button> */}
                <MenuComponent
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                    className="test"
                    itemArr={MenuArr}
                />

                <FlexHolder justify="flex-start" className="btn-footer-holder">
                    <Button icon="arrow" iconAfter onClick={sendPutRequest}>
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
