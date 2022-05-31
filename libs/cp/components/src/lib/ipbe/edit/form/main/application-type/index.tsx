import {ChangeEventHandler, FC, useCallback, useMemo} from "react";
import {InputText, Dropdown, Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {Columns} from "@nxt-ui/cp/components";
import {useDispatch} from "react-redux";
import {IDestinationError, ipbeEditActions} from "@nxt-ui/cp-redux";
import {EIpbeApplicationType, EIpbeOutputType, IFormError, IIpbeListItemDestination} from "@nxt-ui/cp/types";

const ttlValues = Array.from(Array(65).keys());

type ComponentProps = {
    type?: EIpbeOutputType;
    applicationType?: EIpbeApplicationType;
    audioOutputIp?: string;
    audioOutputPort?: number;
    videoOutputIp?: string;
    videoOutputPort?: number;
    ipbeDestinations?: Array<IIpbeListItemDestination>;
    errors: {
        typeError: IFormError;
        videoOutputIpError: IFormError;
        videoOutputPortError: IFormError;
        audioOutputIpError: IFormError;
        audioOutputPortError: IFormError;
        ipbeDestinations?: Array<IDestinationError>;
    };
};

export const ApplicationType: FC<ComponentProps> = (props) => {
    const {errors} = props;
    const dispatch = useDispatch();
    const changeVideoOutputIpHandler = useCallback(
        (e) => {
            dispatch(ipbeEditActions.changeVideoOutputIp(e.currentTarget.value as string));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeVideoOutputPortHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            if (!e.currentTarget.value.length) {
                dispatch(ipbeEditActions.changeVideoOutputPort(0));
                return;
            }
            if (value) {
                dispatch(ipbeEditActions.changeVideoOutputPort(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeAudioOutputPortHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            if (!e.currentTarget.value.length) {
                dispatch(ipbeEditActions.changeAudioOutputPort(0));
                return;
            }
            if (value) {
                dispatch(ipbeEditActions.changeAudioOutputPort(value));
            }
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeAudioOutputIpHandler = useCallback(
        (e) => {
            dispatch(ipbeEditActions.changeAudioOutputIp(e.currentTarget.value as string));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeOutputIpHandler = useCallback(
        (id: number) => (e) => {
            dispatch(ipbeEditActions.changeOutputIp({id, value: e.currentTarget.value as string}));
        },
        [dispatch]
    ) as (id: number) => ChangeEventHandler<HTMLInputElement>;

    const changeOutputPortHandler = useCallback(
        (id: number) => (e) => {
            const value = parseInt(e.currentTarget.value);
            if (!e.currentTarget.value.length) {
                dispatch(ipbeEditActions.changeOutputPort({id, value: 0}));
                return;
            }
            if (value) {
                dispatch(ipbeEditActions.changeOutputPort({id, value}));
                return;
            }
        },
        [dispatch]
    ) as (id: number) => ChangeEventHandler<HTMLInputElement>;

    const changeTtlHandler = useCallback(
        (id: number) => (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.changeTtl({id, value: e.target.value as number}));
        },
        [dispatch]
    );

    const changeOutputTypeHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.changeOutputType(e.target.value as EIpbeOutputType));
        },
        [dispatch]
    );

    const renderElement = useMemo(() => {
        if (props.applicationType !== EIpbeApplicationType.Sdi2Web) {
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
                    values={Object.values(EIpbeOutputType)}
                />
            </div>
            {/* <ul className="h-32"></ul> */}
            {renderElement}
        </>
    );
};
