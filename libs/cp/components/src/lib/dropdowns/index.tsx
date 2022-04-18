import { Checkbox } from '@mui/material';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import { Dropdown } from '@nxt-ui/components';
import { useGetCompanies, useGetNodes } from '@nxt-ui/cp/hooks';
import { FC } from 'react';
import { INodeDropdown } from './types';
// MuiInputLabel-root

export const NodeDropdown: FC<INodeDropdown> = (props) => {
    const { onChange, activeNode } = props;

    const { data } = useGetNodes();

    return (
        <Dropdown
            sx={{
                '& > .MuiSelect-select .MuiCheckbox-root': {
                    display: 'none',
                },
            }}
            onChange={onChange}
            {...props}
        >
            {data?.map((node) => {
                const checked = node.id === parseInt(activeNode as string);
                return (
                    <MenuItem key={node.id} value={node.id} selected={checked}>
                        <Checkbox checked={checked} />
                        {`${node.name} (${node.hostname}) - ${node.digit_code}`}
                    </MenuItem>
                );
            })}
        </Dropdown>
    );
};

export const CompanyDropdown: FC<INodeDropdown> = (props) => {
    const { onChange, activeNode } = props;

    const { data } = useGetCompanies();

    return (
        <Dropdown
            sx={{
                '& > .MuiSelect-select .MuiCheckbox-root': {
                    display: 'none',
                },
            }}
            onChange={onChange}
            {...props}
        >
            {data?.map((company) => {
                const checked = company.id === parseInt(activeNode as string);
                return (
                    <MenuItem
                        key={company.id}
                        value={company.id}
                        selected={checked}
                    >
                        <Checkbox checked={checked} />
                        {company.name}
                    </MenuItem>
                );
            })}
        </Dropdown>
    );
};
