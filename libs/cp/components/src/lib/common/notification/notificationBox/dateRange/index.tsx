import {FC, useState} from "react";
import {Button, DatePickerInput} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {FlexHolder} from "../../../container";

export const NotificationBoxDateRange: FC = () => {
    const [value, setValue] = useState<Date | null>(null);

    return (
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
    );
};
