import { IStatusProps } from "./status/types";
import { ICardTableInfoProps } from "./table/info/types"

export type ICardInput = {
    idx: string;
    format: string;
}

export type ICardBitrate = {
    mbps: string;
    kbps: string;
}

export type ICardTableProps = {
    info: ICardTableInfoProps;
    status: IStatusProps;
    runtime: string;
    input: ICardInput;
    bitrate: ICardBitrate;
    destination: string;
}