import {FC, useCallback, useEffect, useMemo, useRef, useState} from "react";
import clsx from "clsx";
import {useDispatch} from "react-redux";

import {ENotificationDeliveryChannel, INotificationRawData} from "@nxt-ui/cp/types";
import {CpDispatch} from "@nxt-ui/cp-redux";
import {notificationRuleActions} from "@nxt-ui/cp-redux";

import "./index.css";

interface INotificationListProps {
    notifications: Array<INotificationRawData>;
    className?: string;
}

const options = (lastMessageId: string) => ({
    userId: "test2@nextologies.com",
    quantity: 10,
    order: -1,
    lastMessageId: lastMessageId,
    messageTypes: [],
    deliveryChannel: ENotificationDeliveryChannel.cp_notification,
});

const renderItem = (notification: INotificationRawData) => {
    return (
        <li key={notification.messageId}>
            <strong className={clsx("notification-type", notification.msg_type && notification.msg_type)}>
                &bull; {notification.msg_type}
            </strong>
            <br />
            <p className="event-text">{notification.msg_text}</p>
        </li>
    );
};

export const NotificationList: FC<INotificationListProps> = ({notifications, className}) => {
    const [isHistoryLoading, setIsHistoryLoading] = useState(false);
    const listRef = useRef(null);

    const scrollHandle = useCallback(
        (e) => {
            if (!listRef.current) return;
            const {scrollTop, scrollHeight, offsetHeight} = listRef.current;
            if (scrollHeight - (scrollTop + offsetHeight) < 50 && !isHistoryLoading) {
                setIsHistoryLoading(true);
            }
        },
        [listRef, setIsHistoryLoading, isHistoryLoading]
    );
    return (
        <ul className={clsx("notification-list", className && className)} ref={listRef} onScroll={scrollHandle}>
            {[...notifications].reverse().map((notification) => renderItem(notification))}
        </ul>
    );
};
