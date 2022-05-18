import Select, {SelectProps} from "@mui/material/Select";
import {FC, SyntheticEvent, useCallback, useMemo, useState} from "react";
import {styled} from "@mui/material/styles";
import {IDropdownProps} from "./types";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem, {MenuItemProps} from "@mui/material/MenuItem";
import {InputText} from "../text";
import {v4 as uuidv4} from "uuid";
import {useElementSize} from "@nxt-ui/hooks";
import {Icon} from "@nxt-ui/icons";
import FormHelperText from "@mui/material/FormHelperText";
import Box from "@mui/material/Box";
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
`
);

const DropdownComponent: FC<SelectProps> = styled(Select)`
    .MuiMenuItem-root {
        white-space: normal;
    }
`;

const SearchWrap = styled("span")<{width: number}>`
    display: block;
    padding: 0 8px;
    padding-bottom: 8px;
    width: ${({width}) => width || 0}px;

    & .MuiFormControl-root {
        width: 100%;
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
        isSearch,
        value,
        children,
        icon,
        labelClass,
        onChange,
        onSearch,
        searchValue,
        helperText,
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
                value={value || ""}
                MenuProps={{
                    autoFocus: false,
                    sx: {
                        "& .MuiPaper-root": {
                            maxHeight: 300,
                            width: size.width,
                        },
                    },
                }}>
                {isSearch && (
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
                {renderingSelectOptions}
            </DropdownComponent>
            {props.error && <FormHelperText>{helperText}</FormHelperText>}
        </FormControlComponent>
    );
}
