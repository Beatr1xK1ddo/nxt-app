import { ECardView } from '@nxt-ui/cp/types';
import { FC } from 'react';
import { CardView } from './card-view';
import { CardTable } from './table';
import { ICardProps } from './types';

export const Card: FC<ICardProps> = (props) => {
    const { mode, props: viewProps } = props;

    if (mode === ECardView.card) {
        return <CardView {...viewProps} />;
    }

    return <CardTable {...viewProps} />;
};
