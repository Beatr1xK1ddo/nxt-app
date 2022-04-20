import { ChangeEvent, FC, useCallback, useMemo } from 'react';
import styled from '@emotion/styled';
import { IItemsContainerProps, IContainerProps } from './types';
import { ECardView } from '@nxt-ui/cp/types';
import { css } from '@emotion/react';
import { setPageFilter } from '@nxt-ui/cp/ducks';
import { Card } from '../card';
import { useDispatch } from 'react-redux';
import { EColors } from '@nxt-ui/colors';
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

export const FormContainer = styled('div')``;

export const Container = styled('ul')<IContainerProps>`
    width: 100%;
    min-height: calc(100vh - 426px);
    box-sizing: border-box;
    ${({ mode }) => (mode === ECardView.table ? TableContainer : CardContainer)}
`;

export const RootContainer = styled('div')`
    // max-width: 1380px;
    // width: 100%;
    // max-height: 100vh;
    // height: 100%;
    // overflow-y: scroll;
    // padding: 86px 15px 65px 30px;
    // margin: auto;
    // box-sizing: border-box;
    // ::-webkit-scrollbar {
    //     width: 15px;
    //     background: #fff;
    // }

    // ::-webkit-scrollbar-thumb {
    //     background: ${EColors.black};
    // }
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
    padding: 15px 5px 0 120px;
`;

export const HeaderTitle = styled('li')`
    min-width: 80px;
    color: ${EColors.greyBorder};
    font-size: 12px;

    &:first-child {
        min-width: 320px;
    }

    &:nth-child(4),
    &:nth-child(5),
    &:nth-child(6) {
        min-width: 100px;
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
                    <Card key={card.id} mode={mode} props={card} />
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
