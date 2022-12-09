import {ChangeEventHandler, FC, MouseEventHandler, useCallback, useEffect, useMemo, useState} from "react";
import {Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {FlexHolder} from "../../container";
import {NotificationList} from "../notificationList";
import clsx from "clsx";
import "./index.css";
import {NotificationBoxDateRange} from "./dateRange";
import {INotificationRawData} from "@nxt-ui/cp/types";

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

    const toggleFilter = useCallback((e) => {
        e.stopPropagation();
        setShowFilter((prev) => !prev);
    }, []) as MouseEventHandler<Element>;

    const setSearchHandler = useCallback((e) => {
        setSearch(e.currentTarget.value);
    }, []) as ChangeEventHandler<HTMLInputElement>;

    const setFromDateHandler = useCallback((value: Date) => {
        console.log("value ", +value);
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
        return notifications;
    }, [toDate, fromDate, search, notifications, filteredValue]);

    useEffect(() => {
        if (search && notifications.length) {
            const filtered = notifications.filter((item) => {
                const message = item.msg_text.toLocaleLowerCase();
                const searchValue = search.toLocaleLowerCase();
                return message.includes(searchValue);
            });
            console.log("here ", search, filtered);
            setFilteredValue(filtered);
        }
    }, [notifications, search]);

    useEffect(() => {
        console.log("here");
        if (notifications.length) {
            if (fromDate) {
                console.log("here");
                // const filtered = notifications.filter((item) => {
                //     const message = item.msg_text.toLocaleLowerCase();
                //     const searchValue = search.toLocaleLowerCase();
                //     return message.includes(searchValue);
                // });
                // setFilteredValue(filtered);
                console.log(+fromDate);
            }
            if (toDate) {
                // const filtered = notifications.filter((item) => {
                //     const message = item.msg_text.toLocaleLowerCase();
                //     const searchValue = search.toLocaleLowerCase();
                //     return message.includes(searchValue);
                // });
                // setFilteredValue(filtered);
            }
        }
    }, [notifications, fromDate, toDate]);

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
