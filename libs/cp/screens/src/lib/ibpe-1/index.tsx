import { ItemsContainer, Card, EStatusTypes } from '@nxt-ui/cp/components';
import { ECardView } from '@nxt-ui/cp/types';
import { FC } from 'react';
import img from './img.png';

const data = {
    info: {
        title: 'TimesNow_Zoom_Backup',
        text: 'Onboarding Process ** TIMES Network INDIA Secondary (smc-ubuntu20-server2) - X837256',
        image: img,
    },
    status: {
        status: EStatusTypes.active,
    },
    runtime: '08h 41m',
    input: {
        idx: '3',
        format: '1080i59.94',
    },
    bitrate: {
        mbps: '6 Mbps',
        kbps: '128kbps',
    },
    destination: '239.0.0.4:1234',
};

export const Ibpe1: FC = () => {
    const items = Array(10).fill(0);

    return (
        <ItemsContainer mode={ECardView.table}>
            <ul>
                {items.map((_, i) => (
                    <Card {...data} />
                ))}
            </ul>
        </ItemsContainer>
    );
};
