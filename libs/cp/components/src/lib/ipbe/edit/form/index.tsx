import React, {useReducer, useEffect, useMemo, useCallback} from "react";
import {useFormData} from "@nxt-ui/cp/hooks";

import {IIpbeCardApiItem, NxtAPI} from "@nxt-ui/cp/api";
import {Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";

import {TabHolder, TabElement, FlexHolder} from "../../../common";

import {initialState, reducer, setInitialState} from "./reducers";
import {Main} from "./main";
import {VideoEncoder} from "./video-encoder";
import {AudioEncoder} from "./audio-encoder";
import {MpegTsMuxer} from "./mpeg-ts-muxer";
import {Advanced} from "./advanced";
import {RtpMuxer} from "./rtp-muxer";
import {Button, MenuComponent} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import "./app-edit.css";
import {TabHolder} from "../../tabs";
import {TabElement} from "../../tabs/tab-element/index";
import {FlexHolder} from "../../containers";
import {useDispatch} from "react-redux";
import {setLoader} from "@nxt-ui/cp/ducks";

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

export function IpbeEditForm() {
    const [value, setValue] = React.useState(0);

    const [state, dispatch] = useReducer(reducer, initialState);

    const {data} = useFormData<IIpbeCardApiItem>(391, NxtAPI.getIpbe);

    const reduxDispatch = useDispatch();

    useEffect(() => {
        reduxDispatch(setLoader(true));
    }, [reduxDispatch]);

    useEffect(() => {
        if (data) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            dispatch(setInitialState(data));
            reduxDispatch(setLoader(false));
        }
    }, [data, reduxDispatch]);

    const tabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const sendPutRequest = useCallback(async () => {
        try {
            if (!state.values) {
                return;
            }
            const response = await NxtAPI.putIpbe(state.values);
            // dispatch()
            console.log("this is response", response);
        } catch (e) {
            console.log("this is error", e);
        }
    }, [state]);

    const tabs = useMemo(() => {
        return [
            {
                id: 0,
                heading: "MAIN",
                content: (
                    <Main
                        company={state.values?.company}
                        name={state.values?.name}
                        node={state.values?.node}
                        videoConnection={state.values?.videoConnection}
                        applicationType={state.values?.applicationType}
                        ipbeDestinations={state.values?.ipbeDestinations}
                        videoOutputIp={state.values?.videoOutputIp}
                        videoOutputPort={state.values?.videoOutputPort}
                        audioOutputPort={state.values?.audioOutputPort}
                        audioOutputIp={state.values?.audioOutputIp}
                        encoderVersion={state.values?.encoderVersion}
                        inputFormat={state.values?.inputFormat}
                        latency={state.values?.latency}
                        outputType={state.values?.outputType}
                        errors={state.errors.main}
                        cardIdx={state.values?.cardIdx}
                        dispatch={dispatch}
                    />
                ),
            },
            {
                id: 1,
                heading: "VIDEO ENCODER",
                content: (
                    <VideoEncoder
                        videoEncoder={state.values?.videoEncoder}
                        preset={state.values?.preset}
                        profile={state.values?.profile}
                        level={state.values?.level}
                        vbitrate={state.values?.vbitrate}
                        vbvMaxrate={state.values?.vbvMaxrate}
                        vbvBufsize={state.values?.vbvBufsize}
                        aspectRatio={state.values?.aspectRatio}
                        keyint={state.values?.keyint}
                        bframes={state.values?.bframes}
                        maxRefs={state.values?.maxRefs}
                        lookahead={state.values?.lookahead}
                        openGop={state.values?.openGop}
                        bFrameAdaptive={state.values?.bFrameAdaptive}
                        scenecutThreshold={state.values?.scenecutThreshold}
                        interlaced={state.values?.interlaced}
                        cbr={state.values?.cbr}
                        intraRefresh={state.values?.intraRefresh}
                        errors={state.errors.videoEncoder}
                        threads={state.values?.threads}
                        dispatch={dispatch}
                    />
                ),
            },
            {
                id: 2,
                heading: "AUDIO ENCODER",
                content: <AudioEncoder ipbeAudioEncoders={state.values?.ipbeAudioEncoders} dispatch={dispatch} />,
            },
            {
                id: 3,
                heading: "MPEG-TS Muxer",
                content: (
                    <MpegTsMuxer
                        dispatch={dispatch}
                        muxer={state.values?.muxer}
                        muxrate={state.values?.muxrate}
                        serviceName={state.values?.serviceName}
                        serviceProvider={state.values?.serviceProvider}
                        programNumber={state.values?.programNumber}
                        videoPid={state.values?.videoPid}
                        ipbeAudioEncoders={state.values?.ipbeAudioEncoders}
                        pmtPid={state.values?.pmtPid}
                        pmtPeriod={state.values?.pmtPeriod}
                        pcrPid={state.values?.pcrPid}
                        pcrPeriod={state.values?.pcrPeriod}
                        tsId={state.values?.tsId}
                        addScte={state.values?.addScte}
                        errors={state.errors.mpegTsMuxer}
                    />
                ),
            },
            {
                id: 4,
                heading: "RTP Muxer",
                content: (
                    <RtpMuxer
                        errors={state.errors.rtpMuxer}
                        dispatch={dispatch}
                        audioPt={state.values?.audioPt}
                        videoPt={state.values?.videoPt}
                    />
                ),
            },
            {
                id: 5,
                heading: "Advanced",
                content: (
                    <Advanced
                        dispatch={dispatch}
                        runMonitor={state.values?.runMonitor}
                        addTimecode={state.values?.addTimecode}
                        enableLoopback={state.values?.enableLoopback}
                        enableSlateIfNoSignal={state.values?.enableSlateIfNoSignal}
                        enablePsfEncoding={state.values?.enablePsfEncoding}
                        restartOnError={state.values?.restartOnError}
                        enablePreviewImages={state.values?.enablePreviewImages}
                        slateImage={state.values?.slateImage}
                    />
                ),
            },
        ];
    }, [state]);

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
