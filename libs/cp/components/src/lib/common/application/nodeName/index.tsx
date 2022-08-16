import React, {FC, HTMLAttributes, useCallback, useMemo} from "react";
import {useSelector} from "react-redux";
import clsx from "clsx";

import {BasicNodeApplication, INodesListItem, NumericId} from "@nxt-ui/cp/types";
import {commonSelectors, CpRootState} from "@nxt-ui/cp-redux";

import "./index.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
    nodeId: NumericId;
    app: BasicNodeApplication;
    clickable?: boolean;
}

export const AppNodeName: FC<Props> = ({nodeId, app, clickable = true, className, ...rest}) => {
    const node = useSelector<CpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, nodeId)
    );

    const navigateNodeEdit = useCallback(() => {
        clickable && window.open(`/node/edit/${nodeId}`);
    }, [nodeId, clickable]);

    const nodeName = useMemo(() => {
        return node ? `${node.name} (${node.hostname}) - ${node.serialNumber}` : app.nodeName;
    }, [app.nodeName, node]);

    return (
        <div
            className={clsx(node && !node?.online && "offline", className, "node-name")}
            {...rest}
            onClick={navigateNodeEdit}>
            {nodeName}
        </div>
    );
};
