import {createContext, CSSProperties, FC, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import clsx from "clsx";

import {INotificationRawData} from "@nxt-ui/cp/types";
import {ListOnScrollProps, VariableSizeList as List} from "react-window";

import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import {
    commonSelectors,
    notificationRuleActions,
    userNotificationFormActions,
    userNotificationSelectors,
} from "@nxt-ui/cp-redux";

interface INotificationListProps {
    notifications: Array<INotificationRawData>;
    className?: string;
}

type IVirtuqlizedContext = {
    setSize(index: number, size: number): void;
};

type INotificationItemProps = {
    item: INotificationRawData;
    index: number;
};

export const VirtualizationContext = createContext<IVirtuqlizedContext>({} as IVirtuqlizedContext);

const NotificationItem: FC<INotificationItemProps> = ({item, index}) => {
    const {setSize} = useContext(VirtualizationContext);
    const root = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (root.current) {
            const height = root.current.getBoundingClientRect().height + 12;
            setSize(index, height);
        }
    }, [setSize, index, root]);

    return (
        <div ref={root} key={item.messageId}>
            <strong className={clsx("notification-type", item.msg_type && item.msg_type)}>
                &bull; {item.msg_type}
            </strong>
            <br />
            <p className="event-text">{item.msg_text}</p>
        </div>
    );
};

export const NotificationList: FC<INotificationListProps> = ({notifications, className}) => {
    const dispatch = useDispatch();
    const historyId = useSelector(userNotificationSelectors.selectHistoryId);
    const process = useSelector(userNotificationSelectors.historyProcess);
    const email = useSelector(commonSelectors.user.email);
    const listRef = useRef<List>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const sizeMap = useRef<{[key: string]: number}>({});

    const getSize = useCallback(
        (index) => {
            return sizeMap.current[index] || 50;
        },
        [sizeMap]
    );

    const setSize = useCallback(
        (index: number, size: number) => {
            listRef.current?.resetAfterIndex(0);
            sizeMap.current = {...sizeMap.current, [index]: size};
        },
        [sizeMap, listRef]
    );

    const scrollHandle = useCallback(
        (props: ListOnScrollProps) => {
            const offset = props.scrollOffset + 200;
            const offsetValue = innerRef.current?.offsetHeight || 0;
            const shouldUpdate =
                Math.abs(offsetValue) - Math.abs(offset) < 10 &&
                email &&
                !process &&
                props.scrollDirection === "forward";
            if (shouldUpdate) {
                dispatch(
                    notificationRuleActions.getNotificationsHistory({
                        userId: "test2@nextologies.com",
                        lastMessageId: historyId,
                    })
                );
            }
        },
        [historyId, email, dispatch, process]
    );

    const notificationsList = useMemo(() => {
        return [...notifications].reverse();
    }, [notifications]);

    return (
        <VirtualizationContext.Provider value={{setSize}}>
            <ul className={clsx("notification-list", className && className)}>
                <List
                    className="notification-scroll"
                    ref={listRef}
                    innerRef={innerRef}
                    onScroll={scrollHandle}
                    height={process ? 186 : 200}
                    itemCount={notificationsList.length}
                    itemSize={getSize}
                    width={"100%"}>
                    {({index, style}: {index: number; style: CSSProperties}) => (
                        <li style={style}>
                            <NotificationItem item={notificationsList[index]} index={index} />
                        </li>
                    )}
                </List>
                {process && <li>Process...</li>}
            </ul>
        </VirtualizationContext.Provider>
    );
};
