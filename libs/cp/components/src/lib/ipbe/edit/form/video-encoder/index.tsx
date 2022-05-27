import {ChangeEventHandler, FC, useCallback, useMemo} from "react";
import {InputText, Dropdown, CheckboxComponent} from "@nxt-ui/components";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {
    EIpbeAspectRatio,
    EIpbeBFrameAdaptive,
    EIpbeInterlaced,
    EIpbeLatency,
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

export const VideoEncoder: FC = () => {
    const dispatch = useDispatch();
    const {errors, values} = useSelector(ipbeEditSelectors.selectIpbeEditVideoEncoder);
    const maxRefsValue = useMemo(() => {
        if (values.maxRefs === 0) {
            return "0";
        } else {
            return values.maxRefs;
        }
    }, [values.maxRefs]);

    const bFrameAdaptiveValue = useMemo(() => {
        if (!values.bFrameAdaptive && typeof values.bFrameAdaptive !== "number") {
            return "";
        }

        const value = Object.keys(EIpbeBFrameAdaptive).find((key) => {
            return EIpbeBFrameAdaptive[key as keyof typeof EIpbeBFrameAdaptive] === values.bFrameAdaptive;
        });

        if (!value || typeof values.bFrameAdaptive !== "number") {
            return "";
        }
        return value;
    }, [values.bFrameAdaptive]);

    const interlacedValue = useMemo(() => {
        if (!values.interlaced && typeof values.interlaced !== "number") {
            return "";
        }

        const value = Object.keys(EIpbeLatency).find((key) => {
            return EIpbeInterlaced[key as keyof typeof EIpbeInterlaced] === values.interlaced;
        });

        if (!value || typeof values.interlaced !== "number") {
            return "";
        }
        return value;
    }, [values.interlaced]);

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
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.changeVBitrate(e.target.value as number));
        },

        [dispatch]
    );

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

    const changeInterlacedHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.changeInterlaced(e.target.value as EIpbeInterlaced));
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
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.changeBFrameAdaptive(e.target.value as EIpbeBFrameAdaptive));
        },

        [dispatch]
    );

    const changeVBVMaxrateHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            if (value || !e.currentTarget.value) {
                dispatch(ipbeEditActions.changeVBVMaxrate(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeVBVBufsizeHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            if (value || !e.currentTarget.value) {
                dispatch(ipbeEditActions.changeVBVBufsize(value));
            }
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

    return (
        <>
            <Columns gap={24} col={2}>
                <Dropdown
                    label="Video Encoder"
                    onChange={changeVideoEncoderHandler}
                    values={Object.values(EIpbeVideoEncoder)}
                    value={values.videoEncoder || ""}
                />
                <Dropdown
                    label="Preset"
                    onChange={changePresetHandler}
                    value={values.preset || ""}
                    values={Object.values(EIpbePreset)}
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
                <Dropdown
                    label="Vbitrate"
                    onChange={changeVBitrateHandler}
                    value={values.vbitrate}
                    values={[128, 192, 256, 384]}
                />
                <InputText
                    label="Vbv Maxrate"
                    onChange={changeVBVMaxrateHandler}
                    value={values.vbvMaxrate || ""}
                    error={errors.vbvMaxrateError.error}
                    helperText={errors.vbvMaxrateError.helperText}
                />
                <InputText
                    label="Vbv Bufsize"
                    value={values.vbvBufsize || ""}
                    onChange={changeVBVBufsizeHandler}
                    error={errors.vbvBufsizeError.error}
                    helperText={errors.vbvBufsizeError.helperText}
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
                    error={errors.keyintError.error}
                    helperText={errors.keyintError.helperText}
                />
                <InputText
                    label="Bframes"
                    value={values.bframes || ""}
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
                    value={values.lookahead || ""}
                    error={errors.lookaheadError.error}
                    helperText={errors.lookaheadError.helperText}
                />
                <CheckboxComponent
                    checkId="checkRefresh"
                    className="switch label-startvalign-center"
                    labelText="Open Gop"
                    checked={values.openGop}
                    onClick={changeOpenGopHandler}
                />
            </Columns>
            <Columns gap={24} col={2}>
                <Dropdown
                    label="B-Frame Adaptive"
                    onChange={changeBFrameAdaptiveHandler}
                    value={bFrameAdaptiveValue}
                    values={Object.keys(EIpbeBFrameAdaptive)}
                />
                <InputText
                    label="Scenecut Threshold"
                    value={values.scenecutThreshold?.toString() || ""}
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
                    values={Object.keys(EIpbeInterlaced)}
                />
                <CheckboxComponent
                    checkId="checkRefresh"
                    className="switch label-startvalign-center"
                    labelText="Cbr"
                    checked={values.cbr}
                    onClick={changeCbrHandler}
                />
                <CheckboxComponent
                    checkId="checkRefresh"
                    className="switch label-startvalign-center"
                    labelText="Intra Refresh"
                    checked={values.intraRefresh}
                    onClick={changeIntraRefreshHandler}
                />
            </Columns>

            <Dropdown
                label="Threads"
                value={values.threads || ""}
                values={threadsValues}
                onChange={changeThreadHandler}
            />
        </>
    );
};
