import {EIpbeListViewMode} from "@nxt-ui/cp/types";
import {IIpbeListApiItem} from "@nxt-ui/cp/api";
import {IpbeRowItem} from "./list";
import {IpbeCardItem} from "./card";

interface IpbeItemProps {
    mode: EIpbeListViewMode;
    item: IIpbeListApiItem;
}

export const IpbeItem = ({item, mode}: IpbeItemProps) => {
    //todo fix inferred type
    if (mode === EIpbeListViewMode.card) {
        return <IpbeCardItem item={item} />;
    } else {
        return <IpbeRowItem item={item} />;
    }
};
