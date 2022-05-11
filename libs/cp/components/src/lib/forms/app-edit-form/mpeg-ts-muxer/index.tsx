import {ChangeEventHandler, FC, useCallback} from "react";
import {InputText, Dropdown} from "@nxt-ui/components";
import {Columns, FlexHolder} from "../../../containers";
import {SignalBox} from "../../../index";
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
    changeVideoPid,
} from "../reducers";
import {EMuxer} from "@nxt-ui/cp/types";

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
    } = props;
    const cardIdxSel = ["1", "2"];

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
            if (value) {
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
            if (value) {
                dispatch?.(changePmtPid(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changePmtPeriodHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            if (value) {
                dispatch?.(changePmtPeriod(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changePcrPidHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            if (value) {
                dispatch?.(changePcrPid(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changePcrPeriodHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            if (value) {
                dispatch?.(changePcrPeriod(value));
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
                <Dropdown label="MUXER" value={muxer} />
                <InputText label="Muxrate" value={muxrate} />
                <InputText label="SERVICE NAME" value={serviceName} />
                <InputText label="Service Provider" value={serviceProvider} />
                <InputText label="Program number" value={programNumber} />
                <InputText label="Video Pid" value={videoPid} />
            </Columns>
            <InputText label="Audio Pid (separate with comma)" />
            <Columns gap={24} col={4}>
                <InputText label="PMT Pid" value={pmtPid} />
                <InputText label="PMT Period" value={pmtPeriod} />
                <InputText label="PCR Pid" value={pcrPid} />
                <InputText label="PCR Period" value={pcrPeriod} />
            </Columns>
            <Columns gap={24} col={2}>
                <InputText label="TS ID" value={tsId} />
                <InputText label="SCTE (pid=N)" value={addScte} />
            </Columns>
            <FlexHolder className="card-idx-holder">
                <Dropdown label="CARD IDX" values={cardIdxSel} value="2" />
                <SignalBox />
            </FlexHolder>
        </>
    );
};
