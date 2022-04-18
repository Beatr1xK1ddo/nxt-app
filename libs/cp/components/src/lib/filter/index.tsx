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
    setItemsPerPageFilter,
    setNameFilter,
    setStatusFilter,
    setTimecodeFilter,
} from '@nxt-ui/cp/ducks';
import { useSearchParams } from 'react-router-dom';
import { EStatusTypes, ETimecodeType } from '../types';
import { SelectChangeEvent } from '@mui/material/Select/Select';

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
    }, [dispatch]);

    const changeStatus = useCallback((e: SelectChangeEvent<unknown>) => {
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
        <div className={styles['filter-wrap']}>
            <div className={styles['filter-list']}>
                <InputText
                    label="NAME"
                    value={params[IFilters.name] || ''}
                    onChange={changeName}
                />
                <Dropdown label="NODE" />
                <Dropdown label="COMPANY" />
                <Dropdown
                    label="STATUS"
                    onChange={changeStatus}
                    value={params[IFilters.status] || ''}
                    values={Object.values(EStatusTypes)}
                />
                <Dropdown
                    label="TIMECODE"
                    values={Object.values(ETimecodeType)}
                    onChange={changeTimecode}
                    value={params[IFilters.timecode] || ''}
                />
                <Dropdown
                    label="ITEMS PER PAGE"
                    onChange={changeItemsPerPage}
                    value={params[IFilters.itemsPerPage]}
                    values={Object.values(EItemsPerPage)}
                />
            </div>
            <div className={styles['filter-block']}>
                <Button onClick={applyFilters} icon="filter" iconBefore>
                    Filter
                </Button>
                <Button
                    bgColor={EColors.grey}
                    onClick={resetFilters}
                    style={{ color: EColors.black, marginLeft: 8 }}
                >
                    Reset
                </Button>
            </div>
        </div>
    );
};
