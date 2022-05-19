import React, {FC, HTMLAttributes} from "react";
import {useSelector} from "react-redux";
import clsx from "clsx";

import {INodesListItem, NumericId} from "@nxt-ui/cp/types";
import {commonSelectors, CpRootState} from "@nxt-ui/cp-redux";

import "./index.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
    nodeId: NumericId;
}

const NodeName: FC<Props> = ({nodeId, className, ...rest}) => {
    const node = useSelector<CpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, nodeId)
    );

    return (
        <div className={clsx(!node?.online && "offline", className)} {...rest}>
            {node ? `${node.name} (${node.hostname}) - ${node.serialNumber}` : ""}
        </div>
    );
};

export default NodeName;
