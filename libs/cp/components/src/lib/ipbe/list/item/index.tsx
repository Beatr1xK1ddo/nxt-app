import {EListViewMode, IpbeListItemProps} from "@nxt-ui/cp/types";
import {IpbeRowItem} from "./row";
import {IpbeCardItem} from "./card";

export const IpbeListItem = ({item, mode}: IpbeListItemProps) => {
    if (mode === EListViewMode.card) {
        return <IpbeCardItem ipbe={item} />;
    } else {
        return <IpbeRowItem ipbe={item} />;
    }
};
