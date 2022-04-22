import { EStatusTypes, IIbpeCard } from '@nxt-ui/cp/api';
import { ECardView } from '@nxt-ui/cp/types';

export type ICardInput = {
    idx: string;
    format: string;
};

export type ICardBitrate = {
    mbps: string;
    kbps: string;
};

export type ICardProps = IIbpeCard & {
    mode: ECardView;
    status: EStatusTypes;
};
