import {useState, SyntheticEvent} from "react";
import {Columns, FlexHolder} from "@nxt-ui/cp/components";
import {Link as RouterLink} from "react-router-dom";
import Link from "@mui/material/Link";
import {Icon} from "@nxt-ui/icons";
import styled from "@emotion/styled";
import {
    Button,
    Breadcrumbs,
    Accordion,
    CheckboxComponent,
    TabComponent,
    TabPanel,
    TabsComponent,
    Dropdown,
    InputText,
    RadioButtonsStyled,
    TimePickerInput,
} from "@nxt-ui/components";
import {FC} from "react";

const NotificationsHolder = styled.section`
    div[aria-labelledby="radio-days"] {
        flex-direction: row;
        flex-wrap: nowrap;
        margin: 0;
        span[font-size="medium"] {
            width: 48px;
            height: 48px;
            border: 1px solid var(--pale-str);
        }
        .MuiFormControlLabel-root {
            position: relative;
            margin: 0 16px 0 0;
            display: inline-block;
            vertical-align: top;
            .MuiTypography-root {
                font-size: calc(var(--fz) - 2px);
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
        .Mui-checked {
            span[font-size="medium"] {
                background: var(--b-gblue);
            }
        }
    }
    #tabpanel-0,
    .notification-tabs {
        margin: 0 0 20px;
    }
    .notification-elements {
        margin: 0 -8px;
        > * {
            margin: 0 8px;
        }
        > svg {
            min-width: 24px;
        }
        @media (max-width: 768px) {
            margin: 0 -4px;
            > * {
                margin: 0 4px;
            }
        }
    }
    .notification-output {
        .text-add {
            font-size: calc(var(--fz) - 4px);
            em {
                font-style: normal;
                font-size: calc(var(--fz) + 2px);
            }
        }
        .MuiFormControl-root {
            width: 33%;
        }
    }
    .notification-output-last {
        margin-top: 45px;
        margin-bottom: 10px;
        .MuiFormControl-root {
            width: 50%;
        }
    }
    .manual-sel-content {
        margin: 0;
        > ul {
            li {
                padding: 4px 8px;
                box-sizing: border-box;
                height: 40px;
                display: flex;
                align-items: center;
                border-bottom: 1px solid var(--grey-light);
                &:last-of-type {
                    border: none;
                }
                > svg {
                    margin: 0 5px 0 0;
                }
            }
        }
    }
    h1 {
        margin: 0 0 18px;
    }
    h2 {
        text-transform: uppercase;
        color: var(--blacked);
        margin: 0 0 16px;
        font-family: var(--osc-bold);
        font-size: var(--fz);
    }
    label[for="check-all"] {
        font-weight: 700;
        text-transform: uppercase;
        color: var(--blacked);
    }
    .time-picker-holder {
        padding: 35px 0 0;
        .MuiTextField-root {
            margin: 0 16px 0 0;
            width: 205px;
        }
    }
    .accordion-ui {
        button.MuiTab-root {
            padding: 3px 9px;
        }
    }
    
    @media (max-width: 768px) {
        .manual-sel-content {
            gap: 25px;
        }
        .notification-output-last {
            margin-top: 15px;
        }
        .time-picker-holder {
            padding-top: 15px;
        }
        div[aria-labelledby="radio-days"] {
            span[font-size="medium"] {
                width: 28px;
                height: 28px;
            }
            .MuiFormControlLabel-root {
                margin-right: 6px;
                .MuiTypography-root {
                    font-size: calc(var(--fz) - 5px);
                }
            }
        }
    }
`;

export const NotificationServer: FC = () => {
    const breadcrumbs = [
        <Link key={1} component={RouterLink} to="/projects">
            Projects
        </Link>,
        <span>Notifications server</span>,
    ];

    const [valueApps, setValueApps] = useState(0);
    const handleChangeApps = (event: SyntheticEvent, newValue: number) => {
        setValueApps(newValue);
    };

    const [valueAlerts, setValueAlerts] = useState(1);
    const handleChangeAlerts = (event: SyntheticEvent, newValue: number) => {
        setValueAlerts(newValue);
    };
    const radioDay = [
        {id: 1, value: "monday", label: "Mo"},
        {id: 2, value: "tuesday", label: "Tu"},
        {id: 3, value: "wednesday", label: "We"},
        {id: 4, value: "thursday", label: "Th"},
        {id: 5, value: "friday", label: "Fr"},
        {id: 6, value: "saturday", label: "Sa"},
        {id: 7, value: "sunsday", label: "Su"},
    ];
    const [value, setValue] = useState<Date | null>(null);

    return (
        <NotificationsHolder>
            <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
            <h1>New rule - define from where you get notified of or whom you subscribe to</h1>
            <TabsComponent
                className="notification-tabs"
                value={valueApps}
                onChange={handleChangeApps}
                aria-label="Apps tabs">
                <TabComponent label="WHERE (DEVICES / APPS)" />
                <TabComponent label="WHOM (COMPANY / EMPLOYEES)" />
            </TabsComponent>
            <TabPanel value={valueApps} index={0}>
                <FlexHolder justify="flex-start" className="notification-elements">
                    <Dropdown label="DEVICE ID" />
                    <Icon name="arrRight" />
                    <Dropdown label="APP TYPE" />
                    <Icon name="arrRight" />
                    <Dropdown label="APPS" />
                </FlexHolder>
            </TabPanel>
            <TabPanel value={valueApps} index={1}>
                Item Two
            </TabPanel>
            <Accordion className="accordion-ui" active header={"WHAT (ALERTS, EVENTS, OPERATIONS)"} defaultExpanded>
                <TabsComponent value={valueAlerts} onChange={handleChangeAlerts} aria-label="alerts tabs">
                    <TabComponent label="BY PRIORITY" />
                    <TabComponent label="MANUAL SELECTION" />
                </TabsComponent>
                <TabPanel value={valueAlerts} index={0}>
                    Item One
                </TabPanel>
                <TabPanel value={valueAlerts} index={1}>
                    <Columns className="manual-sel-content" gap={40} col={2}>
                        <ul>
                            <li>
                                <CheckboxComponent className="label-left" checkId="check-all" labelText="Select all" />
                            </li>
                            <li>
                                <Icon name="plus" /> IP Monitoring Events
                            </li>
                            <li>
                                <CheckboxComponent
                                    className="label-left"
                                    checkId="app-events"
                                    labelText="Application Events
"
                                />
                            </li>
                            <li>
                                <Icon name="plus" /> Server Events
                            </li>
                            <li>
                                <CheckboxComponent className="label-left" checkId="" labelText="CP Operations" />
                            </li>
                            <li>
                                <CheckboxComponent
                                    className="label-left"
                                    checkId="playout-events"
                                    labelText="Playout Events
"
                                />
                            </li>
                            <li>
                                <CheckboxComponent
                                    className="label-left"
                                    checkId="mam-events"
                                    labelText="MAM Events
"
                                />
                            </li>
                            <li>
                                <CheckboxComponent
                                    className="label-left"
                                    checkId="cron-events"
                                    labelText="Cron Events
"
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
            <Accordion className="accordion-ui" active header={"DAY AND TIME RANGE"} defaultExpanded>
                <CheckboxComponent className="label-left" checkId="check-range" labelText="Set range" />
                <FlexHolder justify="flex-start" className="time-picker-holder">
                    <RadioButtonsStyled
                        defaultValue=""
                        name="radioDay"
                        aria-labelledby="radio-days"
                        radioArr={radioDay}
                    />
                    <TimePickerInput
                        PopperProps={{
                            placement: "bottom-start",
                            disablePortal: true,
                        }}
                        showToolbar={true}
                        label="FROM, TIME"
                        value={value}
                        onChange={(newValue: any) => {
                            setValue(newValue);
                        }}
                    />
                    <TimePickerInput
                        PopperProps={{
                            placement: "bottom-start",
                            disablePortal: true,
                        }}
                        showToolbar={true}
                        label="TO, TIME"
                        value={value}
                        onChange={(newValue: any) => {
                            setValue(newValue);
                        }}
                    />
                </FlexHolder>
            </Accordion>

            <Accordion className="accordion-ui" active header={"OUTPUT"} defaultExpanded>
                <FlexHolder justify="flex-start" className="notification-elements notification-output">
                    <Dropdown label="OUTPUT TYPE" />
                    <InputText label="E-MAIl" />
                    <span className="text-add">
                        You'd be getting <br />
                        <em>~25</em> messages daily.
                    </span>
                </FlexHolder>
                <FlexHolder justify="flex-start" className="notification-elements notification-output-last">
                    <Dropdown label="RULE NAME" />
                    <Button disabled={true}>Clear rule</Button>
                    <Button data-type="btn-gray">Clear all</Button>
                    <Button data-type="btn-border" style={{color: "var(--grey-dark)"}}>
                        Cancel
                    </Button>
                </FlexHolder>
            </Accordion>
        </NotificationsHolder>
    );
};
