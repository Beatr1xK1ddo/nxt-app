import { FC } from 'react';
import styled from '@emotion/styled';
import { IItemsContainerProps, IContainerProps } from './types';
import { ECardView } from '@nxt-ui/cp/types';

export const Container = styled('div')<IContainerProps>`
    max-width: 1352px;
    width: 100%;
    padding: 0 16px;
    margin: auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: ${({ mode }) =>
        mode === ECardView.table ? 'column' : 'row'};
`;

export const ItemsContainer: FC<IItemsContainerProps> = (props) => {
    const { mode, children } = props;
    return <Container mode={mode}>{children}</Container>;
};
