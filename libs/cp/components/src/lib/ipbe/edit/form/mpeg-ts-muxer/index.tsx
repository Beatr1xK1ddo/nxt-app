import {ChangeEventHandler, FC, useCallback, useEffect, useMemo} from "react";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {InputText, Dropdown} from "@nxt-ui/components";
import {Columns, FlexHolder} from "../../../../common";
import {EIpbeApplicationType, EIpbeMuxer, EIpbeOutputType} from "@nxt-ui/cp/types";
import {useDispatch, useSelector} from "react-redux";
import {ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";
import InputAdornment from "@mui/material/InputAdornment";
import {bitrateEndings} from "@nxt-ui/cp/utils";

export const MpegTsMuxer: FC = () => {
    const dispatch = useDispatch();
    const values = useSelector(ipbeEditSelectors.mpegTsMuxer.values);
    const audioEncoders = useSelector(ipbeEditSelectors.audioEncoder.values);
    const outputType = useSelector(ipbeEditSelectors.main.outputType);
    const applicationType = useSelector(ipbeEditSelectors.main.applicationType);
    const errors = useSelector(ipbeEditSelectors.mpegTsMuxer.errors);
    const changeMuxerHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.setMuxer(e.target.value as EIpbeMuxer));
        },
        [dispatch]
    );
    const changeMuxrateHandler = useCallback(
        (e) => {
            dispatch(ipbeEditActions.setMuxrate(e.target.value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeServiceNameHandler = useCallback(
        (e) => {
            dispatch(ipbeEditActions.setServiceName(e.target.value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeServiceProviderHandler = useCallback(
        (e) => {
            dispatch(ipbeEditActions.setServiceProvider(e.target.value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeProgramNumberHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            if (value || (typeof value === "number" && !isNaN(value))) {
                dispatch(ipbeEditActions.setProgramNumber(value));
            } else {
                dispatch(ipbeEditActions.setProgramNumber(null));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeVideoPidHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            dispatch(ipbeEditActions.setVideoPid(value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeAudioPidHandler = useCallback(
        (index: number) => (e) => {
            const value = parseInt(e.target.value);
            dispatch(ipbeEditActions.setAudioPid({index, value}));
        },
        [dispatch]
    ) as (index: number) => ChangeEventHandler<HTMLInputElement>;

    const changePmtPidHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            if (value || (typeof value === "number" && !isNaN(value))) {
                dispatch(ipbeEditActions.setPmtPid(value));
            } else {
                dispatch(ipbeEditActions.setPmtPid(null));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changePmtPeriodHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            if (typeof value === "number" && !isNaN(value)) {
                dispatch(ipbeEditActions.setPmtPeriod(value));
            } else {
                dispatch(ipbeEditActions.setPmtPeriod(null));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changePcrPidHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            if (typeof value === "number" && !isNaN(value)) {
                dispatch(ipbeEditActions.setPcrPid(value));
            } else {
                dispatch(ipbeEditActions.setPcrPid(null));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changePcrPeriodHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            if (typeof value === "number" && !isNaN(value)) {
                dispatch(ipbeEditActions.setPcrPeriod(value));
            } else {
                dispatch(ipbeEditActions.setPcrPeriod(null));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeTsIdHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            if (value && !isNaN(value)) {
                dispatch(ipbeEditActions.setTsId(value));
            } else {
                dispatch(ipbeEditActions.setTsId(null));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeAddScteHandler = useCallback(
        (e) => {
            dispatch(ipbeEditActions.setAddScte(e.target.value));
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

    const muxrateEnding = useMemo(() => {
        return bitrateEndings(values.muxrate);
    }, [values.muxrate]);

    useEffect(() => {
        if (applicationType === EIpbeApplicationType.IPBE && values.muxer !== EIpbeMuxer.libmpegts) {
            dispatch(ipbeEditActions.setMuxer(EIpbeMuxer.libmpegts));
        }
        if (applicationType === EIpbeApplicationType.AVDS2 && values.muxer !== EIpbeMuxer.mainconcept) {
            dispatch(ipbeEditActions.setMuxer(EIpbeMuxer.mainconcept));
        }
    }, [dispatch, applicationType, values.muxer]);

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
                    label="MUXRATE"
                    value={values.muxrate || ""}
                    onChange={changeMuxrateHandler}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">{muxrateEnding}</InputAdornment>,
                    }}
                    disabled={disabled}
                    error={errors.muxrate.error}
                    helperText={errors.muxrate.helperText}
                />
                <InputText
                    label="SERVICE NAME"
                    value={values.serviceName || ""}
                    onChange={changeServiceNameHandler}
                    disabled={disabled}
                />
                <InputText
                    label="SERVICE PROVIDER"
                    value={values.serviceProvider?.toString() || ""}
                    onChange={changeServiceProviderHandler}
                    disabled={disabled}
                />
                <InputText
                    label="PROGRAM NUMBER"
                    value={values.programNumber?.toString() || ""}
                    onChange={changeProgramNumberHandler}
                    error={errors.programNumber.error}
                    helperText={errors.programNumber.helperText}
                    disabled={disabled}
                />
                <InputText
                    label="VIDEO PID"
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
                            label={`AUDIO PID ${i + 1}`}
                            value={item.pid?.toString() || ""}
                            onChange={changeAudioPidHandler(i)}
                            disabled={disabled}
                        />
                    ))}
                </FlexHolder>
            ) : null}

            <Columns gap={24} col={4}>
                <InputText
                    label="PMT PID"
                    value={values.pmtPid?.toString() || ""}
                    onChange={changePmtPidHandler}
                    error={errors.pmtPid.error}
                    helperText={errors.pmtPid.helperText}
                    disabled={disabled}
                />
                <InputText
                    label="PMT PERIOD"
                    value={values.pmtPeriod?.toString() || ""}
                    error={errors.pmtPeriod.error}
                    helperText={errors.pmtPeriod.helperText}
                    onChange={changePmtPeriodHandler}
                    disabled={disabled}
                />
                <InputText
                    label="PCR PID"
                    value={values.pcrPid?.toString() || ""}
                    onChange={changePcrPidHandler}
                    error={errors.pcrPid.error}
                    helperText={errors.pcrPid.helperText}
                    disabled={disabled}
                />
                <InputText
                    label="PCR PERIOD"
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
                    label="SCTE PID"
                    value={values.addScte?.toString() || ""}
                    onChange={changeAddScteHandler}
                    disabled={disabled}
                />
            </Columns>
        </>
    );
};
