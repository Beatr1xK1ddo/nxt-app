import {ChangeEvent, FC, useCallback, useEffect, useState} from "react";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import Link from "@mui/material/Link";
import {Breadcrumbs, Button, InputText} from "@nxt-ui/components";
import {NotificationRuleComposition} from "./composition";
import {NotificationRuleIncludes} from "./includes";
import {NotificationRuleTime} from "./time";
import {NotificationRuleOutput} from "./output";
import {NotificationsHolder} from "./style";
import {useDispatch, useSelector} from "react-redux";
import {
    commonActions,
    CpDispatch,
    notificationRuleActions,
    userNotificationFormActions,
    userNotificationSelectors,
} from "@nxt-ui/cp-redux";
import {FlexHolder} from "../../common";
import {DeleteModal} from "@nxt-ui/cp/components";

export const NotificationRuleEdit: FC = () => {
    const dispatch = useDispatch<CpDispatch>();
    const navigate = useNavigate();
    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
    const {id: idFromUrl} = useParams<"id">();
    const name = useSelector(userNotificationSelectors.name);
    const nameError = useSelector(userNotificationSelectors.nameErrors);
    const setName = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(userNotificationFormActions.setName(event.currentTarget.value));
        },
        [dispatch]
    );

    const breadcrumbs = [
        <Link key={1} component={RouterLink} to="/notifications">
            Notifications
        </Link>,
        <span>{idFromUrl ? name : "Create new"}</span>,
    ];

    const createNotification = useCallback(() => {
        dispatch(userNotificationFormActions.createNotification())
            .unwrap()
            .then((data) => {
                if (data.id) {
                    navigate(`/notification/${data.id}`);
                    const message = `Notification was successfuly ${idFromUrl ? "saved" : "created"}`;
                    dispatch(commonActions.notificationsActions.add({message}));
                }
            })
            .catch(() => console.log("error occured"));
    }, [dispatch, navigate, idFromUrl]);

    const handleDialogClose = useCallback(() => setRemoveDialogOpen(false), []);

    const deleteNotification = useCallback(() => {
        if (idFromUrl) {
            dispatch(notificationRuleActions.deleteNotificationsRule(idFromUrl))
                .unwrap()
                .then(() => {
                    navigate("/notifications");
                    const message = `Notification was successfuly deleted`;
                    dispatch(commonActions.notificationsActions.add({message}));
                })
                .catch(() => {
                    const message = `Error occured whilee deleting notification`;
                    dispatch(commonActions.notificationsActions.add({message}));
                });
        }
        handleDialogClose();
    }, [dispatch, idFromUrl, navigate, handleDialogClose]);

    const handleDialogOpen = useCallback(() => setRemoveDialogOpen(true), []);

    const goRules = useCallback(() => navigate("/notifications"), [navigate]);

    useEffect(() => {
        if (idFromUrl) {
            dispatch(userNotificationFormActions.getNotificationsRule(idFromUrl));
        }
        return () => {
            dispatch(userNotificationFormActions.resetForm());
        };
    }, [idFromUrl, dispatch]);

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
                <Button onClick={createNotification}>{idFromUrl ? "Save" : "Create"}</Button>
                {idFromUrl && (
                    <>
                        <Button>Copy</Button>
                        <Button style={{background: "var(--danger)"}} onClick={handleDialogOpen}>
                            Delete
                        </Button>
                        <DeleteModal
                            text="Delete Notification"
                            title="Confirm action"
                            open={removeDialogOpen}
                            onAprove={deleteNotification}
                            onClose={handleDialogClose}
                        />
                    </>
                )}
                <Button onClick={goRules} data-type="btn-border" style={{color: "var(--grey-dark)"}}>
                    Back
                </Button>
            </FlexHolder>
        </NotificationsHolder>
    );
};
