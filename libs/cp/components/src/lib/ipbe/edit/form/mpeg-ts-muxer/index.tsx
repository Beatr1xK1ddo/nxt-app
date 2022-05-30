import {ChangeEventHandler, FC, useCallback} from "react";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {InputText, Dropdown} from "@nxt-ui/components";
import {Columns, FlexHolder} from "../../../../common";
import {EIpbeMuxer} from "@nxt-ui/cp/types";
import {useDispatch, useSelector} from "react-redux";
import {ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";

export const MpegTsMuxer: FC = () => {
    const dispatch = useDispatch();
    const values = useSelector(ipbeEditSelectors.selectMpegTsMuxerValues);
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
                dispatch(ipbeEditActions.changeProgramNumber(undefined));
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
            // dispatch(ipbeEditActions.changeAudioPid());
        },
        [dispatch]
    ) as (index: number) => ChangeEventHandler<HTMLInputElement>;

    const changePmtPidHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            if (value || (typeof value === "number" && !isNaN(value))) {
                dispatch(ipbeEditActions.changePmtPid(value));
            } else {
                dispatch(ipbeEditActions.changePmtPid(undefined));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changePmtPeriodHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            if (!e.target.value) {
                dispatch(ipbeEditActions.changePmtPeriod(value));
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
                dispatch(ipbeEditActions.changePcrPid(undefined));
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
                dispatch(ipbeEditActions.changePcrPeriod(undefined));
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
                dispatch(ipbeEditActions.changeTsId(undefined));
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

    return (
        <>
            <Columns gap={24} col={2}>
                <Dropdown
                    label="MUXER"
                    value={values.muxer}
                    values={Object.values(EIpbeMuxer)}
                    onChange={changeMuxerHandler}
                />
                <InputText label="Muxrate" value={values.muxrate || ""} onChange={changeMuxrateHandler} />
                <InputText label="SERVICE NAME" value={values.serviceName || ""} onChange={changeServiceNameHandler} />
                <InputText
                    label="Service Provider"
                    value={values.serviceProvider || ""}
                    onChange={changeServiceProviderHandler}
                />
                <InputText
                    label="Program number"
                    value={values.programNumber?.toString() || ""}
                    onChange={changeProgramNumberHandler}
                    error={errors.programNumberError.error}
                    helperText={errors.programNumberError.helperText}
                />
                <InputText label="Video Pid" value={values.videoPid} onChange={changeVideoPidHandler} />
            </Columns>
            <FlexHolder className="audio-pid-holder">
                {/* {values.ipbeAudioEncoders?.map((item, i) => (
                    <InputText label="Audio Pid 1" value={item.pid} onChange={changeAudioPidHandler(i)} />
                ))} */}
            </FlexHolder>

            <Columns gap={24} col={4}>
                <InputText
                    label="PMT Pid"
                    value={values.pmtPid}
                    onChange={changePmtPidHandler}
                    error={errors.pmtPidError.error}
                    helperText={errors.pmtPidError.helperText}
                />
                <InputText label="PMT Period" value={values.pmtPeriod} onChange={changePmtPeriodHandler} />
                <InputText
                    label="PCR Pid"
                    value={values.pcrPid}
                    onChange={changePcrPidHandler}
                    error={errors.pcrPidError.error}
                    helperText={errors.pcrPidError.helperText}
                />
                <InputText
                    label="PCR Period"
                    value={values.pcrPeriod}
                    onChange={changePcrPeriodHandler}
                    error={errors.pcrPeriodError.error}
                    helperText={errors.pcrPeriodError.helperText}
                />
            </Columns>
            <Columns gap={24} col={2}>
                <InputText
                    label="TS ID"
                    value={values.tsId}
                    onChange={changeTsIdHandler}
                    error={errors.tsIdError.error}
                    helperText={errors.tsIdError.helperText}
                />
                <InputText label="SCTE (pid=N)" value={values.addScte} onChange={changeAddScteHandler} />
            </Columns>
        </>
    );
};
