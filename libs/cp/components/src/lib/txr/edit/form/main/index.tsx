import {FC, ChangeEventHandler, useMemo, MouseEvent, useCallback} from "react";
import {Dropdown, InputText, CheckboxComponent, ToggleButtonGroupComponent} from "@nxt-ui/components";
import {Columns, SelectNode, BorderBox} from "@nxt-ui/cp/components";
import {ProxyList} from "./proxyList/index";
import {useSelector, useDispatch} from "react-redux";
import {txrEditSelectors, txrEditActions} from "@nxt-ui/cp-redux";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import "./index.css";
import {useEditMode, useProxyServers} from "@nxt-ui/cp/hooks";
import {ETXRAppType, EDoubleRetransmission, EFecSize, ELatencyMode, ETXRServer} from "@nxt-ui/cp/types";
import {LatencyMultiplier, ttlValues, doubleRetransmissionValues, LatencyModeValues} from "@nxt-ui/cp/constants";
import {SelectProxyServer} from "./proxyList/SelectProxyServer";
import {InputAdornment, MenuItem} from "@mui/material";
import {Icon} from "@nxt-ui/icons";

const getKeysFromEnum = (value: any) => {
    return Object.keys(value).reduce((arr: Array<string>, key) => {
        if (!arr.includes(key)) {
            arr.push(value[key]);
        }
        return arr;
    }, []);
};

export const Main: FC = () => {
    const dispatch = useDispatch();
    useProxyServers();
    const values = useSelector(txrEditSelectors.main.values);
    const errors = useSelector(txrEditSelectors.main.errors);
    const txr4 = useMemo(() => values.appType === ETXRAppType.txr4, [values.appType]);
    const txr5 = useMemo(() => values.appType === ETXRAppType.txr5, [values.appType]);
    const txr6 = useMemo(() => values.appType === ETXRAppType.txr6, [values.appType]);
    const txr7 = useMemo(() => values.appType === ETXRAppType.txr7, [values.appType]);
    const srt = useMemo(() => values.appType === ETXRAppType.srt, [values.appType]);
    const isEditMode = useEditMode();

    const changeSourceIpHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback(
        (e) => {
            dispatch(txrEditActions.setSourceIp(e.currentTarget.value as string));
        },
        [dispatch, txrEditActions]
    );
    const changeSourcePortHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback(
        (e) => {
            dispatch(txrEditActions.setSourcePort(parseInt(e.currentTarget.value)));
        },
        [dispatch, txrEditActions]
    );
    const changeTxUseInterfaceHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback(
        (e) => {
            dispatch(txrEditActions.setTxUseInterface(e.currentTarget.value as string));
        },
        [dispatch, txrEditActions]
    );
    const changeTransmissionIpHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback(
        (e) => {
            dispatch(txrEditActions.setTransmissionIp(e.currentTarget.value as string));
        },
        [dispatch, txrEditActions]
    );
    const changeDestinationIpHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback(
        (e) => {
            dispatch(txrEditActions.setDestinationIp(e.currentTarget.value as string));
        },
        [dispatch, txrEditActions]
    );
    const changeRxUseInterfaceHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback(
        (e) => {
            dispatch(txrEditActions.setRxUseInterface(e.currentTarget.value as string));
        },
        [dispatch, txrEditActions]
    );
    const changeDestinationPortHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback(
        (e) => {
            dispatch(txrEditActions.setDestinationPort(parseInt(e.currentTarget.value)));
        },
        [dispatch, txrEditActions]
    );
    const changeTransmissionPortHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback(
        (e) => {
            dispatch(txrEditActions.setTransmissionPort(parseInt(e.currentTarget.value)));
        },
        [dispatch, txrEditActions]
    );
    const changeBufferHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback(
        (e) => {
            dispatch(txrEditActions.setBufferHandler(parseInt(e.currentTarget.value)));
        },
        [dispatch, txrEditActions]
    );
    const changeLatencyTimeHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback(
        (e) => {
            dispatch(txrEditActions.setLatencyTime(parseInt(e.currentTarget.value)));
        },
        [dispatch, txrEditActions]
    );
    const changeRecvBufferHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback(
        (e) => {
            dispatch(txrEditActions.setRecvBuffer(parseInt(e.currentTarget.value)));
        },
        [dispatch, txrEditActions]
    );
    const changeTTLHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(txrEditActions.setTTLPort(e.target.value as number));
        },
        [dispatch, txrEditActions]
    );
    const changeTxNodeHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(txrEditActions.setTxNodeId(e.target.value as number));
        },
        [dispatch, txrEditActions]
    );
    const changeRxNodeHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(txrEditActions.setRxNodeId(e.target.value as number));
        },
        [dispatch, txrEditActions]
    );
    const changeDoubleRetransmissionHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as keyof typeof EDoubleRetransmission;
            dispatch(txrEditActions.setDoubleRetransmission(EDoubleRetransmission[value]));
        },
        [dispatch, txrEditActions]
    );
    const changeOpenPortAtHandler = useCallback(
        (e: MouseEvent, value: string) => {
            dispatch(txrEditActions.setOpenPortAt(value));
        },
        [dispatch, txrEditActions]
    );
    const changeLatencyMode = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(txrEditActions.setLatencyMode(e.target.value as string));
        },
        [dispatch, txrEditActions]
    );
    const changelatencyMultiplier = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(txrEditActions.setLatencyMultiplier(e.target.value as number));
        },
        [dispatch, txrEditActions]
    );
    const changedFecSizeHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as keyof typeof EFecSize;
            dispatch(txrEditActions.setFecSize(EFecSize[value]));
        },
        [dispatch, txrEditActions]
    );
    const changeFecHandler = useCallback(() => {
        dispatch(txrEditActions.toggleFec());
    }, [dispatch, txrEditActions]);
    const changeTxRunMonitorHandler = useCallback(() => {
        dispatch(txrEditActions.toggleTxRunMonitor());
    }, [dispatch, txrEditActions]);
    const changeArqHandler = useCallback(() => {
        dispatch(txrEditActions.toggleArq());
    }, [dispatch, txrEditActions]);
    const changeEndpointHandler = useCallback(() => {
        dispatch(txrEditActions.toggleEndpoint());
    }, [dispatch, txrEditActions]);
    const changeRxRunMonitorHandler = useCallback(() => {
        dispatch(txrEditActions.toggleRxRunMonitor());
    }, [dispatch, txrEditActions]);
    const changeLockTransmissionHandler = useCallback(() => {
        dispatch(txrEditActions.toggleLockTransmission());
    }, [dispatch, txrEditActions]);

    return (
        <>
            <Columns col={"2minmax"}>
                <div className="txr-mail-col">
                    <span className="text-small">TX Server settings</span>
                    <SelectNode
                        error={errors.txNodeId.error}
                        helperText={errors.txNodeId.helperText}
                        value={values.txNodeId}
                        onChange={changeTxNodeHandler}
                    />
                    <Columns col={"2minmax"}>
                        <InputText
                            label="SOURCE IP"
                            fullWidth
                            value={values.sourceIp || ""}
                            onChange={changeSourceIpHandler}
                            error={errors.sourceIp.error}
                            helperText={errors.sourceIp.helperText}
                        />
                        <InputText
                            label="SOURCE PORT"
                            fullWidth
                            value={values.sourcePort || ""}
                            onChange={changeSourcePortHandler}
                            error={errors.sourcePort.error}
                            helperText={errors.sourcePort.helperText}
                        />
                    </Columns>
                    <InputText
                        label="USE INTERFACE"
                        fullWidth
                        value={values.txUseInterface || ""}
                        onChange={changeTxUseInterfaceHandler}
                        error={errors.txUseInterface.error}
                        helperText={errors.txUseInterface.helperText}
                    />
                    <CheckboxComponent
                        checkId="monitorSource"
                        className="switch label-start"
                        labelText="MONITOR SOURCE"
                        checked={!!values.txRunMonitor}
                        onClick={changeTxRunMonitorHandler}
                    />
                </div>
                <div className="txr-mail-col">
                    <span className="text-small">RX Server settings</span>
                    <SelectNode
                        error={errors.rxNodeId.error}
                        helperText={errors.rxNodeId.helperText}
                        value={values.rxNodeId}
                        onChange={changeRxNodeHandler}
                        style={{width: "100%"}}
                    />
                    <Columns col={3}>
                        <InputText
                            label="DESTINATION IP"
                            fullWidth
                            value={values.destinationIp || ""}
                            onChange={changeDestinationIpHandler}
                            error={errors.destinationIp.error}
                            helperText={errors.destinationIp.helperText}
                        />
                        <InputText
                            label="DESTINATION PORT"
                            fullWidth
                            value={values.destinationPort || ""}
                            onChange={changeDestinationPortHandler}
                            error={errors.destinationPort.error}
                            helperText={errors.destinationPort.helperText}
                        />
                        <Dropdown
                            label="TTL"
                            value={values.ttl || ""}
                            onChange={changeTTLHandler}
                            error={errors.ttl.error}
                            helperText={errors.ttl.helperText}
                            values={ttlValues}
                        />
                    </Columns>
                    <InputText
                        label="USE INTERFACE"
                        fullWidth
                        value={values.rxUseInterface || ""}
                        onChange={changeRxUseInterfaceHandler}
                        error={errors.rxUseInterface.error}
                        helperText={errors.rxUseInterface.helperText}
                    />
                    <CheckboxComponent
                        checkId="monitorDestination"
                        className="switch label-start"
                        labelText="MONITOR DESTINATION"
                        checked={!!values.rxRunMonitor}
                        onClick={changeRxRunMonitorHandler}
                    />
                </div>
            </Columns>
            <BorderBox gap={24}>
                <Columns col={3} valign="center">
                    <InputText
                        label="TRANSMISSION IP"
                        fullWidth
                        value={values.transmissionIp || ""}
                        onChange={changeTransmissionIpHandler}
                        error={errors.transmissionIp.error}
                        helperText={errors.transmissionIp.helperText}
                    />
                    {isEditMode && (
                        <InputText
                            label="TRANSMISSION PORT"
                            fullWidth
                            value={values.transmissionPort || ""}
                            onChange={changeTransmissionPortHandler}
                            error={errors.transmissionPort.error}
                            helperText={errors.transmissionPort.helperText}
                        />
                    )}
                    <div className="openPorts">
                        Open Ports At:
                        <ToggleButtonGroupComponent
                            className="text-buttons-group"
                            values={Object.keys(ETXRServer).map((item) => ({value: item, text: item}))}
                            value={values.openPortAt}
                            exclusive
                            onChange={changeOpenPortAtHandler}
                        />
                        <Icon
                            name={values.isLockTransmission ? "lock" : "lockOpen"}
                            className="iconLock"
                            onClick={changeLockTransmissionHandler}
                        />
                    </div>
                </Columns>
            </BorderBox>
            <BorderBox gap={24}>
                <div className="proxyServers">
                    <span className="text-small">PROXY SERVER</span>
                    <SelectProxyServer />
                    <ProxyList items={values.proxyServers || []} />
                </div>
            </BorderBox>
            {(txr4 || txr5 || txr6 || txr7 || srt) && (
                <BorderBox gap={24}>
                    {!srt && !txr4 && (
                        <Columns col={2}>
                            <CheckboxComponent
                                checkId="ARQ"
                                className="switch label-start"
                                labelText="ARQ"
                                checked={!!values.arq}
                                onClick={changeArqHandler}
                            />
                            <Dropdown
                                label="DOUBLE RETRANSMISSION"
                                value={
                                    values.doubleRetransmission
                                        ? EDoubleRetransmission[values.doubleRetransmission]
                                        : ""
                                }
                                values={doubleRetransmissionValues}
                                onChange={changeDoubleRetransmissionHandler}
                                error={errors.doubleRetransmission.error}
                                helperText={errors.doubleRetransmission.helperText}
                            />
                        </Columns>
                    )}
                    <Columns col={2}>
                        <InputText
                            label="BUFFER"
                            fullWidth
                            value={values.buffer || ""}
                            onChange={changeBufferHandler}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">ms</InputAdornment>,
                            }}
                        />
                        {srt && (
                            <InputText
                                label="RECV BUFFER"
                                fullWidth
                                value={values.recvBuffer || ""}
                                onChange={changeRecvBufferHandler}
                            />
                        )}
                    </Columns>
                    {txr7 && (
                        <Columns col={3}>
                            <Dropdown label="LATENCY MODE" value={values.latencyMode} onChange={changeLatencyMode}>
                                {Object.keys(LatencyModeValues).map((item) => (
                                    <MenuItem key={item} value={item} selected={values.latencyMode === item}>
                                        {LatencyModeValues[item as keyof typeof LatencyModeValues]}
                                    </MenuItem>
                                ))}
                            </Dropdown>
                            <Dropdown
                                label="LATENCY MULTIPLIER"
                                value={values.latencyMultiplier || ""}
                                onChange={changelatencyMultiplier}
                                values={LatencyMultiplier}
                            />
                            <InputText
                                label="LATENCY TIME"
                                fullWidth
                                value={values.latencyTime || ""}
                                onChange={changeLatencyTimeHandler}
                            />
                        </Columns>
                    )}
                </BorderBox>
            )}
            {(txr5 || txr6 || txr7 || txr7) && (
                <BorderBox gap={24}>
                    <Columns col={2}>
                        <CheckboxComponent
                            checkId="FEC"
                            className="switch label-start"
                            labelText="FEC"
                            checked={!!values.fec}
                            onClick={changeFecHandler}
                        />
                        {values.fec && (
                            <Dropdown
                                label="FEC SIZE"
                                value={values.fecSize ? EFecSize[values.fecSize] : ""}
                                values={getKeysFromEnum(EFecSize)}
                                onChange={changedFecSizeHandler}
                            />
                        )}
                    </Columns>
                </BorderBox>
            )}
            <Columns col={2}>
                <CheckboxComponent
                    checkId="Endpoint"
                    className="switch label-start"
                    labelText="ENDPOINT"
                    checked={!!values.endpoint}
                    onClick={changeEndpointHandler}
                />
            </Columns>
        </>
    );
};
