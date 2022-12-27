import {ChangeEvent, FC, useCallback, useEffect, useState} from "react";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import Link from "@mui/material/Link";
import {Breadcrumbs, Button, CheckboxComponent, Dropdown, InputText} from "@nxt-ui/components";
import {NotificationRuleComposition} from "./composition";
import {NotificationRuleIncludes} from "./includes";
import {NotificationRuleTime} from "./time";
import {NotificationRuleOutput} from "./output";
import {NotificationsHolder} from "./style";
import {useDispatch, useSelector} from "react-redux";
import {
    commonActions,
    commonSelectors,
    CpDispatch,
    notificationRuleActions,
    userNotificationFormActions,
    userNotificationSelectors,
} from "@nxt-ui/cp-redux";
import {ConfirmModal, FlexHolder} from "../../common";
import {DeleteModal} from "@nxt-ui/cp/components";
import {useChangeFormListener} from "@nxt-ui/cp/hooks";
import {MenuItem, SelectChangeEvent} from "@mui/material";
import {INotificationRuleApi} from "@nxt-ui/cp/api";

export const NotificationRuleEdit: FC = () => {
    const dispatch = useDispatch<CpDispatch>();
    const navigate = useNavigate();
    const [activeRule, setActiveRule] = useState<INotificationRuleApi>();
    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
    const {id: idFromUrl} = useParams<"id">();
    const name = useSelector(userNotificationSelectors.name);
    const rules = useSelector(userNotificationSelectors.rules);
    const enabled = useSelector(userNotificationSelectors.enabled);
    const nameError = useSelector(userNotificationSelectors.nameErrors);
    const values = useSelector(userNotificationSelectors.values);
    const appFormStatusChanged = useSelector(commonSelectors.apps.appFormStatus);
    useChangeFormListener(values);
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

    const handleChangeNotification = useCallback(() => {
        if (activeRule?.id && activeRule.id !== idFromUrl) {
            navigate(`/notification/${activeRule.id}`);
        }
    }, [activeRule, idFromUrl, navigate]);

    const setActiveRuleHandler = useCallback(
        (event: SelectChangeEvent<unknown>) => {
            const value = rules.find((item) => item.id === event.target.value);
            if (value) {
                setActiveRule(value);
            }
        },
        [rules]
    );

    const enabledHandler = useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore todo: damn ts build bug
        dispatch(userNotificationFormActions.setEnabled());
    }, [dispatch]);

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

    useEffect(() => {
        dispatch(notificationRuleActions.getNotificationsRules());
    }, [dispatch, idFromUrl]);

    useEffect(() => {
        const value = rules.find((item) => item.id === idFromUrl);
        if (value) {
            setActiveRule(value);
        }
    }, [rules, idFromUrl]);

    return (
        <NotificationsHolder>
            <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
            <div className="notification-heading">
                <h1>
                    {idFromUrl ? "Configure your notification filter" : "New rule - Configure your notification filter"}
                </h1>
                {/* {idFromUrl && (
                    <Button
                        onClick={() => navigate("/notification")}
                        data-type="btn-border"
                        icon="plusBig"
                        iconbefore
                        style={{color: "var(--ok)"}}>
                        Add new
                    </Button>
                )} */}
                <div>
                    <Dropdown
                        value={activeRule?.id || ""}
                        onChange={setActiveRuleHandler}
                        focused={false}
                        label="Open Another Rule">
                        {rules.map((item) => (
                            <MenuItem key={item.id} value={item.id} selected={item.id === idFromUrl}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Dropdown>
                    <Button onClick={handleChangeNotification}>Go</Button>
                </div>
            </div>
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
            <ConfirmModal
                title={"Leaving Page"}
                text={"Are you sure you want to navigate away from this page?"}
                when={appFormStatusChanged}
            />
        </NotificationsHolder>
    );
};
