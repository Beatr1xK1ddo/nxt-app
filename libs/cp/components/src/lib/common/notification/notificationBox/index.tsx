import {FC, useState} from "react";
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
    return show ? (
        <div className={clsx("notification-box", className && className)}>
            <FlexHolder className={clsx("notification-heading", showFilter && "period-check")}>
                <h2>{heading}</h2>
                {showFilter ? (
                    <Button data-type="btn-icon" onClick={() => setShowFilter(false)}>
                        <Icon name="clear" />
                    </Button>
                ) : null}
                <Button data-type="btn-icon" onClick={() => setShowFilter(true)}>
                    <Icon name="sort" />
                </Button>
            </FlexHolder>
            {showFilter && <NotificationBoxDateRange />}
            <NotificationList notifications={notifications} />
            {children}
            {/* <PaginationComponent count={6} /> */}
        </div>
    ) : null;
};
