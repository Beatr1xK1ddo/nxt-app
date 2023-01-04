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
import {ChangeEvent, FC, SyntheticEvent, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NotificationOptions} from "./style";

export const NotificationRuleIncludes: FC = () => {
    const [valueAlerts, setValueAlerts] = useState(0);

    const dispatch = useDispatch();
    const priority = useSelector(userNotificationSelectors.priority);
    const manualSelection = useSelector(userNotificationSelectors.manualSelection);
    const what = useSelector(userNotificationSelectors.what);
    const messageTypes = useSelector(userNotificationSelectors.messageTypes);
    const selectAll = useSelector(userNotificationSelectors.selectAll);

    const handleChangeAlerts = (event: SyntheticEvent, newValue: number) => {
        setValueAlerts(newValue);
    };

    const changePriorityHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore todo: damn ts build bug
            dispatch(userNotificationFormActions.setPriority(e.target.value as Array<number>));
        },
        [dispatch]
    );

    const setManualSelectionBool = useCallback(
        (value: string) => () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore todo: damn ts build bug
            dispatch(userNotificationFormActions.setManualSelectionBool(value));
        },
        [dispatch]
    );

    const selectAllHandler = useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore todo: damn ts build bug
        dispatch(userNotificationFormActions.selectAll());
    }, [dispatch]);

    const setName = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore todo: damn ts build bug
            dispatch(userNotificationFormActions.setKeywords(event.currentTarget.value));
        },
        [dispatch]
    );

    useEffect(() => {
        dispatch(userNotificationFormActions.fetchNotificationMessageTypes());
    }, [dispatch]);

    const priorityKeys = Object.values(ENotificationPriority).filter(
        (item) => typeof item === "number"
    ) as Array<ENotificationPriority>;
    return (
        <Accordion
            expanded={true}
            className="accordion-ui"
            active
            header={"WHAT (ALERTS, EVENTS, OPERATIONS)"}
            defaultExpanded>
            <NotificationOptions>
                <div>
                    {/* <TabsComponent value={valueAlerts} onChange={handleChangeAlerts} aria-label="alerts tabs">
                        <TabComponent label="BY PRIORITY" />
                        <TabComponent label="MANUAL SELECTION" />
                    </TabsComponent> */}
                    <h2>Notification Type</h2>
                    <Dropdown
                        focused={false}
                        multiple
                        label="Notification Type"
                        value={priority}
                        onChange={changePriorityHandler}>
                        <MenuItem key={1337} value={1337} selected={priority.includes(1337)}>
                            Manual Selection
                        </MenuItem>
                        {priorityKeys.map((item) => (
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore todo: damn ts build bug
                            <MenuItem key={item} value={item} selected={priority.includes(item)}>
                                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                {/* @ts-ignore */}
                                {ENotificationPriority[item]}
                            </MenuItem>
                        ))}
                    </Dropdown>
                    {priority.includes(1337) ? (
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
                                            labelText={item.category || item.name.replace("_", " ")}
                                            onClick={setManualSelectionBool(item.name)}
                                            checked={manualSelection.includes(item.name)}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </Columns>
                    ) : null}
                </div>
                <div>
                    <h2>KEYWORDS</h2>
                    <InputText
                        // style={{maxWidth: 500}}
                        onChange={setName}
                        value={what.keyWords}
                        className="full-width"
                        label="You will only receive notifications that contain the keywords"
                        helperText=""
                        placeholder="sync loss, cc errors"
                    />
                </div>
            </NotificationOptions>
        </Accordion>
    );
};
