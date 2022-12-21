import {ChangeEventHandler, FC, useState, MouseEvent} from "react";
import {Button, DatePickerInput, InputText} from "@nxt-ui/components";
import {FlexHolder} from "../../../container";

type INotificationBoxDateRangeProps = {
    search?: string;
    fromDate?: Date;
    toDate?: Date;
    onFromChange(value: any): void;
    onToChange(value: any): void;
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
    const [fromOpen, setFromOpen] = useState(false);
    const [toOpen, setToOpen] = useState(false);

    const onFromChangeHandler = (value: any) => {
        setFromOpen(false);
        onFromChange(value);
    };
    const onToChangeHandler = (value: any) => {
        setToOpen(false);
        onToChange(value);
    };
    const onFromBtnDateHandler = (value: number) => (e: MouseEvent<Element>) => {
        e.stopPropagation();
        onFromChange(new Date(value));
    };

    const onToBtnDateHandler = (value: number) => (e: MouseEvent<Element>) => {
        e.stopPropagation();
        onToChange(new Date(value));
    };

    return (
        <div className="range-box">
            <InputText label="Search" value={search} fullWidth onChange={onSearch} />
            <strong>Date range</strong>
            <FlexHolder>
                <DatePickerInput
                    onOpen={() => setFromOpen(true)}
                    onClose={() => setFromOpen(false)}
                    open={fromOpen}
                    className="testClass"
                    PopperProps={{
                        placement: "bottom-start",
                        disablePortal: true,
                    }}
                    showToolbar={true}
                    label="From"
                    value={fromDate || null}
                    onChange={onFromChangeHandler}
                    ToolbarComponent={(props: any) => (
                        <FlexHolder className="datepicker-toolbar">
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onFromChangeHandler(undefined);
                                }}>
                                Clear
                            </Button>
                            <Button onClick={onFromBtnDateHandler(+new Date().setHours(0, 0, 0, 0))}>Morning</Button>
                            <Button onClick={onFromBtnDateHandler(+new Date().setHours(0, 0, 0, 0) + 86400000)}>
                                Day
                            </Button>
                            <Button onClick={onFromBtnDateHandler(+new Date().setHours(0, 0, 0, 0) + 604800000)}>
                                Week
                            </Button>
                        </FlexHolder>
                    )}
                />
                <DatePickerInput
                    open={toOpen}
                    onOpen={() => setToOpen(true)}
                    onClose={() => setToOpen(false)}
                    PopperProps={{
                        placement: "bottom-start",
                        disablePortal: true,
                    }}
                    showToolbar={true}
                    label="To"
                    value={toDate || null}
                    onChange={onToChangeHandler}
                    ToolbarComponent={(props: any) => (
                        <FlexHolder className="datepicker-toolbar">
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToChangeHandler(undefined);
                                }}>
                                Clear
                            </Button>
                            <Button onClick={onToBtnDateHandler(+new Date().setHours(0, 0, 0, 0))}>Morning</Button>
                            <Button onClick={onToBtnDateHandler(+new Date().setHours(0, 0, 0, 0) + 86400000)}>
                                Day
                            </Button>
                            <Button onClick={onToBtnDateHandler(+new Date().setHours(0, 0, 0, 0) + 604800000)}>
                                Week
                            </Button>
                        </FlexHolder>
                    )}
                />
            </FlexHolder>
        </div>
    );
};
