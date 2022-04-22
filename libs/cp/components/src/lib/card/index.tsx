import { IRedisClientEvent, useIpbeSocket } from '@nxt-ui/cp/hooks';
import { ECardView } from '@nxt-ui/cp/types';
import { FC, useState, useEffect } from 'react';
import { CardView } from './card-view';
import { CardTable } from './table';
import { ICardProps } from './types';
import { EStatusTypes } from '@nxt-ui/cp/api';
import { isIRealtimeAppStatusEvent } from '@nxt-ui/cp/utils';

export const Card: FC<ICardProps> = (props) => {
    const { mode, status, ...args } = props;

    const [statusState, setStatus] = useState<EStatusTypes>(status);

    const { socket, data } = useIpbeSocket();

    useEffect(() => {
        const event: IRedisClientEvent = {
            id: args.id.toString(),
            nodeId: parseInt(args.node_id),
        };
        socket.emit('subscribe', event);
    }, [])

    useEffect(() => {
        if (data && isIRealtimeAppStatusEvent(data)) {
            if (parseInt(data.id) === args.id) {
                setStatus(data.status);
            }            
        }
    }, [data]);

    if (mode === ECardView.card) {
        return <CardView {...args} status={statusState} />;
    }

    return <CardTable {...args} status={statusState} />;
};
