import {EIpbeListViewMode} from "@nxt-ui/cp/types";
import {IIpbeListApiItem} from "@nxt-ui/cp/api";
import {IpbeRowItem} from "./list";
import {IpbeCardItem} from "./card";
import {useRealtimeAppData} from "@nxt-ui/cp/hooks";

interface IpbeItemProps {
    mode: EIpbeListViewMode;
    item: IIpbeListApiItem;
}

export const IpbeItem = ({item, mode}: IpbeItemProps) => {
    const {status: appStatus, startedAt} = useRealtimeAppData(item.node, "ipbe", item.id, item.status, item.startedAtMs);

    if (mode === EIpbeListViewMode.card) {
        return <IpbeCardItem item={item} appStatus={appStatus} startedAt={startedAt} />;
    } else {
        return <IpbeRowItem item={item} status={appStatus} startedAt={startedAt} />;
    }
};
