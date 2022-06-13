import {ChangeEventHandler, FC, useCallback, useMemo} from "react";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {InputText, Dropdown} from "@nxt-ui/components";
import {Columns, FlexHolder} from "../../../../common";
import {EIpbeApplicationType, EIpbeMuxer, EIpbeOutputType} from "@nxt-ui/cp/types";
import {useDispatch, useSelector} from "react-redux";
import {ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";
import InputAdornment from "@mui/material/InputAdornment";

export const MpegTsMuxer: FC = () => {
    const dispatch = useDispatch();
    const values = useSelector(ipbeEditSelectors.selectMpegTsMuxerValues);
    const audioEncoders = useSelector(ipbeEditSelectors.selectAudioEncodersValues);
    const outputType = useSelector(ipbeEditSelectors.selectMainOutputType);
    const applicationType = useSelector(ipbeEditSelectors.selectAdvancedApplicationType);
    const errors = useSelector(ipbeEditSelectors.selectMpegTsMuxerErrors);
    const changeMuxerHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.changeMuxer(e.target.value as EIpbeMuxer));
        },
        [dispatch]
    );
    const changeMuxrateHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            dispatch(ipbeEditActions.changeMuxrate(value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeServiceNameHandler = useCallback(
        (e) => {
            dispatch(ipbeEditActions.changeServiceName(e.target.value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeServiceProviderHandler = useCallback(
        (e) => {
            dispatch(ipbeEditActions.changeServiceProvider(e.target.value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeProgramNumberHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            if (value || (typeof value === "number" && !isNaN(value))) {
                dispatch(ipbeEditActions.changeProgramNumber(value));
            } else {
                dispatch(ipbeEditActions.changeProgramNumber(null));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeVideoPidHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            dispatch(ipbeEditActions.changeVideoPid(value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeAudioPidHandler = useCallback(
        (index: number) => (e) => {
            const value = parseInt(e.target.value);
            dispatch(ipbeEditActions.changeAudioPid({index, value}));
        },
        [dispatch]
    ) as (index: number) => ChangeEventHandler<HTMLInputElement>;

    const changePmtPidHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            if (value || (typeof value === "number" && !isNaN(value))) {
                dispatch(ipbeEditActions.changePmtPid(value));
            } else {
                dispatch(ipbeEditActions.changePmtPid(null));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changePmtPeriodHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            if (typeof value === "number" && !isNaN(value)) {
                dispatch(ipbeEditActions.changePmtPeriod(value));
            } else {
                dispatch(ipbeEditActions.changePmtPeriod(null));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changePcrPidHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            if (typeof value === "number" && !isNaN(value)) {
                dispatch(ipbeEditActions.changePcrPid(value));
            } else {
                dispatch(ipbeEditActions.changePcrPid(null));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changePcrPeriodHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            if (typeof value === "number" && !isNaN(value)) {
                dispatch(ipbeEditActions.changePcrPeriod(value));
            } else {
                dispatch(ipbeEditActions.changePcrPeriod(null));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeTsIdHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            if (value && !isNaN(value)) {
                dispatch(ipbeEditActions.changeTsId(value));
            } else {
                dispatch(ipbeEditActions.changeTsId(null));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeAddScteHandler = useCallback(
        (e) => {
            dispatch(ipbeEditActions.changeAddScte(e.target.value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const disabled = useMemo(() => {
        if (outputType === EIpbeOutputType.rtp) {
            return true;
        }
        return false;
    }, [outputType]);

    const muxerValues = useMemo(() => {
        const result = [EIpbeMuxer.libmpegts];
        if (applicationType === EIpbeApplicationType.AVDS2) {
            result.push(EIpbeMuxer.mainconcept);
        }
        return result;
    }, [applicationType]);

    return (
        <>
            <Columns gap={24} col={2}>
                <Dropdown
                    label="MUXER"
                    value={values.muxer?.toString() || ""}
                    values={muxerValues}
                    onChange={changeMuxerHandler}
                    disabled={disabled}
                />
                <InputText
                    label="Muxrate"
                    value={values.muxrate || ""}
                    onChange={changeMuxrateHandler}
                    InputProps={{
                        // startAdornment: <InputAdornment position="start">{muxrateEnding}</InputAdornment>,
                        endAdornment: <InputAdornment position="end">kbps</InputAdornment>,
                    }}
                    disabled={disabled}
                />
                <InputText
                    label="SERVICE NAME"
                    value={values.serviceName || ""}
                    onChange={changeServiceNameHandler}
                    disabled={disabled}
                />
                <InputText
                    label="Service Provider"
                    value={values.serviceProvider?.toString() || ""}
                    onChange={changeServiceProviderHandler}
                    disabled={disabled}
                />
                <InputText
                    label="Program number"
                    value={values.programNumber?.toString() || ""}
                    onChange={changeProgramNumberHandler}
                    error={errors.programNumber.error}
                    helperText={errors.programNumber.helperText}
                    disabled={disabled}
                />
                <InputText
                    label="Video Pid"
                    value={values.videoPid?.toString() || ""}
                    onChange={changeVideoPidHandler}
                    disabled={disabled}
                />
            </Columns>
            {audioEncoders.length ? (
                <FlexHolder className="audio-pid-holder">
                    {audioEncoders.map((item, i) => (
                        <InputText
                            key={i}
                            label={`Audio Pid ${i + 1}`}
                            value={item.pid?.toString() || ""}
                            onChange={changeAudioPidHandler(i)}
                            disabled={disabled}
                        />
                    ))}
                </FlexHolder>
            ) : null}

            <Columns gap={24} col={4}>
                <InputText
                    label="PMT Pid"
                    value={values.pmtPid?.toString() || ""}
                    onChange={changePmtPidHandler}
                    error={errors.pmtPid.error}
                    helperText={errors.pmtPid.helperText}
                    disabled={disabled}
                />
                <InputText
                    label="PMT Period"
                    value={values.pmtPeriod?.toString() || ""}
                    error={errors.pmtPeriod.error}
                    helperText={errors.pmtPeriod.helperText}
                    onChange={changePmtPeriodHandler}
                    disabled={disabled}
                />
                <InputText
                    label="PCR Pid"
                    value={values.pcrPid?.toString() || ""}
                    onChange={changePcrPidHandler}
                    error={errors.pcrPid.error}
                    helperText={errors.pcrPid.helperText}
                    disabled={disabled}
                />
                <InputText
                    label="PCR Period"
                    value={values.pcrPeriod?.toString() || ""}
                    onChange={changePcrPeriodHandler}
                    error={errors.pcrPeriod.error}
                    helperText={errors.pcrPeriod.helperText}
                    disabled={disabled}
                />
            </Columns>
            <Columns gap={24} col={2}>
                <InputText
                    label="TS ID"
                    value={values.tsId?.toString() || ""}
                    onChange={changeTsIdHandler}
                    error={errors.tsId.error}
                    helperText={errors.tsId.helperText}
                    disabled={disabled}
                />
                <InputText
                    label="SCTE Pid"
                    value={values.addScte?.toString() || ""}
                    onChange={changeAddScteHandler}
                    disabled={disabled}
                />
            </Columns>
        </>
    );
};
