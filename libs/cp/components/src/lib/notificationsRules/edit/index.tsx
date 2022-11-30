import {FC} from "react";
import {Link as RouterLink} from "react-router-dom";
import Link from "@mui/material/Link";
import styled from "@emotion/styled";
import {Breadcrumbs, CheckboxComponent} from "@nxt-ui/components";
import {NotificationRuleComposition} from "./composition";
import {NotificationRuleIncludes} from "./includes";
import {NotificationRuleTime} from "./time";
import {NotificationRuleOutput} from "./output";

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
    div[role="tabpanel"],
    .notification-tabs {
        margin: 0 0 20px;
    }
    div[role="region"] div[role="tabpanel"] {
        margin: 0;
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
            > li {
                padding: 8px 8px;
                box-sizing: border-box;
                // height: 40px;
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

export const NotificationRuleEdit: FC = () => {
    const breadcrumbs = [
        <Link key={1} component={RouterLink} to="/projects">
            Projects
        </Link>,
        <span>Notifications server</span>,
    ];

    const priorityArr = [
        <CheckboxComponent className="label-left" checkId="check-all" labelText="Select all" />,
        "mon",
    ];

    return (
        <NotificationsHolder>
            <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
            <h1>New rule - define from where you get notified of or whom you subscribe to</h1>
            <NotificationRuleComposition />
            <NotificationRuleIncludes />
            <NotificationRuleTime />
            <NotificationRuleOutput />
        </NotificationsHolder>
    );
};
