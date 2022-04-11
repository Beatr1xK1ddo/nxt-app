import Select, { SelectProps, selectClasses } from '@mui/material/Select';
import { FC } from 'react';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import { IDropdownProps } from './types';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { EColors } from '@nxt-ui/colors';
import { DropList } from './drop-list';

console.log('selectClasses', selectClasses)

const FormControlComponent: FC<{width?: number}> = styled(FormControl)<{width?: number}>(({width}) => `
    width: ${width || 100}px;
    
    & .MuiInputLabel-root {
        top: -3px;
        font-size: .7rem;
    }

    & .MuiInputLabel-root.Mui-focused {
        color: ${EColors.greyBorder}
    }

    & .MuiInputLabel-root.Mui-focused ~ 
    .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
        border: 2px solid ${EColors.greyBorder};
    }
`);

const DropdownComponent: FC<SelectProps> = styled(Select)`
    & .MuiSelect-select {
        padding-top: 8px;
        padding-bottom: 9px;
    }
`;

export const Dropdown: FC<IDropdownProps> = (props) => {
    const { values, label, inputWidth } = props;

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
            <DropdownComponent>
                <DropList values={values} />
            </DropdownComponent>
        </FormControlComponent>
    );
};
