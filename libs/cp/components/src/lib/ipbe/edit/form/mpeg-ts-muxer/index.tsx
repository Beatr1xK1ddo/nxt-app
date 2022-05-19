import {ChangeEventHandler, FC, useCallback} from "react";
import {InputText, Dropdown} from "@nxt-ui/components";

import {IMpegTsMuxerProps} from "../types";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {
    changeAddScte,
    changeAudioPid,
    changeMuxer,
    changeMuxrate,
    changePcrPeriod,
    changePcrPid,
    changePmtPeriod,
    changePmtPid,
    changeProgramNumber,
    changeServiceName,
    changeServiceProvider,
    changeTsId,
    changeVideoPid,
} from "../reducers";
import {EMuxer} from "@nxt-ui/cp/types";
import {Columns} from "../../../../common";

export const MpegTsMuxer: FC<IMpegTsMuxerProps> = (props) => {
    const {
        dispatch,
        muxrate,
        muxer,
        serviceName,
        serviceProvider,
        programNumber,
        videoPid,
        pmtPid,
        pmtPeriod,
        pcrPeriod,
        pcrPid,
        tsId,
        addScte,
        errors,
    } = props;

    const changeMuxerHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch?.(changeMuxer(e.target.value as EMuxer));
        },
        [dispatch]
    );
    const changeMuxrateHandler = useCallback(
        (e) => {
            dispatch?.(changeMuxrate(e.target.value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeServiceNameHandler = useCallback(
        (e) => {
            dispatch?.(changeServiceName(e.target.value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeServiceProviderHandler = useCallback(
        (e) => {
            dispatch?.(changeServiceProvider(e.target.value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeProgramNumberHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            if (!e.target.value) {
                dispatch?.(changeProgramNumber(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeVideoPidHandler = useCallback(
        (e) => {
            dispatch?.(changeVideoPid(e.target.value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeAudioPidHandler = useCallback(
        (e) => {
            dispatch?.(changeAudioPid(e.target.value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changePmtPidHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            if (!e.target.value) {
                dispatch?.(changePmtPid(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changePmtPeriodHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            if (!e.target.value) {
                dispatch?.(changePmtPeriod(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changePcrPidHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            if (!e.target.value) {
                dispatch?.(changePcrPid(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changePcrPeriodHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            if (!e.target.value) {
                dispatch?.(changePcrPeriod(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeTsIdHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            if (!e.target.value) {
                dispatch?.(changeTsId(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeAddScteHandler = useCallback(
        (e) => {
            dispatch?.(changeAddScte(e.target.value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    return (
        <>
            <Columns gap={24} col={2}>
                <Dropdown label="MUXER" value={muxer} values={Object.values(EMuxer)} onChange={changeMuxerHandler} />
                <InputText label="Muxrate" value={muxrate || ""} onChange={changeMuxrateHandler} />
                <InputText label="SERVICE NAME" value={serviceName || ""} onChange={changeServiceNameHandler} />
                <InputText
                    label="Service Provider"
                    value={serviceProvider || ""}
                    onChange={changeServiceProviderHandler}
                />
                <InputText
                    label="Program number"
                    value={programNumber?.toString() || ""}
                    onChange={changeProgramNumberHandler}
                    error={errors.programNumberError.error}
                    helperText={errors.programNumberError.helperText}
                />
                <InputText label="Video Pid" value={videoPid} onChange={changeVideoPidHandler} />
            </Columns>
            <InputText label="Audio Pid (separate with comma)" />
            <Columns gap={24} col={4}>
                <InputText
                    label="PMT Pid"
                    value={pmtPid}
                    onChange={changePmtPidHandler}
                    error={errors.pmtPidError.error}
                    helperText={errors.pmtPidError.helperText}
                />
                <InputText label="PMT Period" value={pmtPeriod} onChange={changePmtPeriodHandler} />
                <InputText
                    label="PCR Pid"
                    value={pcrPid}
                    onChange={changePcrPidHandler}
                    error={errors.pcrPidError.error}
                    helperText={errors.pcrPidError.helperText}
                />
                <InputText
                    label="PCR Period"
                    value={pcrPeriod}
                    onChange={changePcrPeriodHandler}
                    error={errors.pcrPeriodError.error}
                    helperText={errors.pcrPeriodError.helperText}
                />
            </Columns>
            <Columns gap={24} col={2}>
                <InputText
                    label="TS ID"
                    value={tsId}
                    onChange={changeTsIdHandler}
                    error={errors.tsIdError.error}
                    helperText={errors.tsIdError.helperText}
                />
                <InputText label="SCTE (pid=N)" value={addScte} onChange={changeAddScteHandler} />
            </Columns>
        </>
    );
};
