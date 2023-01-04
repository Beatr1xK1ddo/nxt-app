import Select, {SelectProps} from "@mui/material/Select";
import {FC, SyntheticEvent, useCallback, useMemo, useState} from "react";
import {styled} from "@mui/material/styles";
import {IDropdownProps} from "./types";
import FormControl from "@mui/material/FormControl";
import MenuItem, {MenuItemProps} from "@mui/material/MenuItem";
import {InputText} from "../text";
import {useElementSize} from "@nxt-ui/hooks";
import {Icon} from "@nxt-ui/icons";
import FormHelperText from "@mui/material/FormHelperText";
import {InputLabel, ListSubheader} from "@mui/material";

export * from "./types";

const FormControlComponent = styled(FormControl)<{width?: number; disabled?: boolean}>(
    ({width, disabled}) => `
    width: ${width ? width + "px" : 100 + "%"};

    .MuiInput-input {
        height: 2.5rem;
    }
    &.w33 {
        width: 33%;
    }
    .MuiInputBase-root {
        font: var(--font);
        color: var(--grey-dark);
    }
    .MuiInputBase-root.Mui-error {
        border: 0.0625rem solid var(--danger);
    }
    .Mui-error .MuiOutlinedInput-notchedOutline {
        border: none;
    }
    .Mui-error~.MuiFormHelperText-root {
        color: var(--danger);
    }
    .MuiOutlinedInput-input {
        padding: 0.625rem 0.9375rem;
    }
    .MuiInputBase-sizeSmall .MuiOutlinedInput-input {
        padding: 0.375rem 0.9375rem;
    }
    .MuiInputLabel-formControl {
        font: var(--font);
        color: var(--grey-dark);
        margin-top: auto;
        transform: translate(0.875rem, 0.6875rem) scale(1);
        &.MuiFormLabel-filled,
        &.Mui-focused {
            transform: translate(0.875rem, -0.4375rem) scale(0.75);
            background: var(--white);
            padding: 0 0.1875rem;
            color: ${disabled ? "rgba(78, 82, 84, .5)" : "rgba(78, 82, 84, 1)"};
            + .MuiInputBase-root {
                color: ${disabled ? "rgba(78, 82, 84, .5)" : "rgba(78, 82, 84, 1)"};
                .MuiOutlinedInput-notchedOutline {
                    border-color: var(--accent);
                }
            }
        }
        @media (max-width: 75rem) {
            & {
                font-size: calc(var(--fz) - 0.3125rem);
                margin-top: 0.1875rem;
            }
        }
    }
    ${
        !disabled &&
        `
    &:hover {
        .MuiInputLabel-formControl {
            color: var(--black) !important;
            + .MuiInputBase-root {
                color: var(--black) !important;
            }
        }
        .MuiInputBase-root .MuiOutlinedInput-notchedOutline {
            border-color: var(--black) !important;
        }

    }
    `
    };
    .MuiInputBase-sizeSmall ~ .MuiInputLabel-formControl {
        transform: translate(0.875rem, 0.4375rem) scale(1);
    }
    .label-small {
        transform: translate(0.875rem, 0.4375rem) scale(1);
    }
    .label-small.Mui-focused,
    .label-small.MuiFormLabel-filled {
        transform: translate(0.875rem, -0.4375rem) scale(0.75);

    }
    .MuiOutlinedInput-root.Mui-disabled,
    .MuiInputBase-root.Mui-disabled {
        opacity: 0.5 !important;
        border-color: var(--grey-black) !important;
        svg {
            color: var(--grey-black);
            opacity: 0.5 !important;
        }
        + label {
            color: rgba(78, 82, 84, .5); !important;
        }
    }
`
);
const DropdownComponent: FC<SelectProps> = styled(Select)`
    .MuiMenuItem-root {
        white-space: normal;
    }
    & svg {
        pointer-events: none;
    }
`;

const IconStyled = styled(Icon)`
    position: absolute;
    transform: rotate(0);
    height: 1.5rem;
    width: 1.5rem;
    right: 0.25rem;
    top: calc(50% - 0.75rem);
    pointer-events: none;
    .Mui-focused & {
        transform: rotate(180deg);
    }
`;

export function Dropdown<T>(props: IDropdownProps<T>) {
    const {
        values,
        label,
        inputWidth,
        withSearch,
        value,
        children,
        icon,
        labelClass,
        onChange,
        onSearch,
        searchValue,
        helperText,
        emptyValue,
        disabled,
        multiple,
        focused = true,
        ...args
    } = props;

    const [open, setOpen] = useState<boolean>(false);

    const {ref, size} = useElementSize();

    const IconElement = useMemo(
        () =>
            icon
                ? {IconComponent: () => <IconStyled name={icon} />}
                : {IconComponent: () => <IconStyled name="arrow" />},
        [icon]
    );

    const onCloseEvent = useCallback((e: SyntheticEvent<Element, Event>) => {
        if (!(e.currentTarget.tagName === "SPAN")) {
            setOpen(false);
        }
    }, []);

    const onOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const renderEmptyValue = useMemo(
        () =>
            emptyValue && (
                <MenuItem key="clean" value={""} selected={!value}>
                    {emptyValue}
                </MenuItem>
            ),
        [emptyValue, value]
    );

    const renderingSelectOptions = useMemo(
        () =>
            children
                ? children
                : values?.map((name, i) => (
                      <MenuItem key={i} value={name as MenuItemProps["value"]}>
                          {name}
                      </MenuItem>
                  )),
        [children, values]
    );
    const activeValue = useMemo(() => {
        const res = Array.isArray(value) ? (value as Array<any>).length : value || value === 0 ? true : false;
        return Boolean(res);
    }, [value]);

    return (
        <FormControlComponent width={inputWidth} disabled={disabled}>
            <InputLabel
                //@ts-ignore
                focused={(focused || activeValue) && !disabled}
                className={labelClass}
                sx={{
                    padding: "0 0.1875rem",
                    background: "var(--white)",
                }}>
                {label}
            </InputLabel>
            <DropdownComponent
                {...args}
                {...IconElement}
                open={open}
                ref={ref}
                onOpen={onOpen}
                onClose={onCloseEvent}
                onChange={onChange}
                value={value}
                displayEmpty={!!emptyValue}
                disabled={disabled}
                multiple={multiple}
                MenuProps={{
                    autoFocus: false,
                    sx: {
                        "& .MuiPaper-root": {
                            maxHeight: 300,
                            width: size.width,
                        },
                    },
                }}>
                {withSearch && (
                    <ListSubheader>
                        <InputText
                            autoFocus
                            value={searchValue}
                            fullWidth
                            icon="search"
                            onChange={onSearch}
                            onKeyDown={(e) => e.stopPropagation()}
                        />
                    </ListSubheader>
                )}
                {renderEmptyValue}
                {renderingSelectOptions}
            </DropdownComponent>
            {props.error && <FormHelperText>{helperText}</FormHelperText>}
        </FormControlComponent>
    );
}
