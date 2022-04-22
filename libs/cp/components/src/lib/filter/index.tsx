import { ChangeEventHandler, FC, useCallback, useEffect } from 'react';
import styles from './filter.module.scss';
import { InputText, Dropdown, Button } from '@nxt-ui/components';
import { EColors } from '@nxt-ui/colors';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearFilter,
    EItemsPerPage,
    getNotEmptyFilters,
    IFilters,
    setCompanyFilter,
    setItemsPerPageFilter,
    setNameFilter,
    setNodeFilter,
    setStatusFilter,
    setTimecodeFilter,
} from '@nxt-ui/cp/ducks';
import { useSearchParams } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material/Select/Select';
import { CompanyDropdown, NodeDropdown } from '../dropdowns';
import { EStatusTypes, ETimecodeType } from '@nxt-ui/cp/api';

export const Filter: FC = () => {
    const params = useSelector(getNotEmptyFilters);

    const dispatch = useDispatch();

    const [, setSearch] = useSearchParams();

    const changeName = useCallback(
        (e) => {
            dispatch(setNameFilter(e.currentTarget.value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const applyFilters = useCallback(() => {
        setSearch(params);
    }, [params, setSearch]);

    const resetFilters = useCallback(() => {
        dispatch(clearFilter());
        setSearch(params);
    }, [dispatch, setSearch]);

    const setNodeIdFilter = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(setNodeFilter(e.target.value as number));
        },
        [dispatch]
    );

    const setCompanyIdFilter = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(setCompanyFilter(e.target.value as number));
        },
        [dispatch]
    );

    const changeStatus = useCallback((e: SelectChangeEvent<unknown>) => {
        console.log('event', e.target);
        dispatch(setStatusFilter(e.target.value as string));
    }, []);

    const changeItemsPerPage = useCallback((e: SelectChangeEvent<unknown>) => {
        dispatch(setItemsPerPageFilter(e.target.value as string));
    }, []);

    const changeTimecode = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(setTimecodeFilter(e.target.value as string));
        },
        [dispatch]
    );

    useEffect(() => {
        setSearch(params);
    }, [params[IFilters.page]]);

    return (
        <section className={styles['filter-wrap']}>
            <div className={styles['filter-list']}>
                <InputText
                    label="NAME"
                    value={params[IFilters.name] || ''}
                    onChange={changeName}
                    fullWidth
                    
                />
                <NodeDropdown
                    label="NODE"
                    value={params[IFilters.node]}
                    onChange={setNodeIdFilter}
                />
                <CompanyDropdown
                    label="COMPANY"
                    value={params[IFilters.company]}
                    onChange={setCompanyIdFilter}
                />
                <Dropdown
                    label="STATUS"
                    onChange={changeStatus}
                    value={params[IFilters.status]}
                    values={Object.values(EStatusTypes)}
                    isSearch
                />
                <Dropdown
                    label="TIMECODE"
                    values={Object.values(ETimecodeType)}
                    onChange={changeTimecode}
                    value={params[IFilters.timecode]}
                />
                <Dropdown
                    label="ITEMS PER PAGE"
                    onChange={changeItemsPerPage}
                    value={params[IFilters.itemsPerPage]}
                    values={Object.values(EItemsPerPage)}
                />
                <div className={styles['filter-buttons']}>
                    <Button onClick={applyFilters} icon="filter" iconBefore>
                        Filter
                    </Button>
                    <Button
                        onClick={resetFilters}
                        style={{ color: EColors.black, marginLeft: 8 }}
                        bgColor={EColors.grey}
                    >
                        Reset
                    </Button>
                </div>
            </div>
        </section>
    );
};
