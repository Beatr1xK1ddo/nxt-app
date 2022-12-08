import {MenuItem, SelectChangeEvent} from "@mui/material";
import {
    Accordion,
    CheckboxComponent,
    TabComponent,
    TabPanel,
    TabsComponent,
    Dropdown,
    InputText,
    TreeItemComponent,
    TreeViewComponent,
} from "@nxt-ui/components";
import {
    EManualSelectionArr,
    EManualSelectionBool,
    userNotificationFormActions,
    userNotificationSelectors,
} from "@nxt-ui/cp-redux";
import {Columns} from "@nxt-ui/cp/components";
import {ENotificationPriority} from "@nxt-ui/cp/types";
import {Icon} from "@nxt-ui/icons";
import {FC, SyntheticEvent, useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

export const NotificationRuleIncludes: FC = () => {
    const [valueAlerts, setValueAlerts] = useState(1);

    const dispatch = useDispatch();
    const priority = useSelector(userNotificationSelectors.priority);
    const manualSelection = useSelector(userNotificationSelectors.manualSelection);

    const handleChangeAlerts = (event: SyntheticEvent, newValue: number) => {
        setValueAlerts(newValue);
    };

    const changePriorityHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(userNotificationFormActions.setPriority(e.target.value as number));
        },
        [dispatch]
    );

    const setManualSelectionBool = useCallback(
        (value: EManualSelectionBool) => () => {
            dispatch(userNotificationFormActions.setManualSelectionBool(value));
        },
        [dispatch]
    );

    const setManualSelectionAdd = useCallback(
        (field: EManualSelectionArr) => (event: React.SyntheticEvent, value: string) => {
            if (value) {
                dispatch(userNotificationFormActions.setManualSelection({field, value}));
            }
        },
        [dispatch]
    );

    const priorityKeys = Object.values(ENotificationPriority).filter((item) => typeof item === "number");
    const priorityValues = Object.values(ENotificationPriority).filter((item) => typeof item === "string");
    return (
        <Accordion className="accordion-ui" active header={"WHAT (ALERTS, EVENTS, OPERATIONS)"} defaultExpanded>
            <TabsComponent value={valueAlerts} onChange={handleChangeAlerts} aria-label="alerts tabs">
                <TabComponent label="BY PRIORITY" />
                <TabComponent label="MANUAL SELECTION" />
            </TabsComponent>
            <TabPanel value={valueAlerts} index={0}>
                <Dropdown label="PRIORITY" value={priority} onChange={changePriorityHandler} inputWidth={430}>
                    {priorityKeys.map((item) => (
                        <MenuItem key={item} value={item}>
                            {/* @ts-ignore */}
                            {ENotificationPriority[item]}
                        </MenuItem>
                    ))}
                </Dropdown>
                {/* <Dropdown value={priority} values={priority} inputWidth={430} multiple label="PRIORITY" /> */}
            </TabPanel>
            <TabPanel value={valueAlerts} index={1}>
                <Columns className="manual-sel-content" gap={40} col={2}>
                    <ul>
                        <li>
                            <CheckboxComponent
                                onClick={setManualSelectionBool(EManualSelectionBool.selectAll)}
                                className="label-left"
                                checkId="check-all"
                                labelText="Select all"
                                checked={manualSelection.selectAll}
                            />
                        </li>
                        <li>
                            <TreeViewComponent
                                aria-label="file system navigator"
                                defaultCollapseIcon={<Icon name="minus" />}
                                defaultExpandIcon={<Icon name="plus" />}
                                onNodeSelect={setManualSelectionAdd(EManualSelectionArr.ipMonitoringEvents)}>
                                <TreeItemComponent nodeId="" label="IP Monitoring Events">
                                    <TreeItemComponent
                                        nodeId="2"
                                        label={
                                            <CheckboxComponent
                                                className="label-left"
                                                checkId="check-mon-events"
                                                labelText="All Monitoring Events"
                                            />
                                        }
                                    />
                                    <TreeItemComponent
                                        nodeId="3"
                                        label={
                                            <CheckboxComponent
                                                className="label-left"
                                                checkId="check-mon-sync"
                                                labelText="IP Monitoring Sync Loss"
                                            />
                                        }
                                    />
                                    <TreeItemComponent
                                        nodeId="4"
                                        label={
                                            <CheckboxComponent
                                                className="label-left"
                                                checkId="check-ip-mon"
                                                labelText="IP Monitroing CC Errors"
                                            />
                                        }
                                    />
                                </TreeItemComponent>
                            </TreeViewComponent>
                        </li>
                        <li>
                            <CheckboxComponent
                                className="label-left"
                                checkId="app-events"
                                labelText="Application Events"
                                onClick={setManualSelectionBool(EManualSelectionBool.applicationEvents)}
                                checked={manualSelection.applicationEvents}
                            />
                        </li>
                        <li>
                            <TreeViewComponent
                                aria-label="file system navigator"
                                defaultCollapseIcon={<Icon name="minus" />}
                                defaultExpandIcon={<Icon name="plus" />}
                                onNodeSelect={setManualSelectionAdd(EManualSelectionArr.serverEvents)}>
                                <TreeItemComponent nodeId="" label="Server Events">
                                    <TreeItemComponent
                                        nodeId="2"
                                        label={
                                            <CheckboxComponent
                                                className="label-left"
                                                checkId="server-all"
                                                labelText="All Server Events"
                                            />
                                        }
                                    />
                                    <TreeItemComponent
                                        nodeId="3"
                                        label={
                                            <CheckboxComponent
                                                className="label-left"
                                                checkId="server-high"
                                                labelText="Server High Temperature"
                                            />
                                        }
                                    />
                                    <TreeItemComponent
                                        nodeId="4"
                                        label={
                                            <CheckboxComponent
                                                className="label-left"
                                                checkId="server-disk"
                                                labelText="Server Disk Full"
                                            />
                                        }
                                    />
                                    <TreeItemComponent
                                        nodeId="5"
                                        label={
                                            <CheckboxComponent
                                                className="label-left"
                                                checkId="server-sdi"
                                                labelText="Server SDI Card Error"
                                            />
                                        }
                                    />
                                    <TreeItemComponent
                                        nodeId="6"
                                        label={
                                            <CheckboxComponent
                                                className="label-left"
                                                checkId="server-netw"
                                                labelText="Server Network Overload"
                                            />
                                        }
                                    />
                                    <TreeItemComponent
                                        nodeId="7"
                                        label={
                                            <CheckboxComponent
                                                className="label-left"
                                                checkId="server-cpu"
                                                labelText="Server CPU Overload"
                                            />
                                        }
                                    />
                                    <TreeItemComponent
                                        nodeId="8"
                                        label={
                                            <CheckboxComponent
                                                className="label-left"
                                                checkId="server-mem"
                                                labelText="Server Memory Full"
                                            />
                                        }
                                    />
                                    <TreeItemComponent
                                        nodeId="9"
                                        label={
                                            <CheckboxComponent
                                                className="label-left"
                                                checkId="server-execut"
                                                labelText="Server Executable Error"
                                            />
                                        }
                                    />
                                </TreeItemComponent>
                            </TreeViewComponent>
                        </li>
                        <li>
                            <CheckboxComponent
                                onClick={setManualSelectionBool(EManualSelectionBool.cpOperations)}
                                className="label-left"
                                checkId=""
                                labelText="CP Operations"
                                checked={manualSelection.cpOperations}
                            />
                        </li>
                        <li>
                            <CheckboxComponent
                                className="label-left"
                                checkId="playout-events"
                                labelText="Playout Events"
                                onClick={setManualSelectionBool(EManualSelectionBool.playoutEvents)}
                                checked={manualSelection.playoutEvents}
                            />
                        </li>
                        <li>
                            <CheckboxComponent
                                className="label-left"
                                checkId="mam-events"
                                labelText="MAM Events"
                                onClick={setManualSelectionBool(EManualSelectionBool.mamEvents)}
                                checked={manualSelection.mamEvents}
                            />
                        </li>
                        <li>
                            <CheckboxComponent
                                className="label-left"
                                checkId="cron-events"
                                labelText="Cron Events"
                                onClick={setManualSelectionBool(EManualSelectionBool.cronEvents)}
                                checked={manualSelection.cronEvents}
                            />
                        </li>
                    </ul>
                    <div>
                        <h2>Or - add keywords and receive any notifications containing it</h2>
                        <InputText className="full-width" label="KEYWORDS" />
                    </div>
                </Columns>
            </TabPanel>
        </Accordion>
    );
};
