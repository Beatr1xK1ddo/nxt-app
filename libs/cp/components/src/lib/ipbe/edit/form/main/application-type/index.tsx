import {ChangeEventHandler, FC, useCallback, useMemo} from "react";
import {InputText, Dropdown, Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {Columns} from "@nxt-ui/cp/components";
import {useDispatch, useSelector} from "react-redux";
import {ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {EIpbeApplicationType, EIpbeOutputType} from "@nxt-ui/cp/types";
import {ttlValues} from "@nxt-ui/cp/constants";

export const ApplicationType: FC = () => {
    const dispatch = useDispatch();
    const {
        applicationType,
        outputType,
        audioOutputIp,
        audioOutputPort,
        videoOutputIp,
        videoOutputPort,
        ipbeDestinations,
    } = useSelector(ipbeEditSelectors.main.values);
    const errors = useSelector(ipbeEditSelectors.main.errors);
    const changeVideoOutputIpHandler = useCallback(
        (e) => {
            dispatch(ipbeEditActions.setVideoOutputIp(e.currentTarget.value as string));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeVideoOutputPortHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            dispatch(ipbeEditActions.setVideoOutputPort(value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeAudioOutputPortHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            dispatch(ipbeEditActions.setAudioOutputPort(value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeAudioOutputIpHandler = useCallback(
        (e) => {
            dispatch(ipbeEditActions.setAudioOutputIp(e.currentTarget.value as string));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeOutputIpHandler = useCallback(
        (index: number) => (e) => {
            dispatch(ipbeEditActions.setOutputIp({id: index, value: e.currentTarget.value as string}));
        },
        [dispatch]
    ) as (index: number) => ChangeEventHandler<HTMLInputElement>;

    const changeOutputPortHandler = useCallback(
        (index: number) => (e) => {
            const value = parseInt(e.currentTarget.value);
            if (!e.currentTarget.value) {
                dispatch(ipbeEditActions.setOutputPort({id: index, value: 0}));
                return;
            }
            if (value) {
                dispatch(ipbeEditActions.setOutputPort({id: index, value}));
                return;
            }
        },
        [dispatch]
    ) as (index: number) => ChangeEventHandler<HTMLInputElement>;

    const changeTtlHandler = useCallback(
        (index: number) => (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.setTtl({id: index, value: e.target.value as number}));
        },
        [dispatch]
    );

    const changeOutputTypeHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.setOutputType(e.target.value as EIpbeOutputType));
        },
        [dispatch]
    );

    const addIpbeDestinationHandler = useCallback(() => {
        dispatch(ipbeEditActions.addIpbeDestination());
    }, [dispatch]);

    const deleteDestinationHandler = useCallback(
        (index: number) => () => {
            dispatch(ipbeEditActions.deleteIpbeDestination(index));
        },
        [dispatch]
    );

    const outputTypeVslues = useMemo(() => {
        if (applicationType === EIpbeApplicationType.Sdi2Web) {
            return [EIpbeOutputType.rtp];
        } else {
            return [EIpbeOutputType.udp];
        }
    }, [applicationType]);

    const renderElement = useMemo(() => {
        if (applicationType !== EIpbeApplicationType.Sdi2Web) {
            return ipbeDestinations?.map((item, i) => (
                <div className="destination" key={i}>
                    <InputText
                        size="small"
                        label="OUTPUT IP"
                        value={item.outputIp || ""}
                        error={errors?.ipbeDestinations?.[i].outputIp.error}
                        helperText={errors?.ipbeDestinations?.[i].outputIp.helperText}
                        onChange={changeOutputIpHandler(i)}
                    />
                    <InputText
                        size="small"
                        label="OUTPUT PORT"
                        value={item.outputPort || ""}
                        error={errors?.ipbeDestinations?.[i].outputPort.error}
                        helperText={errors?.ipbeDestinations?.[i].outputPort.helperText}
                        onChange={changeOutputPortHandler(i)}
                    />
                    <Dropdown
                        labelClass="label-small"
                        size="small"
                        label="TTL"
                        values={ttlValues}
                        error={errors?.ipbeDestinations?.[i].ttl.error}
                        helperText={errors?.ipbeDestinations?.[i].ttl.helperText}
                        value={item.ttl?.toString() || ""}
                        onChange={changeTtlHandler(i)}
                    />
                    {i === 0 ? (
                        <Button data-type="btn-icon" onClick={addIpbeDestinationHandler}>
                            <Icon name="plus" />
                        </Button>
                    ) : (
                        <Button data-type="btn-icon" onClick={deleteDestinationHandler(i)}>
                            <Icon name="trash" />
                        </Button>
                    )}
                </div>
            ));
        }

        return (
            <>
                <Columns gap={24} col={2}>
                    <InputText
                        size="small"
                        label="Video Output IP"
                        value={videoOutputIp || ""}
                        error={errors?.videoOutputIp.error}
                        helperText={errors?.videoOutputIp.helperText}
                        onChange={changeVideoOutputIpHandler}
                    />
                    <InputText
                        size="small"
                        label="Video Output PORT"
                        error={errors?.videoOutputPort.error}
                        helperText={errors?.videoOutputPort.helperText}
                        value={videoOutputPort || ""}
                        onChange={changeVideoOutputPortHandler}
                    />
                </Columns>
                <Columns gap={24} col={2}>
                    <InputText
                        size="small"
                        label="Audio Output IP"
                        error={errors?.audioOutputIp.error}
                        helperText={errors?.audioOutputIp.helperText}
                        value={audioOutputIp}
                        onChange={changeAudioOutputIpHandler}
                    />
                    <InputText
                        size="small"
                        label="Audio Output PORT"
                        value={audioOutputPort || ""}
                        onChange={changeAudioOutputPortHandler}
                    />
                </Columns>
            </>
        );
    }, [ipbeDestinations, audioOutputIp, audioOutputPort, videoOutputPort, videoOutputIp, errors, applicationType]);

    return (
        <>
            <div className="input-holder">
                <Dropdown
                    label="OUTPUT TYPE"
                    value={outputType}
                    onChange={changeOutputTypeHandler}
                    values={outputTypeVslues}
                    error={errors.outputType.error}
                    helperText={errors.outputType.helperText}
                />
            </div>
            {/* <ul className="h-32"></ul> */}
            {renderElement}
        </>
    );
};
