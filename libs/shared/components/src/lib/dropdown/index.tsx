import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import { FC, SyntheticEvent, useCallback, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import { IDropdownProps } from './types';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import { InputText } from '../text';
import { v4 as uuidv4 } from 'uuid';
import { useElementSize } from '@nxt-ui/hooks';
import { Icon } from '@nxt-ui/icons';

export * from './types';

const FormControlComponent: FC<{ width?: number }> = styled(FormControl)<{
    width?: number;
}>(
    ({ width }) => `
    width: ${width ? width + 'px' : 100 + '%'};

    .MuiInput-input {
        height: 40px;
    }
    .MuiInputBase-root {
        font: var(--font);
        color: var(--grey-dark);
    }
    .MuiOutlinedInput-input {
        padding: 10px 15px;
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
`
);

const DropdownComponent: FC<SelectProps> = styled(Select)`
    // & .MuiPaper-root {
    //     background: yellow;
    // }
    // & .MuiSelect-select {
    //     padding-top: 8px;
    //     padding-bottom: 9px;
    // }
    // & .MuiFormControl-root {
    //     width: 100%;
    //     bakcground: yellow;
    // }
    .MuiMenuItem-root {
        white-space: normal;
    }
`;

const SearchWrap = styled('span')<{ width: number }>`
    display: block;
    padding: 0 8px;
    padding-bottom: 8px;
    width: ${({ width }) => width || 0}px;
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
        onChange,
        onSearch,
        searchValue,
        ...args
    } = props;

    const [open, setOpen] = useState<boolean>(false);

    const { ref, size } = useElementSize();

    const IconElement = useMemo(() => icon ? { IconComponent: () => <IconStyled name={icon} /> } :
        { IconComponent: () => <IconStyled name="arrow" /> }, [icon]);

    const onCloseEvent = useCallback((e: SyntheticEvent<Element, Event>) => {
        console.log('TAG IS ', e.currentTarget.tagName);
        if (!(e.currentTarget.tagName === 'SPAN')) {
            setOpen(false);
        }
    }, []);

    const customChangeEvent = useCallback((e: SelectChangeEvent<unknown>) => {
        onChange?.(e);
    }, []);

    const onOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const renderingSelectOptions = useMemo(() => children ? children :
        values?.map((name) => (
            <MenuItem
                key={uuidv4()}
                onKeyDown={(e) => e.stopPropagation()}
                value={name as MenuItemProps['value']}
            >
                {name}
            </MenuItem>
        )
    ), [children, values]);

    return (
        <FormControlComponent width={inputWidth}>
            <InputLabel
                sx={{
                    padding: '0 3px',
                    background: 'var(--white)',
                }}
            >
                {label}
            </InputLabel>
            <DropdownComponent
                {...args}
                {...IconElement}
                open={open}
                ref={ref}
                onOpen={onOpen}
                onClose={onCloseEvent}
                onChange={customChangeEvent}
                value={value || ''}
                MenuProps={{
                    sx: {
                        '& .MuiPaper-root': {
                            maxHeight: 550,
                            width: size.width,
                        },
                    },
                }}
            >
                {isSearch && (
                    <SearchWrap 
                        width={size.width} 
                        onKeyDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <InputText value={searchValue} icon="search" onChange={onSearch} />
                    </SearchWrap>
                )}
                {renderingSelectOptions}
            </DropdownComponent>
        </FormControlComponent>
    );
}
