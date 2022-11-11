import {useRealtimeNodeData} from "@nxt-ui/cp/hooks";
import {FC, useCallback, useMemo} from "react";
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
    const user = useSelector(commonSelectors.user.user);

    const centralLogin = useMemo(() => {
        if (user?.centralServerUser && node?.rsshPort) {
            const ip = user?.centralServerIp;
            const curUser = user?.centralServerUser;
            return `ssh://${curUser}@${ip}`;
        }
        return "";
    }, [user, node]);

    const linkSsh = useMemo(() => {
        if (user?.rsshUser && node?.rsshPort) {
            const userName = node.type === "adroid" ? "root" : user.rsshUser;
            const port = node.rsshPort;
            return `ssh ${userName}@localhost -p ${port}`;
        }
        return "";
    }, [user, node]);

    const nodeConnection = useMemo(() => {
        if (node?.isLocalInterface && node.remoteAddr) {
            const user = node?.adminUser ? node.adminUser : "root";
            const addr = node.remoteAddr;
            const port = node?.sshPublicPort ? node.sshPublicPort : 22;
            return `ssh://${user}@${addr}:${port}`;
        }
        return "";
    }, [node]);

    const handleCopySsh = useCallback(() => {
        const type = "text/plain";
        const blob = new Blob([linkSsh], {type});
        const data = new ClipboardItem({[type]: blob});
        //@ts-ignore
        dispatch(commonActions.notificationsActions.add({message: "Copy!", duration: 1000}));
        return navigator.clipboard.write([data]);
    }, [dispatch, linkSsh]);

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
                {centralLogin && (
                    <a href={centralLogin} className="ssh-link">
                        central login
                    </a>
                )}
            </p>
            <p>
                {linkSsh && (
                    <a className="ssh-link" onClick={handleCopySsh}>
                        {linkSsh}
                    </a>
                )}
            </p>
            <p>
                {nodeConnection && (
                    <a href={nodeConnection} className={nodeConnection}>
                        connect to node
                    </a>
                )}
            </p>
            <p>
                <a href={`https://qa.nextologies.com/node/dashboard/${nodeId}`} className="ssh-link">
                    application dashboard
                </a>
            </p>
            <div style={{cursor: "pointer"}}></div>
        </div>
    );
};
