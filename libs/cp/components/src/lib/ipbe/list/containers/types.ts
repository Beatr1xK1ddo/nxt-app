import {EListViewMode} from "@nxt-ui/cp/types";

export type IItemsContainerProps = {
    page: string;
    total?: number;
    itemsPerPage: number;
};

export type IContainerProps = {
    mode: EListViewMode;
};
