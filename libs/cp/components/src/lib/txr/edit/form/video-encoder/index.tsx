import {ChangeEventHandler, FC, useCallback, useMemo} from "react";
import {InputText, Dropdown, CheckboxComponent} from "@nxt-ui/components";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {
    ETxrApplicationType,
    ETxrAspectRatio,
    ETxrInterlaced,
    ETxrLevel,
    ETxrPreset,
    ETxrProfile,
    ETxrVideoEncoder,
    ValueOf,
} from "@nxt-ui/cp/types";
import {Columns} from "../../../../common";
import {useDispatch, useSelector} from "react-redux";
import {txrEditActions, txrEditSelectors} from "@nxt-ui/cp-redux";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import {maxRefsValues, threadsValues} from "@nxt-ui/cp/constants";
import {SelectBFrames} from "./SelectBFrames";
import {bitrateEndings} from "@nxt-ui/cp/utils";
import {SelectVideoEncoder} from "./SelectVideoEncoder";

export const VideoEncoder: FC = () => {
    const dispatch = useDispatch();
    const values = useSelector(txrEditSelectors.videoEncoder.values);
    const errors = useSelector(txrEditSelectors.videoEncoder.errors);
    const applicationType = useSelector(txrEditSelectors.main.applicationType);
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
            dispatch(txrEditActions.setVideoEncoder(e.target.value as ETxrVideoEncoder));
        },
        [dispatch]
    );

    const presetValues = useMemo(() => {
        if (applicationType === ETxrApplicationType.TXR) {
            return [ETxrPreset.superfast];
        } else {
            return Object.values(ETxrPreset);
        }
    }, [applicationType]);

    const changePresetHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(txrEditActions.setPreset(e.target.value as ETxrPreset));
        },
        [dispatch]
    );

    const changeProfileHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(txrEditActions.setProfile(e.target.value as ETxrProfile));
        },
        [dispatch]
    );

    const changeLevelHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(txrEditActions.setLevel(e.target.value as ValueOf<typeof ETxrLevel>));
        },
        [dispatch]
    );

    const changeVBitrateHandler = useCallback(
        (e) => {
            dispatch(txrEditActions.setVBitrate(e.target.value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeMaxRefsHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(txrEditActions.setMaxRefs(e.target.value as number));
        },

        [dispatch]
    );

    const changeThreadHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(txrEditActions.setThread(e.target.value as number));
        },
        [dispatch]
    );

    const changeScenecutThresholdHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            if (typeof value === "number" && !isNaN(value)) {
                dispatch(txrEditActions.setScenecutThreshold(value));
            }
            if (!e.currentTarget.value) {
                dispatch(txrEditActions.setScenecutThreshold(undefined));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeAspectRatioHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(txrEditActions.setAspectRatio(e.target.value as ETxrAspectRatio));
        },
        [dispatch]
    );

    const changeBFrameAdaptiveHandler = useCallback(
        (e) => {
            dispatch(txrEditActions.setBFrameAdaptive());
        },
        [dispatch]
    );

    const interlaced = useMemo(() => {
        const keys = Object.keys(ETxrInterlaced) as Array<keyof typeof ETxrInterlaced>;
        const result = keys.find((key) => ETxrInterlaced[key] === values.interlaced);
        if (result) {
            return result;
        }
        return "";
    }, [values.interlaced]);

    const changeInterlacedHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as keyof typeof ETxrInterlaced;
            const result = ETxrInterlaced[value];
            dispatch(txrEditActions.setInterlaced(result));
        },
        [dispatch]
    );

    const changeVBVMaxrateHandler = useCallback(
        (e) => {
            dispatch(txrEditActions.setVBVMaxrate(e.target.value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeVBVBufsizeHandler = useCallback(
        (e) => {
            dispatch(txrEditActions.setVBVBufsize(e.target.value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeKeyintHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            if (value || !e.currentTarget.value) {
                dispatch(txrEditActions.setKeyint(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeBFramesHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as number;
            dispatch(txrEditActions.setBframes(value));
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
                dispatch(txrEditActions.setLookahead(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeIntraRefreshHandler = useCallback(() => {
        dispatch(txrEditActions.setIntraRefresh());
    }, [dispatch]);

    const changeCbrHandler = useCallback(() => {
        dispatch(txrEditActions.setCbr());
    }, [dispatch]);

    const changeOpenGopHandler = useCallback(() => {
        dispatch(txrEditActions.setOpenGop());
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
                    values={Object.values(ETxrProfile)}
                    value={values.profile || ""}
                    error={errors.profile.error}
                    helperText={errors.profile.helperText}
                />
                <Dropdown
                    label="Level"
                    onChange={changeLevelHandler}
                    value={levelValue}
                    values={Object.values(ETxrLevel)}
                    error={errors.level.error}
                    helperText={errors.level.helperText}
                />
            </Columns>
            <Columns gap={24} col={3}>
                <InputText
                    label="Vbitrate"
                    onChange={changeVBitrateHandler}
                    value={values.videoBitrate || ""}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">{videoBitrateEnding}</InputAdornment>,
                    }}
                    error={errors.videoBitrate.error}
                    helperText={errors.videoBitrate.helperText}
                />
                <InputText
                    label="Vbv Maxrate"
                    onChange={changeVBVMaxrateHandler}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">{vbvMaxrateEnding}</InputAdornment>,
                    }}
                    value={values.vbvMaxrate || ""}
                    error={errors.vbvMaxrate.error}
                    helperText={errors.vbvMaxrate.helperText}
                />
                <InputText
                    label="Vbv Bufsize"
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
                    values={Object.values(ETxrAspectRatio)}
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
            <Columns gap={24} col={2}>
                <Dropdown
                    label="Interlaced"
                    onChange={changeInterlacedHandler}
                    value={interlaced}
                    values={Object.keys(ETxrInterlaced)}
                />
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
