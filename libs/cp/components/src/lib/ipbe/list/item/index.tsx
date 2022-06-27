import {EListViewMode, IIpbeListItem} from "@nxt-ui/cp/types";
import {IpbeRowItem} from "./row";
import {IpbeCardItem} from "./card";

interface IpbeListItemProps {
    mode: EListViewMode;
    item: IIpbeListItem;
}

export const IpbeListItem = ({item, mode}: IpbeListItemProps) => {
    if (mode === EListViewMode.card) {
        return <IpbeCardItem ipbe={item} />;
    } else {
        return <IpbeRowItem ipbe={item} />;
    }
};
