import Select, { SelectProps } from '@mui/material/Select';
import {
    FC,
    MouseEventHandler,
    SyntheticEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { styled } from '@mui/material/styles';
import { IDropdownProps } from './types';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { EColors } from '@nxt-ui/colors';
import MenuItem from '@mui/material/MenuItem';
import { InputText } from '../text';

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

export const Dropdown: FC<IDropdownProps> = (props) => {
    const { values, label, inputWidth, isSearch, value } = props;
    const [width, setWidth] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);
    const elemRef = useRef<HTMLDivElement>();

    const onCloseEvent = useCallback((e: SyntheticEvent<Element, Event>) => {
        const elem = e.currentTarget.tagName === 'SPAN';
        console.log(e.currentTarget.tagName);
        if (!elem) {
            setOpen(false);
        }
    }, []);

    useEffect(() => {
        if (elemRef.current) {
            setWidth(elemRef.current.offsetWidth);
        }
    }, [elemRef, setWidth]);

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
                open={open}
                ref={elemRef}
                onOpen={() => setOpen(true)}
                onClose={onCloseEvent}
                value={value}
            >
                {isSearch && (
                    <SearchWrap width={width}>
                        <InputText icon="search" />
                    </SearchWrap>
                )}
                {values?.map((name) => (
                    <MenuItem key={name} value={name}>
                        {name}
                    </MenuItem>
                ))}
            </DropdownComponent>
        </FormControlComponent>
    );
};
