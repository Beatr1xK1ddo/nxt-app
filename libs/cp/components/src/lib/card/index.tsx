import { useIpbeSocket, useThumbnailsSocket } from '@nxt-ui/cp/hooks';
import { ECardView } from '@nxt-ui/cp/types';
import { FC } from 'react';
import { CardView } from './card-view';
import { CardTable } from './table';
import { ICardProps } from './types';

export const Card: FC<ICardProps> = (props) => {
    const { mode, status, ...args } = props;

    const { data } = useIpbeSocket(args.id, args.node_id, status);

    const { data: thumbnail } = useThumbnailsSocket(args.id)

    if (mode === ECardView.card) {
        return <CardView {...args} status={data} thumbnail={thumbnail} />;
    }

    return <CardTable {...args} status={data} />;
};
