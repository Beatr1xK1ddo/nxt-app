import { FC, useEffect } from 'react';
import styled from '@emotion/styled';
import { IItemsContainerProps, IContainerProps } from './types';
import { ECardView } from '@nxt-ui/cp/types';
import { css } from '@emotion/react';
import { useGetIpbe } from '@nxt-ui/cp/hooks';
import { setFilter } from '@nxt-ui/cp/ducks';
import { Card } from '../card';
import { useSearchParams } from 'react-router-dom';
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
`;

export const Container = styled('ul')<IContainerProps>`
    width: 100%;
    box-sizing: border-box;
    ${({ mode }) => (mode === ECardView.table ? TableContainer : CardContainer)}
`;

export const RootContainer = styled('div')`
    max-width: 1380px;
    width: 100%;
    max-height: 100vh;
    height: 100%;
    overflow-y: scroll;
    padding: 114px 15px 65px 30px;
    margin: auto;
    box-sizing: border-box;
    ::-webkit-scrollbar {
        width: 15px;
        background: #fff;
    }

    ::-webkit-scrollbar-thumb {
        background: ${EColors.black};
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
    const { data: cards } = useGetIpbe();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setFilter(searchParams));
    }, []);

    const { mode } = props;
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
                {cards?.data.map((card) => (
                    <Card key={card.id} mode={mode} props={card} />
                ))}
            </Container>
            <PaginationContainer>
                <PaginationComponent />
            </PaginationContainer>
        </>
    );
};
