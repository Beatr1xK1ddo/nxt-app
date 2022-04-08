import Select, { SelectProps } from '@mui/material/Select';
import { FC } from 'react';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import { IDropdownProps } from './types';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const Dropdown: FC<SelectProps> = styled(Select)({
    '&': {
        minWidth: 165,
        '& .MuiSelect-select': {
            paddingTop: 14,
            paddingBottom: 14,
        },
    },
});

export const DropdownComponent: FC<IDropdownProps> = (props) => {
    const { values, label } = props;

    return (
        <FormControl>
            <InputLabel
                sx={{
                    padding: '0 3px',
                    background: '#fff',
                }}
                id="dropdown-label"
            >
                {label}
            </InputLabel>
            <Dropdown labelId="dropdown-label">
                {values?.map((name) => (
                    <MenuItem key={name} value={name}>
                        {name}
                    </MenuItem>
                ))}
            </Dropdown>
        </FormControl>
    );
};
