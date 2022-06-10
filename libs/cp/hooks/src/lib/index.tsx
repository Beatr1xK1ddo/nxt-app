import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {formatDistance} from "date-fns";
import {v4} from "uuid";

import {
    EAppGeneralStatus,
    ENotificationType,
    IBitrateMonitoring,
    INodesListItem,
    IRealtimeAppEvent,
    IRealtimeNodeEvent,
    ISdiValues,
    NodeSystemState,
    NumericId,
} from "@nxt-ui/cp/types";
import {
    bitrateFormatter,
    isIRealtimeAppStatusEvent,
    isIRealtimeAppTimingEvent,
    isIRealtimeNodePingEvent,
    isIRealtimeNodeStatusEvent,
    isIRealtimeNodeSystemStateEvent,
    sdiDeviceMapper,
} from "@nxt-ui/cp/utils";
import {RealtimeServicesSocketFactory} from "@nxt-ui/shared/utils";
import {commonActions, commonSelectors, CpRootState, ipbeEditActions} from "@nxt-ui/cp-redux";

export function useRealtimeAppData(
    nodeId: null | undefined | NumericId,
    appType: string,
    appId: null | undefined | NumericId,
    initialStatus: EAppGeneralStatus,
    initialStartedAt: null | number
) {
    const serviceSocketRef = useRef(
        RealtimeServicesSocketFactory.server("https://qa.nextologies.com:1987/").namespace("/redis")
    );
    const [connected, setConnected] = useState<boolean>(false);
    const [status, setStatus] = useState<EAppGeneralStatus>(initialStatus);
    const [startedAt, setStartedAt] = useState<null | number>(initialStartedAt);

    useEffect(() => {
        if (nodeId && appId) {
            serviceSocketRef.current.emit("subscribeApp", {nodeId, appId, appType});
            serviceSocketRef.current.on("connect", () => setConnected(true));
            serviceSocketRef.current.on("error", () => setConnected(false));
            serviceSocketRef.current.on("realtimeAppData", (event: IRealtimeAppEvent) => {
                if (event.id === appId) {
                    if (isIRealtimeAppStatusEvent(event)) {
                        setStatus(event.status);
                    }
                    if (isIRealtimeAppTimingEvent(event)) {
                        setStartedAt(event.startedAt);
                    }
                }
            });
        } else {
            setStatus(EAppGeneralStatus.new);
            setStartedAt(null);
        }
        return () => {
            if (serviceSocketRef.current) {
                serviceSocketRef.current.emit("unsubscribeApp", {appId, nodeId, appType: "ipbe"});
                RealtimeServicesSocketFactory.server("https://qa.nextologies.com:1987/").cleanup("/redis");
            }
        };
    }, [appId, appType, nodeId]);

    const runTime = useMemo(() => {
        if (status === EAppGeneralStatus.active && startedAt) {
            return formatDistance(startedAt, new Date(), {addSuffix: false});
        } else {
            return "not available";
        }
    }, [status, startedAt]);

    return {connected, status, startedAt, runTime};
}

export function useRealtimeNodeData(nodeId?: number) {
    const serviceSocketRef = useRef(
        RealtimeServicesSocketFactory.server("https://qa.nextologies.com:1987/").namespace("/redis")
    );

    const node = useSelector<CpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, nodeId)
    );

    const [connected, setConnected] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(node?.online || false);
    const [systemState, setSystemState] = useState<NodeSystemState>({
        cpu: 0,
        loadAverage: 0,
        memoryTotal: 0,
        memoryUsed: 0,
    });
    const [governorMode, setGovernorMode] = useState<string>("unknown");
    const [coresCount, setCoresCount] = useState<number | string>("unknown");
    const [lastPing, setLastPing] = useState<number>(0);

    useEffect(() => {
        if (node) {
            setSystemState({
                cpu: node.cpuLoad,
                loadAverage: node.cpuLoadAverage,
                memoryTotal: node.ramTotal,
                memoryUsed: node.ramUsed,
            });
            setGovernorMode(node.cpuGovernorMode);
            setCoresCount(node.cpuCoresCount);
        } else {
            setSystemState({cpu: 0, loadAverage: 0, memoryTotal: 0, memoryUsed: 0});
        }
    }, [node]);

    useEffect(() => {
        serviceSocketRef.current.emit("subscribeNode", {type: "status", nodeId});
        serviceSocketRef.current.on("connect", () => setConnected(true));
        serviceSocketRef.current.on("error", () => setConnected(false));
        serviceSocketRef.current.on("realtimeNodeData", (event: IRealtimeNodeEvent) => {
            if (event.id === nodeId) {
                if (isIRealtimeNodeStatusEvent(event)) {
                    setStatus(event.online);
                }
                if (isIRealtimeNodeSystemStateEvent(event)) {
                    const {id, type, ...systemState} = event;
                    setSystemState(systemState);
                }
                if (isIRealtimeNodePingEvent(event)) {
                    setLastPing(event.lastPing);
                }
            }
        });
        return () => {
            if (serviceSocketRef.current) {
                serviceSocketRef.current.emit("unsubscribeNode", {type: "status", nodeId});
                RealtimeServicesSocketFactory.server("https://qa.nextologies.com:1987/").cleanup("/redis");
            }
        };
    }, [nodeId]);

    return {connected, status, systemState, governorMode, coresCount, lastPing};
}

export function useRealtimeMonitoring(
    nodeId: NumericId,
    ip: string,
    port: null | number
): [data: null | IBitrateMonitoring, bitrate: string] {
    const [monitoringData, setMonitoringData] = useState<null | IBitrateMonitoring>(null);

    useEffect(() => {
        const fetchData = async (nodeId: NumericId, ip: string, port: number, update?: boolean) => {
            try {
                const url = new URL("https://cp.nextologies.com/monitor/stream-graph-v3");
                url.searchParams.set("id", nodeId.toString(10));
                url.searchParams.set("ip", ip);
                url.searchParams.set("port", port.toString(10));
                if (update) {
                    url.searchParams.set("lastKey", "2");
                }
                const response = await fetch(url.toString(), {
                    method: "POST",
                });
                const data: IBitrateMonitoring = await response.json();
                setMonitoringData(data);
                return true;
            } catch (e) {
                console.log("monitoring data fetch failure:", e);
                setMonitoringData(null);
                return false;
            }
        };

        if (nodeId && ip && port) {
            fetchData(nodeId, ip, port);
            const intervalId = setInterval(() => fetchData(nodeId, ip, port, true), 1000);
            return () => {
                clearInterval(intervalId);
            };
        }
        return () => {
            //NOP
        };
    }, [nodeId, ip, port]);

    const lastBitrateValue = useMemo(() => {
        const lastItem = monitoringData?.data[monitoringData?.data.length - 1];
        if (lastItem) {
            return bitrateFormatter(lastItem.bitrate, 0);
        } else {
            return "0kbps";
        }
    }, [monitoringData]);

    return [monitoringData, lastBitrateValue];
}

export function useNodesList(appType?: string) {
    const serviceSocketRef = useRef(
        RealtimeServicesSocketFactory.server("https://qa.nextologies.com:1987/").namespace("/redis")
    );

    const dispatch = useDispatch();
    const nodesIds = useSelector(commonSelectors.nodes.selectIds);

    const [connected, setConnected] = useState<boolean>(false);

    useEffect(() => {
        dispatch(commonActions.nodesActions.fetchNodes(appType));
    }, [dispatch, appType]);

    useEffect(() => {
        if (nodesIds && nodesIds.length) {
            serviceSocketRef.current.emit("subscribeNode", {type: "status", nodeId: nodesIds});
            serviceSocketRef.current.on("connect", () => setConnected(true));
            serviceSocketRef.current.on("error", () => setConnected(false));
            serviceSocketRef.current.on("realtimeNodeData", (event: IRealtimeNodeEvent) => {
                if (isIRealtimeNodeStatusEvent(event)) {
                    dispatch(commonActions.nodesActions.setNodeStatus(event));
                }
            });
        }
        return () => {
            if (serviceSocketRef.current) {
                serviceSocketRef.current.emit("unsubscribeNode", {type: "status", nodeId: nodesIds});
                RealtimeServicesSocketFactory.server("https://qa.nextologies.com:1987/").cleanup("/redis");
            }
        };
    }, [dispatch, nodesIds]);

    return {connected};
}

export function useCompaniesList(appType?: string) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(commonActions.companiesActions.fetchCompanies(appType));
    }, [dispatch, appType]);
}

export function useSDIDeviceList(node?: INodesListItem) {
    const [encoderValues, setEncoder] = useState<ISdiValues>();

    useEffect(() => {
        const result = sdiDeviceMapper(node?.sdiPortMapping, node?.decklinkPortsNum);
        setEncoder(result);
    }, [node]);

    return encoderValues;
}

export function useSelectData(nodeId?: number) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (nodeId) {
            dispatch(ipbeEditActions.fetchMainSelectValues(nodeId));
        }
    }, [dispatch, nodeId]);
}

export function useNotificationControls() {
    const dispatch = useDispatch();

    const add = useCallback(
        (message: string, type?: ENotificationType) => {
            const notification = {
                id: v4(),
                type: type || ENotificationType.info,
                message,
            };
            dispatch(commonActions.notificationsActions.add(notification));
            return notification.id;
        },
        [dispatch]
    );
    const remove = useCallback((id) => dispatch(commonActions.notificationsActions.remove(id)), [dispatch]);
    const show = useCallback((id) => dispatch(commonActions.notificationsActions.show(id)), [dispatch]);
    const hide = useCallback((id) => dispatch(commonActions.notificationsActions.hide(id)), [dispatch]);

    return {add, remove, show, hide};
}

export function useNotifications() {
    const visible = useSelector(commonSelectors.notifications.visible);
    const {add, remove, show, hide} = useNotificationControls();

    return {visible, add, remove, show, hide};
}
