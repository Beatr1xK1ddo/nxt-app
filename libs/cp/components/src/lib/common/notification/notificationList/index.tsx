import {FC, useCallback, useEffect, useMemo, useRef, useState} from "react";

import {ENotificationDeliveryChannel, INotificationRawData} from "@nxt-ui/cp/types";
import "./index.css";
import clsx from "clsx";
import {v4} from "uuid";
import {format} from "date-fns";
import {CpDispatch, notificationActions} from "@nxt-ui/cp-redux";
import {useDispatch} from "react-redux";

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

const renderItem = (notification: INotificationRawData) => (
    <li key={notification.messageId}>
        {}
        <strong className={clsx("notification-type", notification.msg_type && notification.msg_type)}>
            &bull; {notification.msg_type}
        </strong>
        <br />
        {/* <em className="notification-data">{format(new Date(notification.timestamp * 1000), "dd LLL, hh:mm")}</em> */}
        <p className="event-text">{notification.msg_text}</p>
        <div className="notification-tags">
            <a href="#sportaman_playout">#RTVI</a> <a href="#sync_loss">#restart</a>
        </div>
    </li>
);

export const NotificationList: FC<INotificationListProps> = ({notifications, className}) => {
    const [notificationHistory, setNotificationHistory] = useState([]);
    const [isHistoryLoading, setIsHistoryLoading] = useState(false);
    const listRef = useRef(null);
    const dispatch = useDispatch<CpDispatch>();
    console.log("notificationHistory", notificationHistory);
    const lastMessageId = useMemo(() => {
        //@ts-ignore
        return notificationHistory.length
            ? //@ts-ignore
              notificationHistory.at(-1)?.messageId
            : notifications[0]?.messageId;
    }, [notificationHistory, notifications]);

    useEffect(() => {
        isHistoryLoading &&
            dispatch(notificationActions.getNotificationsHistory(options(lastMessageId))).then(({payload}: any) => {
                !!payload &&
                    //@ts-ignore
                    setNotificationHistory((prevState) => [
                        ...prevState,
                        ...payload.map((item: any) => ({
                            msg_type: item.message.msgType,
                            node_id: item.message.nodeId,
                            apptype: item.message.appType,
                            appid: item.message.appId,
                            msg_priority: item.message.msgPriority,
                            company_id: item.message.companyId,
                            user_id: item.message.userId,
                            msg_text: item.message.msgText,
                            timestamp: item.message.timestamp,
                            messageId: item.message.messageId,
                        })),
                    ]);
                setIsHistoryLoading(false);
            });
        console.log("useEffect", isHistoryLoading);
    }, [isHistoryLoading, setNotificationHistory, dispatch, lastMessageId]);

    const scrollHandle = useCallback(
        (e) => {
            if (!listRef.current) return;
            const {scrollTop, scrollHeight, offsetHeight} = listRef.current;
            if (scrollHeight - (scrollTop + offsetHeight) < 50 && !isHistoryLoading) {
                console.log("go req");
                setIsHistoryLoading(true);
            }
        },
        [listRef, setIsHistoryLoading, isHistoryLoading]
    );
    return (
        <ul className={clsx("notification-list", className && className)} ref={listRef} onScroll={scrollHandle}>
            {notifications.reverse().map((notification) => renderItem(notification))}
            {notificationHistory.reverse().map((notification) => renderItem(notification))}
        </ul>
    );
};
