import {IIpbeCard} from "@nxt-ui/cp/api";
import {EIpbeListViewMode, EAppGeneralStatus} from "@nxt-ui/cp/types";

export type ICardInput = {
    idx: string;
    format: string;
};

export type ICardBitrate = {
    mbps: string;
    kbps: string;
};

export type ICardProps = IIpbeCard & {
    mode: EIpbeListViewMode;
    status: EAppGeneralStatus;
};
