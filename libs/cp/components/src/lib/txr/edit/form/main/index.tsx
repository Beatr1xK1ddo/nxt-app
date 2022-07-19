import {FC, ChangeEventHandler, useMemo, MouseEvent, useState} from "react";
import {Dropdown, InputText, CheckboxComponent, ToggleButtonGroupComponent} from "@nxt-ui/components";
import {Columns, SelectNode} from "@nxt-ui/cp/components";
import {ProxyList} from "./proxyList/index";
import {useSelector, useDispatch} from "react-redux";
import {txrEditSelectors, txrEditActions} from "@nxt-ui/cp-redux";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import "./index.css";
import {useEditMode} from "@nxt-ui/cp/hooks";
import {ETXRAppType, EDoubleRetransmission, EFecSize, ELatencyMode} from "@nxt-ui/cp/types";
import {LatencyMultiplier, ttlValues, doubleRetransmissionValues} from "@nxt-ui/cp/constants";

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
    const values = useSelector(txrEditSelectors.main.values);
    const errors = useSelector(txrEditSelectors.main.errors);
    const txr4 = useMemo(() => values.appType === ETXRAppType.txr4, [values.appType]);
    const txr5 = useMemo(() => values.appType === ETXRAppType.txr5, [values.appType]);
    const txr6 = useMemo(() => values.appType === ETXRAppType.txr6, [values.appType]);
    const txr7 = useMemo(() => values.appType === ETXRAppType.txr7, [values.appType]);
    const srt = useMemo(() => values.appType === ETXRAppType.srt, [values.appType]);

    const isEditMode = useEditMode();

    const changeSourceIpHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        dispatch(txrEditActions.setSourceIp(e.currentTarget.value as string));
    };
    const changeSourcePortHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        dispatch(txrEditActions.setSourcePort(parseInt(e.currentTarget.value)));
    };
    const changeTxUseInterfaceHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        dispatch(txrEditActions.setTxUseInterface(e.currentTarget.value as string));
    };
    const changeTransmissionIpHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        dispatch(txrEditActions.setTransmissionIp(e.currentTarget.value as string));
    };
    const changeDestinationIpHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        dispatch(txrEditActions.setDestinationIp(e.currentTarget.value as string));
    };
    const changeRxUseInterfaceHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        dispatch(txrEditActions.setRxUseInterface(e.currentTarget.value as string));
    };
    const changeDestinationPortHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        dispatch(txrEditActions.setDestinationPort(parseInt(e.currentTarget.value)));
    };
    const changeTransmissionPortHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        dispatch(txrEditActions.setTransmissionPort(parseInt(e.currentTarget.value)));
    };
    const changeBufferHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        dispatch(txrEditActions.setBufferHandler(parseInt(e.currentTarget.value)));
    };
    const changeLatencyTimeHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        dispatch(txrEditActions.setLatencyTime(parseInt(e.currentTarget.value)));
    };
    const changeRecvBufferHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        dispatch(txrEditActions.setRecvBuffer(parseInt(e.currentTarget.value)));
    };
    const changeTTLHandler = (e: SelectChangeEvent<unknown>) => {
        dispatch(txrEditActions.setTTLPort(e.target.value as number));
    };
    const changeTxNodeHandler = (e: SelectChangeEvent<unknown>) => {
        dispatch(txrEditActions.setTxNodeId(e.target.value as number));
    };
    const changeRxNodeHandler = (e: SelectChangeEvent<unknown>) => {
        dispatch(txrEditActions.setRxNodeId(e.target.value as number));
    };
    const changeDoubleRetransmissionHandler = (e: SelectChangeEvent<unknown>) => {
        const value = e.target.value as keyof typeof EDoubleRetransmission;
        dispatch(txrEditActions.setDoubleRetransmission(EDoubleRetransmission[value]));
    };
    const changeOpenPortAtHandler = (e: any) => {
        console.log(e);
        dispatch(txrEditActions.setOpenPortAt(e.target.checked ? "rx" : "tx"));
    };
    const changeLatencyMode = (e: SelectChangeEvent<unknown>) => {
        dispatch(txrEditActions.setLatencyMode(e.target.value as string));
    };
    const changelatencyMultiplier = (e: SelectChangeEvent<unknown>) => {
        dispatch(txrEditActions.setLatencyMultiplier(e.target.value as number));
    };
    const changedFecSizeHandler = (e: SelectChangeEvent<unknown>) => {
        const value = e.target.value as keyof typeof EFecSize;
        dispatch(txrEditActions.setFecSize(EFecSize[value]));
    };
    const changeFecHandler = () => {
        dispatch(txrEditActions.toggleFec());
    };
    const changeTxRunMonitorHandler = () => {
        dispatch(txrEditActions.toggleTxRunMonitor());
    };
    const changeArqHandler = () => {
        dispatch(txrEditActions.toggleArq());
    };
    const changeEndpointHandler = () => {
        dispatch(txrEditActions.toggleEndpoint());
    };
    const changeRxRunMonitorHandler = () => {
        dispatch(txrEditActions.toggleRxRunMonitor());
    };

    const toggleBtnArr = [
        {id: 1, value: "transmission-ip", text: "Transmission IP"},
        {id: 2, value: "transmission-port", text: "Transmission Port"},
        {id: 3, value: "open-ports", text: "Open Ports at: TX/RX/Proxy"},
    ];
    const [alignment, setAlignment] = useState(toggleBtnArr[0].value);

    const handleChange = (event: MouseEvent<HTMLElement>, newAlignment: string) => {
        setAlignment(newAlignment);
    };

    return (
        <Columns col={"2minmax"}>
            <div className="txr-mail-col">
                <ToggleButtonGroupComponent
                    className="text-buttons-group"
                    btnsArr={toggleBtnArr}
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                />
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
                <InputText
                    label="Transmission IP"
                    fullWidth
                    value={values.transmissionIp || ""}
                    onChange={changeTransmissionIpHandler}
                    error={errors.transmissionIp.error}
                    helperText={errors.transmissionIp.helperText}
                />
                <CheckboxComponent
                    checkId="openPortAt"
                    className="switch label-start"
                    labelText="Open Ports At"
                    checked={values.openPortAt === "rx" ? true : false}
                    onClick={changeOpenPortAtHandler}
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
                <CheckboxComponent
                    checkId="monitorSource"
                    className="switch label-start"
                    labelText="Monitor source"
                    checked={!!values.txRunMonitor}
                    onClick={changeTxRunMonitorHandler}
                />
                <span className="text-small">Proxy Server</span>
                <Dropdown label="SERVER IP" />
                {/* TODO Kate: remove to common components */}
                <ProxyList></ProxyList>
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
                <Columns col={"2minmax"}>
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
                </Columns>
                <InputText
                    label="USE INTERFACE"
                    fullWidth
                    value={values.rxUseInterface || ""}
                    onChange={changeRxUseInterfaceHandler}
                    error={errors.rxUseInterface.error}
                    helperText={errors.rxUseInterface.helperText}
                />
                {(txr5 || txr6 || txr7) && (
                    <Dropdown
                        label="DOUBLE RETRANSMISSION"
                        value={values.doubleRetransmission ? EDoubleRetransmission[values.doubleRetransmission] : ""}
                        values={doubleRetransmissionValues}
                        onChange={changeDoubleRetransmissionHandler}
                        error={errors.doubleRetransmission.error}
                        helperText={errors.doubleRetransmission.helperText}
                    />
                )}
                <Dropdown
                    label="TTL"
                    value={values.ttl || ""}
                    onChange={changeTTLHandler}
                    error={errors.ttl.error}
                    helperText={errors.ttl.helperText}
                    values={ttlValues}
                />
                <CheckboxComponent
                    checkId="Endpoint"
                    className="switch label-start"
                    labelText="Endpoint"
                    checked={!!values.endpoint}
                    onClick={changeEndpointHandler}
                />
                <CheckboxComponent
                    checkId="monitorDestination"
                    className="switch label-start"
                    labelText="Monitor destination"
                    checked={!!values.rxRunMonitor}
                    onClick={changeRxRunMonitorHandler}
                />
                {txr7 && (
                    <Dropdown
                        label="Latency Mode"
                        value={values.latencyMode || ""}
                        onChange={changeLatencyMode}
                        values={Object.values(ELatencyMode)}
                    />
                )}
                {txr7 && (
                    <Dropdown
                        label="Latency Miltiplier"
                        value={values.latencyMultiplier || ""}
                        onChange={changelatencyMultiplier}
                        values={LatencyMultiplier}
                    />
                )}
                {txr7 && (
                    <InputText
                        label="Latency Time"
                        fullWidth
                        value={values.latencyTime || ""}
                        onChange={changeLatencyTimeHandler}
                    />
                )}
                {(txr4 || txr5 || txr6 || srt) && (
                    <InputText label="BUFFER" fullWidth value={values.buffer || ""} onChange={changeBufferHandler} />
                )}
                {srt && (
                    <InputText
                        label="RECV Buffer"
                        fullWidth
                        value={values.recvBuffer || ""}
                        onChange={changeRecvBufferHandler}
                    />
                )}
                {(txr5 || txr6 || txr7) && (
                    <CheckboxComponent
                        checkId="ARQ"
                        className="switch label-start"
                        labelText="ARQ"
                        checked={!!values.arq}
                        onClick={changeArqHandler}
                    />
                )}
                {(txr5 || txr6 || txr7) && (
                    <CheckboxComponent
                        checkId="FEC"
                        className="switch label-start"
                        labelText="FEC"
                        checked={!!values.fec}
                        onClick={changeFecHandler}
                    />
                )}
                {txr7 && values.fec && (
                    <Dropdown
                        label="Fec Size"
                        value={values.fecSize ? EFecSize[values.fecSize] : ""}
                        values={getKeysFromEnum(EFecSize)}
                        onChange={changedFecSizeHandler}
                    />
                )}
            </div>
        </Columns>
    );
};
