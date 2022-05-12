import {ChangeEventHandler, FC, useCallback} from "react";
import {InputText, Dropdown} from "@nxt-ui/components";
import {Columns} from "../../../containers";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {
    changeAspectRatio,
    changeBFrameAdaptive,
    changeBframes,
    changeInterlaced,
    changeKeyint,
    changeLevel,
    changeLookahead,
    changePreset,
    changeProfile,
    changeScenecutThreshold,
    changeVBitrate,
    changeVBVMaxrate,
    changeVideoEncoder,
} from "../reducers";
import {IVideoEncoderProps} from "../types";
import {
    EAspectRatio,
    EBFrameAdaptive,
    EInterlaced,
    ELevel,
    EPreset,
    EProfile,
    EVideoEncoder,
} from "@nxt-ui/cp/types";

export const VideoEncoder: FC<IVideoEncoderProps> = (props) => {
    const {
        dispatch,
        videoEncoder,
        preset,
        profile,
        level,
        vbitrate,
        vbvMaxrate,
        vbvBufsize,
        aspectRatio,
        keyint,
        bframes,
        maxRefs,
        lookahead,
        bFrameAdaptive,
        scenecutThreshold,
        interlaced,
        cbr,
    } = props;

    const changeVideoEncoderHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch?.(changeVideoEncoder(e.target.value as EVideoEncoder));
        },
        [dispatch]
    );

    const changePresetHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch?.(changePreset(e.target.value as EPreset));
        },
        [dispatch]
    );

    const changeProfileHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch?.(changeProfile(e.target.value as EProfile));
        },
        [dispatch]
    );

    const changeLevelHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch?.(changeLevel(e.target.value as ELevel));
        },
        [dispatch]
    );

    const changeVBitrateHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            console.log("changeVBitrateHandler", typeof e.target.value);
            dispatch?.(changeVBitrate(e.target.value as number));
        },

        [dispatch]
    );

    const changeMaxRefsHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            console.log("changeMaxRefsHandler", typeof e.target.value);
            dispatch?.(changeVBitrate(e.target.value as number));
        },

        [dispatch]
    );

    const changeInterlacedHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            console.log("changeInterlacedHandler", typeof e.target.value);
            dispatch?.(changeInterlaced(e.target.value as EInterlaced));
        },

        [dispatch]
    );

    const changeScenecutThresholdHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            if (value) {
                dispatch?.(changeScenecutThreshold(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeAspectRatioHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch?.(changeAspectRatio(e.target.value as EAspectRatio));
        },

        [dispatch]
    );

    const changeBFrameAdaptiveHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch?.(changeBFrameAdaptive(e.target.value as EBFrameAdaptive));
        },

        [dispatch]
    );

    const changeVBVMaxrateHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            if (value || !e.currentTarget.value) {
                dispatch?.(changeVBVMaxrate(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeVBVBufsizeHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            if (value) {
                dispatch?.(changeVBVMaxrate(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeKeyintHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            if (value) {
                dispatch?.(changeKeyint(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeBFramesHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            if (value) {
                dispatch?.(changeBframes(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeLookaheadHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            if (value) {
                dispatch?.(changeLookahead(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    return (
        <>
            <Columns gap={24} col={2}>
                <Dropdown
                    label="Video Encoder"
                    onChange={changeVideoEncoderHandler}
                    values={Object.values(EVideoEncoder)}
                    value={videoEncoder}
                />
                <Dropdown
                    label="Preset"
                    onChange={changePresetHandler}
                    value={preset}
                    values={Object.values(EPreset)}
                />
                <Dropdown
                    label="Profile"
                    onChange={changeProfileHandler}
                    values={Object.values(EProfile)}
                    value={profile}
                />
                <Dropdown
                    label="Level"
                    onChange={changeLevelHandler}
                    value={level}
                    values={Object.values(ELevel)}
                />
            </Columns>
            <Columns gap={24} col={3}>
                <Dropdown
                    label="Vbitrate"
                    onChange={changeVBitrateHandler}
                    value={vbitrate}
                    values={[128, 192, 256, 384]}
                />
                <InputText
                    label="Vbv Maxrate"
                    onChange={changeVBVMaxrateHandler}
                    value={vbvMaxrate || ""}
                />
                <InputText
                    label="Vbv Bufsize"
                    value={vbvBufsize}
                    onChange={changeVBVBufsizeHandler}
                />
                <Dropdown
                    label="Aspect Ratio"
                    value={aspectRatio}
                    onChange={changeAspectRatioHandler}
                />
                <InputText label="Keyint" value={keyint} onChange={changeKeyintHandler} />
                <InputText label="Bframes" value={bframes} onChange={changeBFramesHandler} />
                <Dropdown
                    label="Max Refs"
                    onChange={changeMaxRefsHandler}
                    value={maxRefs}
                    values={Array(10).map((_, i) => i)}
                />
                <InputText label="Lookahead" onChange={changeLookaheadHandler} value={lookahead} />
                <Dropdown label="Open Gop" />
            </Columns>
            <Columns gap={24} col={2}>
                <Dropdown
                    label="B-Frame Adaptive"
                    onChange={changeBFrameAdaptiveHandler}
                    value={bFrameAdaptive}
                    values={Object.values(EBFrameAdaptive)}
                />
                <InputText
                    label="Scenecut Threshold"
                    value={scenecutThreshold}
                    onChange={changeScenecutThresholdHandler}
                />
            </Columns>
            <Columns gap={24} col={3}>
                <Dropdown
                    label="Interlaced"
                    onChange={changeInterlacedHandler}
                    value={interlaced}
                    values={Object.keys(EInterlaced)}
                />
                <Dropdown label="Cbr" value={cbr} />
                <Dropdown label="Intra Refresh" />
            </Columns>

            <Dropdown label="Threads" />
        </>
    );
};
