import { Controller, Filter, ItemsContainer } from '@nxt-ui/cp/components';
import { getCardViewMode } from '@nxt-ui/cp/ducks';
import { FC } from 'react';
import { useSelector } from 'react-redux';

export const Ibpe1: FC = () => {
    const { mode } = useSelector(getCardViewMode);

    return (
        <>
            <Filter />
            <Controller from={1} to={20} len={100} />
            <ItemsContainer mode={mode} />
        </>
    );
};
