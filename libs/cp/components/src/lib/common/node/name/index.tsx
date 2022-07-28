import React, {FC, HTMLAttributes, useCallback} from "react";
import {useSelector} from "react-redux";
import clsx from "clsx";

import {EDataProcessingStatus, INodesListItem, NumericId} from "@nxt-ui/cp/types";
import {commonSelectors, CpRootState} from "@nxt-ui/cp-redux";

import "./index.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
    nodeId: NumericId;
}

export const NodeName: FC<Props> = ({nodeId, className, ...rest}) => {
    const node = useSelector<CpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, nodeId)
    );

    const nodeStatus = useSelector(commonSelectors.nodes.selectStatus);

    const navigateNodeEdit = useCallback(() => {
        window.open(`/node/edit/${nodeId}`);
    }, [nodeId]);

    return (
        <div className={clsx(!node?.online && "offline", className, "node-name")} {...rest} onClick={navigateNodeEdit}>
            {nodeStatus === EDataProcessingStatus.loading && "Nodes are loading ..."}
            {node ? `${node.name} (${node.hostname}) - ${node.serialNumber}` : ""}
        </div>
    );
};
