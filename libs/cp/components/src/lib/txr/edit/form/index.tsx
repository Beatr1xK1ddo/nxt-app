import React, {useCallback, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Button, MenuComponent, MenuItemStyled} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {commonSelectors, CpRootState, txrCommonActions, txrEditActions, txrEditSelectors} from "@nxt-ui/cp-redux";
import {FlexHolder, TabElement, TabHolder} from "@nxt-ui/cp/components";

import {VideoEncoder} from "./video-encoder";
import {AudioEncoders} from "./audioEncoders";
import {MpegTsMuxer} from "./mpeg-ts-muxer";
import {RtpMuxer} from "./rtp-muxer";
import {Main} from "./main";

import clsx from "clsx";

import "./index.css";
import {useCompaniesList, useNodeMetadata, useNodesList, useSdiDeviceList} from "@nxt-ui/cp/hooks";
import {EChangeStatus, INodesListItem, Optional} from "@nxt-ui/cp/types";

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

export function TxrEditForm() {
    const dispatch = useDispatch();

    useNodesList();
    useCompaniesList();
    useNodeMetadata();

    const name = useSelector(txrEditSelectors.main.name);
    const mainError = useSelector(txrEditSelectors.main.error);
    const videoEncoderError = useSelector(txrEditSelectors.videoEncoder.error);
    const videoAudioError = useSelector(txrEditSelectors.audioEncoder.error);
    const mpegTsMuxerError = useSelector(txrEditSelectors.mpegTsMuxer.error);
    const rtpMuxerError = useSelector(txrEditSelectors.rtpMuxer.error);
    const advancedError = useSelector(txrEditSelectors.advanced.error);
    const nodeId = useSelector(txrEditSelectors.main.node);
    const txrId = useSelector(txrEditSelectors.main.id);
    const applicationType = useSelector(txrEditSelectors.main.applicationType);
    const node = useSelector<CpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, nodeId)
    );
    const sdiValues = useSdiDeviceList(node);

    const saveMenuButtonRef = useRef<Optional<HTMLDivElement>>(null);
    const [tab, setTab] = React.useState<number>(0);
    const [saveMenuOpen, setSaveMenuOpen] = useState<boolean>(false);

    const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    }, []);

    const handleSave = useCallback(
        (restart?: boolean) => () => {
            setSaveMenuOpen(false);
            const {
                main: {id: selectId},
                selectValidStatus,
                selectState: selectEditState,
            } = txrEditSelectors;
            dispatch(txrEditActions.validateTxr({sdiValues, applicationType}));
            dispatch(
                txrEditActions.updateTxr({
                    name,
                    selectId,
                    selectValidStatus,
                    selectEditState,
                    restart,
                })
            );
        },
        [dispatch, name, sdiValues, applicationType]
    );

    const handleSaveAndRestart = useCallback(() => {
        handleSave(true)();
    }, [handleSave]);

    const handleStartRestart = useCallback(() => {
        if (typeof txrId === "number") {
            dispatch(txrCommonActions.changeStatuses({statuses: {id: txrId, statusChange: EChangeStatus.start}}));
        }
    }, [txrId, dispatch]);

    const handleStop = useCallback(() => {
        if (typeof txrId === "number") {
            dispatch(txrCommonActions.changeStatuses({statuses: {id: txrId, statusChange: EChangeStatus.stop}}));
        }
    }, [txrId, dispatch]);

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
                heading: "TXR 5/6 ADVANCED OPTIONS",
                content: <VideoEncoder />,
                isError: videoEncoderError,
            },
            {
                id: 2,
                heading: "PROXY SERVERS",
                content: <AudioEncoders />,
                isError: videoAudioError,
            },
            {
                id: 3,
                heading: "RTT",
                content: <MpegTsMuxer />,
                isError: mpegTsMuxerError,
            },
            {
                id: 4,
                heading: "MTR",
                content: <RtpMuxer />,
                isError: rtpMuxerError,
            },
        ];
    }, [mainError, videoEncoderError, videoAudioError, mpegTsMuxerError, rtpMuxerError, advancedError]);

    const handleSaveMenuOpen = useCallback(() => {
        setSaveMenuOpen(true);
    }, []);

    const handleSaveMenuClose = useCallback(() => {
        setSaveMenuOpen(false);
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
                    <div className={clsx("two-btn-box", saveMenuOpen && "save-menu-open")}>
                        <Button onClick={handleSave(false)}>Save</Button>
                        <Button data-type="btn-icon" onClick={handleSaveMenuOpen} btnRef={saveMenuButtonRef}>
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
                            anchorEl={saveMenuButtonRef.current}
                            open={saveMenuOpen}
                            onClose={handleSaveMenuClose}>
                            <MenuItemStyled onClick={handleSaveAndRestart}>Save &amp; Start/Restart</MenuItemStyled>
                            <MenuItemStyled onClick={handleStartRestart}>Start/Restart</MenuItemStyled>
                            <MenuItemStyled onClick={handleStop}>Stop</MenuItemStyled>
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
