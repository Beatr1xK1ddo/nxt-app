import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import { FC, SyntheticEvent, useCallback, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import { IDropdownProps } from './types';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { EColors } from '@nxt-ui/colors';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import { InputText } from '../text';
import { v4 as uuidv4 } from 'uuid';
import { useElementSize } from '@nxt-ui/hooks';

export * from './types';

const FormControlComponent: FC<{ width?: number }> = styled(FormControl)<{
    width?: number;
}>(
    ({ width }) => `
    width: ${width ? width : 100}px;

    & .MuiInputLabel-root {
        top: -3px;
        font-size: .7rem;
    }

    & .MuiInputLabel-root.Mui-focused {
        color: ${EColors.greyBorder};
    }

    & .MuiInputLabel-root.Mui-focused ~ 
    .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
        border: 2px solid ${EColors.greyBorder};
    }
`
);

const DropdownComponent: FC<SelectProps> = styled(Select)`
    & .MuiPaper-root {
        background: yellow;
    }
    & .MuiSelect-select {
        padding-top: 8px;
        padding-bottom: 9px;
    }
    & .MuiFormControl-root {
        width: 100%;
        bakcground: yellow;
    }
`;

const SearchWrap = styled('span')<{ width: number }>`
    display: block;
    padding: 0 8px;
    padding-bottom: 8px;
    width: ${({ width }) => width || 0}px;
`;

export function Dropdown<T>(props: IDropdownProps<T>) {
    const {
        values,
        label,
        inputWidth,
        isSearch,
        value,
        children,
        onChange,
        ...args
    } = props;
    const [open, setOpen] = useState<boolean>(false);

    const { ref, size } = useElementSize();

    const onCloseEvent = useCallback((e: SyntheticEvent<Element, Event>) => {
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

    const renderingSelectOptions = useMemo(
        () =>
            children
                ? children
                : values?.map((name) => (
                      <MenuItem
                          key={uuidv4()}
                          value={name as MenuItemProps['value']}
                      >
                          {name}
                      </MenuItem>
                  )),
        [children, values]
    );

    return (
        <FormControlComponent width={inputWidth}>
            <InputLabel
                sx={{
                    padding: '0 3px',
                    background: '#fff',
                }}
            >
                {label}
            </InputLabel>
            <DropdownComponent
                {...args}
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
                    <SearchWrap width={size.width}>
                        <InputText icon="search" />
                    </SearchWrap>
                )}
                {renderingSelectOptions}
            </DropdownComponent>
        </FormControlComponent>
    );
}
