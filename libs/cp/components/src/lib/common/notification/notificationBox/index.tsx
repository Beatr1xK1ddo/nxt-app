import {FC, useState} from "react";
import {Button, PaginationComponent, DatePickerInput} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {FlexHolder} from "../../container";
import {NotificationList} from "../notificationList";
import clsx from "clsx";

import "./index.css";

interface InotificationBoxProps {
    heading: string;
    className?: string;
    children?: React.ReactChild | React.ReactNode;
}
const notifications = [
    {
        id: 1,
        type: "event",
        data: "19 Jan, 15:56",
        text: `Channel "RTVI" was restarted by scheduler at 15:55PM (IPBE)`,
        tags: (
            <>
                <a href="#sportaman_playout">#RTVI</a> <a href="#sync_loss">#restart</a>
            </>
        ),
    },
    {
        id: 2,
        type: "app",
        data: "19 Jan, 13:15",
        text: `Failover "Sportaman_Playout" switched from Primary to Backup because: "Sync loss"`,
        tags: (
            <>
                <a href="#sportaman_playout">#sportaman_playout</a> <a href="#sync_loss">#sync_loss</a>
            </>
        ),
    },
    {
        id: 3,
        type: "operation",
        data: "19 Jan, 13:15",
        text: `Form "Sportaman_Playout" was successfuly saved`,
        tags: (
            <>
                <a href="#sportaman_playout">#sportaman_playout</a> <a href="#sync_loss">#save</a>
            </>
        ),
    },
    {
        id: 4,
        type: "monitor",
        data: "19 Jan, 13:15",
        text: `Channel "PBS_KIDS" has 3 CC errors on 239.0.0.1 (TXR TX)`,
        tags: (
            <>
                <a href="#sportaman_playout">#pbs_kids</a> <a href="#sync_loss">#cc_error</a>
            </>
        ),
    },
];

export const NotificationBox: FC<InotificationBoxProps> = ({heading, className, children}) => {
    const [isPeriodCheck, setPeriod] = useState(true);
    const togglePeriodCheck = () => {
        if (!isPeriodCheck) {
            setPeriod(true);
        }
    };
    const hidePeriodCheck = () => setPeriod(false);

    const [value, setValue] = useState<Date | null>(null);

    return (
        <div className={clsx("notification-box", className && className)}>
            <FlexHolder className={clsx("notification-heading", isPeriodCheck && "period-check")}>
                <h2>{heading}</h2>
                {isPeriodCheck ? (
                    <Button data-type="btn-icon" onClick={hidePeriodCheck}>
                        <Icon name="clear" />
                    </Button>
                ) : null}
                <Button data-type="btn-icon" onClick={togglePeriodCheck}>
                    <Icon name="sort" />
                </Button>
            </FlexHolder>
            {isPeriodCheck ? (
                <div className="range-box">
                    <strong>Date range</strong>
                    <FlexHolder>
                        <DatePickerInput
                            className="testClass"
                            PopperProps={{
                                placement: "bottom-start",
                                disablePortal: true,
                            }}
                            showToolbar={true}
                            label="From"
                            value={value}
                            onChange={(newValue: any) => {
                                setValue(newValue);
                            }}
                            ToolbarComponent={(props: any) => (
                                <FlexHolder className="datepicker-toolbar">
                                    <Button>Morning</Button>
                                    <Button>Day</Button>
                                    <Button>Week</Button>
                                    <Button>Night</Button>
                                </FlexHolder>
                            )}
                        />
                        <DatePickerInput
                            PopperProps={{
                                placement: "bottom-start",
                                disablePortal: true,
                            }}
                            showToolbar={true}
                            label="To"
                            value={value}
                            onChange={(newValue: any) => {
                                setValue(newValue);
                            }}
                            ToolbarComponent={(props: any) => (
                                <FlexHolder className="datepicker-toolbar">
                                    <Button>Morning</Button>
                                    <Button>Day</Button>
                                    <Button>Week</Button>
                                    <Button>Night</Button>
                                </FlexHolder>
                            )}
                        />
                        <Button data-type="btn-icon">
                            <Icon name="search" />
                        </Button>
                    </FlexHolder>
                </div>
            ) : null}
            <NotificationList notifications={notifications} />
            {children}
            <PaginationComponent count={6} />
        </div>
    );
};
