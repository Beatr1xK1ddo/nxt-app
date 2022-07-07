import {EListViewMode, IpbeListItemProps} from "@nxt-ui/cp/types";
import {IpbeRowItem} from "./row";
import {IpbeCardItem} from "./card";
import {useRealtimeAppData, useStatusChangeNotification} from "@nxt-ui/cp/hooks";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {ipbeListActions} from "@nxt-ui/cp-redux";

export const IpbeListItem = ({item, mode}: IpbeListItemProps) => {
    const dispatch = useDispatch();
    const {status, runTime} = useRealtimeAppData(item.node, "ipbe2", item.id, item.startedAtMs);

    const {currentStatus} = useStatusChangeNotification(item.name, item.status, status);

    useEffect(() => {
        if (status) {
            dispatch(ipbeListActions.setIpbeItemStatus({id: item.id, status}));
        }
    }, [status]);

    if (mode === EListViewMode.card) {
        return <IpbeCardItem ipbe={item} status={currentStatus} runTime={runTime} />;
    } else {
        return <IpbeRowItem ipbe={item} status={currentStatus} runTime={runTime} />;
    }
};
