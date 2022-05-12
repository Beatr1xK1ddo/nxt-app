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
        IIpbe,
        | "name"
        | "company"
        | "node"
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
    >
>;

export type IOutputIpPayload = {id: number; value: string};
export type IOutputPortPayload = {id: number; value: number};

export type IVideoEncoderProps = {
    dispatch: Dispatch<AnyAction>;
    errors: IFormRootState["errors"]["videoEncoder"];
} & Partial<
    Pick<
        IIpbe,
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
    >
>;

export type IAudioEncoderProps = {
    dispatch: Dispatch<AnyAction>;
} & Partial<Pick<IIpbe, "ipbeAudioEncoders">>;

export type IMpegTsMuxerProps = {
    dispatch: Dispatch<AnyAction>;
} & Partial<
    Pick<
        IIpbe,
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