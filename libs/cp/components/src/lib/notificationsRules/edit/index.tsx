import {ChangeEvent, FC, useCallback} from "react";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import Link from "@mui/material/Link";
import {Breadcrumbs, Button, InputText} from "@nxt-ui/components";
import {NotificationRuleComposition} from "./composition";
import {NotificationRuleIncludes} from "./includes";
import {NotificationRuleTime} from "./time";
import {NotificationRuleOutput} from "./output";
import {NotificationsHolder} from "./style";
import {useDispatch, useSelector} from "react-redux";
import {userNotificationFormActions, userNotificationSelectors} from "@nxt-ui/cp-redux";
import {FlexHolder} from "../../common";

export const NotificationRuleEdit: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const name = useSelector(userNotificationSelectors.name);
    const nameError = useSelector(userNotificationSelectors.nameErrors);
    const setName = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(userNotificationFormActions.setName(event.currentTarget.value));
        },
        [dispatch]
    );

    const breadcrumbs = [
        <Link key={1} component={RouterLink} to="/projects">
            Projects
        </Link>,
        <span>Notifications server</span>,
    ];

    const createNotification = useCallback(() => {
        dispatch(userNotificationFormActions.createNotification());
    }, [dispatch]);

    const goRules = useCallback(() => navigate("/notifications"), [navigate]);

    return (
        <NotificationsHolder>
            <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
            <h1>New rule - define from where you get notified of or whom you subscribe to</h1>
            <NotificationRuleComposition />
            <NotificationRuleIncludes />
            <NotificationRuleTime />
            <NotificationRuleOutput />
            <FlexHolder justify="flex-start" className="notification-elements notification-output-last">
                <InputText
                    error={nameError?.error}
                    helperText={nameError?.helperText}
                    onChange={setName}
                    className="full-width"
                    label="RULL NAME"
                    value={name}
                />
                <Button onClick={createNotification}>Create</Button>
                <Button onClick={goRules} data-type="btn-border" style={{color: "var(--grey-dark)"}}>
                    Back
                </Button>
            </FlexHolder>
        </NotificationsHolder>
    );
};
