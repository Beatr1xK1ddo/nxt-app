import {MenuItem, SelectChangeEvent} from "@mui/material";
import {
    Accordion,
    CheckboxComponent,
    TabComponent,
    TabPanel,
    TabsComponent,
    Dropdown,
    InputText,
} from "@nxt-ui/components";
import {userNotificationFormActions, userNotificationSelectors} from "@nxt-ui/cp-redux";
import {Columns} from "@nxt-ui/cp/components";
import {ENotificationPriority} from "@nxt-ui/cp/types";
import {Icon} from "@nxt-ui/icons";
import {FC, SyntheticEvent, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

export const NotificationRuleIncludes: FC = () => {
    const [valueAlerts, setValueAlerts] = useState(1);

    const dispatch = useDispatch();
    const priority = useSelector(userNotificationSelectors.priority);
    const manualSelection = useSelector(userNotificationSelectors.manualSelection);
    const messageTypes = useSelector(userNotificationSelectors.messageTypes);
    const selectAll = useSelector(userNotificationSelectors.selectAll);

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
        (value: string) => () => {
            dispatch(userNotificationFormActions.setManualSelectionBool(value));
        },
        [dispatch]
    );

    const selectAllHandler = useCallback(() => {
        dispatch(userNotificationFormActions.selectAll());
    }, [dispatch]);

    useEffect(() => {
        dispatch(userNotificationFormActions.fetchNotificationMessageTypes());
    }, [dispatch]);

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
                                onClick={selectAllHandler}
                                className="label-left"
                                checkId="check-all"
                                labelText="Select all"
                                checked={selectAll}
                            />
                        </li>
                        {messageTypes.map((item, index) => (
                            <li>
                                <CheckboxComponent
                                    className="label-left"
                                    checkId="app-events"
                                    labelText={item.category || `Field ${index}`}
                                    onClick={setManualSelectionBool(item.name)}
                                    checked={manualSelection.includes(item.name)}
                                />
                            </li>
                        ))}
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
