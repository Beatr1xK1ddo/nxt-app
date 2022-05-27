import {ChangeEventHandler, FC, useCallback} from "react";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {InputText, Dropdown} from "@nxt-ui/components";
import {Columns, FlexHolder} from "../../../../common";
import {EIpbeMuxer} from "@nxt-ui/cp/types";
import {useDispatch, useSelector} from "react-redux";
import {ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";

export const MpegTsMuxer: FC = () => {
    const dispatch = useDispatch();
    const {errors, values} = useSelector(ipbeEditSelectors.selectIpbeEditMpegTsMuxer);
    const changeMuxerHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.changeMuxer(e.target.value as EIpbeMuxer));
        },
        [dispatch]
    );
    const changeMuxrateHandler = useCallback(
        (e) => {
            dispatch(ipbeEditActions.changeMuxrate(e.target.value));
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
            if (!e.target.value) {
                dispatch(ipbeEditActions.changeProgramNumber(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeVideoPidHandler = useCallback(
        (e) => {
            dispatch(ipbeEditActions.changeVideoPid(e.target.value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeAudioPidHandler = useCallback(
        (e) => {
            dispatch(ipbeEditActions.changeAudioPid(e.target.value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changePmtPidHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            if (!e.target.value) {
                dispatch(ipbeEditActions.changePmtPid(value));
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
        (id: number) => (e) => {
            const value = parseInt(e.target.value);
            if (!e.target.value) {
                dispatch(ipbeEditActions.changePcrPid({id, value}));
            }
        },
        [dispatch]
    ) as (id: number) => ChangeEventHandler<HTMLInputElement>;

    const changePcrPeriodHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            if (!e.target.value) {
                dispatch(ipbeEditActions.changePcrPeriod(value));
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
                {values.ipbeAudioEncoders?.map((item, i) => (
                    <InputText label="Audio Pid 1" value={item.pid} onChange={changeAudioPidHandler(i)} />
                ))}

                <InputText label="Audio Pid 2" />
                <InputText label="Audio Pid 3" />
                <InputText label="Audio Pid 4" />
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
