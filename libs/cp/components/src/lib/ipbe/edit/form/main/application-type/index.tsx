import {ChangeEventHandler, FC, useCallback, useMemo} from "react";

import {InputText, Dropdown, Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {EOutputType} from "@nxt-ui/cp/types";

import {
    changeAudioOutputIp,
    changeAudioOutputPort,
    changeOutputIp,
    changeOutputPort,
    changeOutputType,
    changeTtl,
    changeVideoOutputIp,
    changeVideoOutputPort,
} from "../../reducers";

import {IApplicationType} from "./types";
import {EApplicationType} from "@nxt-ui/cp/api";
import {Columns} from "@nxt-ui/cp/components";

const ttlValues = Array.from(Array(65).keys());

export const ApplicationType: FC<IApplicationType> = (props) => {
    const {dispatch, errors} = props;

    const changeVideoOutputIpHandler = useCallback(
        (e) => {
            dispatch?.(changeVideoOutputIp(e.currentTarget.value as string));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeVideoOutputPortHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            if (!e.currentTarget.value.length) {
                return dispatch?.(changeVideoOutputPort(0));
            }
            if (value) {
                dispatch?.(changeVideoOutputPort(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeAudioOutputPortHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            if (!e.currentTarget.value.length) {
                return dispatch?.(changeAudioOutputPort(0));
            }
            if (value) {
                dispatch?.(changeAudioOutputPort(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeAudioOutputIpHandler = useCallback(
        (e) => {
            dispatch?.(changeAudioOutputIp(e.currentTarget.value as string));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeOutputIpHandler = useCallback(
        (id: number) => (e) => {
            dispatch?.(changeOutputIp({id, value: e.currentTarget.value as string}));
        },
        [dispatch]
    ) as (id: number) => ChangeEventHandler<HTMLInputElement>;

    const changeOutputPortHandler = useCallback(
        (id: number) => (e) => {
            const value = parseInt(e.currentTarget.value);
            if (!e.currentTarget.value.length) {
                return dispatch?.(changeOutputPort({id, value: 0}));
            }
            if (value) {
                return dispatch?.(changeOutputPort({id, value}));
            }
        },
        [dispatch]
    ) as (id: number) => ChangeEventHandler<HTMLInputElement>;

    const changeTtlHandler = useCallback(
        (id: number) => (e: SelectChangeEvent<unknown>) => {
            dispatch?.(changeTtl({id, value: e.target.value as number}));
        },
        [dispatch]
    );

    const changeOutputTypeHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch?.(changeOutputType(e.target.value as EOutputType));
        },
        [dispatch]
    );

    const renderElement = useMemo(() => {
        if (props.applicationType !== EApplicationType.Sdi2Web) {
            return props?.ipbeDestinations?.map((item, i) => (
                <div className="destination" key={item.id}>
                    <InputText
                        size="small"
                        label="Output IP"
                        value={item.outputIp}
                        error={errors?.ipbeDestinations?.[i].outputIp.error}
                        helperText={errors?.ipbeDestinations?.[i].outputIp.helperText}
                        onChange={changeOutputIpHandler(item.id)}
                    />
                    <InputText
                        size="small"
                        label="Output Port"
                        value={item.outputPort}
                        error={errors?.audioOutputPortError.error}
                        onChange={changeOutputPortHandler(item.id)}
                    />
                    <Dropdown
                        labelClass="label-small"
                        size="small"
                        label="TTL"
                        values={ttlValues}
                        value={item.ttl}
                        onChange={changeTtlHandler(item.id)}
                    />
                    <Button data-type="btn-icon">
                        <Icon name="plus" />
                    </Button>
                </div>
            ));
        }

        return (
            <>
                <Columns gap={24} col={2}>
                    <InputText
                        size="small"
                        label="Video Output IP"
                        value={props.videoOutputIp}
                        error={errors?.videoOutputIpError.error}
                        helperText={errors?.videoOutputIpError.helperText}
                        onChange={changeVideoOutputIpHandler}
                    />
                    <InputText
                        size="small"
                        label="Video Output PORT"
                        value={props.videoOutputPort || ""}
                        onChange={changeVideoOutputPortHandler}
                    />
                </Columns>
                <Columns gap={24} col={2}>
                    <InputText
                        size="small"
                        label="Audio Output IP"
                        error={errors?.audioOutputIpError.error}
                        helperText={errors?.audioOutputIpError.helperText}
                        value={props.audioOutputIp}
                        onChange={changeAudioOutputIpHandler}
                    />
                    <InputText
                        size="small"
                        label="Audio Output PORT"
                        value={props.audioOutputPort || ""}
                        onChange={changeAudioOutputPortHandler}
                    />
                </Columns>
            </>
        );
    }, [props]);

    return (
        <>
            <div className="input-holder">
                <Dropdown
                    label="OUTPUT TYPE"
                    value={props.type}
                    onChange={changeOutputTypeHandler}
                    values={Object.values(EOutputType)}
                />
            </div>
            {/* <ul className="h-32"></ul> */}
            {renderElement}
        </>
    );
};
