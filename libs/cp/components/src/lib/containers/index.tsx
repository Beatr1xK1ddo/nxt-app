import { FC } from 'react';
import styled from '@emotion/styled';
import { IItemsContainerProps, IContainerProps } from './types';
import { ECardView } from '@nxt-ui/cp/types';
import { css } from '@emotion/react';

const TableContainer = css`
    display: flex;
    flex-direction: 'column';
`;

const CardContainer = css`
    // column-count: 4;
`;

export const Container = styled('div')<IContainerProps>`
    width: 100%;
    box-sizing: border-box;
    ${({ mode }) => (mode === ECardView.table ? TableContainer : CardContainer)}
`;

export const RootContainer = styled('div')`
    max-width: 1352px;
    width: 100%;
    padding: 0 15px;
    padding-top: 114px;
    margin: auto;
    box-sizing: border-box;
`;

export const ItemsContainer: FC<IItemsContainerProps> = (props) => {
    const { mode, children } = props;
    return <Container mode={mode}>{children}</Container>;
};
