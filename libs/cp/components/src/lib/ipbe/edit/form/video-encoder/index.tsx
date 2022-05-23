import {ChangeEventHandler, FC, useCallback, useMemo} from "react";
import {InputText, Dropdown, CheckboxComponent} from "@nxt-ui/components";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {
    EAspectRatio,
    EBFrameAdaptive,
    EInterlaced,
    ELevel,
    EPreset,
    EProfile,
    EVideoEncoder,
    maxRefsValues,
    threadsValues,
    ValueOf,
} from "@nxt-ui/cp/types";

import {
    changeAspectRatio,
    changeBFrameAdaptive,
    changeBframes,
    changeCbr,
    changeInterlaced,
    changeIntraRefresh,
    changeKeyint,
    changeLevel,
    changeLookahead,
    changeMaxRefs,
    changePreset,
    changeProfile,
    changeScenecutThreshold,
    changeThread,
    changeVBitrate,
    changeVBVBufsize,
    changeVBVMaxrate,
    changeVideoEncoder,
} from "../reducers";
import {IVideoEncoderProps} from "../types";
import {Columns} from "../../../../common";

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
        threads,
        intraRefresh,
        errors,
    } = props;

    const maxRefsValue = useMemo(() => {
        if (maxRefs === 0) {
            return "0";
        } else {
            return maxRefs;
        }
    }, [maxRefs]);

    const bFrameAdaptiveValue = useMemo(() => {
        if (!bFrameAdaptive && typeof bFrameAdaptive !== "number") {
            return "";
        }

        const value = Object.keys(EBFrameAdaptive).find((key) => {
            return EBFrameAdaptive[key as keyof typeof EBFrameAdaptive] === bFrameAdaptive;
        });

        if (!value || typeof bFrameAdaptive !== "number") {
            return "";
        }
        return value;
    }, [bFrameAdaptive]);

    const interlacedValue = useMemo(() => {
        if (!interlaced && typeof interlaced !== "number") {
            return "";
        }

        const value = Object.keys(EInterlaced).find((key) => {
            return EInterlaced[key as keyof typeof EInterlaced] === interlaced;
        });

        if (!value || typeof interlaced !== "number") {
            return "";
        }
        return value;
    }, [interlaced]);

    const levelValue = useMemo(() => {
        if (level) {
            return ELevel[level as keyof typeof ELevel];
        } else {
            return "";
        }
    }, [level]);

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
            dispatch?.(changeLevel(e.target.value as ValueOf<typeof ELevel>));
        },
        [dispatch]
    );

    const changeVBitrateHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch?.(changeVBitrate(e.target.value as number));
        },

        [dispatch]
    );

    const changeMaxRefsHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch?.(changeMaxRefs(e.target.value as number));
        },

        [dispatch]
    );

    const changeThreadHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch?.(changeThread(e.target.value as number));
        },
        [dispatch]
    );

    const changeInterlacedHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch?.(changeInterlaced(e.target.value as keyof typeof EInterlaced));
        },

        [dispatch]
    );

    const changeScenecutThresholdHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            if (!e.currentTarget.value) {
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
            dispatch?.(changeBFrameAdaptive(e.target.value as keyof typeof EBFrameAdaptive));
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
            if (value || !e.currentTarget.value) {
                dispatch?.(changeVBVBufsize(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeKeyintHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            if (value || !e.currentTarget.value) {
                dispatch?.(changeKeyint(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeBFramesHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            if (value || !e.currentTarget.value) {
                dispatch?.(changeBframes(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeLookaheadHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            if (value || !e.currentTarget.value) {
                dispatch?.(changeLookahead(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeIntraRefreshHandler = useCallback(() => {
        dispatch?.(changeIntraRefresh());
    }, [dispatch]);

    const changeCbrHandler = useCallback(() => {
        dispatch?.(changeCbr());
    }, [dispatch]);

    return (
        <>
            <Columns gap={24} col={2}>
                <Dropdown
                    label="Video Encoder"
                    onChange={changeVideoEncoderHandler}
                    values={Object.values(EVideoEncoder)}
                    value={videoEncoder || ""}
                />
                <Dropdown
                    label="Preset"
                    onChange={changePresetHandler}
                    value={preset || ""}
                    values={Object.values(EPreset)}
                />
                <Dropdown
                    label="Profile"
                    onChange={changeProfileHandler}
                    values={Object.values(EProfile)}
                    value={profile || ""}
                />
                <Dropdown
                    label="Level"
                    onChange={changeLevelHandler}
                    value={levelValue}
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
                    error={errors.vbvMaxrateError.error}
                    helperText={errors.vbvMaxrateError.helperText}
                />
                <InputText
                    label="Vbv Bufsize"
                    value={vbvBufsize || ""}
                    onChange={changeVBVBufsizeHandler}
                    error={errors.vbvBufsizeError.error}
                    helperText={errors.vbvBufsizeError.helperText}
                />
                <Dropdown
                    label="Aspect Ratio"
                    value={aspectRatio}
                    values={Object.values(EAspectRatio)}
                    onChange={changeAspectRatioHandler}
                />
                <InputText
                    label="Keyint"
                    value={keyint}
                    onChange={changeKeyintHandler}
                    error={errors.keyintError.error}
                    helperText={errors.keyintError.helperText}
                />
                <InputText
                    label="Bframes"
                    value={bframes || ""}
                    onChange={changeBFramesHandler}
                    error={errors.bframesError.error}
                    helperText={errors.bframesError.helperText}
                />
                <Dropdown
                    label="Max Refs"
                    onChange={changeMaxRefsHandler}
                    value={maxRefsValue || ""}
                    values={maxRefsValues}
                />
                <InputText
                    label="Lookahead"
                    onChange={changeLookaheadHandler}
                    value={lookahead || ""}
                    error={errors.lookaheadError.error}
                    helperText={errors.lookaheadError.helperText}
                />
                <Dropdown label="Open Gop" />
            </Columns>
            <Columns gap={24} col={2}>
                <Dropdown
                    label="B-Frame Adaptive"
                    onChange={changeBFrameAdaptiveHandler}
                    value={bFrameAdaptiveValue}
                    values={Object.keys(EBFrameAdaptive)}
                />
                <InputText
                    label="Scenecut Threshold"
                    value={scenecutThreshold?.toString() || ""}
                    onChange={changeScenecutThresholdHandler}
                    error={errors.scenecutThresholdError.error}
                    helperText={errors.scenecutThresholdError.helperText}
                />
            </Columns>
            <Columns gap={24} col={3}>
                <Dropdown
                    label="Interlaced"
                    onChange={changeInterlacedHandler}
                    value={interlacedValue}
                    values={Object.keys(EInterlaced)}
                />
                <CheckboxComponent
                    checkId="checkRefresh"
                    className="switch label-startvalign-center"
                    labelText="Cbr"
                    checked={cbr}
                    onClick={changeCbrHandler}
                />
                <CheckboxComponent
                    checkId="checkRefresh"
                    className="switch label-startvalign-center"
                    labelText="Intra Refresh"
                    checked={intraRefresh}
                    onClick={changeIntraRefreshHandler}
                />
            </Columns>

            <Dropdown label="Threads" value={threads || ""} values={threadsValues} onChange={changeThreadHandler} />
        </>
    );
};
