import {EListViewMode} from "@nxt-ui/cp/types";
import {TxrRowItem} from "./row";
import {TxrCardItem} from "./card";

interface IpbeListItemProps {
    mode: EListViewMode;
    item: any;
}

export const TxrListItem = ({item, mode}: IpbeListItemProps) => {
    if (mode === EListViewMode.card) {
        return <TxrCardItem ipbe={item} />;
    } else {
        return <TxrRowItem ipbe={item} />;
    }
};
