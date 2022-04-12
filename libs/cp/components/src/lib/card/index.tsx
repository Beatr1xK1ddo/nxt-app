import { FC } from 'react';
import { CardView } from './card-view';
import { CardTable } from './table';
import { ICardProps, isCardView } from './types';

export const Card: FC<ICardProps> = (props) => {
    if (isCardView(props)) {
        return <CardView {...props} />;
    }

    return <CardTable {...props} />;
};
