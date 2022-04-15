import { ChangeEventHandler, FC, useCallback, useEffect } from 'react';
import styles from './filter.module.scss';
import { InputText, Dropdown, Button } from '@nxt-ui/components';
import { EColors } from '@nxt-ui/colors';
import { useDispatch, useSelector } from 'react-redux';
import {
    EItemsPerPage,
    getNotEmptyFilters,
    IFilters,
    setNameFilter,
} from '@nxt-ui/cp/ducks';
import { useSearchParams } from 'react-router-dom';

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

    useEffect(() => {
        setSearch(params);
    }, [params[IFilters.page]]);

    return (
        <div className={styles['filter-wrap']}>
            <div className={styles['filter-list']}>
                <InputText
                    label="NAME"
                    value={params[IFilters.name]}
                    onChange={changeName}
                />
                <Dropdown label="NODE" />
                <Dropdown label="COMPANY" />
                <Dropdown label="STATUS" />
                <Dropdown label="TIMECODE" />
                <Dropdown
                    label="ITEMS PER PAGE"
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
                    style={{ color: EColors.black, marginLeft: 8 }}
                >
                    Reset
                </Button>
            </div>
        </div>
    );
};
