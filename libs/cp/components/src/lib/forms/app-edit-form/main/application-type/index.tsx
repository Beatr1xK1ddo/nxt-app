import {ChangeEventHandler, FC, useCallback, useMemo} from "react";
import {InputText, Dropdown, Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {EApplicationType} from "@nxt-ui/cp/api";
import {IApplicationType} from "./types";
import {
    changeApplication,
    changeAudioOutputIp,
    changeAudioOutputPort,
    changeOutputIp,
    changeOutputPort,
    changeTtl,
    changeVideoOutputIp,
    changeVideoOutputPort,
} from "../../reducers";
import {SelectChangeEvent} from "@mui/material/Select/Select";

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

    const renderElement = useMemo(() => {
        if (props.type !== EApplicationType.Sdi2Web) {
            return props?.ipbeDestinations?.map((item, i) => (
                <li className="destination" key={item.id}>
                    <InputText
                        label="Output IP"
                        value={item.outputIp}
                        error={errors?.ipbeDestinations?.[i].outputIp.error}
                        helperText={errors?.ipbeDestinations?.[i].outputIp.helperText}
                        onChange={changeOutputIpHandler(item.id)}
                    />
                    <InputText
                        label="Output Port"
                        value={item.outputPort}
                        error={errors?.audioOutputPortError.error}
                        onChange={changeOutputPortHandler(item.id)}
                    />
                    <Dropdown
                        label="TTL"
                        values={ttlValues}
                        value={item.ttl}
                        onChange={changeTtlHandler(item.id)}
                    />
                    <Button>
                        <Icon name="plus" />
                    </Button>
                </li>
            ));
        }

        return (
            <>
                <div className="app-type-block">
                    <InputText
                        label="Video Output IP"
                        value={props.videoOutputIp}
                        onChange={changeVideoOutputIpHandler}
                    />
                    <InputText
                        label="Video Output PORT"
                        value={props.videoOutputPort || ""}
                        onChange={changeVideoOutputPortHandler}
                    />
                </div>
                <div className="app-type-block">
                    <InputText
                        label="Audio Output IP"
                        value={props.audioOutputIp}
                        onChange={changeAudioOutputIpHandler}
                    />
                    <InputText
                        label="Audio Output PORT"
                        value={props.audioOutputPort || ""}
                        onChange={changeAudioOutputPortHandler}
                    />
                </div>
            </>
        );
    }, [props]);

    const changeApplicationHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch?.(changeApplication(e.target.value as EApplicationType));
        },
        [dispatch]
    );

    return (
        <>
            <div className="input-holder">
                <Dropdown
                    label="APPLICATION TYPE"
                    value={props.type}
                    onChange={changeApplicationHandler}
                    values={Object.values(EApplicationType)}
                />
            </div>
            <ul className="h-32">{renderElement}</ul>
        </>
    );
};
