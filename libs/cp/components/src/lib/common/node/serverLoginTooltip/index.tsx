import {useRealtimeNodeData} from "@nxt-ui/cp/hooks";
import {FC, useCallback} from "react";
import {INodesListItem, Optional} from "@nxt-ui/cp/types";
import {memoryFormatter} from "@nxt-ui/cp/utils";
import "./index.css";
import {commonActions, commonSelectors, ICpRootState} from "@nxt-ui/cp-redux";
import {useDispatch, useSelector} from "react-redux";

type ComponentProps = {
    nodeId: Optional<number>;
};

export const ServerLoginTooltip: FC<ComponentProps> = ({nodeId}) => {
    const {systemState, governorMode, coresCount} = useRealtimeNodeData(nodeId);
    const dispatch = useDispatch();

    const node = useSelector<ICpRootState, INodesListItem | undefined>((state) =>
        commonSelectors.nodes.selectById(state, nodeId)
    );

    const handleCopySsh = useCallback(() => {
        const type = "text/plain";
        const blob = new Blob(["ssh nxta@localhost -p 40836"], {type});
        const data = new ClipboardItem({[type]: blob});
        //@ts-ignore
        dispatch(commonActions.notificationsActions.add({message: "Copy!", duration: 1000}));
        return navigator.clipboard.write([data]);
    }, [dispatch]);

    return (
        <div className="serverLoginTooltip">
            <p className="heading">{node?.hostname || ""}</p>
            <div>
                <span>Code: </span>
                <strong>{node?.digitCode || ""}</strong>
            </div>
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
                    central login
                </a>
            </p>
            <p>
                <a className="ssh-link" onClick={handleCopySsh}>
                    ssh nxta@localhost -p 40836
                </a>
            </p>
            <p>
                <a href={`https://qa.nextologies.com/node/dashboard/${nodeId}`} className="ssh-link">
                    Application dashboard
                </a>
            </p>
            <div style={{cursor: "pointer"}}></div>
        </div>
    );
};
