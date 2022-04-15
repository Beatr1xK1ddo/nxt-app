import { IIbpeCard } from '@nxt-ui/cp/api';
import { ECardView } from '@nxt-ui/cp/types';
import { ICardAccordionTitleProps } from './card-view/types';
import { IStatusProps } from './status/types';
import { ICardTableInfoProps } from './table/info/types';

export type ICardInput = {
    idx: string;
    format: string;
};

export type ICardBitrate = {
    mbps: string;
    kbps: string;
};

export type ICardTableProps = {
    info: ICardTableInfoProps;
    status: IStatusProps;
    runtime: string;
    input: ICardInput;
    bitrate: ICardBitrate;
    destination: string;
};

export type ICardViewProps = ICardTableProps & {
    performance: ICardAccordionTitleProps;
    media: ICardAccordionTitleProps;
};

export type ICardProps = {
    mode: ECardView;
    props: IIbpeCard;
};
