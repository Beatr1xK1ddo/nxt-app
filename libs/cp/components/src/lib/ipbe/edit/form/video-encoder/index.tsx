import {ChangeEventHandler, FC, useCallback, useEffect, useMemo} from "react";
import {InputText, Dropdown, CheckboxComponent} from "@nxt-ui/components";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {
    EIpbeApplicationType,
    EIpbeAspectRatio,
    EIpbeInterlaced,
    EIpbeLevel,
    EIpbePreset,
    EIpbeProfile,
    EIpbeVideoEncoder,
    maxRefsValues,
    threadsValues,
    ValueOf,
} from "@nxt-ui/cp/types";
import {Columns} from "../../../../common";
import {useDispatch, useSelector} from "react-redux";
import {ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import {fpsEnding} from "@nxt-ui/cp/utils";

export const VideoEncoder: FC = () => {
    const dispatch = useDispatch();
    const values = useSelector(ipbeEditSelectors.selectVideoEncoderValues);
    const errors = useSelector(ipbeEditSelectors.selectVideoEncoderErrors);
    const applicationType = useSelector(ipbeEditSelectors.selectAdvancedApplicationType);
    const maxRefsValue = useMemo(() => {
        if (values.maxRefs === 0) {
            return "0";
        } else {
            return values.maxRefs;
        }
    }, [values.maxRefs]);

    const levelValue = useMemo(() => {
        if (values.level) {
            return values.level;
        } else {
            return "";
        }
    }, [values.level]);

    const changeVideoEncoderHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.changeVideoEncoder(e.target.value as EIpbeVideoEncoder));
        },
        [dispatch]
    );

    const videoEncoderValues = useMemo(() => {
        const result = [EIpbeVideoEncoder.x264];
        if (applicationType === EIpbeApplicationType.AVDS2) {
            result.push(EIpbeVideoEncoder.AVC1, EIpbeVideoEncoder.QuickSync, EIpbeVideoEncoder.NVenc);
        }
        if (applicationType === EIpbeApplicationType.Sdi2Web) {
            result.push(EIpbeVideoEncoder.VP8);
        }
        return result;
    }, [applicationType]);

    const presetValues = useMemo(() => {
        if (applicationType === EIpbeApplicationType.IPBE) {
            return [EIpbePreset.superfast];
        } else {
            return Object.values(EIpbePreset);
        }
    }, [applicationType]);

    const videoBitrateEnding = useMemo(() => {
        if (typeof values.videoBitrate === "number") {
            return fpsEnding(values.videoBitrate);
        } else {
            return "";
        }
    }, [values.videoBitrate]);

    const vbvBufsizeEnding = useMemo(() => {
        if (typeof values.vbvBufsize === "number") {
            return fpsEnding(values.vbvBufsize);
        } else {
            return "";
        }
    }, [values.vbvBufsize]);

    const vbvMaxrateEnding = useMemo(() => {
        if (typeof values.vbvMaxrate === "number") {
            return fpsEnding(values.vbvMaxrate);
        } else {
            return "";
        }
    }, [values.vbvMaxrate]);

    const changePresetHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.changePreset(e.target.value as EIpbePreset));
        },
        [dispatch]
    );

    const changeProfileHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.changeProfile(e.target.value as EIpbeProfile));
        },
        [dispatch]
    );

    const changeLevelHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.changeLevel(e.target.value as ValueOf<typeof EIpbeLevel>));
        },
        [dispatch]
    );

    const changeVBitrateHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            dispatch(ipbeEditActions.changeVBitrate(value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeMaxRefsHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.changeMaxRefs(e.target.value as number));
        },

        [dispatch]
    );

    const changeThreadHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.changeThread(e.target.value as number));
        },
        [dispatch]
    );

    const changeScenecutThresholdHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            if (typeof value === "number" && !isNaN(value)) {
                dispatch(ipbeEditActions.changeScenecutThreshold(value));
            }
            if (!e.currentTarget.value) {
                dispatch(ipbeEditActions.changeScenecutThreshold(undefined));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeAspectRatioHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.changeAspectRatio(e.target.value as EIpbeAspectRatio));
        },
        [dispatch]
    );

    const changeBFrameAdaptiveHandler = useCallback(
        (e) => {
            dispatch(ipbeEditActions.changeBFrameAdaptive());
        },
        [dispatch]
    );

    const interlaced = useMemo(() => {
        const keys = Object.keys(EIpbeInterlaced) as Array<keyof typeof EIpbeInterlaced>;
        const result = keys.find((key) => EIpbeInterlaced[key] === values.interlaced);
        if (result) {
            return result;
        }
        return "";
    }, [values.interlaced]);

    const changeInterlacedHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as keyof typeof EIpbeInterlaced;
            const result = EIpbeInterlaced[value];
            dispatch(ipbeEditActions.changeInterlaced(result));
        },
        [dispatch]
    );

    const changeVBVMaxrateHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            dispatch(ipbeEditActions.changeVBVMaxrate(value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeVBVBufsizeHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            dispatch(ipbeEditActions.changeVBVBufsize(value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeKeyintHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            if (value || !e.currentTarget.value) {
                dispatch(ipbeEditActions.changeKeyint(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeBFramesHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            if (value || !e.currentTarget.value) {
                dispatch(ipbeEditActions.changeBframes(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeLookaheadHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            if (value || !e.currentTarget.value) {
                dispatch(ipbeEditActions.changeLookahead(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeIntraRefreshHandler = useCallback(() => {
        dispatch(ipbeEditActions.changeIntraRefresh());
    }, [dispatch]);

    const changeCbrHandler = useCallback(() => {
        dispatch(ipbeEditActions.changeCbr());
    }, [dispatch]);

    const changeOpenGopHandler = useCallback(() => {
        dispatch(ipbeEditActions.changeOpenGop());
    }, [dispatch]);

    useEffect(() => {
        if (applicationType === EIpbeApplicationType.AVDS2 && values.videoEncoder === EIpbeVideoEncoder.VP8) {
            dispatch(ipbeEditActions.changeVideoEncoder(EIpbeVideoEncoder.AVC1));
        }
        if (applicationType === EIpbeApplicationType.IPBE && values.videoEncoder !== EIpbeVideoEncoder.x264) {
            dispatch(ipbeEditActions.changeVideoEncoder(EIpbeVideoEncoder.x264));
        }
        if (
            applicationType === EIpbeApplicationType.Sdi2Web &&
            values.videoEncoder !== EIpbeVideoEncoder.VP8 &&
            values.videoEncoder !== EIpbeVideoEncoder.x264
        ) {
            dispatch(ipbeEditActions.changeVideoEncoder(EIpbeVideoEncoder.VP8));
        }
    }, [applicationType, values.videoEncoder, dispatch]);

    useEffect(() => {
        if (applicationType === EIpbeApplicationType.IPBE && values.preset !== EIpbePreset.superfast) {
            dispatch(ipbeEditActions.changePreset(EIpbePreset.superfast));
        }
    }, [applicationType, values.preset, dispatch]);

    return (
        <>
            <Columns gap={24} col={2}>
                <Dropdown
                    label="Video Encoder"
                    onChange={changeVideoEncoderHandler}
                    values={videoEncoderValues}
                    value={values.videoEncoder || ""}
                    error={errors.videoEncoder.error}
                    helperText={errors.videoEncoder.helperText}
                />
                <Dropdown
                    label="Preset"
                    onChange={changePresetHandler}
                    value={values.preset || ""}
                    values={presetValues}
                />
                <Dropdown
                    label="Profile"
                    onChange={changeProfileHandler}
                    values={Object.values(EIpbeProfile)}
                    value={values.profile || ""}
                />
                <Dropdown
                    label="Level"
                    onChange={changeLevelHandler}
                    value={levelValue}
                    values={Object.values(EIpbeLevel)}
                />
            </Columns>
            <Columns gap={24} col={3}>
                <InputText
                    label="Vbitrate"
                    onChange={changeVBitrateHandler}
                    value={values.videoBitrate?.toString() || ""}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">{videoBitrateEnding}</InputAdornment>,
                    }}
                    error={errors.videoBitrate.error}
                    helperText={errors.videoBitrate.helperText}
                />
                <InputText
                    label="Vbv Maxrate"
                    onChange={changeVBVMaxrateHandler}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">{vbvMaxrateEnding}</InputAdornment>,
                    }}
                    value={values.vbvMaxrate?.toString() || ""}
                    error={errors.vbvMaxrate.error}
                    helperText={errors.vbvMaxrate.helperText}
                />
                <InputText
                    label="Vbv Bufsize"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">{vbvBufsizeEnding}</InputAdornment>,
                    }}
                    value={values.vbvBufsize?.toString() || ""}
                    onChange={changeVBVBufsizeHandler}
                    error={errors.vbvBufsize.error}
                    helperText={errors.vbvBufsize.helperText}
                />
                <Dropdown
                    label="Aspect Ratio"
                    value={values.aspectRatio}
                    values={Object.values(EIpbeAspectRatio)}
                    onChange={changeAspectRatioHandler}
                />
                <InputText
                    label="Keyint"
                    value={values.keyint}
                    onChange={changeKeyintHandler}
                    error={errors.keyint.error}
                    helperText={errors.keyint.helperText}
                />
                <InputText
                    label="Bframes"
                    value={values.bframes || ""}
                    onChange={changeBFramesHandler}
                    error={errors.bframes.error}
                    helperText={errors.bframes.helperText}
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
                    value={values.lookahead || ""}
                    error={errors.lookahead.error}
                    helperText={errors.lookahead.helperText}
                />
                <InputText
                    label="Scenecut Threshold"
                    value={values.scenecutThreshold?.toString() || ""}
                    onChange={changeScenecutThresholdHandler}
                    error={errors.scenecutThreshold.error}
                    helperText={errors.scenecutThreshold.helperText}
                />
            </Columns>
            <Columns gap={24} col={2}>
                <CheckboxComponent
                    checkId="checkBFrame"
                    className="switch label-startvalign-center"
                    labelText="B-Frame Adaptive"
                    checked={!!values.bFrameAdaptive}
                    onClick={changeBFrameAdaptiveHandler}
                />
                <CheckboxComponent
                    checkId="checkOpenGop"
                    className="switch label-startvalign-center"
                    labelText="Open Gop"
                    checked={!!values.openGop}
                    onClick={changeOpenGopHandler}
                />
            </Columns>
            <Columns gap={24} col={3}>
                <Dropdown
                    label="Interlaced"
                    onChange={changeInterlacedHandler}
                    value={interlaced}
                    values={Object.keys(EIpbeInterlaced)}
                />
                <CheckboxComponent
                    checkId="checkRefresh"
                    className="switch label-startvalign-center"
                    labelText="Cbr"
                    checked={!!values.cbr}
                    onClick={changeCbrHandler}
                />
                <CheckboxComponent
                    checkId="checkRefresh"
                    className="switch label-startvalign-center"
                    labelText="Intra Refresh"
                    checked={!!values.intraRefresh}
                    onClick={changeIntraRefreshHandler}
                />
            </Columns>

            <Dropdown
                label="Threads"
                value={values.threads?.toString() || ""}
                values={threadsValues}
                onChange={changeThreadHandler}
            />
        </>
    );
};
