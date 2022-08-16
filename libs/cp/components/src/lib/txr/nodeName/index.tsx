import React, {FC, HTMLAttributes, useMemo} from "react";

import {BasicNodeApplication, NumericId, TxrBasicApplication} from "@nxt-ui/cp/types";

import {AppNodeName} from "../../common/application/nodeName";

interface Props extends HTMLAttributes<HTMLDivElement> {
    node: "tx" | "rx";
    app: TxrBasicApplication;
    clickable?: boolean;
}

export const TxrNodeName: FC<Props> = ({node, app, ...rest}) => {
    const nodeId: NumericId = useMemo(() => {
        return node === "tx" ? app.txNodeId : app.rxNodeId;
    }, [node, app]);

    const basicApp: BasicNodeApplication = useMemo(() => {
        const txr = {
            id: app.id,
            type: app.type,
            status: app.status,
            statusChange: app.statusChange,
            startedAtMs: app.startedAtMs,
            company: app.company,
        };
        return node === "tx"
            ? {
                  ...txr,
                  nodeId: app.txNodeId,
                  nodeName: app.txNodeText,
              }
            : {
                  ...txr,
                  nodeId: app.rxNodeId,
                  nodeName: app.rxNodeText,
              };
    }, [node, app]);

    return <AppNodeName nodeId={nodeId} app={basicApp} {...rest} />;
};
