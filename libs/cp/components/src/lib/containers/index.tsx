import { ChangeEvent, FC, useCallback, useMemo } from 'react';
import styled from '@emotion/styled';
import { IItemsContainerProps, IContainerProps } from './types';
import { ECardView } from '@nxt-ui/cp/types';
import { css } from '@emotion/react';
import { setPageFilter } from '@nxt-ui/cp/ducks';
import { Card } from '../card';
import { useDispatch } from 'react-redux';
import { PaginationComponent } from '@nxt-ui/components';

const TableContainer = css`
    display: flex;
    flex-direction: column;
`;

const CardContainer = css`
    margin-top: 15px;
    column-count: 4;
    page-break-inside: avoid;

    &:after {
        content: '';
        clear: both;
        display: block;
    }

    @media (max-width: 1400px) {
        column-count: 3;
    }
    @media (max-width: 1200px) {
        column-count: 2;
    }
    @media (max-width: 768px) {
        column-count: 1;
    }
`;

export const ColumnTwo: FC<{ gap?: number }> = styled('div')<{ gap?: number }>(
    ({ gap }) => `
    gap: ${gap ? gap : 24}px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-auto-flow: row;
    margin:0 0 ${gap ? gap : 24}px;
`
);

export const LogList = styled('ul')`
    font: var(--font);
    font-size: calc(var(--fz) - 2px);
    li {
        padding: 8px 0;
        border-bottom: 1px solid var(--grey-light);
    }
    strong {
        font-weight: 600;
    }
    .log-time {
        font-style: normal;
        font-size: calc(var(--fz) - 4px);
        text-transform: uppercase;
        display: block;
        font-weight: 300;
    }
`;

export const GridTwoRows = styled('ul')`
    display: grid;
    gap: 2px 15px;
    font-size: calc(var(--fz) - 4px);
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto 1fr;
    grid-auto-columns: 1fr 1fr 1fr;
    grid-auto-rows: 1fr 1fr;
    grid-auto-flow: column;
    font-weight: 600;
    margin: 0 0 12px;
    text-align: left;
    .app-log & {
        padding: 0 16% 0 0;
        @media (max-width: 992px /*--q-l*/) {
            padding: 0;
            text-align: center;
        }
    }
    .speed-ok {
        color: var(--ok);
    }
    .speed-bad {
        color: var(--r-premium);
    }
    .img-graph {
        display: block;
        margin: 3px 0 0;
    }
    > li[class^='speed'] {
        img {
            display: block;
        }
    }
    .text-light {
        font-weight: 300;
    }
    .text-bold {
        font-weight: 700;
        color: var(--blacked);
    }
    .text-c {
        display: block;
        text-align: center;
    }
`;

export const FormContainer = styled('div')`
    background: var(--bluer);
    border-radius: 8px;
    padding: 16px 8px 8px;
    display: flex;
    justify-content: space-between;
    @media (max-width: 992px /*--q-l*/) {
        display: block;
    }
`;

export const FlexHolder: FC<{ justify?: string; className?: string }> = styled(
    'div'
)<{ justify?: string }>(
    ({ justify }) => `
    justify-content: ${justify ? justify : 'space-between'};
    display: flex;
    align-items: center;
    &.app-info {
        margin:0 0 16px;
        >* {
            margin:0 8px 0 0;
        }
        button[data-type='btn-icon'] {
            width: 24px;
            height: 24px;
            padding: 0;
        }
    }
    &.align-top {
        align-items: flex-start;
    }
`
);

export const Container = styled('ul')<IContainerProps>`
    width: 100%;
    min-height: calc(100vh - 426px);
    box-sizing: border-box;
    ${({ mode }) => (mode === ECardView.table ? TableContainer : CardContainer)}
`;

export const RootContainer = styled('div')`
    flex-direction: column;
    display: flex;

    min-height: 100%;
    width: 100%;
    max-width: var(--xxl);
    margin: 0 auto;
    @media (max-width: 1400px /*--q-xxl*/) {
        max-width: var(--xl);
    }
    @media (max-width: 1200px /*--q-xl*/) {
        max-width: var(--l);
    }
    @media (max-width: 992px /*--q-l*/) {
        max-width: var(--m);
    }
    @media (max-width: 768px /*--q-m*/) {
        max-width: var(--s);
        padding: 0 8px;
        box-sizing: border-box;
    }
`;

export const PaginationContainer = styled('div')`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 8px 0;
`;

export const HeaderContainer = styled('ul')`
    margin: 0;
    width: 100%;
    display: flex;
    padding: 15px 5px 0 102px;
    @media (max-width: 992px /*--q-l*/) {
        display: none;
    }
`;

export const HeaderTitle = styled('li')`
    width: 70px;
    color: var(--grey-dark);
    font-size: calc(var(--fz) - 2px);
    padding: 0 8px;
    &:not(:last-child) {
        flex-shrink: 0;
    }
    &:first-child {
        width: 335px;
        @media (max-width: 1200px /*--q-xl*/) {
            width: 315px;
        }
    }
    &:nth-child(4) {
        width: 100px;
    }
    &:nth-child(5) {
        width: 110px;
    }
    &:nth-child(6) {
        min-width: 125px;
    }
    &:last-child {
        width: 100%;
        display: flex;
        flex-grow: 1;
        justify-content: flex-end;
    }
`;

export const ItemsContainer: FC<IItemsContainerProps> = (props) => {
    const { mode, page, cards, total, itemsPerPage } = props;

    const dispatch = useDispatch();

    const setPaginationPage = useCallback(
        (e: ChangeEvent<unknown>, page: number) => {
            dispatch(setPageFilter(page));
        },
        []
    );

    const totalCount = useMemo(() => {
        if (!total) {
            return 0;
        }
        return Math.ceil(total / itemsPerPage);
    }, [total, itemsPerPage]);

    return (
        <>
            {mode === ECardView.table && (
                <HeaderContainer>
                    <HeaderTitle>NODE, NAME</HeaderTitle>
                    <HeaderTitle>STATUS</HeaderTitle>
                    <HeaderTitle>RUNTIME</HeaderTitle>
                    <HeaderTitle>INPUT</HeaderTitle>
                    <HeaderTitle>BITRATE</HeaderTitle>
                    <HeaderTitle>DESTINATION</HeaderTitle>
                    <HeaderTitle>ACTIONS</HeaderTitle>
                </HeaderContainer>
            )}
            <Container mode={mode}>
                {cards.map((card) => (
                    <Card {...card} key={card.id} mode={mode} />
                ))}
            </Container>
            <PaginationContainer>
                <PaginationComponent
                    page={+page}
                    onChange={setPaginationPage}
                    count={totalCount}
                />
            </PaginationContainer>
        </>
    );
};
