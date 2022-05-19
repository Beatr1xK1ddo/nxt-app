import {EIpbeListViewMode, IIpbeListItem} from "@nxt-ui/cp/types";
import {IpbeRowItem} from "./row";
import {IpbeCardItem} from "./card";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";

interface IpbeListItemProps {
    mode: EIpbeListViewMode;
    item: IIpbeListItem;
}

export const IpbeListItem = ({item, mode}: IpbeListItemProps) => {
    const {status: appStatus, startedAt} = useRealtimeAppData(
        item.node,
        "ipbe",
        item.id,
        item.status,
        item.startedAtMs
    );

    if (mode === EIpbeListViewMode.card) {
        return <IpbeCardItem item={item} appStatus={appStatus} startedAt={startedAt} />;
    } else {
        return <IpbeRowItem item={item} status={appStatus} startedAt={startedAt} />;
    }
};
