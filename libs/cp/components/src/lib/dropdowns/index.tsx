import MenuItem from '@mui/material/MenuItem/MenuItem';
import { Dropdown } from '@nxt-ui/components';
import { ICompany, INode } from '@nxt-ui/cp/api';
import { useGetCompanies, useGetNodes } from '@nxt-ui/cp/hooks';
import { FC, useEffect, ChangeEventHandler, useState, useMemo } from 'react';
import { ICompanyDropdown, INodeDropdown } from './types';

export const NodeDropdown: FC<INodeDropdown> = (props) => {
    const [search, setSearch] = useState<string>('');
    const [searchValues, setValues] = useState<INode[]>([]);
    const { value } = props;

    const { data } = useGetNodes();

    const searchHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        event.stopPropagation();
        const value = event.currentTarget.value;
        setSearch(value);
    };

    const values = useMemo(() => {
        if (search) {
            return searchValues
        }
        return data;
    }, [search, data, searchValues])

    useEffect(() => {
        const values = data?.filter((company) => {
            const name = company.name.toLowerCase();
            return name.includes(search);
        });
        setValues(values || []);
    }, [search, data])

    return (
        <Dropdown
            isSearch
            {...props}
            sx={{
                '& > .MuiSelect-select .MuiCheckbox-root': {
                    display: 'none',
                },
            }}
            value={value}
            onSearch={searchHandler}
            searchValue={search}
        >
            {values?.map((node) => {
                const checked = node.id === parseInt(value as string);
                return (
                    <MenuItem 
                        key={node.id} 
                        value={node.id} 
                        selected={checked} 
                        sx={{
                            background: node.is_online ? 'rgba(47, 168, 79, .3)' : 'rgba(234, 61, 47, .3)'
                        }}
                    >
                        {`${node.name} (${node.hostname}) - ${node.digit_code}`}
                    </MenuItem>
                );
            })}
        </Dropdown>
    );
};

export const CompanyDropdown: FC<ICompanyDropdown> = (props) => {
    const [search, setSearch] = useState<string>('');
    const [searchValues, setValues] = useState<ICompany[]>([]);
    const { onChange, value } = props;

    const { data } = useGetCompanies();

    const values = useMemo(() => {
        if (search) {
            return searchValues
        }
        return data;
    }, [search, data, searchValues])

    const searchHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        event.stopPropagation();
        const value = event.currentTarget.value;
        setSearch(value);
    };

    useEffect(() => {
        const values = data?.filter((company) => {
            const name = company.name.toLowerCase();
            return name.includes(search);
        });
        setValues(values || []);
    }, [search, data])

    return (
        <Dropdown
            isSearch
            onSearch={searchHandler}
            searchValue={search}
            {...props}
            sx={{
                '& > .MuiSelect-select .MuiCheckbox-root': {
                    display: 'none',
                },
            }}
            onChange={onChange}
        >
            {values?.map((company) => {
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
