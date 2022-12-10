import React, {FC, HTMLAttributes, useCallback, useMemo} from "react";
import {useSelector} from "react-redux";
import clsx from "clsx";

import {EDataProcessingStatus, INodesListItem, NumericId} from "@nxt-ui/cp/types";
import {commonSelectors, CpRootState} from "@nxt-ui/cp-redux";

import "./index.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
    nodeId: NumericId;
    clickable?: boolean;
}

export const NodeName: FC<Props> = ({nodeId, className, clickable = true, ...rest}) => {
    const node = useSelector<CpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, nodeId)
    );

    const nodeStatus = useSelector(commonSelectors.nodes.selectStatus);

    const path = useMemo(() => (node ? `${node.name} (${node.hostname}) - ${node.serialNumber}` : ""), [node]);

    return (
        <div className={clsx(!node?.online && "offline", className, "node-name")} {...rest}>
            {nodeStatus === EDataProcessingStatus.loading && "Nodes are loading ..."}
            {clickable ? <a href={`https://qa.nextologies.com/node/edit/${nodeId}`}>{path}</a> : path}
        </div>
    );
};
