import React, {useCallback, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Button, MenuComponent, MenuItemStyled} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {commonSelectors, CpRootState, ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {FlexHolder, TabElement, TabHolder} from "@nxt-ui/cp/components";

import {VideoEncoder} from "./video-encoder";
import {AudioEncoders} from "./audioEncoders";
import {MpegTsMuxer} from "./mpeg-ts-muxer";
import {Advanced} from "./advanced";
import {RtpMuxer} from "./rtp-muxer";
import {Main} from "./main";

import clsx from "clsx";

import "./index.css";
import {useCompaniesList, useNodeMetadata, useNodesList, useSdiDeviceList} from "@nxt-ui/cp/hooks";
import {INodesListItem} from "@nxt-ui/cp/types";

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

    useNodesList();
    useCompaniesList();
    useNodeMetadata();

    const mainError = useSelector(ipbeEditSelectors.main.error);
    const videoEncoderError = useSelector(ipbeEditSelectors.videoEncoder.error);
    const videoAudioError = useSelector(ipbeEditSelectors.audioEncoder.error);
    const mpegTsMuxerError = useSelector(ipbeEditSelectors.mpegTsMuxer.error);
    const rtpMuxerError = useSelector(ipbeEditSelectors.rtpMuxer.error);
    const advancedError = useSelector(ipbeEditSelectors.advanced.error);
    const nodeId = useSelector(ipbeEditSelectors.main.node);
    const applicationType = useSelector(ipbeEditSelectors.main.applicationType);
    const node = useSelector<CpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, nodeId)
    );
    const sdiDeviceData = useSdiDeviceList(node);

    const [tab, setTab] = React.useState<number>(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    const handleSave = useCallback(async () => {
        dispatch(
            ipbeEditActions.validateAndSaveIpbe({
                sdiValues: sdiDeviceData,
                applicationType,
            })
        );
    }, [dispatch, sdiDeviceData, applicationType]);

    const tabs = useMemo(() => {
        return [
            {
                id: 0,
                heading: "MAIN",
                content: <Main />,
                isError: mainError,
            },
            {
                id: 1,
                heading: "VIDEO ENCODER",
                content: <VideoEncoder />,
                isError: videoEncoderError,
            },
            {
                id: 2,
                heading: "AUDIO ENCODER",
                content: <AudioEncoders />,
                isError: videoAudioError,
            },
            {
                id: 3,
                heading: "MPEG-TS Muxer",
                content: <MpegTsMuxer />,
                isError: mpegTsMuxerError,
            },
            {
                id: 4,
                heading: "RTP Muxer",
                content: <RtpMuxer />,
                isError: rtpMuxerError,
            },
            {
                id: 5,
                heading: "Advanced",
                content: <Advanced />,
                isError: advancedError,
            },
        ];
    }, [mainError, videoEncoderError, videoAudioError, mpegTsMuxerError, rtpMuxerError, advancedError]);

    const MenuArr = [
        {id: 1, content: "Save"},
        {id: 2, content: "Save & Restart"},
        {id: 3, content: "Save & Create New Template"},
    ];
    const btnRef = useRef<HTMLDivElement | null>(null);

    const [menuSaveOpen, setMenuSaveOpen] = useState<boolean>(false);

    const btnSaveRef = useRef<HTMLDivElement | null>(null);

    const handleSaveMenuOpen = useCallback(() => {
        setMenuSaveOpen(true);
    }, []);

    const handleSaveMenuClose = useCallback(() => {
        setMenuSaveOpen(false);
    }, []);

    return (
        <div className="form-container">
            <Button data-name="btn-info" data-type="btn-icon">
                <Icon name="info" />
            </Button>
            <TabHolder value={tab} onChange={handleTabChange} aria-label="tabs">
                {tabs.map((item) => (
                    <TabElement key={item.id} isError={item.isError} label={item.heading} id={`tab-${item.id}`} />
                ))}
            </TabHolder>
            <div className="main-tab-holder">
                {tabs.map((item) => (
                    <TabPanel key={item.id} value={tab} index={item.id}>
                        {item.content}
                    </TabPanel>
                ))}
                <FlexHolder justify="flex-start" className="btn-footer-holder">
                    <div className={clsx("two-btn-box", menuSaveOpen && "save-menu-open")}>
                        <Button onClick={handleSave} btnRef={btnRef}>
                            Save
                        </Button>
                        <Button data-type="btn-icon" onClick={handleSaveMenuOpen} btnRef={btnSaveRef}>
                            <Icon name="arrow" />
                        </Button>
                        <MenuComponent
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            anchorEl={btnSaveRef.current}
                            open={menuSaveOpen}
                            onClose={handleSaveMenuClose}>
                            {MenuArr.map((item) => (
                                <MenuItemStyled key={item.id}>{item.content}</MenuItemStyled>
                            ))}
                        </MenuComponent>
                    </div>
                    <Button data-type="btn-border" style={{color: "var(--grey-dark)"}} icon="copy" iconbefore>
                        Clone
                    </Button>
                </FlexHolder>
            </div>
        </div>
    );
}
