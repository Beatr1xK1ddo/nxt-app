import {FC, JSXElementConstructor} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import {InputText} from "../text";
import enLocale from "date-fns/locale/en-GB";
import {BaseToolbarProps} from "@mui/x-date-pickers/internals";

export interface ITimePickerInputProps {
    value: Date | null;
    onChange(value: Date | null, keyboardInputValue?: string): void;
    showToolbar?: boolean;
    label?: string;
    className?: string;
    ToolbarComponent?: JSXElementConstructor<BaseToolbarProps<Date, Date | null>>;
    onOpen?(): void;
    onClose?(): void;
    open?: boolean;
}

export const TimePickerInput: FC<ITimePickerInputProps> = ({
    value,
    onChange,
    label,
    showToolbar,
    className,
    ToolbarComponent,
    open,
    onClose,
    onOpen,
}) => {
    return (
        <div className={className}>
            <LocalizationProvider adapterLocale={enLocale} dateAdapter={AdapterDateFns}>
                <TimePicker
                    onOpen={onOpen}
                    onClose={onClose}
                    open={open}
                    className={className}
                    showToolbar={showToolbar}
                    label={label}
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => <InputText {...params} error={false} />}
                    ToolbarComponent={ToolbarComponent}
                />
            </LocalizationProvider>
        </div>
    );
};
