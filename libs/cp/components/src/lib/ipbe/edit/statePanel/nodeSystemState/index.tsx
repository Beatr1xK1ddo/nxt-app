import React from "react";
import {useSelector} from "react-redux";

import {memoryFormatter} from "@nxt-ui/cp/utils";
import {ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {useRealtimeNodeData} from "@nxt-ui/cp/hooks";

import "./index.css";

const NodeSystemState = () => {
    const nodeId = useSelector(ipbeEditSelectors.main.node);
    const {systemState, governorMode, coresCount} = useRealtimeNodeData(nodeId);

    return (
        <>
            <div>
                <span>Cpu (Governor mode)</span>
                <strong>{`${systemState.cpu}% (${governorMode})`}</strong>
            </div>
            <div>
                <span>Load Average</span>
                <strong>{`${systemState.loadAverage} (CPU cores: ${coresCount})`}</strong>
            </div>
            <div>
                <span>Memory</span>
                <strong>
                    {`${memoryFormatter(systemState.memoryUsed)}/${memoryFormatter(systemState.memoryTotal)}`}
                </strong>
            </div>
        </>
    );
};

export default NodeSystemState;
