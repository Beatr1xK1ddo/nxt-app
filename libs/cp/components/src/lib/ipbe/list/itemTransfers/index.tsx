import {EIpbeListViewMode, IIpbeListItem} from "@nxt-ui/cp/types";
import {IpbeRowItem} from "./row";
import {IpbeCardItem} from "./card";

interface IpbeListItemProps {
    mode: EIpbeListViewMode;
    item: IIpbeListItem;
}

export const IpbeTransfersListItem = ({item, mode}: IpbeListItemProps) => {
    if (mode === EIpbeListViewMode.card) {
        return <IpbeCardItem ipbe={item} />;
    } else {
        return <IpbeRowItem ipbe={item} />;
    }
};
