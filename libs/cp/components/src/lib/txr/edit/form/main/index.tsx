import {FC, ChangeEventHandler} from "react";
import {Dropdown, InputText, CheckboxComponent} from "@nxt-ui/components";
import {Columns, SelectNode} from "@nxt-ui/cp/components";
import {ProxyList} from "./proxyList/index";
import {useSelector, useDispatch} from "react-redux";
import {txrEditSelectors, txrEditActions} from "@nxt-ui/cp-redux";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import "./index.css";
import {ETXRServer} from "@nxt-ui/cp/types";

export const Main: FC = () => {
    const dispatch = useDispatch();
    const values = useSelector(txrEditSelectors.main.values);
    const errors = useSelector(txrEditSelectors.main.errors);

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
    const changeTTLHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        dispatch(txrEditActions.setTTLPort(parseInt(e.currentTarget.value)));
    };
    const changeTxNodeHandler = (e: SelectChangeEvent<unknown>) => {
        dispatch(txrEditActions.setTxNodeId(e.target.value as number));
    };
    const changeRxNodeHandler = (e: SelectChangeEvent<unknown>) => {
        dispatch(txrEditActions.setRxNodeId(e.target.value as number));
    };
    const changedDoubleTransmissionHandler = (e: SelectChangeEvent<unknown>) => {
        dispatch(txrEditActions.setDoubleTransmission(e.target.value as string));
    };
    const changeOpenPortAtHandler = (e: SelectChangeEvent<unknown>) => {
        dispatch(txrEditActions.setOpenPortAt(e.target.value as string));
    };
    const changeRxRunMonitorHandler = () => {
        dispatch(txrEditActions.toggleRxRunMonitor());
    };

    return (
        <Columns col={2}>
            <div className="txr-mail-col">
                <span className="text-small">TX Server settings</span>
                <SelectNode
                    error={errors.nodeId.error}
                    helperText={errors.nodeId.helperText}
                    value={values.txNodeId}
                    onChange={changeTxNodeHandler}
                />
                <Columns col={2}>
                    <InputText
                        label="SOURCE IP"
                        fullWidth
                        value={values.sourceIp || ""}
                        onChange={changeSourceIpHandler}
                        error={errors.name.error}
                        helperText={errors.name.helperText}
                    />
                    <InputText
                        label="SOURCE PORT"
                        fullWidth
                        value={values.sourcePort || ""}
                        onChange={changeSourcePortHandler}
                        error={errors.name.error}
                        helperText={errors.name.helperText}
                    />
                </Columns>
                <InputText
                    label="USE INTERFACE"
                    fullWidth
                    value={values.txUseInterface || ""}
                    onChange={changeTxUseInterfaceHandler}
                    error={errors.name.error}
                    helperText={errors.name.helperText}
                />
                <InputText
                    label="Destination server IP"
                    fullWidth
                    value={values.transmissionIp || ""}
                    onChange={changeTransmissionIpHandler}
                    error={errors.name.error}
                    helperText={errors.name.helperText}
                />
                <Dropdown
                    label="Open Ports As Server"
                    value={values.openPortAt || ""}
                    values={Object.values(ETXRServer)}
                    onChange={changeOpenPortAtHandler}
                    error={errors.name.error}
                    helperText={errors.name.helperText}
                />
                <CheckboxComponent
                    checkId="monitorSource"
                    className="switch label-start"
                    labelText="Monitor source"
                    value={values.txRunMonitor || ""}
                />
                <InputText label="Description" fullWidth />
                <InputText label="Extra" fullWidth />
                <span className="text-small">Proxy Server</span>
                <Dropdown label="SERVER IP" />
                {/* TODO Kate: remove to common components */}
                <ProxyList></ProxyList>
            </div>
            <div className="txr-mail-col">
                <span className="text-small">RX Server settings</span>
                <SelectNode
                    error={errors.nodeId.error}
                    helperText={errors.nodeId.helperText}
                    value={values.rxNodeId}
                    onChange={changeRxNodeHandler}
                    style={{width: "100%"}}
                />
                <Columns col={2}>
                    <InputText
                        label="DESTINATION IP"
                        fullWidth
                        value={values.destinationIp || ""}
                        onChange={changeDestinationIpHandler}
                        error={errors.name.error}
                        helperText={errors.name.helperText}
                    />
                    <InputText
                        label="DESTINATION PORT"
                        fullWidth
                        value={values.destinationPort || ""}
                        onChange={changeDestinationPortHandler}
                        error={errors.name.error}
                        helperText={errors.name.helperText}
                    />
                </Columns>
                <InputText
                    label="USE INTERFACE"
                    fullWidth
                    value={values.rxUseInterface || ""}
                    onChange={changeRxUseInterfaceHandler}
                    error={errors.name.error}
                    helperText={errors.name.helperText}
                />
                <InputText
                    label="TRANSMISSION PORT"
                    fullWidth
                    value={values.transmissionPort || ""}
                    onChange={changeTransmissionPortHandler}
                    error={errors.name.error}
                    helperText={errors.name.helperText}
                />
                <Dropdown
                    label="DOUBLE TRANSMISSION"
                    value={values.doubleTransmission || ""}
                    onChange={changedDoubleTransmissionHandler}
                    error={errors.name.error}
                    helperText={errors.name.helperText}
                />

                {/* <InputText label="Source server IP" fullWidth /> */}
                <InputText
                    label="BUFFER"
                    fullWidth
                    value={values.buffer || ""}
                    onChange={changeBufferHandler}
                    error={errors.name.error}
                    helperText={errors.name.helperText}
                />
                <InputText
                    label="TTL"
                    fullWidth
                    value={values.ttl || ""}
                    onChange={changeTTLHandler}
                    error={errors.name.error}
                    helperText={errors.name.helperText}
                />
                {/* TODO Kate: check names */}
                <CheckboxComponent
                    checkId="monitorDestination"
                    className="switch label-start"
                    labelText="Monitor destination"
                    value={values.rxRunMonitor || ""}
                    onChange={changeRxRunMonitorHandler}
                />
                <CheckboxComponent checkId="ignoreAlerts" className="switch label-start" labelText="Ignore alerts" />
                <InputText label="EXTRA" fullWidth />
            </div>
        </Columns>
    );
};
