import {ChangeEventHandler, FC, MouseEventHandler, useCallback, useEffect, useMemo, useState} from "react";
import {Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {FlexHolder} from "../../container";
import {NotificationList} from "../notificationList";
import clsx from "clsx";
import "./index.css";
import {NotificationBoxDateRange} from "./dateRange";
import {INotificationRawData} from "@nxt-ui/cp/types";
import {useSelector} from "react-redux";
import {userNotificationSelectors} from "@nxt-ui/cp-redux";

interface INotificationBoxProps {
    heading: string;
    className?: string;
    children?: React.ReactChild | React.ReactNode;
    show: boolean;
    notifications: Array<INotificationRawData>;
}

export const NotificationBox: FC<INotificationBoxProps> = ({heading, className, children, show, notifications}) => {
    const [showFilter, setShowFilter] = useState(false);
    const [search, setSearch] = useState<string>("");
    const [fromDate, setFromDate] = useState<Date>();
    const [toDate, setToDate] = useState<Date>();
    const [filteredValue, setFilteredValue] = useState<Array<INotificationRawData>>([]);
    const notificationsState = useSelector(userNotificationSelectors.selectHistory);

    const notificationValues = useMemo(() => {
        return [...notifications, ...notificationsState];
    }, [notifications, notificationsState]);

    const toggleFilter = useCallback((e) => {
        e.stopPropagation();
        setShowFilter((prev) => !prev);
    }, []) as MouseEventHandler<Element>;

    const setSearchHandler = useCallback((e) => {
        setSearch(e.currentTarget.value);
    }, []) as ChangeEventHandler<HTMLInputElement>;

    const setFromDateHandler = useCallback((value: Date) => {
        setFromDate(value);
    }, []);

    const setToDateHandler = useCallback((value: Date) => {
        setToDate(value);
    }, []);

    const icon = useMemo(() => {
        return showFilter ? "clear" : "sort";
    }, [showFilter]);

    const notificationList = useMemo(() => {
        if (toDate || fromDate || search) {
            return filteredValue;
        }
        return notificationValues;
    }, [toDate, fromDate, search, notificationValues, filteredValue]);

    useEffect(() => {
        if (notificationValues.length && (fromDate || toDate || search)) {
            let filtered: Array<INotificationRawData> = [];
            if (fromDate) {
                const pickFromTimestamp = +fromDate;
                filtered = notificationValues.filter((item) => {
                    const timestamp = item.timestamp * 1000;
                    return timestamp >= pickFromTimestamp;
                });
            }
            if (toDate) {
                const itemsList = fromDate ? filtered : notificationValues;
                const pickToTimestamp = +toDate;
                filtered = itemsList.filter((item) => {
                    const timestamp = item.timestamp * 1000;
                    return timestamp <= pickToTimestamp;
                });
            }
            if (search) {
                const itemsList = fromDate || toDate ? filtered : notificationValues;
                filtered = itemsList.filter((item) => {
                    const message = item.msg_text.toLocaleLowerCase();
                    const searchValue = search.toLocaleLowerCase();
                    return message.includes(searchValue);
                });
            }
            setFilteredValue(filtered);
        }
    }, [notificationValues, fromDate, toDate, search]);

    return show ? (
        <div className={clsx("notification-box", className && className)}>
            <FlexHolder className={clsx("notification-heading")}>
                <h2>{heading}</h2>
                <Button data-type="btn-icon" onClick={toggleFilter}>
                    <Icon name={icon} />
                </Button>
            </FlexHolder>
            {showFilter && (
                <NotificationBoxDateRange
                    search={search}
                    fromDate={fromDate}
                    toDate={toDate}
                    onSearch={setSearchHandler}
                    onFromChange={setFromDateHandler}
                    onToChange={setToDateHandler}
                />
            )}
            <NotificationList notifications={notificationList} />
            {children}
            {/* <PaginationComponent count={6} /> */}
        </div>
    ) : null;
};
