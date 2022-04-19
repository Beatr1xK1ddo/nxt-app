import MenuItem from '@mui/material/MenuItem/MenuItem';
import { Dropdown } from '@nxt-ui/components';
import { useGetCompanies, useGetNodes } from '@nxt-ui/cp/hooks';
import { FC, useEffect } from 'react';
import { ICompanyDropdown, INodeDropdown } from './types';

export const NodeDropdown: FC<INodeDropdown> = (props) => {
    const { onChange, value } = props;

    const { data } = useGetNodes();

    useEffect(() => {
        console.log('NodeDropdown value', value);
    }, [value]);

    return (
        <Dropdown
            {...props}
            sx={{
                '& > .MuiSelect-select .MuiCheckbox-root': {
                    display: 'none',
                },
            }}
            value={value}
            onChange={onChange}
        >
            {data?.map((node) => {
                const checked = node.id === parseInt(value as string);
                return (
                    <MenuItem key={node.id} value={node.id} selected={checked}>
                        {`${node.name} (${node.hostname}) - ${node.digit_code}`}
                    </MenuItem>
                );
            })}
        </Dropdown>
    );
};

export const CompanyDropdown: FC<ICompanyDropdown> = (props) => {
    const { onChange, value } = props;

    const { data } = useGetCompanies();

    return (
        <Dropdown
            {...props}
            sx={{
                '& > .MuiSelect-select .MuiCheckbox-root': {
                    display: 'none',
                },
            }}
            onChange={onChange}
        >
            {data?.map((company) => {
                const checked = company.id === parseInt(value as string);
                return (
                    <MenuItem
                        key={company.id}
                        value={company.id}
                        selected={checked}
                    >
                        {company.name}
                    </MenuItem>
                );
            })}
        </Dropdown>
    );
};
