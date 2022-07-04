import {ChangeEventHandler, FC, useCallback, useMemo} from "react";
import {InputText, Dropdown, Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {Columns} from "@nxt-ui/cp/components";
import {useDispatch, useSelector} from "react-redux";
import {txrEditActions, txrEditSelectors} from "@nxt-ui/cp-redux";
import {ETxrApplicationType, ETxrOutputType} from "@nxt-ui/cp/types";
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
        txrDestinations,
    } = useSelector(txrEditSelectors.main.values);
    const errors = useSelector(txrEditSelectors.main.errors);
    const changeVideoOutputIpHandler = useCallback(
        (e) => {
            dispatch(txrEditActions.setVideoOutputIp(e.currentTarget.value as string));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeVideoOutputPortHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            dispatch(txrEditActions.setVideoOutputPort(value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeAudioOutputPortHandler = useCallback(
        (e) => {
            const value = parseInt(e.currentTarget.value);
            dispatch(txrEditActions.setAudioOutputPort(value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeAudioOutputIpHandler = useCallback(
        (e) => {
            dispatch(txrEditActions.setAudioOutputIp(e.currentTarget.value as string));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeOutputIpHandler = useCallback(
        (index: number) => (e) => {
            dispatch(txrEditActions.setOutputIp({id: index, value: e.currentTarget.value as string}));
        },
        [dispatch]
    ) as (index: number) => ChangeEventHandler<HTMLInputElement>;

    const changeOutputPortHandler = useCallback(
        (index: number) => (e) => {
            const value = parseInt(e.currentTarget.value);
            if (!e.currentTarget.value) {
                dispatch(txrEditActions.setOutputPort({id: index, value: 0}));
                return;
            }
            if (value) {
                dispatch(txrEditActions.setOutputPort({id: index, value}));
                return;
            }
        },
        [dispatch]
    ) as (index: number) => ChangeEventHandler<HTMLInputElement>;

    const changeTtlHandler = useCallback(
        (index: number) => (e: SelectChangeEvent<unknown>) => {
            dispatch(txrEditActions.setTtl({id: index, value: e.target.value as number}));
        },
        [dispatch]
    );

    const changeOutputTypeHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(txrEditActions.setOutputType(e.target.value as ETxrOutputType));
        },
        [dispatch]
    );

    const addTxrDestinationHandler = useCallback(() => {
        dispatch(txrEditActions.addTxrDestination());
    }, [dispatch]);

    const deleteDestinationHandler = useCallback(
        (index: number) => () => {
            dispatch(txrEditActions.deleteTxrDestination(index));
        },
        [dispatch]
    );

    const outputTypeVslues = useMemo(() => {
        if (applicationType === ETxrApplicationType.Sdi2Web) {
            return [ETxrOutputType.rtp];
        } else {
            return [ETxrOutputType.udp];
        }
    }, [applicationType]);

    const renderElement = useMemo(() => {
        if (applicationType !== ETxrApplicationType.Sdi2Web) {
            return txrDestinations?.map((item, i) => (
                <div className="destination" key={i}>
                    <InputText
                        size="small"
                        label="Output IP"
                        value={item.outputIp || ""}
                        error={errors?.txrDestinations?.[i].outputIp.error}
                        helperText={errors?.txrDestinations?.[i].outputIp.helperText}
                        onChange={changeOutputIpHandler(i)}
                    />
                    <InputText
                        size="small"
                        label="Output Port"
                        value={item.outputPort || ""}
                        error={errors?.txrDestinations?.[i].outputPort.error}
                        helperText={errors?.txrDestinations?.[i].outputPort.helperText}
                        onChange={changeOutputPortHandler(i)}
                    />
                    <Dropdown
                        labelClass="label-small"
                        size="small"
                        label="TTL"
                        values={ttlValues}
                        error={errors?.txrDestinations?.[i].ttl.error}
                        helperText={errors?.txrDestinations?.[i].ttl.helperText}
                        value={item.ttl?.toString() || ""}
                        onChange={changeTtlHandler(i)}
                    />
                    {i === 0 ? (
                        <Button data-type="btn-icon" onClick={addTxrDestinationHandler}>
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
    }, [txrDestinations, audioOutputIp, audioOutputPort, videoOutputPort, videoOutputIp, errors, applicationType]);

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
