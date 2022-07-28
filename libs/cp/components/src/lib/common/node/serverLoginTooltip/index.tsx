import {useRealtimeNodeData} from "@nxt-ui/cp/hooks";
import {FC, useCallback} from "react";
import {Optional} from "@nxt-ui/cp/types";
import {memoryFormatter} from "@nxt-ui/cp/utils";
import "./index.css";

type ComponentProps = {
    hostname?: string;
    digitCode?: string;
    nodeId: Optional<number>;
};

export const ServerLoginTooltip: FC<ComponentProps> = ({hostname, digitCode, nodeId}) => {
    const {systemState, governorMode, coresCount} = useRealtimeNodeData(nodeId);

    const handleCopySsh = useCallback(() => {
        const type = "text/plain";
        const blob = new Blob(["ssh://glebn@s2.nextologies.com"], {type});
        const data = new ClipboardItem({[type]: blob});
        return navigator.clipboard.write([data]);
    }, []);

    return (
        <div>
            <p className="heading">{hostname || ""}</p>
            <dl>
                <dt>Code:</dt>
                <dd>{digitCode || ""}</dd>
            </dl>
            <div className="server-tooltip-stat">
                <div>
                    <span>Cpu: </span>
                    <strong>{`${systemState.cpu}% (${governorMode})`}</strong>
                </div>
                <div>
                    <span>Load Average: </span>
                    <strong>{`${systemState.loadAverage} (CPU cores: ${coresCount})`}</strong>
                </div>
                <div>
                    <span>Memory: </span>
                    <strong>
                        {`${memoryFormatter(systemState.memoryUsed)}/${memoryFormatter(systemState.memoryTotal)}`}
                    </strong>
                </div>
            </div>
            <p>
                <a href="ssh://glebn@s2.nextologies.com" className="ssh-link">
                    ssh://glebn@s2.nextologies.com
                </a>
            </p>
            <div onClick={handleCopySsh} style={{cursor: "pointer"}}>
                Copy ssh
            </div>
        </div>
    );
};
