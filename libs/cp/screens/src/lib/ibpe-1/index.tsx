import { Controller, Filter, ItemsContainer } from '@nxt-ui/cp/components';
import {
    getCardViewMode,
    getFilterState,
    getPaginationFilters,
    IFilters,
} from '@nxt-ui/cp/ducks';
import { useGetIpbe } from '@nxt-ui/cp/hooks';
import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';

export const Ibpe1: FC = () => {
    const { mode } = useSelector(getCardViewMode);

    const [start, end] = useSelector(getPaginationFilters);

    const filters = useSelector(getFilterState);

    const { data } = useGetIpbe();

    const itemsPerPage = useMemo(() => {
        return parseInt(filters[IFilters.itemsPerPage]);
    }, [filters[IFilters.itemsPerPage]]);

    return (
        <>
            <Filter />
            <Controller start={start} end={end} total={data?.total} />
            <ItemsContainer
                cards={data?.data || []}
                mode={mode}
                page={filters.page}
                total={data?.total}
                itemsPerPage={itemsPerPage}
            />
        </>
    );
};
