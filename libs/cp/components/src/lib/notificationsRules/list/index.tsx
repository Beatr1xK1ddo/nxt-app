import {DeleteModal, StrippedTable} from "@nxt-ui/cp/components";
import {ChangeEvent, FC, useCallback, useEffect, useMemo, useState} from "react";
import {Button, CheckboxComponent, Dropdown, InputText, TooltipComponent} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import styled from "@emotion/styled";
import {useNavigate} from "react-router-dom";
import {
    commonActions,
    commonSelectors,
    CpDispatch,
    CpRootState,
    notificationRuleActions,
    userNotificationFormActions,
    userNotificationSelectors,
} from "@nxt-ui/cp-redux";
import {useDispatch, useSelector} from "react-redux";
import {
    EApiDefinitionType,
    ENotificationActions,
    IEmailDelivery,
    IFilterValues,
    INotificationApp,
    INotificationAppType,
    INotificationEmploye,
    INotificationRuleApi,
    ISlackDelivery,
    ISmsDelivery,
    IUserIdDelivery,
} from "@nxt-ui/cp/api";
import {
    EDataProcessingStatus,
    EDeliveryChannel,
    ENotificationDeliveryChannel,
    ENotificationPriority,
    ERulesActions,
    ICompaniesListItem,
    INodesListItem,
} from "@nxt-ui/cp/types";
import clsx from "clsx";
import {SelectChangeEvent} from "@mui/material/Select/SelectInput";
import "./index.css";
const NotificationsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 0 0 2.5rem;
`;
const NotificationsEmpty = styled.div`
    text-align: center;
    font-size: 0.625rem;
    h2 {
        margin: 0 0 0.5rem;
        text-align: center;
    }
`;

const NotificationsIcon = styled.div({
    marginBottom: "0.625rem",
    display: "inline-block",
    width: "4.5rem",
    height: "4.5rem",
    backgroundImage:
        "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNzIiIHZpZXdCb3g9IjAgMCA3MiA3MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYgMzAuNUM2IDI4LjUgOSAyNiAxMS41IDI0TDE0LjUgMjJNNiAzMC41VjYzLjVDNiA2Ni41MjUgOC40NzUgNjkgMTEuNSA2OUg2MUM2NC4wMjUgNjkgNjYuNSA2Ni41MjUgNjYuNSA2My41VjMwLjVDNjYuNSAyOSA2NS41IDI2IDYyLjUgMjRMNTggMjJNNiAzMC41TDM0LjExNzYgNDUuNDk2MUMzNS4yOTQxIDQ2LjEyMzUgMzYuNzA1OSA0Ni4xMjM1IDM3Ljg4MjQgNDUuNDk2MUw2NiAzMC41TTE1IDM1LjE2NjdWMkg1OFYzNC4xNjY3IiBzdHJva2U9IiNGQUE3NEEiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNMzUuMzc1IDEwLjkzNzVDMzUuMzc1IDEwLjU5MjMgMzUuNjU0OCAxMC4zMTI1IDM2IDEwLjMxMjVDMzYuMzQ1MiAxMC4zMTI1IDM2LjYyNSAxMC41OTIzIDM2LjYyNSAxMC45Mzc1VjExLjU2MjVIMzUuMzc1VjEwLjkzNzVaTTM2IDMxLjY4NzVDMzUuMjA3MiAzMS42ODc1IDM0LjUzNzYgMzEuMTYwNCAzNC4zMjI1IDMwLjQzNzVIMzcuNjc3NUMzNy40NjI0IDMxLjE2MDQgMzYuNzkyOCAzMS42ODc1IDM2IDMxLjY4NzVaIiBmaWxsPSIjMzIzMjMyIiBzdHJva2U9IiNGQUE3NEEiLz4KPG1hc2sgaWQ9InBhdGgtMy1pbnNpZGUtMV83OTY5XzE2MTQyNiIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMjkuMTE3NiAxNy45Mzc1QzI5LjExNzYgMTQuNjIzOCAzMS44MDM5IDExLjkzNzUgMzUuMTE3NiAxMS45Mzc1SDM2Ljg4MjRDNDAuMTk2MSAxMS45Mzc1IDQyLjg4MjQgMTQuNjIzOCA0Mi44ODI0IDE3LjkzNzVWMjUuNDM3NUw0NSAyNy42ODc1VjI4LjgxMjVIMjdWMjcuNjg3NUwyOS4xMTc2IDI1LjQzNzVWMTcuOTM3NVoiLz4KPC9tYXNrPgo8cGF0aCBkPSJNNDUgMjguODEyNVYzMC44MTI1QzQ2LjEwNDYgMzAuODEyNSA0NyAyOS45MTcxIDQ3IDI4LjgxMjVINDVaTTI3IDI4LjgxMjVIMjVDMjUgMjkuOTE3MSAyNS44OTU0IDMwLjgxMjUgMjcgMzAuODEyNVYyOC44MTI1Wk0yOS4xMTc2IDI1LjQzNzVMMzAuNTc0IDI2LjgwODJMMzEuMTE3NiAyNi4yMzA3VjI1LjQzNzVIMjkuMTE3NlpNNDIuODgyNCAyNS40Mzc1SDQwLjg4MjRWMjYuMjMwN0w0MS40MjYgMjYuODA4Mkw0Mi44ODI0IDI1LjQzNzVaTTI3IDI3LjY4NzVMMjUuNTQzNiAyNi4zMTY4TDI1IDI2Ljg5NDNWMjcuNjg3NUgyN1pNNDUgMjcuNjg3NUg0N1YyNi44OTQzTDQ2LjQ1NjQgMjYuMzE2OEw0NSAyNy42ODc1Wk0zNS4xMTc2IDEzLjkzNzVIMzYuODgyNFY5LjkzNzVIMzUuMTE3NlYxMy45Mzc1Wk00NSAyNi44MTI1SDI3VjMwLjgxMjVINDVWMjYuODEyNVpNMzEuMTE3NiAyNS40Mzc1VjE3LjkzNzVIMjcuMTE3NlYyNS40Mzc1SDMxLjExNzZaTTQwLjg4MjQgMTcuOTM3NVYyNS40Mzc1SDQ0Ljg4MjRWMTcuOTM3NUg0MC44ODI0Wk0yOSAyOC44MTI1VjI3LjY4NzVIMjVWMjguODEyNUgyOVpNMjguNDU2NCAyOS4wNTgyTDMwLjU3NCAyNi44MDgyTDI3LjY2MTIgMjQuMDY2OEwyNS41NDM2IDI2LjMxNjhMMjguNDU2NCAyOS4wNTgyWk00MS40MjYgMjYuODA4Mkw0My41NDM2IDI5LjA1ODJMNDYuNDU2NCAyNi4zMTY4TDQ0LjMzODggMjQuMDY2OEw0MS40MjYgMjYuODA4MlpNNDMgMjcuNjg3NVYyOC44MTI1SDQ3VjI3LjY4NzVINDNaTTM2Ljg4MjQgMTMuOTM3NUMzOS4wOTE1IDEzLjkzNzUgNDAuODgyNCAxNS43Mjg0IDQwLjg4MjQgMTcuOTM3NUg0NC44ODI0QzQ0Ljg4MjQgMTMuNTE5MiA0MS4zMDA2IDkuOTM3NSAzNi44ODI0IDkuOTM3NVYxMy45Mzc1Wk0zNS4xMTc2IDkuOTM3NUMzMC42OTk0IDkuOTM3NSAyNy4xMTc2IDEzLjUxOTIgMjcuMTE3NiAxNy45Mzc1SDMxLjExNzZDMzEuMTE3NiAxNS43Mjg0IDMyLjkwODUgMTMuOTM3NSAzNS4xMTc2IDEzLjkzNzVWOS45Mzc1WiIgZmlsbD0iI0ZBQTc0QSIgbWFzaz0idXJsKCNwYXRoLTMtaW5zaWRlLTFfNzk2OV8xNjE0MjYpIi8+Cjwvc3ZnPgo=)",
});

type INotificationElemProps = {
    notification?: INotificationRuleApi;
};

const NotificationElem: FC<INotificationElemProps> = ({notification}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selected = useSelector(userNotificationSelectors.selected);
    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);

    const goRule = useCallback(() => navigate(`/notification/${notification?.id}`), [notification?.id, navigate]);
    const handleDialogClose = useCallback(() => setRemoveDialogOpen(false), []);

    const nodeId = useMemo(() => {
        const value = notification?.filter?.definitions.find((item) => item.type === EApiDefinitionType.node_id);
        if (value) {
            return parseInt((value as IFilterValues)?.values?.[0] as string);
        }
        return null;
    }, [notification?.filter.definitions]);

    const appTypeString = useMemo(() => {
        const value = notification?.filter?.definitions.find((item) => item.type === EApiDefinitionType.app_type);

        if (value) {
            return (value as IFilterValues).values[0] as string;
        }
        return null;
    }, [notification?.filter.definitions]);

    const appsId = useMemo(() => {
        const value = notification?.filter?.definitions.find((item) => item.type === EApiDefinitionType.app_id);

        if (value) {
            return parseInt((value as IFilterValues)?.values?.[0] as string);
        }
        return null;
    }, [notification?.filter.definitions]);

    const companyId = useMemo(() => {
        const value = notification?.filter?.definitions.find((item) => item.type === EApiDefinitionType.company_id);

        if (value) {
            return (value as IFilterValues)?.values?.[0] as number;
        }
        return null;
    }, [notification?.filter.definitions]);

    const employeId = useMemo(() => {
        const value = notification?.filter?.definitions.find((item) => item.type === EApiDefinitionType.user_id);

        if (value) {
            return (value as IFilterValues).values[0] as number;
        }
        return null;
    }, [notification?.filter.definitions]);

    const node = useSelector<CpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, nodeId)
    );

    const appType = useSelector<CpRootState, undefined | INotificationAppType>((state) =>
        userNotificationSelectors.appTypesById(state, appTypeString)
    );

    const app = useSelector<CpRootState, undefined | INotificationApp>((state) =>
        userNotificationSelectors.appsListById(state, appsId)
    );

    const company = useSelector<CpRootState, undefined | ICompaniesListItem>((state) =>
        commonSelectors.companies.selectById(state, companyId)
    );

    const employe = useSelector<CpRootState, undefined | INotificationEmploye>((state) =>
        userNotificationSelectors.employesById(state, employeId)
    );

    const setSelectedHandler = useCallback(() => {
        if (notification?.id) {
            dispatch(notificationRuleActions.setSelected(notification.id));
        }
    }, [notification?.id, dispatch]);

    const copyHandler = useCallback(() => {
        if (notification) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore todo: damn ts build bug
            dispatch(userNotificationFormActions.setCopy(notification));
            navigate("/notification");
        }
    }, [notification, dispatch, navigate]);

    const deleteRule = useCallback(() => {
        if (notification?.id) {
            dispatch(notificationRuleActions.deleteNotificationsRule(notification.id))
                //@ts-ignore
                .then(() => {
                    const message = `Notification was successfuly deleted`;
                    dispatch(commonActions.notificationsActions.add({message}));
                })
                .catch(() => {
                    const message = `Error occured whilee deleting notification`;
                    dispatch(commonActions.notificationsActions.add({message}));
                });
        }
        handleDialogClose();
    }, [notification?.id, dispatch, handleDialogClose]);

    const sendingTo = useMemo(() => {
        const channelName =
            notification?.deliveryChannel.type === ENotificationDeliveryChannel.sms
                ? `Phone ${(notification?.deliveryChannel as ISmsDelivery).phoneNumber}`
                : notification?.deliveryChannel.type === ENotificationDeliveryChannel.slack
                ? `Slack @${(notification?.deliveryChannel as ISlackDelivery).username} ${
                      (notification?.deliveryChannel as ISlackDelivery).channel
                  }`
                : notification?.deliveryChannel.type === ENotificationDeliveryChannel.email
                ? `Email ${(notification?.deliveryChannel as IEmailDelivery).email}`
                : notification?.deliveryChannel.type === ENotificationDeliveryChannel.crm_ticket
                ? `Crm ${(notification?.deliveryChannel as IUserIdDelivery).userId}`
                : notification?.deliveryChannel.type === ENotificationDeliveryChannel.cp_notification
                ? `Cp ${(notification?.deliveryChannel as IUserIdDelivery).userId}`
                : "";
        if (channelName) {
            return `Sending to ${channelName}`;
        }
        return channelName;
    }, [notification?.deliveryChannel]);

    const textFrom = useMemo(() => {
        if (node || app || appType) {
            return (
                <>
                    {node?.name ? <div>{`Node: ${node.name}`}</div> : null}
                    {appType?.title ? <div>{`App type: ${appType.title}`}</div> : null}
                    {app?.name ? <div>{`App name: ${app.name}`}</div> : null}
                </>
            );
        }
        if (company || employe) {
            return (
                <>
                    {company ? <div>{`Company: ${company.name}`}</div> : null}
                    {employe ? <div>{`Employe: ${employe.email}`}</div> : null}
                </>
            );
        }
        return null;
    }, [node, app, appType, company, employe]);

    const textContent = useMemo(() => {
        const msgTypes = notification?.filter.definitions.find((item) => item.type === EApiDefinitionType.message_type);
        if (msgTypes) {
            return <div>{`Manual selection ${(msgTypes as IFilterValues).values.join(" ")}`}</div>;
        }
        return null;
    }, [notification?.filter]);

    const textContent2 = useMemo(() => {
        const priority = notification?.filter.definitions.find(
            (item) => item.type === EApiDefinitionType.message_priority
        );
        if (priority) {
            const values = (priority as IFilterValues).values
                .map((item) => ENotificationPriority[parseInt(item as string)])
                .join(", ");
            return <div>{`Priority: ${values}`}</div>;
        }
        return null;
    }, [notification?.filter]);

    const handleDialogOpen = useCallback(() => setRemoveDialogOpen(true), []);

    const toggleActive = useCallback(() => {
        if (notification) {
            dispatch(notificationRuleActions.updateEnabled(notification));
        }
    }, [notification, dispatch]);

    const actionButton = useMemo(() => {
        return notification?.enabled ? "pause" : "play";
    }, [notification?.enabled]);

    return (
        <tr className={clsx(!!(notification?.id && selected.includes(notification.id)) && "checked-row")}>
            <td>
                <CheckboxComponent
                    checked={!!(notification?.id && selected.includes(notification.id))}
                    onChange={setSelectedHandler}
                />
            </td>
            <td>
                <div className="rule-notn">
                    <Button data-type="no-bg" onClick={goRule}>
                        {notification?.name}
                    </Button>
                    <div>
                        <div
                            className="status-button"
                            style={{
                                background: `${notification?.enabled ? "var(--ok)" : "var(--caution)"}`,
                            }}>
                            <span style={{color: `white`}}>{`${notification?.enabled ? "Active" : "Stopped"}`}</span>
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div>{textFrom || "No values provided"}</div>
            </td>
            <td>
                {textContent || textContent2 ? (
                    <>
                        {textContent}
                        {textContent2}
                    </>
                ) : (
                    "Any Content"
                )}
            </td>
            <td>
                <div>
                    {notification?.deliveryTime?.weekdays?.length ? notification.deliveryTime.weekdays.join(", ") : ""}
                </div>
                <div>
                    {notification?.deliveryTime?.timerange?.start && notification?.deliveryTime?.timerange?.end
                        ? `${notification.deliveryTime.timerange.start}-${notification.deliveryTime.timerange.end}`
                        : ""}
                </div>
            </td>
            <td>
                <div className="nrules-actions">
                    <p>
                        <a>{sendingTo}</a>
                    </p>
                    <ul>
                        <li>
                            <TooltipComponent
                                className="card-text"
                                leaveDelay={300}
                                enterDelay={300}
                                arrow={true}
                                title={actionButton === "pause" ? "Deactivate" : "Activate"}>
                                <div>
                                    <Button data-type="btn-icon" onClick={toggleActive}>
                                        <Icon name={actionButton} />
                                    </Button>
                                </div>
                            </TooltipComponent>
                        </li>
                        <li>
                            <TooltipComponent
                                className="card-text"
                                leaveDelay={300}
                                enterDelay={300}
                                arrow={true}
                                title={"Edit"}>
                                <div>
                                    <Button data-type="btn-icon" onClick={goRule}>
                                        <Icon name="edit" />
                                    </Button>
                                </div>
                            </TooltipComponent>
                        </li>
                        <li>
                            <TooltipComponent
                                className="card-text"
                                leaveDelay={300}
                                enterDelay={300}
                                arrow={true}
                                title={"Copy"}>
                                <div>
                                    <Button data-type="btn-icon" onClick={copyHandler}>
                                        <Icon name="copy" />
                                    </Button>
                                </div>
                            </TooltipComponent>
                        </li>
                        <li>
                            <TooltipComponent
                                className="card-text"
                                leaveDelay={300}
                                enterDelay={300}
                                arrow={true}
                                title={"Delete"}>
                                <div>
                                    <Button data-type="btn-icon" onClick={handleDialogOpen}>
                                        <Icon name="trash" />
                                    </Button>
                                </div>
                            </TooltipComponent>
                            <DeleteModal
                                text="Delete Notification"
                                title="Confirm action"
                                open={removeDialogOpen}
                                onAprove={deleteRule}
                                onClose={handleDialogClose}
                            />
                        </li>
                    </ul>
                </div>
            </td>
        </tr>
    );
};

export const NotificationsRulesList: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<CpDispatch>();
    const [name, setName] = useState<string>("");
    const [statusFilter, setStatus] = useState<string>("No Filter");
    const [output, setOutput] = useState<EDeliveryChannel>(EDeliveryChannel.disabled);
    const [filteredRules, setFilteredRules] = useState<Array<INotificationRuleApi>>([]);
    const rules = useSelector(userNotificationSelectors.rules);
    const status = useSelector(userNotificationSelectors.ruleStatus);
    const selected = useSelector(userNotificationSelectors.selected);

    const handleAddNew = useCallback(() => {
        navigate(`/notification`);
    }, [navigate]);

    const setSelectedAllHandler = useCallback(() => {
        dispatch(notificationRuleActions.setSelectedAll());
    }, [dispatch]);

    const setNameHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    }, []);

    const disabled = useMemo(() => !selected.length, [selected]);

    const changeRuleAction = useCallback(
        (event: SelectChangeEvent<unknown>) => {
            const value = event.target.value as ERulesActions;
            if (value === ERulesActions.activate) {
                dispatch(
                    notificationRuleActions.notificationRulesAction({
                        ruleIds: selected,
                        type: ENotificationActions.enable,
                    })
                );
            } else if (value === ERulesActions.deactivate) {
                dispatch(
                    notificationRuleActions.notificationRulesAction({
                        ruleIds: selected,
                        type: ENotificationActions.disable,
                    })
                );
            } else {
                dispatch(notificationRuleActions.deleteNotificationRulesAction(selected));
            }
            dispatch(notificationRuleActions.removeSelection());
        },
        [dispatch, selected]
    );

    const changeStatusHandler = useCallback((event: SelectChangeEvent<unknown>) => {
        const value = event.target.value as string;
        setStatus(value);
    }, []);

    const changeOutputHandler = useCallback((event: SelectChangeEvent<unknown>) => {
        const value = event.target.value as EDeliveryChannel;
        setOutput(value);
    }, []);

    useEffect(() => {
        if (status === EDataProcessingStatus.fetchRequired) {
            dispatch(notificationRuleActions.getNotificationsRules());
        }
    }, [dispatch, status]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore todo: damn ts build bug
        dispatch(userNotificationFormActions.fetchNotificationAppTypes(null));
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore todo: damn ts build bug
        dispatch(userNotificationFormActions.fetchNotificationEmploye(null));
        dispatch(commonActions.companiesActions.fetchCompanies());
        dispatch(commonActions.nodesActions.fetchNodes({all: true}));
    }, [dispatch]);

    useEffect(() => {
        let result = [...rules].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
        if (statusFilter !== "No Filter") {
            if (statusFilter === "Active") {
                result = result.filter((item) => item.enabled);
            } else {
                result = result.filter((item) => !item.enabled);
            }
        }
        if (output !== EDeliveryChannel.disabled) {
            const key = Object.keys(EDeliveryChannel).find(
                (key) => EDeliveryChannel[key as keyof typeof EDeliveryChannel] === output
            );
            if (key) {
                result = result.filter(
                    (item) =>
                        item.deliveryChannel.type ===
                        ENotificationDeliveryChannel[key as keyof typeof ENotificationDeliveryChannel]
                );
            }
        }
        if (name) {
            result = result.filter((item) => item.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
        }
        setFilteredRules(result);
    }, [statusFilter, name, output, rules]);

    return (
        <>
            <NotificationsHeader>
                <h1>Notifications</h1>
                <Button
                    data-type="btn-border"
                    icon="plusBig"
                    iconbefore
                    style={{color: "var(--ok)"}}
                    onClick={handleAddNew}>
                    Add new
                </Button>
            </NotificationsHeader>
            <NotificationsHeader style={{gap: 10}}>
                <Dropdown
                    focused={false}
                    disabled={disabled}
                    label="CHOOSE ACTION"
                    onChange={changeRuleAction}
                    values={Object.values(ERulesActions)}
                    notched={false}
                    defaultValue={null}
                    value={""}
                    // renderValue={() => null}
                />
                <InputText label="NAME" value={name} onChange={setNameHandler} fullWidth />
                <Dropdown
                    label="STATUS"
                    values={["No Filter", "Active", "Deactivated"]}
                    value={statusFilter}
                    onChange={changeStatusHandler}
                    // emptyValue={EDropdownEmptyType.ANY}
                />
                <Dropdown
                    label="OUTPUT TYPE"
                    values={Object.values(EDeliveryChannel)}
                    value={output}
                    onChange={changeOutputHandler}
                />
            </NotificationsHeader>
            {rules?.length === 0 ? (
                <NotificationsEmpty>
                    <NotificationsIcon />
                    <h2>Notification list is empty</h2>
                    <p>
                        Add new notification rule <br />
                        to receive important events and updates <br /> to your phone or e-mail
                    </p>
                </NotificationsEmpty>
            ) : (
                <StrippedTable className="notification-table">
                    <thead>
                        <tr>
                            <th>
                                {/* <CheckboxComponent
                                    checked={selected.length === rules.length}
                                    onChange={setSelectedAllHandler}
                                    labelText="Select all"
                                    checkId="check-all-notifications"
                                /> */}
                            </th>
                            <th>Rule name</th>
                            <th>From</th>
                            <th>Content</th>
                            <th>Day and time</th>
                            <th>Action (ouput)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRules.map((notification) => (
                            <NotificationElem notification={notification} />
                        ))}
                    </tbody>
                </StrippedTable>
            )}
        </>
    );
};
