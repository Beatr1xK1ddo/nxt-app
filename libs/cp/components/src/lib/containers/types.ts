import {IIbpeCard} from "@nxt-ui/cp/api";
import {ECardView} from "@nxt-ui/cp/types";

export type IItemsContainerProps = {
    mode: ECardView;
    page: string;
    cards: IIbpeCard[];
    total?: number;
    itemsPerPage: number;
};

export type IContainerProps = {
    mode: ECardView;
};
