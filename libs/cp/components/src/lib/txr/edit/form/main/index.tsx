import {FC} from "react";
import {Dropdown, InputText, CheckboxComponent} from "@nxt-ui/components";
import {Columns} from "@nxt-ui/cp/components";
import {ProxyList} from "./proxyList/index";
import "./index.css";

export const Main: FC = () => {
    return (
        <Columns col={2}>
            <div className="txr-mail-col">
                <span className="text-small">TX Server settings</span>
                <Dropdown label="NODE" />
                <Columns col={2}>
                    <InputText label="SOURCE IP" fullWidth />
                    <InputText label="SOURCE PORT" fullWidth />
                </Columns>
                <InputText label="USE INTERFACE" fullWidth />
                <InputText label="Destination server IP" fullWidth />
                <CheckboxComponent
                    checkId="openPorts"
                    className="switch label-start"
                    labelText="Open Ports As Server"
                />
                <CheckboxComponent checkId="monitorSource" className="switch label-start" labelText="Monitor source" />
                <InputText label="Description" fullWidth />
                <InputText label="Extra" fullWidth />
                <span className="text-small">Proxy Server</span>
                <Dropdown label="SERVER IP" />
                <ProxyList></ProxyList>
            </div>
            <div className="txr-mail-col">
                <span className="text-small">RX Server settings</span>
                <Dropdown label="NODE" />
                <Columns col={2}>
                    <InputText label="DESTINATION IP" fullWidth />
                    <InputText label="DESTINATION PORT" fullWidth />
                </Columns>
                <Dropdown label="USE INTERFACE" />
                <InputText label="TRANSMISSION PORT" fullWidth />
                <Dropdown label="DOUBLE TRANSMISSION" />
                <InputText label="Source server IP" fullWidth />
                <InputText label="BUFFER" fullWidth />
                <InputText label="TTL" fullWidth />
                <CheckboxComponent
                    checkId="monitorDestination"
                    className="switch label-start"
                    labelText="Monitor destination"
                />
                <CheckboxComponent checkId="ignoreAlerts" className="switch label-start" labelText="Ignore alerts" />
                <InputText label="EXTRA" fullWidth />
            </div>
        </Columns>
    );
};
