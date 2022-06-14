import {FC} from "react";

import {ISystemNotification} from "@nxt-ui/cp/types";
import "./index.css";
import clsx from "clsx";

interface INotificationListProps {
    notifications: Array<ISystemNotification>;
    className?: string;
}

export const NotificationList: FC<INotificationListProps> = ({notifications, className}) => {
    return (
        <ul className={clsx("notification-list", className && className)}>
            {notifications.map((notification) => (
                <li key={notification.id}>
                    <strong className={clsx("notification-type", notification.type && notification.type)}>
                        &bull; {notification.type}
                    </strong>
                    <br />
                    <em className="notification-data">{notification.data}</em>
                    <p className="event-text">{notification.text}</p>
                    <div className="notification-tags">{notification.tags}</div>
                </li>
            ))}
        </ul>
    );
};
