import {
    ItemsContainer,
    Card,
    EStatusTypes,
    ICardViewProps,
} from '@nxt-ui/cp/components';
import { getCardViewMode } from '@nxt-ui/cp/ducks';
import { ECardView } from '@nxt-ui/cp/types';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetIpbe } from '@nxt-ui/cp/hooks';
import styles from './ibpe-1.module.scss';

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

const data2: ICardViewProps = {
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
    performance: {
        title: 'Testing',
        paragraph: 'Testing',
    },
    media: {
        title: 'Testing',
        paragraph: 'Testing',
    },
};

const items = Array(10).fill(0);

export const Ibpe1: FC = () => {
    const { mode } = useSelector(getCardViewMode);

    const props = mode === ECardView.table ? data : data2;

    const cards = useGetIpbe();

    // useEffect(() => {
    //     console.log('cards', cards);
    // }, [cards]);

    return (
        <ItemsContainer mode={mode}>
            <ul
                className={`${styles['items-list-wrap']} ${
                    mode === ECardView.card ? styles['active'] : ''
                }`}
            >
                {items.map((_, i) => (
                    <Card key={i} {...data} mode={mode} props={props} />
                ))}
            </ul>
        </ItemsContainer>
    );
};
