import {ChangeEventHandler, FC} from "react";
import {Button, DatePickerInput, InputText} from "@nxt-ui/components";
import {FlexHolder} from "../../../container";

type INotificationBoxDateRangeProps = {
    search?: string;
    fromDate?: Date;
    toDate?: Date;
    onFromChange?(value: Date): void;
    onToChange?(value: Date): void;
    onSearch?: ChangeEventHandler<HTMLInputElement>;
};

export const NotificationBoxDateRange: FC<INotificationBoxDateRangeProps> = ({
    search,
    fromDate,
    toDate,
    onFromChange,
    onToChange,
    onSearch,
}) => {
    return (
        <div className="range-box">
            <InputText label="Search" value={search} fullWidth onChange={onSearch} />
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
                    value={fromDate}
                    onChange={onFromChange}
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
                    value={toDate}
                    onChange={onToChange}
                    ToolbarComponent={(props: any) => (
                        <FlexHolder className="datepicker-toolbar">
                            <Button>Morning</Button>
                            <Button>Day</Button>
                            <Button>Week</Button>
                            <Button>Night</Button>
                        </FlexHolder>
                    )}
                />
            </FlexHolder>
        </div>
    );
};
