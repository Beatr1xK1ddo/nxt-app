import {FC, ChangeEventHandler, useMemo} from "react";
import {Dropdown, InputText, CheckboxComponent} from "@nxt-ui/components";
import {Columns, SelectNode} from "@nxt-ui/cp/components";
import {ProxyList} from "./proxyList/index";
import {useSelector, useDispatch} from "react-redux";
import {txrEditSelectors, txrEditActions} from "@nxt-ui/cp-redux";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import "./index.css";
import {editMode} from "@nxt-ui/cp/hooks";

export const Main: FC = () => {
    const dispatch = useDispatch();
    const values = useSelector(txrEditSelectors.main.values);
    const errors = useSelector(txrEditSelectors.main.errors);

    const isEditMode = editMode();

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
    const changeTTLHandler = (e: SelectChangeEvent<unknown>)  => {
        dispatch(txrEditActions.setTTLPort(e.target.value as number));
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
                    error={errors.txNodeId.error}
                    helperText={errors.txNodeId.helperText}
                    value={values.txNodeId}
                    onChange={changeTxNodeHandler}
                />
                <Columns col={2}>
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
                    label="Destination server IP"
                    fullWidth
                    value={values.transmissionIp || ""}
                    onChange={changeTransmissionIpHandler}
                    error={errors.transmissionIp.error}
                    helperText={errors.transmissionIp.helperText}
                />
                {/* <Dropdown
                    label="Open Ports As Server"
                    value={values.openPortAt || ""}
                    values={Object.values(ETXRServer)}
                    onChange={changeOpenPortAtHandler}
                    error={errors.openPortAt.error}
                    helperText={errors.openPortAt.helperText}
                /> */}

                <CheckboxComponent
                    checkId="openPortAt"
                    className="switch label-start"
                    labelText="Open Ports As Server"
                    value={values.openPortAt || ""}
                    onChange={changeOpenPortAtHandler}
                />
                <CheckboxComponent
                    checkId="monitorSource"
                    className="switch label-start"
                    labelText="Monitor source"
                    value={values.txRunMonitor}
                    defaultChecked={true}
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
                    error={errors.rxNodeId.error}
                    helperText={errors.rxNodeId.helperText}
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
                <Dropdown
                    label="DOUBLE TRANSMISSION"
                    value={values.doubleTransmission || ""}
                    onChange={changedDoubleTransmissionHandler}
                    error={errors.doubleTransmission.error}
                    helperText={errors.doubleTransmission.helperText}
                />

                {/* <InputText label="Source server IP" fullWidth /> */}
                <InputText
                    label="BUFFER"
                    fullWidth
                    value={values.buffer || ""}
                    onChange={changeBufferHandler}
                    error={errors.buffer.error}
                    helperText={errors.buffer.helperText}
                />
                <Dropdown
                    label="TTL"
                    value={values.ttl || ""}
                    onChange={changeTTLHandler}
                    error={errors.ttl.error}
                    helperText={errors.ttl.helperText}
                    values={[...Array(65).keys()]}
                />
                {/* TODO Kate: check names */}
                <CheckboxComponent
                    checkId="monitorDestination"
                    className="switch label-start"
                    labelText="Monitor destination"
                    value={values.rxRunMonitor || ""}
                    onChange={changeRxRunMonitorHandler}
                    defaultChecked={true}
                />
                <CheckboxComponent checkId="ignoreAlerts" className="switch label-start" labelText="Ignore alerts" />
                <InputText label="EXTRA" fullWidth />
            </div>
        </Columns>
    );
};
