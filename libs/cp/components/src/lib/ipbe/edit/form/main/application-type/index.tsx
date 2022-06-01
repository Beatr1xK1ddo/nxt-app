import {ChangeEventHandler, FC, useCallback, useMemo} from "react";
import {InputText, Dropdown, Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {Columns} from "@nxt-ui/cp/components";
import {useDispatch, useSelector} from "react-redux";
import {ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {EIpbeApplicationType, EIpbeOutputType} from "@nxt-ui/cp/types";

const ttlValues = Array.from(Array(65).keys());

export const ApplicationType: FC = (props) => {
    const dispatch = useDispatch();
    const {
        applicationType,
        outputType,
        audioOutputIp,
        audioOutputPort,
        videoOutputIp,
        videoOutputPort,
        ipbeDestinations,
    } = useSelector(ipbeEditSelectors.selectMainValues);
    const errors = useSelector(ipbeEditSelectors.selectMainErrors);
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
        (index: number) => (e) => {
            dispatch(ipbeEditActions.changeOutputIp({id: index, value: e.currentTarget.value as string}));
        },
        [dispatch]
    ) as (index: number) => ChangeEventHandler<HTMLInputElement>;

    const changeOutputPortHandler = useCallback(
        (index: number) => (e) => {
            const value = parseInt(e.currentTarget.value);
            if (!e.currentTarget.value) {
                dispatch(ipbeEditActions.changeOutputPort({id: index, value: 0}));
                return;
            }
            if (value) {
                dispatch(ipbeEditActions.changeOutputPort({id: index, value}));
                return;
            }
        },
        [dispatch]
    ) as (index: number) => ChangeEventHandler<HTMLInputElement>;

    const changeTtlHandler = useCallback(
        (index: number) => (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.changeTtl({id: index, value: e.target.value as number}));
        },
        [dispatch]
    );

    const changeOutputTypeHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.changeOutputType(e.target.value as EIpbeOutputType));
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

    const renderElement = useMemo(() => {
        if (applicationType !== EIpbeApplicationType.Sdi2Web) {
            return ipbeDestinations?.map((item, i) => (
                <div className="destination" key={i}>
                    <InputText
                        size="small"
                        label="Output IP"
                        value={item.outputIp}
                        error={errors?.ipbeDestinations?.[i].outputIp.error}
                        helperText={errors?.ipbeDestinations?.[i].outputIp.helperText}
                        onChange={changeOutputIpHandler(i)}
                    />
                    <InputText
                        size="small"
                        label="Output Port"
                        value={item.outputPort}
                        error={errors?.audioOutputPortError.error}
                        onChange={changeOutputPortHandler(i)}
                    />
                    <Dropdown
                        labelClass="label-small"
                        size="small"
                        label="TTL"
                        values={ttlValues}
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
                        value={videoOutputIp}
                        error={errors?.videoOutputIpError.error}
                        helperText={errors?.videoOutputIpError.helperText}
                        onChange={changeVideoOutputIpHandler}
                    />
                    <InputText
                        size="small"
                        label="Video Output PORT"
                        value={videoOutputPort || ""}
                        onChange={changeVideoOutputPortHandler}
                    />
                </Columns>
                <Columns gap={24} col={2}>
                    <InputText
                        size="small"
                        label="Audio Output IP"
                        error={errors?.audioOutputIpError.error}
                        helperText={errors?.audioOutputIpError.helperText}
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
                    values={Object.values(EIpbeOutputType)}
                />
            </div>
            {/* <ul className="h-32"></ul> */}
            {renderElement}
        </>
    );
};
