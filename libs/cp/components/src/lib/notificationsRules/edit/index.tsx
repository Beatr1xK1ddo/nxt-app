import {FC} from "react";
import {Link as RouterLink} from "react-router-dom";
import Link from "@mui/material/Link";
import {Breadcrumbs, CheckboxComponent} from "@nxt-ui/components";
import {NotificationRuleComposition} from "./composition";
import {NotificationRuleIncludes} from "./includes";
import {NotificationRuleTime} from "./time";
import {NotificationRuleOutput} from "./output";
import {NotificationsHolder} from "./style";

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
