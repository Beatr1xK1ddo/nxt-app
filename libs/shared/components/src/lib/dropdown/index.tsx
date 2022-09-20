import Select, {SelectProps} from "@mui/material/Select";
import {FC, SyntheticEvent, useCallback, useMemo, useState} from "react";
import {styled} from "@mui/material/styles";
import {IDropdownProps} from "./types";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem, {MenuItemProps} from "@mui/material/MenuItem";
import {InputText} from "../text";
import {useElementSize} from "@nxt-ui/hooks";
import {Icon} from "@nxt-ui/icons";
import FormHelperText from "@mui/material/FormHelperText";
import {ListSubheader} from "@mui/material";

export * from "./types";

const FormControlComponent: FC<{width?: number; classAdd?: string}> = styled(FormControl)<{
    width?: number;
}>(
    ({width}) => `
    width: ${width ? width + "px" : 100 + "%"};

    .MuiInput-input {
        height: 40px;
    }
    .MuiInputBase-root {
        font: var(--font);
        color: var(--grey-dark);
    }
    .MuiInputBase-root.Mui-error {
        border: 1px solid var(--danger);
    }
    .Mui-error .MuiOutlinedInput-notchedOutline {
        border: none;
    }
    .Mui-error~.MuiFormHelperText-root {
        color: var(--danger);
    }
    .MuiOutlinedInput-input {
        padding: 10px 15px;
    }
    .MuiInputBase-sizeSmall .MuiOutlinedInput-input {
        padding: 6px 15px;
    }
    .MuiInputLabel-formControl {
        font: var(--font);
        color: var(--grey-dark);
        margin-top: auto;
        transform: translate(14px, 11px) scale(1);
        &.MuiFormLabel-filled,
        &.Mui-focused {
            transform: translate(14px, -7px) scale(0.75);
            background: var(--white);
            padding: 0 3px;
            color: var(--grey-black);
            + .MuiInputBase-root {
                color: var(--grey-black);
                .MuiOutlinedInput-notchedOutline {
                    border-color: var(--accent);
                }
            }
        }
        @media (max-width: 1200px) {
            & {
                font-size: calc(var(--fz) - 5px);
                margin-top: 3px;
            }
        }
    }
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
    .MuiInputBase-sizeSmall ~ .MuiInputLabel-formControl {
        transform: translate(14px, 7px) scale(1);
    }
    .label-small {
        transform: translate(14px, 7px) scale(1);
    }
    .label-small.Mui-focused,
    .label-small.MuiFormLabel-filled {
        transform: translate(14px, -7px) scale(0.75);
        
    }
    .MuiOutlinedInput-root.Mui-disabled,
    .MuiInputBase-root.Mui-disabled .MuiOutlinedInput-notchedOutline {
        opacity: 0.5 !important;
        border-color: var(--grey-black) !important;
        svg {
            color: var(--grey-black);
            opacity: 0.5 !important;
        }
        + label {
            color: rgba(78, 82, 84, 0.5) !important;
        }
    }
`
);

const DropdownComponent: FC<SelectProps> = styled(Select)`
    .MuiMenuItem-root {
        white-space: normal;
    }
`;

const IconStyled = styled(Icon)`
    position: absolute;
    transform: rotate(0);
    height: 24px;
    width: 24px;
    right: 4px;
    top: calc(50% - 12px);
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
                <MenuItem key="clean" value={""} selected={!!value}>
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

    return (
        <FormControlComponent width={inputWidth}>
            <InputLabel
                focused={value === "" && !disabled}
                className={labelClass}
                sx={{
                    padding: "0 3px",
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
