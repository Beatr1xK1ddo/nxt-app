import {EListViewMode} from "@nxt-ui/cp/types";
import {TxrRowItem} from "./row";
import {TxrCardItem} from "./card";

interface TxrListItemProps {
    mode: EListViewMode;
    item: any;
}

export const TxrListItem = ({item, mode}: TxrListItemProps) => {
    if (mode === EListViewMode.card) {
        return <TxrCardItem txr={item} />;
    } else {
        return <TxrRowItem ipbe={item} />;
    }
};
