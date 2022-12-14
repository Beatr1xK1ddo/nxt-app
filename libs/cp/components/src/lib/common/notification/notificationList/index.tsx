import {createContext, CSSProperties, FC, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import clsx from "clsx";

import {INotificationRawData} from "@nxt-ui/cp/types";
import {ListOnScrollProps, VariableSizeList as List} from "react-window";

import "./index.css";

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
    const [isHistoryLoading, setIsHistoryLoading] = useState(false);
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

    const scrollHandle = useCallback((props: ListOnScrollProps) => {
        console.log("props ", props);
        console.log("offsetHeight ", innerRef.current?.offsetHeight);
    }, []);

    const notificationsList = useMemo(() => {
        return [...notifications, ...notifications].reverse();
    }, [notifications]);

    return (
        <VirtualizationContext.Provider value={{setSize}}>
            <ul className={clsx("notification-list", className && className)}>
                <List
                    className="notification-scroll"
                    ref={listRef}
                    outerRef={innerRef}
                    onScroll={scrollHandle}
                    height={200}
                    itemCount={notificationsList.length}
                    itemSize={getSize}
                    width={"100%"}>
                    {({index, style}: {index: number; style: CSSProperties}) => (
                        <li style={style}>
                            <NotificationItem item={notificationsList[index]} index={index} />
                        </li>
                    )}
                </List>
            </ul>
        </VirtualizationContext.Provider>
    );
};
