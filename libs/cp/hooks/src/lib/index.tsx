import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {formatDistance} from "date-fns";
import {v4} from "uuid";

import {
    EAppGeneralStatus,
    ENotificationType,
    INodesListItem,
    IRealtimeAppEvent,
    IRealtimeNodeEvent,
    ISdiValues,
    IRealtimeThumbnailEvent,
    NodeSystemState,
    NumericId,
    Optional,
    IMonitoringErrorData,
    IMonitoringData,
    IDeckLinkDeviceEvent,
    IDeckLinkDevices,
    IIpbeTypeLog,
    ESubscriptionType,
    IMonitoringSubscribedEvent,
    IMonitoringDataEvent,
    IMonitoringPayloadItem,
    IQosDataPayload,
    IRealtimeAppStatusEvent,
} from "@nxt-ui/cp/types";
import {
    isIMonitoringDataEvent,
    isIRealtimeAppStatusEvent,
    isIRealtimeAppTimingEvent,
    isIRealtimeNodePingEvent,
    isIRealtimeNodeStatusEvent,
    isIRealtimeNodeSystemStateEvent,
    sdiDeviceMapper,
} from "@nxt-ui/cp/utils";
import {RealtimeServicesSocketFactory} from "@nxt-ui/shared/utils";
import {commonActions, commonSelectors, CpRootState, ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";

const REALTIME_SERVICE_URL = "https://cp.nextologies.com:1987";

export function useRealtimeAppData(
    nodeId: null | undefined | NumericId,
    appType: string,
    appId: null | undefined | NumericId,
    initialStartedAt: null | number
) {
    const serviceSocketRef = useRef(RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).namespace("/redis"));
    const [connected, setConnected] = useState<boolean>(false);
    const [status, setStatus] = useState<EAppGeneralStatus>();
    const [startedAt, setStartedAt] = useState<null | number>(initialStartedAt);

    useEffect(() => {
        setStartedAt(initialStartedAt);
    }, [initialStartedAt]);

    useEffect(() => {
        if (nodeId && appId) {
            serviceSocketRef.current.emit("subscribe", {nodeId, appId, appType});
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
        }
        return () => {
            if (serviceSocketRef.current) {
                serviceSocketRef.current.emit("unsubscribe", {appId, nodeId, appType});
                RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).cleanup("/redis");
            }
        };
    }, [appId, appType, nodeId]);

    const runTime = useMemo(() => {
        if (startedAt) {
            return formatDistance(startedAt, new Date(), {addSuffix: false});
        } else {
            return "";
        }
    }, [startedAt]);

    return {connected, status, startedAt, runTime};
}

export function useRealtimeNodeData(nodeId: Optional<NumericId>) {
    const serviceSocketRef = useRef(RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).namespace("/redis"));

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
        serviceSocketRef.current.emit("subscribe", {type: "status", nodeId});
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
                serviceSocketRef.current.emit("unsubscribe", {type: "status", nodeId});
                RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).cleanup("/redis");
            }
        };
    }, [nodeId]);

    return {connected, status, systemState, governorMode, coresCount, lastPing};
}

export function useRealtimeThumbnails(thumbnailId: string, initialThumbnail?: string) {
    const serviceSocketRef = useRef(
        RealtimeServicesSocketFactory.server("https://qa.nextologies.com:1987").namespace("/thumbnails")
    );

    const [connected, setConnected] = useState<boolean>(false);
    const [thumbnail, setThumbnail] = useState<string>(initialThumbnail || "");

    useEffect(() => {
        serviceSocketRef.current.on("connect", () => setConnected(true));
        serviceSocketRef.current.on("disconnect", () => setConnected(false));
        serviceSocketRef.current.emit("subscribe", {channel: thumbnailId});
        serviceSocketRef.current.on("thumbnail", (data: IRealtimeThumbnailEvent) => {
            if (thumbnailId === data.channel) {
                setThumbnail(data.imageSrcBase64);
            }
        });

        return () => {
            setConnected(false);
            serviceSocketRef.current.emit("unsubscribe", {channel: thumbnailId});
            RealtimeServicesSocketFactory.server("https://qa.nextologies.com:1987").cleanup("/thumbnails");
        };
    }, [thumbnailId]);

    return {connected, thumbnail};
}

export function useRealtimeMonitoring(nodeId: number, ip: Optional<string>, port: Optional<number>) {
    const serviceSocketRef = useRef(RealtimeServicesSocketFactory.server("http://localhost:1987").namespace("/redis"));
    const [initial, setInitial] = useState<Optional<Array<IMonitoringPayloadItem>>>(null);
    const [monitoring, setMonitoring] = useState<Optional<IMonitoringData>>(null);
    const [errors, setErrors] = useState<Optional<IMonitoringErrorData>>(null);
    const [connected, setConnected] = useState<boolean>(false);

    useEffect(() => {
        serviceSocketRef.current.on("connect", () => setConnected(true));
        serviceSocketRef.current?.emit("subscribe", {nodeId, ip, port, subscriptionType: ESubscriptionType.monitoring});
        serviceSocketRef.current.on("subscribed", (event: IMonitoringSubscribedEvent) => {
            const {payload} = event;
            console.log("subscribed", payload);
            if (event.nodeId === nodeId && event.ip === ip && event.port === port) {
                setInitial(payload);
            }
        });
        serviceSocketRef.current.on("realtimeMonitoring", (payload: IMonitoringDataEvent) => {
            if (isIMonitoringDataEvent(payload)) {
                const {
                    payload: {moment, errors, monitoring},
                } = payload;
                if (payload.nodeId === nodeId && payload.ip === ip && payload.port === port) {
                    setMonitoring({...monitoring, moment});
                    setErrors({...errors, moment});
                }
            }
        });
        return () => {
            if (serviceSocketRef.current) {
                serviceSocketRef.current.emit("unsubscribe", {
                    nodeId,
                    ip,
                    port,
                    subscriptionType: ESubscriptionType.monitoring,
                });
                RealtimeServicesSocketFactory.server("http://localhost:1987").cleanup("/redis");
            }
        };
    }, [nodeId, ip, port]);

    return {monitoring, errors, connected, initial};
}

export function useRealtimeLogDataTypes(nodeId: Optional<number>, appType: string, appId: Optional<number>) {
    const serviceSocketRef = useRef(RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).namespace("/logger"));
    const [types, setTypes] = useState<Array<string>>([]);
    const [connected, setConnected] = useState<boolean>(false);

    useEffect(() => {
        serviceSocketRef.current?.emit("subscribeTypes", {nodeId, appType, appId});
        serviceSocketRef.current.on("connect", () => setConnected(true));
        serviceSocketRef.current.on("nodeDataTypes", (data: Array<string>) => {
            setTypes(data);
        });
        return () => {
            if (serviceSocketRef.current) {
                serviceSocketRef.current.emit("unsubscribeTypes", {nodeId, appType, appId});
                RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).cleanup("/logger");
            }
        };
    }, [nodeId, appType, appId]);

    return {types, connected};
}

export function useRealtimeLogDataType(
    nodeId: Optional<number>,
    appType: string,
    appId: Optional<number>,
    logType?: string
) {
    const serviceSocketRef = useRef(RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).namespace("/logger"));
    const [typeLogs, setTypeLogs] = useState<Array<IIpbeTypeLog>>([]);
    const [connected, setConnected] = useState<boolean>(false);

    useEffect(() => {
        serviceSocketRef.current?.emit("subscribeType", {nodeId, appType, appId, logType});
        serviceSocketRef.current.on("connect", () => setConnected(true));
        serviceSocketRef.current.on("nodeDataType", (data: Array<IIpbeTypeLog>) => {
            setTypeLogs(data);
        });
        return () => {
            if (serviceSocketRef.current) {
                serviceSocketRef.current.emit("unsubscribeType", {nodeId, appType, appId, logType});
                RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).cleanup("/logger");
            }
        };
    }, [nodeId, appType, appId, logType]);

    return {typeLogs, connected};
}

export function useRealtimeMonitoringQos(nodeId: number, appType: string, appId: Optional<number>) {
    const serviceSocketRef = useRef(RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).namespace("/qos"));
    const [qosState, setQosState] = useState<Optional<Array<number>>>(null);
    const [connected, setConnected] = useState<boolean>(false);

    useEffect(() => {
        serviceSocketRef.current?.emit("subscribe", {nodeId, appType, appId});

        serviceSocketRef.current.on("connect", () => {
            setConnected(true);
        });
        serviceSocketRef.current.on("realtimeMonitoringQos", (data) => {
            const {items} = JSON.parse(data) as IQosDataPayload;
            if (data.appId === appId && data.appType === appType && data.nodeId === nodeId) {
                setQosState(items);
            }
        });

        return () => {
            if (serviceSocketRef.current) {
                serviceSocketRef.current.emit("unsubscribe", {nodeId, appType, appId});
                RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).cleanup("/redis");
            }
        };
    }, [nodeId, appType, appId]);

    useEffect(() => {
        if (serviceSocketRef.current?.disconnected) {
            setConnected(false);
        }
    }, [serviceSocketRef.current?.disconnect]);

    return {qosState, connected};
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

export function useSdiDeviceList(node?: INodesListItem) {
    const [encoderValues, setEncoder] = useState<ISdiValues>();

    useEffect(() => {
        const result = sdiDeviceMapper(node?.sdiPortMapping, node?.decklinkPortsNum);
        setEncoder(result);
    }, [node]);

    return encoderValues;
}

export function useNodeMetadata() {
    const dispatch = useDispatch();
    const nodeId = useSelector(ipbeEditSelectors.main.node);

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

export function useRealtimeBmdd(nodeId: Optional<number>) {
    const serviceSocketRef = useRef(RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).namespace("/bmdd"));

    const [connected, setConnected] = useState<boolean>(false);
    const [decklinkState, setDecklinkState] = useState<IDeckLinkDevices>();

    useEffect(() => {
        serviceSocketRef.current.emit("subscribe", nodeId);
        serviceSocketRef.current.on("connect", () => setConnected(true));
        serviceSocketRef.current.on("error", () => setConnected(false));
        serviceSocketRef.current.on("devices", (event: IDeckLinkDeviceEvent) => {
            const {devices} = event;
            if (event.nodeId === nodeId) {
                setDecklinkState(devices);
            }
        });
        return () => {
            if (serviceSocketRef.current) {
                serviceSocketRef.current.emit("unsubscribe", nodeId);
                RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).cleanup("/bmdd");
            }
        };
    }, [nodeId]);

    return {connected, decklinkState};
}

export function useStatusChangeNotification(
    name: string,
    initialStatus: EAppGeneralStatus,
    status?: EAppGeneralStatus
) {
    const [prevStatus, setPrevStatus] = useState<EAppGeneralStatus | undefined>(initialStatus);

    const currentStatus = useMemo(() => {
        return status ? status : initialStatus;
    }, [status, initialStatus]);

    const {add} = useNotifications();

    useEffect(() => {
        if (!status) {
            setPrevStatus(initialStatus);
        }
    }, [initialStatus]);

    useEffect(() => {
        if (status && status !== prevStatus) {
            add(`Status ${name} changed to: ${status}`);
            setPrevStatus(status);
        }
    }, [status]);

    return {currentStatus};
}
