import {StrippedTable} from "@nxt-ui/cp/components";
import {FC, useCallback, useEffect, useState} from "react";
import {Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import styled from "@emotion/styled";
import {useNavigate} from "react-router-dom";
import {
    CpDispatch,
    notificationRuleActions,
    userNotificationFormActions,
    userNotificationSelectors,
} from "@nxt-ui/cp-redux";
import {useDispatch, useSelector} from "react-redux";
import {INotificationRuleApi} from "@nxt-ui/cp/api";

const items = [
    {
        name: "Critical alerts",
        deliveryChannel: {
            type: "sms",
            phoneNumber: "+37493453627",
        },
        filter: {
            type: "and",
            definitions: [
                {
                    type: "string",
                    values: ["string"],
                },
                {
                    type: "string",
                    values: ["string"],
                },
                {
                    type: "string",
                    value: 123,
                },
                {
                    type: "string",
                    values: ["string"],
                },
                {
                    type: "string",
                    value: "string",
                },
                {
                    type: "string",
                    values: ["string"],
                },
                {
                    type: "string",
                    values: ["string"],
                },
                {
                    type: "string",
                    values: ["string"],
                },
            ],
        },
    },
];

const NotificationsHeader = styled.div({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingBottom: "40px",
});

const NotificationsEmpty = styled.div({
    textAlign: "center",
    fontSize: "10px",
    h2: {
        marginBottom: "8px",
        textAlign: "center",
    },
});

const NotificationsIcon = styled.div({
    marginBottom: "10px",
    display: "inline-block",
    width: "72px",
    height: "72px",
    backgroundImage:
        "url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNzIiIHZpZXdCb3g9IjAgMCA3MiA3MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYgMzAuNUM2IDI4LjUgOSAyNiAxMS41IDI0TDE0LjUgMjJNNiAzMC41VjYzLjVDNiA2Ni41MjUgOC40NzUgNjkgMTEuNSA2OUg2MUM2NC4wMjUgNjkgNjYuNSA2Ni41MjUgNjYuNSA2My41VjMwLjVDNjYuNSAyOSA2NS41IDI2IDYyLjUgMjRMNTggMjJNNiAzMC41TDM0LjExNzYgNDUuNDk2MUMzNS4yOTQxIDQ2LjEyMzUgMzYuNzA1OSA0Ni4xMjM1IDM3Ljg4MjQgNDUuNDk2MUw2NiAzMC41TTE1IDM1LjE2NjdWMkg1OFYzNC4xNjY3IiBzdHJva2U9IiNGQUE3NEEiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNMzUuMzc1IDEwLjkzNzVDMzUuMzc1IDEwLjU5MjMgMzUuNjU0OCAxMC4zMTI1IDM2IDEwLjMxMjVDMzYuMzQ1MiAxMC4zMTI1IDM2LjYyNSAxMC41OTIzIDM2LjYyNSAxMC45Mzc1VjExLjU2MjVIMzUuMzc1VjEwLjkzNzVaTTM2IDMxLjY4NzVDMzUuMjA3MiAzMS42ODc1IDM0LjUzNzYgMzEuMTYwNCAzNC4zMjI1IDMwLjQzNzVIMzcuNjc3NUMzNy40NjI0IDMxLjE2MDQgMzYuNzkyOCAzMS42ODc1IDM2IDMxLjY4NzVaIiBmaWxsPSIjMzIzMjMyIiBzdHJva2U9IiNGQUE3NEEiLz4KPG1hc2sgaWQ9InBhdGgtMy1pbnNpZGUtMV83OTY5XzE2MTQyNiIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMjkuMTE3NiAxNy45Mzc1QzI5LjExNzYgMTQuNjIzOCAzMS44MDM5IDExLjkzNzUgMzUuMTE3NiAxMS45Mzc1SDM2Ljg4MjRDNDAuMTk2MSAxMS45Mzc1IDQyLjg4MjQgMTQuNjIzOCA0Mi44ODI0IDE3LjkzNzVWMjUuNDM3NUw0NSAyNy42ODc1VjI4LjgxMjVIMjdWMjcuNjg3NUwyOS4xMTc2IDI1LjQzNzVWMTcuOTM3NVoiLz4KPC9tYXNrPgo8cGF0aCBkPSJNNDUgMjguODEyNVYzMC44MTI1QzQ2LjEwNDYgMzAuODEyNSA0NyAyOS45MTcxIDQ3IDI4LjgxMjVINDVaTTI3IDI4LjgxMjVIMjVDMjUgMjkuOTE3MSAyNS44OTU0IDMwLjgxMjUgMjcgMzAuODEyNVYyOC44MTI1Wk0yOS4xMTc2IDI1LjQzNzVMMzAuNTc0IDI2LjgwODJMMzEuMTE3NiAyNi4yMzA3VjI1LjQzNzVIMjkuMTE3NlpNNDIuODgyNCAyNS40Mzc1SDQwLjg4MjRWMjYuMjMwN0w0MS40MjYgMjYuODA4Mkw0Mi44ODI0IDI1LjQzNzVaTTI3IDI3LjY4NzVMMjUuNTQzNiAyNi4zMTY4TDI1IDI2Ljg5NDNWMjcuNjg3NUgyN1pNNDUgMjcuNjg3NUg0N1YyNi44OTQzTDQ2LjQ1NjQgMjYuMzE2OEw0NSAyNy42ODc1Wk0zNS4xMTc2IDEzLjkzNzVIMzYuODgyNFY5LjkzNzVIMzUuMTE3NlYxMy45Mzc1Wk00NSAyNi44MTI1SDI3VjMwLjgxMjVINDVWMjYuODEyNVpNMzEuMTE3NiAyNS40Mzc1VjE3LjkzNzVIMjcuMTE3NlYyNS40Mzc1SDMxLjExNzZaTTQwLjg4MjQgMTcuOTM3NVYyNS40Mzc1SDQ0Ljg4MjRWMTcuOTM3NUg0MC44ODI0Wk0yOSAyOC44MTI1VjI3LjY4NzVIMjVWMjguODEyNUgyOVpNMjguNDU2NCAyOS4wNTgyTDMwLjU3NCAyNi44MDgyTDI3LjY2MTIgMjQuMDY2OEwyNS41NDM2IDI2LjMxNjhMMjguNDU2NCAyOS4wNTgyWk00MS40MjYgMjYuODA4Mkw0My41NDM2IDI5LjA1ODJMNDYuNDU2NCAyNi4zMTY4TDQ0LjMzODggMjQuMDY2OEw0MS40MjYgMjYuODA4MlpNNDMgMjcuNjg3NVYyOC44MTI1SDQ3VjI3LjY4NzVINDNaTTM2Ljg4MjQgMTMuOTM3NUMzOS4wOTE1IDEzLjkzNzUgNDAuODgyNCAxNS43Mjg0IDQwLjg4MjQgMTcuOTM3NUg0NC44ODI0QzQ0Ljg4MjQgMTMuNTE5MiA0MS4zMDA2IDkuOTM3NSAzNi44ODI0IDkuOTM3NVYxMy45Mzc1Wk0zNS4xMTc2IDkuOTM3NUMzMC42OTk0IDkuOTM3NSAyNy4xMTc2IDEzLjUxOTIgMjcuMTE3NiAxNy45Mzc1SDMxLjExNzZDMzEuMTE3NiAxNS43Mjg0IDMyLjkwODUgMTMuOTM3NSAzNS4xMTc2IDEzLjkzNzVWOS45Mzc1WiIgZmlsbD0iI0ZBQTc0QSIgbWFzaz0idXJsKCNwYXRoLTMtaW5zaWRlLTFfNzk2OV8xNjE0MjYpIi8+Cjwvc3ZnPgo=)",
});

type INotificationElemProps = {
    notification?: INotificationRuleApi;
};

const NotificationElem: FC<INotificationElemProps> = ({notification}) => {
    const navigate = useNavigate();
    const goRule = useCallback(() => navigate(`/notification/${notification?.id}`), [notification?.id, navigate]);

    return (
        <StrippedTable>
            <thead>
                <tr>
                    <th>Rule name</th>
                    <th>From</th>
                    <th>Content</th>
                    <th>Action (ouput)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <strong>{notification?.name}</strong>
                    </td>
                    <td>Boston Dynamix all employees</td>
                    <td>
                        CP Alerts, Server Alerts; <br />
                        CP Events, Cron Events, MAM Events;
                    </td>
                    <td>
                        <div className="nrules-actions">
                            <p>
                                <a href="/">Sending to Slack</a>, <a href="/">@my_channel</a>, <a href="/">Recents</a>
                            </p>
                            <ul>
                                <li>
                                    <Button data-type="btn-icon" onClick={goRule}>
                                        <Icon name="edit" />
                                    </Button>
                                </li>
                                <li>
                                    <Button data-type="btn-icon">
                                        <Icon name="trash" />
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </td>
                </tr>
            </tbody>
        </StrippedTable>
    );
};

export const NotificationsRulesList: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<CpDispatch>();
    const rules = useSelector(userNotificationSelectors.rules);

    const handleAddNew = useCallback(() => {
        navigate(`/notification`);
    }, [navigate]);

    useEffect(() => {
        dispatch(notificationRuleActions.getNotificationsRules());
    }, [dispatch]);

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
                <>
                    {rules.map((notification) => (
                        <NotificationElem notification={notification} />
                    ))}
                </>
            )}
        </>
    );
};