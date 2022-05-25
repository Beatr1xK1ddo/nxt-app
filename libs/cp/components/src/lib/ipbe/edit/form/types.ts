import {IIpbeCardApiItem} from "@nxt-ui/cp/api";
import {AnyAction} from "@reduxjs/toolkit";
import {Dispatch} from "react";

import {IFormRootState} from "./reducers";

export type IFormProps = Partial<IIpbeCardApiItem & {dispatch: Dispatch<AnyAction>}>;

export type IMainProps = {
    dispatch: Dispatch<AnyAction>;
    errors: IFormRootState["errors"]["main"];
} & Partial<
    Pick<
        IIpbeCardApiItem,
        | "name"
        | "company"
        | "nodeId"
        | "videoConnection"
        | "applicationType"
        | "ipbeDestinations"
        | "videoOutputIp"
        | "videoOutputPort"
        | "audioOutputIp"
        | "audioOutputPort"
        | "encoderVersion"
        | "inputFormat"
        | "latency"
        | "outputType"
        | "cardIdx"
    >
>;

export type IVideoEncoderProps = {
    dispatch: Dispatch<AnyAction>;
    errors: IFormRootState["errors"]["videoEncoder"];
} & Partial<
    Pick<
        IIpbeCardApiItem,
        | "videoEncoder"
        | "preset"
        | "profile"
        | "level"
        | "vbitrate"
        | "vbvMaxrate"
        | "vbvBufsize"
        | "aspectRatio"
        | "keyint"
        | "bframes"
        | "maxRefs"
        | "lookahead"
        | "openGop"
        | "bFrameAdaptive"
        | "scenecutThreshold"
        | "interlaced"
        | "cbr"
        | "intraRefresh"
        | "threads"
        | "intraRefresh"
    >
>;

export type IAudioEncoderProps = {
    dispatch: Dispatch<AnyAction>;
    errors: IFormRootState["errors"]["audioEncoder"];
} & Partial<Pick<IIpbeCardApiItem, "ipbeAudioEncoders">>;

export type IMpegTsMuxerProps = {
    dispatch: Dispatch<AnyAction>;
    errors: IFormRootState["errors"]["mpegTsMuxer"];
} & Partial<
    Pick<
        IIpbeCardApiItem,
        | "muxer"
        | "muxrate"
        | "serviceName"
        | "serviceProvider"
        | "programNumber"
        | "videoPid"
        | "pmtPid"
        | "pmtPeriod"
        | "pcrPid"
        | "pcrPeriod"
        | "tsId"
        | "addScte"
        | "ipbeAudioEncoders"
    >
>;

export type IAdvancedProps = {
    dispatch: Dispatch<AnyAction>;
} & Partial<
    Pick<
        IIpbeCardApiItem,
        | "addTimecode"
        | "runMonitor"
        | "enableLoopback"
        | "enableSlateIfNoSignal"
        | "enablePsfEncoding"
        | "restartOnError"
        | "enablePreviewImages"
        | "slateImage"
    >
>;

export type IRtpMuxerProps = {
    dispatch: Dispatch<AnyAction>;
    errors: IFormRootState["errors"]["rtpMuxer"];
} & Partial<Pick<IIpbeCardApiItem, "audioPt" | "videoPt">>;
