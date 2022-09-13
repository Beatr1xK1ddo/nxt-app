import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {formatDistance} from "date-fns";
import {useParams} from "react-router-dom";
import {v4} from "uuid";

import {
    BasicApplication,
    EAppGeneralStatus,
    EAppType,
    ENotificationType,
    ESubscriptionType,
    IAppData,
    IAppDataSubscribedEvent,
    IAppIdAppTypeOrigin,
    IDataEvent,
    IDeckLinkDeviceEvent,
    IDeckLinkDevices,
    IIpbeTypeLog,
    IIpPortOrigin,
    IMonitoringData,
    IMonitoringErrorState,
    IMonitoringState,
    INodeIdOrigin,
    INodeOnlineStatusPayload,
    INodesListItem,
    INodeSubscribeOrigin,
    IQosDataPayload,
    IQosDataState,
    IRealtimeNodeData,
    IRealtimeNodePingData,
    IRealtimeNodeStatusData,
    IRealtimeNodeSystemData,
    IRealtimeThumbnailEvent,
    ISdiValues,
    ISubscribedEvent,
    ITxrNodeData,
    ITxrNodeSubscribedData,
    NumericId,
    Optional,
} from "@nxt-ui/cp/types";
import {isIRealtimeAppStatusEvent, isIRealtimeAppTimingEvent, sdiDeviceMapper} from "@nxt-ui/cp/utils";
import {RealtimeServicesSocketFactory} from "@nxt-ui/shared/utils";
import {
    commonActions,
    commonSelectors,
    CpRootState,
    ipbeEditActions,
    ipbeEditSelectors,
    txrEditActions,
} from "@nxt-ui/cp-redux";

const REALTIME_SERVICE_URL = "https://qa.nextologies.com:1987";

export function useRealtimeAppData(app: BasicApplication, nodeId: Optional<NumericId>) {
    const serviceSocketRef = useRef(RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).namespace("/redis"));

    const [connected, setConnected] = useState<boolean>(false);
    const [status, setStatus] = useState<EAppGeneralStatus>(app.status);
    const [startedAt, setStartedAt] = useState<Optional<number>>(app.startedAtMs);

    useEffect(() => {
        const event = {origin: {nodeId, appId: app.id, appType: app.type}, subscriptionType: ESubscriptionType.app};
        if (nodeId && app.id && app.type) {
            serviceSocketRef.current.emit("subscribe", event);
            serviceSocketRef.current.on("connect", () => setConnected(true));
            serviceSocketRef.current.on("error", () => setConnected(false));
            serviceSocketRef.current.on(
                "subscribed",
                (event: ISubscribedEvent<IAppIdAppTypeOrigin, IAppDataSubscribedEvent>) => {
                    const {subscriptionType, origin} = event;
                    if (subscriptionType === ESubscriptionType.app) {
                        if (origin.appId === app.id) {
                            setStatus(event.payload.status?.status);
                            setStartedAt(event.payload.runtime?.startedAt);
                        }
                    }
                }
            );
            serviceSocketRef.current.on("data", (event: IDataEvent<IAppIdAppTypeOrigin, IAppData>) => {
                const {subscriptionType, origin} = event;
                if (subscriptionType === ESubscriptionType.app) {
                    if (origin.appId === app.id) {
                        if (isIRealtimeAppStatusEvent(event.payload)) {
                            setStatus(event.payload.status);
                        }
                        if (isIRealtimeAppTimingEvent(event.payload)) {
                            setStartedAt(event.payload.startedAt);
                        }
                    }
                }
            });
        }
        return () => {
            if (serviceSocketRef.current) {
                if (nodeId && app.id && app.type) {
                    serviceSocketRef.current.emit("unsubscribe", event);
                }
                RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).cleanup("/redis");
            }
        };
    }, [nodeId, app.id, app.type]);

    const runTime = useMemo(() => {
        if (startedAt) {
            return formatDistance(startedAt, new Date(), {addSuffix: false});
        } else {
            return "Unknown";
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
    const [systemState, setSystemState] = useState<IRealtimeNodeSystemData>({
        cpu: 0,
        memoryUsed: 0,
        memoryTotal: 0,
        loadAverage: 0,
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
        const event = {origin: {nodeId}, subscriptionType: ESubscriptionType.node};
        if (nodeId) {
            serviceSocketRef.current.emit("subscribe", event);
        }
        serviceSocketRef.current.on("connect", () => setConnected(true));
        serviceSocketRef.current.on("error", () => setConnected(false));
        serviceSocketRef.current.on("data", (event: IDataEvent<INodeSubscribeOrigin, IRealtimeNodeData>) => {
            const {origin, subscriptionType, payload} = event;
            const {type, nodeId: eventNodeId} = origin;
            if (subscriptionType === ESubscriptionType.node) {
                if (nodeId === eventNodeId) {
                    if (type === "ping") {
                        setLastPing((payload as IRealtimeNodePingData).lastPing);
                    }
                    if (type === "status") {
                        setStatus((payload as IRealtimeNodeStatusData).online);
                    }
                    if (type === "system") {
                        setSystemState(payload as IRealtimeNodeSystemData);
                    }
                }
            }
        });
        return () => {
            if (serviceSocketRef.current) {
                if (nodeId) {
                    serviceSocketRef.current.emit("unsubscribe", event);
                }
                RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).cleanup("/redis");
            }
        };
    }, [nodeId]);

    return {connected, status, systemState, governorMode, coresCount, lastPing};
}

export function useRealtimeThumbnails(thumbnailId: string, initialThumbnail?: string) {
    const serviceSocketRef = useRef(
        RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).namespace("/thumbnails")
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
            RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).cleanup("/thumbnails");
        };
    }, [thumbnailId]);

    return {connected, thumbnail};
}

export function useRealtimeMonitoring(nodeId: Optional<number>, ip: Optional<string>, port: Optional<number>) {
    const serviceSocketRef = useRef(RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).namespace("/redis"));
    const [initial, setInitial] = useState<Array<IMonitoringData>>([]);
    const [monitoring, setMonitoring] = useState<Optional<IMonitoringState>>(null);
    const [errors, setErrors] = useState<Optional<IMonitoringErrorState>>(null);
    const [connected, setConnected] = useState<boolean>(false);

    useEffect(() => {
        const event = {origin: {nodeId, ip, port}, subscriptionType: ESubscriptionType.monitoring};
        serviceSocketRef.current.on("connect", () => setConnected(true));
        serviceSocketRef.current?.emit("subscribe", event);
        serviceSocketRef.current.on("subscribed", (event: ISubscribedEvent<IIpPortOrigin, Array<IMonitoringData>>) => {
            const {subscriptionType, origin, payload} = event;
            if (subscriptionType === ESubscriptionType.monitoring) {
                const {nodeId: eventNodeId, ip: eventIp, port: eventPort} = origin;
                if (eventNodeId === nodeId && eventIp === ip && eventPort === port) {
                    setInitial(payload);
                    const lastValue = payload[payload.length - 1];
                    const monitoring = {
                        ...lastValue.monitoring,
                        moment: lastValue.moment,
                    };
                    const errors = {
                        ...lastValue.errors,
                        moment: lastValue.moment,
                    };
                    setMonitoring(monitoring);
                    setErrors(errors);
                }
            }
        });
        serviceSocketRef.current.on("data", (event: IDataEvent<IIpPortOrigin, IMonitoringData>) => {
            const {subscriptionType, origin, payload} = event;
            if (subscriptionType === ESubscriptionType.monitoring) {
                const {nodeId: eventNodeId, ip: eventIp, port: eventPort} = origin;
                if (eventNodeId === nodeId && eventIp === ip && eventPort === port) {
                    const {moment, monitoring, errors} = payload;
                    setMonitoring({...monitoring, moment});
                    setErrors({...errors, moment});
                }
            }
        });
        return () => {
            if (serviceSocketRef.current) {
                serviceSocketRef.current.emit("unsubscribe", event);
                RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).cleanup("/redis");
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
    const [qosState, setQosState] = useState<Optional<IQosDataState>>(null);
    const [connected, setConnected] = useState<boolean>(false);

    useEffect(() => {
        const event = {nodeId, appType, appId, subscriptionType: ESubscriptionType.qos};
        serviceSocketRef.current?.emit("subscribe", event);
        serviceSocketRef.current.on("subscribed", (event: IQosDataPayload) => {
            const {payload} = event;
            if (event.appId === appId && event.appType === appType && event.nodeId === nodeId) {
                setQosState(payload);
            }
        });
        serviceSocketRef.current.on("connect", () => {
            setConnected(true);
        });
        serviceSocketRef.current.on("realtimeQos", (event: IQosDataPayload) => {
            const {payload} = event;
            if (event.appId === appId && event.appType === appType && event.nodeId === nodeId) {
                setQosState(payload);
            }
        });

        return () => {
            if (serviceSocketRef.current) {
                serviceSocketRef.current.emit("unsubscribe", event);
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

export function useNodesList(appType?: EAppType) {
    const serviceSocketRef = useRef(RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).namespace("/redis"));

    const dispatch = useDispatch();
    const nodesIds = useSelector(commonSelectors.nodes.selectIds);

    const [connected, setConnected] = useState<boolean>(false);

    useEffect(() => {
        dispatch(commonActions.nodesActions.fetchNodes(appType));
    }, [dispatch, appType]);

    useEffect(() => {
        const event = {origin: {type: "status", nodeId: nodesIds}, subscriptionType: ESubscriptionType.node};
        if (nodesIds && nodesIds.length) {
            serviceSocketRef.current.emit("subscribe", event);
            serviceSocketRef.current.on("connect", () => setConnected(true));
            serviceSocketRef.current.on("error", () => setConnected(false));
            serviceSocketRef.current.on("data", (event: IDataEvent<INodeSubscribeOrigin, IRealtimeNodeData>) => {
                const {origin, subscriptionType} = event;
                const {type} = origin;
                if (subscriptionType === ESubscriptionType.node) {
                    if (type === "status") {
                        dispatch(commonActions.nodesActions.setNodeStatus(event as INodeOnlineStatusPayload));
                    }
                }
            });
        }
        return () => {
            if (serviceSocketRef.current) {
                serviceSocketRef.current.emit("unsubscribe", event);
                RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).cleanup("/redis");
            }
        };
    }, [dispatch, nodesIds]);

    return {connected};
}

export function useCompaniesList(appType?: EAppType) {
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
    }, [initialStatus, status]);

    useEffect(() => {
        if (status && status !== prevStatus) {
            add(`Status ${name} changed to: ${status}`);
            setPrevStatus(status);
        }
    }, [status, prevStatus, name, add]);

    return {currentStatus};
}

// TODO Kate: refactor file
export function useTxrTemplates() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(txrEditActions.getTemplateSelectedValues());
    }, [dispatch]);
}

export function useProxyServers() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(commonActions.proxyServersActions.getProxyServers());
    }, [dispatch]);
}

export function useEditMode() {
    const {id: idFromUrl} = useParams<"id">();
    return useMemo(() => Boolean(idFromUrl), [idFromUrl]);
}
// txr hook
export function useRealtimeTxrNodeData(nodeId: Optional<NumericId>) {
    const serviceSocketRef = useRef(RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).namespace("/redis"));
    const [connected, setConnected] = useState<boolean>(false);
    const [txrData, setTxrData] = useState<ITxrNodeData>();

    useEffect(() => {
        const event = {origin: {nodeId}, subscriptionType: ESubscriptionType.txr};
        if (nodeId) {
            serviceSocketRef.current.emit("subscribe", event);
            serviceSocketRef.current.on("connect", () => setConnected(true));
            serviceSocketRef.current.on("error", () => setConnected(false));
            serviceSocketRef.current.on(
                "subscribed",
                (event: ISubscribedEvent<INodeIdOrigin, ITxrNodeSubscribedData>) => {
                    const {subscriptionType, origin} = event;
                    if (subscriptionType === ESubscriptionType.txr) {
                        const {nodeId: eventNodeId} = origin;
                        if (eventNodeId === nodeId) {
                            setTxrData(event.payload);
                        }
                    }
                }
            );
            serviceSocketRef.current.on("data", (event: IDataEvent<INodeIdOrigin, ITxrNodeData>) => {
                const {subscriptionType, origin} = event;
                if (subscriptionType === ESubscriptionType.txr) {
                    const {nodeId: eventNodeId} = origin;
                    if (nodeId === eventNodeId) {
                        setTxrData(event.payload);
                    }
                }
            });
        }
        return () => {
            if (serviceSocketRef.current) {
                if (nodeId) {
                    serviceSocketRef.current.emit("unsubscribe", event);
                }
                RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).cleanup("/redis");
            }
        };
    }, [nodeId]);

    return {connected, txrData};
}

export function useClickOutside<T extends HTMLElement>(close?: () => void) {
    const ref = useRef<T>(null);

    const handler = useCallback(
        (e: MouseEvent) => {
            const condition = ref?.current && e.target instanceof Node && !ref.current.contains(e.target);
            if (condition) close?.();
        },
        [close]
    );

    useEffect(() => {
        document.addEventListener("click", handler);
        return () => {
            document.removeEventListener("click", handler);
        };
    }, [ref, handler]);

    return ref;
}
