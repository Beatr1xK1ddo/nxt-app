import {ChangeEventHandler, FC, useCallback, useMemo} from "react";
import {InputText, Dropdown, CheckboxComponent} from "@nxt-ui/components";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {
    EIpbeApplicationType,
    EIpbeAspectRatio,
    EIpbeFieldOrder,
    EIpbeInterlaced,
    EIpbeLevel,
    EIpbePreset,
    EIpbeProfile,
    EIpbeVideoEncoder,
    ValueOf,
} from "@nxt-ui/cp/types";
import {Columns} from "../../../../common";
import {useDispatch, useSelector} from "react-redux";
import {ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import {maxRefsValues, threadsValues} from "@nxt-ui/cp/constants";
import {SelectBFrames} from "./SelectBFrames";
import {bitrateEndings} from "@nxt-ui/cp/utils";
import {SelectVideoEncoder} from "./SelectVideoEncoder";
export const VideoEncoder: FC = () => {
    const dispatch = useDispatch();
    const values = useSelector(ipbeEditSelectors.videoEncoder.values);
    const errors = useSelector(ipbeEditSelectors.videoEncoder.errors);
    const applicationType = useSelector(ipbeEditSelectors.main.applicationType);
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
            dispatch(ipbeEditActions.setVideoEncoder(e.target.value as EIpbeVideoEncoder));
        },
        [dispatch]
    );

    const presetValues = useMemo(() => {
        if (applicationType === EIpbeApplicationType.IPBE) {
            return [EIpbePreset.superfast];
        } else {
            return Object.values(EIpbePreset);
        }
    }, [applicationType]);

    const changePresetHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.setPreset(e.target.value as EIpbePreset));
        },
        [dispatch]
    );

    const changeProfileHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.setProfile(e.target.value as EIpbeProfile));
        },
        [dispatch]
    );

    const changeLevelHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.setLevel(e.target.value as ValueOf<typeof EIpbeLevel>));
        },
        [dispatch]
    );

    const changeVBitrateHandler = useCallback(
        (e) => {
            dispatch(ipbeEditActions.setVBitrate(e.target.value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeMaxRefsHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.setMaxRefs(e.target.value as number));
        },

        [dispatch]
    );

    const changeThreadHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.setThread(e.target.value as number));
        },
        [dispatch]
    );

    const changeScenecutThresholdHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            if (typeof value === "number" && !isNaN(value)) {
                dispatch(ipbeEditActions.setScenecutThreshold(value));
            }
            if (!e.currentTarget.value) {
                dispatch(ipbeEditActions.setScenecutThreshold(undefined));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeAspectRatioHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.setAspectRatio(e.target.value as EIpbeAspectRatio));
        },
        [dispatch]
    );

    const changeBFrameAdaptiveHandler = useCallback(
        (e) => {
            dispatch(ipbeEditActions.setBFrameAdaptive());
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
            dispatch(ipbeEditActions.setInterlaced(result));
        },
        [dispatch]
    );

    const changeFieldOrderHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as keyof typeof EIpbeFieldOrder;
            const result = EIpbeFieldOrder[value];
            dispatch(ipbeEditActions.setFieldOrder(result));
        },
        [dispatch]
    );

    const changeVBVMaxrateHandler = useCallback(
        (e) => {
            dispatch(ipbeEditActions.setVBVMaxrate(e.target.value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeVBVBufsizeHandler = useCallback(
        (e) => {
            dispatch(ipbeEditActions.setVBVBufsize(e.target.value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeKeyintHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            if (value || !e.currentTarget.value) {
                dispatch(ipbeEditActions.setKeyint(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeBFramesHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as number;
            dispatch(ipbeEditActions.setBframes(value));
        },
        [dispatch]
    );

    const videoBitrateEnding = useMemo(() => {
        return bitrateEndings(values.videoBitrate);
    }, [values.videoBitrate]);

    const vbvMaxrateEnding = useMemo(() => {
        return bitrateEndings(values.vbvMaxrate);
    }, [values.vbvMaxrate]);

    const vbvBufsizeEnding = useMemo(() => {
        return bitrateEndings(values.vbvBufsize);
    }, [values.vbvBufsize]);

    const changeLookaheadHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            if (value || !e.currentTarget.value) {
                dispatch(ipbeEditActions.setLookahead(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeIntraRefreshHandler = useCallback(() => {
        dispatch(ipbeEditActions.setIntraRefresh());
    }, [dispatch]);

    const changeCbrHandler = useCallback(() => {
        dispatch(ipbeEditActions.setCbr());
    }, [dispatch]);

    const changeOpenGopHandler = useCallback(() => {
        dispatch(ipbeEditActions.setOpenGop());
    }, [dispatch]);

    return (
        <>
            <Columns gap={24} col={2}>
                <SelectVideoEncoder
                    label="Video Encoder"
                    onChange={changeVideoEncoderHandler}
                    value={values.videoEncoder}
                    error={errors.videoEncoder.error}
                    helperText={errors.videoEncoder.helperText}
                />
                <Dropdown
                    label="Preset"
                    onChange={changePresetHandler}
                    value={values.preset || ""}
                    values={presetValues}
                    error={errors.preset.error}
                    helperText={errors.preset.helperText}
                />
                <Dropdown
                    label="Profile"
                    onChange={changeProfileHandler}
                    values={Object.values(EIpbeProfile)}
                    value={values.profile || ""}
                    error={errors.profile.error}
                    helperText={errors.profile.helperText}
                />
                <Dropdown
                    label="Level"
                    onChange={changeLevelHandler}
                    value={levelValue}
                    values={Object.values(EIpbeLevel)}
                    error={errors.level.error}
                    helperText={errors.level.helperText}
                />
            </Columns>
            <Columns gap={24} col={3}>
                <InputText
                    label="Bitrate"
                    onChange={changeVBitrateHandler}
                    value={values.videoBitrate || ""}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">{videoBitrateEnding}</InputAdornment>,
                    }}
                    error={errors.videoBitrate.error}
                    helperText={errors.videoBitrate.helperText}
                />
                <InputText
                    label="VBV Maxrate"
                    onChange={changeVBVMaxrateHandler}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">{vbvMaxrateEnding}</InputAdornment>,
                    }}
                    value={values.vbvMaxrate || ""}
                    error={errors.vbvMaxrate.error}
                    helperText={errors.vbvMaxrate.helperText}
                />
                <InputText
                    label="VBV Bufsize"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">{vbvBufsizeEnding}</InputAdornment>,
                    }}
                    value={values.vbvBufsize || ""}
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
                <SelectBFrames
                    label="Bframes"
                    value={values.bframes}
                    onChange={changeBFramesHandler}
                    error={errors.bframes.error}
                    helperText={errors.bframes.helperText}
                />
                <Dropdown
                    label="Max Refs"
                    onChange={changeMaxRefsHandler}
                    value={maxRefsValue || ""}
                    values={maxRefsValues}
                    error={errors.maxRefs.error}
                    helperText={errors.maxRefs.helperText}
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
            <Columns gap={24} col={values.interlaced === EIpbeInterlaced.yes ? 3 : 2}>
                <Dropdown
                    label="Interlaced"
                    onChange={changeInterlacedHandler}
                    value={interlaced}
                    values={Object.keys(EIpbeInterlaced)}
                />
                {values.interlaced === EIpbeInterlaced.yes && (
                    <Dropdown
                        label="Field Order"
                        onChange={changeFieldOrderHandler}
                        value={values.fieldOrder || EIpbeFieldOrder["top first"]}
                        values={Object.keys(EIpbeFieldOrder)}
                    />
                )}
                <Dropdown
                    label="Threads"
                    value={values.threads?.toString() || ""}
                    values={threadsValues}
                    onChange={changeThreadHandler}
                />
            </Columns>
            <Columns gap={15} col={4}>
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

                <CheckboxComponent
                    checkId="checkCbr"
                    className="switch label-startvalign-center"
                    labelText="Cbr"
                    checked={!!values.cbr}
                    onClick={changeCbrHandler}
                />
                <CheckboxComponent
                    checkId="checkIntra"
                    className="switch label-startvalign-center"
                    labelText="Intra Refresh"
                    checked={!!values.intraRefresh}
                    onClick={changeIntraRefreshHandler}
                />
            </Columns>
        </>
    );
};
