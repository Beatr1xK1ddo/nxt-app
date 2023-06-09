import {useRealtimeNodeData} from "@nxt-ui/cp/hooks";
import {FC, useCallback, useEffect, useMemo} from "react";
import {INodesListItem, Optional} from "@nxt-ui/cp/types";
import {memoryFormatter} from "@nxt-ui/cp/utils";
import {commonActions, commonSelectors, ICpRootState} from "@nxt-ui/cp-redux";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@nxt-ui/components";
import styled from "@emotion/styled";
import {Icon} from "@nxt-ui/icons";
import {useNavigate} from "react-router-dom";
import clsx from "clsx";

type ComponentProps = {
    nodeId: Optional<number>;
    appId: Optional<number>;
};

const ServerLoginTooltipHolder = styled.div`
    width: 17.5rem;
    color: var(--pale-str);
    padding: 0.25rem 0.5rem 0.75rem;
    .tooltip-flex-holder {
        display: flex;
        align-items: center;
        justify-content: space-between;
        > button {
            color: var(--action);
            width: 1rem;
            height: 1rem;
            padding: 0;
            flex-grow: 0;
        }
    }
`;

const TooltipFlexHolder = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 0.875rem;
    font-size: var(--fz);
    a {
        cursor: pointer;
    }
    > div {
        p {
            margin: 0;
        }
        span {
            font-size: calc(var(--fz) - 0.25rem);
            color: var(--grey-light);
        }
    }
    .ssh-link {
        font-size: calc(var(--fz) - 0.125rem);
        color: var(--pale-str);
    }

    > button {
        color: var(--action);
        width: 1rem !important;
        height: 1rem !important;
        padding: 0 !important;
        flex-grow: 0import { useNavigate } from 'react-router-dom';
        margin-left: 0;
    }
`;

const ServerTooltipStat = styled.ul`
    text-align: center;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .warning-cpu {
        color: var(--caution);
    }
    .danger-cpu {
        color: var(--danger);
    }
    li {
        font-size: calc(var(--fz) - 0.25rem);
        line-height: 1.35;
        display: inline-block;
        vertical-align: top;
        width: calc(100% / 3);
        color: var(--pale-str);
        padding: 0 0.25rem;
        margin: 0 0 0.75rem;

        > span {
            font-size: calc(var(--fz) - 0.375rem);
            color: var(--accent);
            font-weight: 300;
            display: block;
            text-transform: uppercase;
        }
        strong {
            font-weight: 600;

            & > span {
                display: block;
            }
        }
    }
`;

const ButtonsList = styled.ul`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    li {
        margin: 0 0.25rem 0.25rem 0;
        vertical-align: top;
        a {
            white-space: nowrap;
            font-size: calc(var(--fz) - 0.31rem);
            text-align: center;
            font-weight: 600;
            text-decoration: none;
            border-radius: 0.25rem;
            padding: 0.125rem 0.23rem;
            color: var(--pale-str);
            border: 0.125rem solid var(--pale-str);
            &:hover {
                box-shadow: 0 0 0.1875rem rgba(255, 255, 255, 0.87);
            }
        }
    }
`;

export const ServerLoginTooltip: FC<ComponentProps> = ({nodeId, appId}) => {
    const {systemState, governorMode, coresCount} = useRealtimeNodeData(nodeId);

    const dispatch = useDispatch();

    const node = useSelector<ICpRootState, INodesListItem | undefined>((state) =>
        commonSelectors.nodes.selectById(state, nodeId)
    );
    const user = useSelector(commonSelectors.user.user);

    const navigate = useNavigate();

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

    // const goEditPage = useCallback(() => {
    //     navigate(`/ipbe/${appId}`);
    // }, [navigate, appId]);

    return (
        <ServerLoginTooltipHolder>
            <TooltipFlexHolder>
                <div>
                    <p>{node?.hostname || ""}</p>
                    <span>Code: {node?.digitCode || ""}</span>
                </div>
                {/* <Button data-type="btn-icon" onClick={goEditPage}>
                    <Icon name="edit" />
                </Button> */}
            </TooltipFlexHolder>
            <ServerTooltipStat>
                <li>
                    <span>Cpu: </span>
                    <strong>
                        <span
                            className={clsx(
                                systemState.cpu > 70 && systemState.cpu < 90 && "warning-cpu",
                                systemState.cpu > 90 && "danger-cpu"
                            )}>{`${systemState.cpu}%`}</span>
                        <span className="nowrap">{`(${governorMode})`}</span>
                    </strong>
                </li>
                <li>
                    <span>Load Average: </span>
                    <strong>
                        <span className="nowrap">{`${systemState.loadAverage}`}</span>
                        <span className="nowrap">{`(cores: ${coresCount})`}</span>
                    </strong>
                </li>
                <li>
                    <span>Memory: </span>
                    <strong>
                        <span className="nowrap">{`${((systemState.memoryUsed / systemState.memoryTotal) * 100).toFixed(
                            2
                        )}%`}</span>
                        <span className="nowrap">{`(total: ${memoryFormatter(systemState.memoryUsed)})`}</span>
                    </strong>
                </li>
            </ServerTooltipStat>
            <TooltipFlexHolder>
                <div style={{display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center"}}>
                    {linkSsh && (
                        <>
                            <a className="ssh-link" onClick={handleCopySsh}>
                                {linkSsh}
                            </a>
                            <Button data-type="btn-icon" onClick={handleCopySsh}>
                                <Icon name="copy" />
                            </Button>
                        </>
                    )}
                </div>
            </TooltipFlexHolder>
            <ButtonsList>
                <li>{centralLogin && <a href={centralLogin}>Central login</a>}</li>
                <li>
                    <a href={`${window.location.origin}/node/dashboard/${nodeId}`}>Application dashboard</a>
                </li>
                <li>
                    {nodeConnection && (
                        <a href={nodeConnection} className={nodeConnection}>
                            Connect to node
                        </a>
                    )}
                </li>
            </ButtonsList>
            <div style={{cursor: "pointer"}}></div>
        </ServerLoginTooltipHolder>
    );
};
