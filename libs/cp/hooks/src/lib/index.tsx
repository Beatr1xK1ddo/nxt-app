import {MutableRefObject, RefObject, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {unwrapResult} from "@reduxjs/toolkit";
import {formatDistance} from "date-fns";
import {useParams} from "react-router-dom";
import {v4} from "uuid";

import {
    BasicApplication,
    EAppGeneralStatus,
    EAppGeneralStatusChange,
    EAppType,
    ENotificationType,
    IAppData,
    IAppDataSubscribedEvent,
    IAppIdAppTypeOrigin,
    IAppStatusData,
    IAppTimingData,
    ILogRecordState,
    ILogTypeDataEvent,
    ILogTypeState,
    IMomitoring,
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
    ITxrNodeData,
    ITxrNodeSubscribedData,
    NumericId,
    Optional,
    IDeckLinkDeviceEvent,
    IDeckLinkDevices,
    ISubscribedEvent,
    IIpPortOrigin,
    ESubscriptionType,
    IDataEvent,
    ITsMonitoringDataPayload,
    IP1ErrorMapped,
    ITsMonitoringMappedData,
    IP2ErrorMapped,
    ITsMonitoringSubscribedPayload,
    INotificationRawData,
    ISubscribeEvent,
} from "@nxt-ui/cp/types";
import {
    deleteKeysFromObject,
    generateEmptyMoments,
    isTsStatsData,
    sdiDeviceMapper,
    tsMonitoringMapper,
    tsP1ErrorMapper,
    tsP2ErrorMapper,
} from "@nxt-ui/cp/utils";
import {RealtimeServicesSocketFactory} from "@nxt-ui/shared/utils";
import {
    commonActions,
    commonSelectors,
    CpRootState,
    ipbeEditActions,
    ipbeEditSelectors,
    notificationRuleActions,
    txrEditActions,
} from "@nxt-ui/cp-redux";
import {History, Transition} from "history";
import {Navigator} from "react-router";
import {UNSAFE_NavigationContext as NavigationContext} from "react-router-dom";
import {MONITORING_SIZE} from "@nxt-ui/cp/constants";
import {ICommonFaultEvent} from "@nxt-ui/cp/types";

const REALTIME_SERVICE_URL =
    window.location.origin === "https://cp.nextologies.com"
        ? "https://cp.nextologies.com:1987"
        : "https://qa.nextologies.com:1987";
// const REALTIME_SERVICE_URL = "http://localhost:1987";
// const REALTIME_SERVICE_URL = "https://nxt-dev-env.nextologies.com:1987";

export function useRealtimeAppData(app: BasicApplication, nodeId: Optional<NumericId>) {
    const serviceSocketRef = useRef(RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).namespace("/redis"));

    const [connected, setConnected] = useState<boolean>(serviceSocketRef.current.connected);
    const [subscribed, setSubscribed] = useState<boolean>(false);
    const [status, setStatus] = useState<Optional<EAppGeneralStatus>>(app.status);
    const [statusChange, setStatusChange] = useState<Optional<EAppGeneralStatusChange>>(app.statusChange);
    const [startedAt, setStartedAt] = useState<Optional<number>>(app.startedAtMs);

    useEffect(() => {
        setStatus((prev) => (!prev ? app.status : prev));
    }, [app.status]);

    useEffect(() => {
        setStatusChange((prev) => (!prev ? app.statusChange : prev));
    }, [app.statusChange]);

    useEffect(() => {
        serviceSocketRef.current.on("connect", () => setConnected(true));
        serviceSocketRef.current.on("disconnect", () => {
            setConnected(false);
            setSubscribed(false);
        });
        serviceSocketRef.current.on("error", console.error);
    }, []);

    useEffect(() => {
        return () => {
            if (app.id && app.type && nodeId) {
                const event = {origin: {nodeId, appId: app.id, appType: app.type}};
                serviceSocketRef.current.emit("unsubscribe", {...event, subscriptionType: "appStatus"});
                serviceSocketRef.current.emit("unsubscribe", {...event, subscriptionType: "appRuntime"});
                RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).cleanup("/redis");
                setSubscribed(false);
            }
        };
    }, [app.id, app.type, nodeId]);

    useEffect(() => {
        const event = {origin: {nodeId, appId: app.id, appType: app.type}};
        if (connected && nodeId && app.id && app.type) {
            if (!subscribed) {
                serviceSocketRef.current.emit("subscribe", {...event, subscriptionType: "appStatus"});
                serviceSocketRef.current.emit("subscribe", {...event, subscriptionType: "appRuntime"});
            }
            serviceSocketRef.current.on(
                "subscribed",
                (event: ISubscribedEvent<IAppIdAppTypeOrigin, IAppDataSubscribedEvent>) => {
                    const {origin} = event;
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    if (origin.appId === app.id) {
                        const status = event.payload.status?.status;
                        const statusChange = event.payload.status?.statusChange;
                        if (Object.values(EAppGeneralStatus).includes(status)) {
                            setStatus(status);
                        }
                        if (Object.values(EAppGeneralStatusChange).includes(statusChange)) {
                            setStatusChange(statusChange);
                        }
                        //todo: fix this
                        setStartedAt(event.payload.runtime?.startedAt * 1000);
                        setSubscribed(true);
                    }
                }
            );
            serviceSocketRef.current.on("data", (event: IDataEvent<IAppIdAppTypeOrigin, IAppData>) => {
                const {subscriptionType, origin} = event;
                if (origin.appId === app.id) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    if (subscriptionType === "appStatus") {
                        const payload = event.payload as IAppStatusData;
                        const status = payload?.status;
                        const statusChange = payload?.statusChange;
                        if (Object.values(EAppGeneralStatus).includes(status)) {
                            setStatus(status);
                        }
                        if (statusChange === null || Object.values(EAppGeneralStatusChange).includes(statusChange)) {
                            setStatusChange(statusChange);
                        }
                    }
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    if (subscriptionType === "appRuntime") {
                        const payload = event.payload as IAppTimingData;
                        setStartedAt(payload?.startedAt);
                    }
                }
            });
        }
    }, [nodeId, app, connected, subscribed]);

    const runTime = useMemo(() => {
        if (startedAt) {
            return formatDistance(startedAt, new Date(), {addSuffix: false});
        } else {
            return "Runtime not available";
        }
    }, [startedAt]);

    return {connected, status, statusChange, startedAt, runTime, subscribed};
}

export function useRealtimeNodeData(id: Optional<NumericId>) {
    const serviceSocketRef = useRef(RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).namespace("/redis"));

    const node = useSelector<CpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, id)
    );

    const [subscribed, setSubscribed] = useState<boolean>(false);
    const [connected, setConnected] = useState<boolean>(serviceSocketRef.current.connected);
    const [status, setStatus] = useState<boolean>(node?.online || false);
    const [governorMode, setGovernorMode] = useState<string>("unknown");
    const [coresCount, setCoresCount] = useState<number | string>("unknown");
    const [lastPing, setLastPing] = useState<number>(0);
    const [systemState, setSystemState] = useState<IRealtimeNodeSystemData>({
        cpu: 0,
        memoryUsed: 0,
        memoryTotal: 0,
        loadAverage: 0,
    });

    //todo: do we really need this?
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
        serviceSocketRef.current.on("connect", () => setConnected(true));
        serviceSocketRef.current.on("disconnect", () => {
            setConnected(false);
            setSubscribed(false);
        });
        serviceSocketRef.current.on("error", console.error);
    }, []);

    useEffect(() => {
        const event = {origin: {id: id}};
        if (connected && id) {
            if (!subscribed) {
                serviceSocketRef.current.emit("subscribe", {...event, subscriptionType: "nodePing"});
                serviceSocketRef.current.emit("subscribe", {...event, subscriptionType: "nodeStatus"});
                serviceSocketRef.current.emit("subscribe", {...event, subscriptionType: "nodeSystem"});
            }
            serviceSocketRef.current.on("data", (event: IDataEvent<INodeSubscribeOrigin, IRealtimeNodeData>) => {
                const {origin, subscriptionType, payload} = event;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore todo: fix this shit
                if (id === origin.id) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore todo: fix this shit
                    if (subscriptionType === "nodePing") {
                        setLastPing((payload as IRealtimeNodePingData).lastPing);
                    }
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore todo: fix this shit
                    if (subscriptionType === "nodeStatus") {
                        setStatus((payload as IRealtimeNodeStatusData).online);
                    }
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore todo: fix this shit
                    if (subscriptionType === "modeSystem") {
                        setSystemState(payload as IRealtimeNodeSystemData);
                    }
                }
            });
        }
        return () => {
            if (connected && subscribed) {
                serviceSocketRef.current.emit("unsubscribe", {...event, subscriptionType: "nodePing"});
                serviceSocketRef.current.emit("unsubscribe", {...event, subscriptionType: "nodeStatus"});
                serviceSocketRef.current.emit("unsubscribe", {...event, subscriptionType: "nodeSystem"});
                RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).cleanup("/redis");
            }
        };
    }, [id, connected, subscribed]);

    return {connected, status, systemState, governorMode, coresCount, lastPing};
}

export function useRealtimeThumbnails(thumbnailId: string, initialThumbnail?: string) {
    const serviceSocketRef = useRef(
        RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).namespace("/thumbnails")
    );

    const [connected, setConnected] = useState<boolean>(false);
    const [thumbnail, setThumbnail] = useState<string>(initialThumbnail || "");
    const [moment, setMoment] = useState<number>();

    useEffect(() => {
        serviceSocketRef.current.on("connect", () => setConnected(true));
        serviceSocketRef.current.on("disconnect", () => setConnected(false));
        serviceSocketRef.current.emit("subscribe", {channel: thumbnailId});
        serviceSocketRef.current.on("thumbnail", (data: IRealtimeThumbnailEvent) => {
            if (thumbnailId === data.channel) {
                setThumbnail(data.imageSrcBase64);
                setMoment(data.moment);
            }
        });

        return () => {
            setConnected(false);
            serviceSocketRef.current.emit("unsubscribe", {channel: thumbnailId});
            RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).cleanup("/thumbnails");
        };
    }, [thumbnailId]);

    return {connected, thumbnail, moment};
}

export function useRealtimeMonitoring(
    nodeId: Optional<number>,
    ip: Optional<string>,
    port: Optional<number>,
    shouldUnsub = true
) {
    const serviceSocketRef = useRef(RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).namespace("/redis"));
    const [monitoring, setMonitoring] = useState<Array<IMonitoringState>>([]);
    const [errors, setErrors] = useState<Optional<IMonitoringErrorState>>(null);
    const [connected, setConnected] = useState<boolean>(serviceSocketRef.current.connected);
    const [subscribed, setSubscribed] = useState<boolean>(false);

    useEffect(() => {
        if (nodeId && ip && port) {
            setMonitoring([]);
        }
    }, [nodeId, ip, port]);

    const subscribedEvent = useCallback(
        (event: ISubscribedEvent<IIpPortOrigin, Array<IMonitoringData>>) => {
            const {subscriptionType, origin, payload} = event;
            if (subscriptionType === ESubscriptionType.monitoring) {
                const {nodeId: eventNodeId, ip: eventIp, port: eventPort} = origin;
                if (eventNodeId === nodeId && eventIp === ip && eventPort === port && payload.length) {
                    const initialValue: IMomitoring = {};
                    payload.forEach((item) => {
                        initialValue[item.moment] = {
                            bitrate: item.monitoring?.bitrate,
                            /* If we dont have muxrate value we need show bitrate value*/
                            muxrate: item.monitoring?.muxrate || item.monitoring.bitrate,
                        };
                    });
                    const moments = Object.keys(initialValue).sort((a: string, b: string) => parseInt(a) - parseInt(b));
                    setMonitoring((prev) => {
                        if (prev.length) {
                            return prev;
                        } else {
                            const monitoringFiltered = moments.map((item) => ({
                                moment: parseInt(item),
                                ...initialValue[item],
                            }));
                            return [
                                ...generateEmptyMoments(
                                    MONITORING_SIZE - monitoringFiltered.length,
                                    monitoringFiltered[0]?.moment
                                ),
                                ...monitoringFiltered,
                            ];
                        }
                    });
                    setErrors((prev) => {
                        if (!prev) {
                            const lastValue = payload[payload.length - 1];
                            const errors = {
                                ...lastValue.errors,
                                moment: lastValue.moment,
                            };
                            return errors;
                        } else {
                            return prev;
                        }
                    });
                    setSubscribed(true);
                }
            }
        },
        [ip, nodeId, port]
    );

    const dataEvent = useCallback(
        (event: IDataEvent<IIpPortOrigin, IMonitoringData>) => {
            const {subscriptionType, origin, payload} = event;
            if (subscriptionType === ESubscriptionType.monitoring) {
                const {nodeId: eventNodeId, ip: eventIp, port: eventPort} = origin;
                if (
                    eventNodeId === nodeId &&
                    eventIp === ip &&
                    eventPort === port
                    //
                ) {
                    setMonitoring((prev) => {
                        const activeMonitoringMoments = prev && prev.map((item) => item.moment);
                        if (!activeMonitoringMoments.includes(payload.moment) && prev.length) {
                            const {moment, monitoring: dataMonitoring, errors} = payload;
                            const stableMonitoringData = {
                                muxrate: dataMonitoring.muxrate || dataMonitoring.bitrate,
                                bitrate: dataMonitoring.bitrate,
                                moment: moment,
                            };
                            const newState = [...prev, stableMonitoringData].slice(-MONITORING_SIZE);
                            setErrors({...errors, moment});
                            return newState;
                        } else {
                            return prev;
                        }
                    });
                }
            }
        },
        [ip, nodeId, port]
    );

    const disconnectEvent = useCallback(() => {
        setConnected(false);
        setSubscribed(false);
    }, []);

    const connectEvent = useCallback(() => setConnected(true), []);

    useEffect(() => {
        const event = {origin: {nodeId, ip, port}, subscriptionType: ESubscriptionType.monitoring};
        if (!subscribed && connected && nodeId && ip && port) {
            serviceSocketRef.current?.emit("subscribe", event);
        }
    }, [connected, subscribed, nodeId, ip, port]);

    useEffect(() => {
        return () => {
            if (shouldUnsub && ip && nodeId && port) {
                const event = {origin: {nodeId, ip, port}, subscriptionType: ESubscriptionType.monitoring};
                serviceSocketRef.current.emit("unsubscribe", event);
                RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).cleanup("/redis");
                setSubscribed(false);
                setMonitoring([]);
            }
        };
    }, [ip, nodeId, port, shouldUnsub]);

    useEffect(() => {
        serviceSocketRef.current.on("connect", connectEvent);
        serviceSocketRef.current.on("subscribed", subscribedEvent);
        serviceSocketRef.current.on("data", dataEvent);
        serviceSocketRef.current.on("disconnect", disconnectEvent);
        return () => {
            serviceSocketRef.current.removeListener("data", dataEvent);
            serviceSocketRef.current.removeListener("subscribed", subscribedEvent);
            serviceSocketRef.current.removeListener("disconnect", disconnectEvent);
            serviceSocketRef.current.removeListener("connect", connectEvent);
        };
    }, [subscribedEvent, disconnectEvent, connectEvent, dataEvent]);

    return {monitoring, errors, connected};
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

export function useNodesList(appType: EAppType, all?: boolean) {
    const serviceSocketRef = useRef(RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).namespace("/redis"));

    const dispatch = useDispatch();
    const nodesIds = useSelector(commonSelectors.nodes.selectIds);

    const [subscribed, setSubscribed] = useState<boolean>(false);
    const [connected, setConnected] = useState<boolean>(serviceSocketRef.current.connected);

    useEffect(() => {
        dispatch(commonActions.nodesActions.fetchNodes({appType, all}));
    }, [appType, dispatch, all]);

    useEffect(() => {
        serviceSocketRef.current.on("connect", () => setConnected(true));
        serviceSocketRef.current.on("disconnect", () => {
            setConnected(false);
            setSubscribed(false);
        });
        serviceSocketRef.current.on("error", console.error);
    }, []);

    useEffect(() => {
        const event = {origin: {id: nodesIds}};
        if (connected && nodesIds && nodesIds.length) {
            if (!subscribed) {
                serviceSocketRef.current.emit("subscribe", {...event, subscriptionType: "nodeStatus"});
            }
            serviceSocketRef.current.on("data", (event: IDataEvent<INodeSubscribeOrigin, IRealtimeNodeData>) => {
                const {subscriptionType} = event;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore todo: fix this shit
                if (subscriptionType === "nodeStatus") {
                    dispatch(commonActions.nodesActions.setNodeStatus(event as INodeOnlineStatusPayload));
                }
            });
        }
        return () => {
            if (connected && subscribed) {
                serviceSocketRef.current.emit("unsubscribe", {...event, subscriptionType: "nodeStatus"});
            }
            RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).cleanup("/redis");
        };
    }, [connected, dispatch, nodesIds, subscribed]);

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

    const [globalStatus, setGlobalStatus] = useState<string>("Conncting to service");
    const [connected, setConnected] = useState<boolean>(false);
    const [subscribed, setSubscribed] = useState<boolean>(false);
    const [decklinkState, setDecklinkState] = useState<IDeckLinkDevices>();

    useEffect(() => {
        serviceSocketRef.current.on("connect", () => {
            setConnected(true);
            setGlobalStatus(`Connected to service`);
        });
        serviceSocketRef.current.on("error", (err) => {
            setConnected(false);
            setSubscribed(false);
            setGlobalStatus(`Error occured`);
        });
        serviceSocketRef.current.on("subscribed", (event: IDeckLinkDeviceEvent) => {
            if (event.nodeId === nodeId) {
                setDecklinkState(event.devices);
                setSubscribed(true);
            }
        });
        serviceSocketRef.current.on("devices", (event: IDeckLinkDeviceEvent) => {
            const {devices} = event;
            if (event.nodeId === nodeId) {
                setDecklinkState(devices);
            }
        });
        serviceSocketRef.current.on("fault", (event: ICommonFaultEvent<{nodeId: number}>) => {
            setGlobalStatus(event.message ?? event.type);
        });
    }, [nodeId]);

    useEffect(() => {
        if (!subscribed && nodeId) {
            setGlobalStatus(`Connecting to node service`);
            serviceSocketRef.current.emit("subscribe", nodeId);
        }
        return () => {
            if (serviceSocketRef.current && subscribed) {
                serviceSocketRef.current.emit("unsubscribe", nodeId);
                setGlobalStatus(`Node service is not connected`);
                RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).cleanup("/bmdd");
            }
        };
    }, [nodeId, subscribed]);

    return {connected, decklinkState, globalStatus};
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

export function useClickOutside(ref: MutableRefObject<HTMLDivElement | null>, callback: () => void) {
    const handleClick = useCallback(
        (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                callback();
            }
        },
        [callback, ref]
    );

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [ref, handleClick]);

    return ref;
}

type ExtendNavigator = Navigator & Pick<History, "block">;

export function useBlocker(blocker: (tx: Transition) => void, when = true) {
    const {navigator} = useContext(NavigationContext);

    useEffect(() => {
        if (!when) return;

        const unblock = (navigator as ExtendNavigator).block((tx) => {
            const autoUnblockingTx = {
                ...tx,
                retry() {
                    unblock();
                    tx.retry();
                },
            };

            blocker(autoUnblockingTx);
        });

        return unblock;
    }, [navigator, blocker, when]);
}

export function useAppLogs(
    nodeId: Optional<NumericId>,
    appType: Optional<string>,
    appId: Optional<NumericId>,
    appLogsTypes?: Array<string>,
    shouldUnsub = true
) {
    const serviceSocketRef = useRef(RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).namespace("/logging"));

    const [connected, setConnected] = useState<boolean>(false);
    const [initialRecieved, setInitialRecieved] = useState<boolean>(false);
    const [programmStop, setProgrammStop] = useState<boolean>(false);
    const [subscribed, setSubscribed] = useState<boolean>(false);
    const [logsTypes, setLogsTypes] = useState<Array<ILogTypeState>>([]);
    const [logs, setLogs] = useState<Map<string, Array<ILogRecordState>>>(new Map());
    const [globalStatus, setGlobalStatus] = useState<string>("Connecting to service");

    const unsubscribe = useCallback(() => {
        if (serviceSocketRef.current?.active && nodeId && appId && appType) {
            serviceSocketRef.current.emit("unsubscribe", {nodeId, appType, appId, appLogsTypes: null});
            setSubscribed(false);
            setProgrammStop(true);
            RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).cleanup("/logging");
        }
    }, [serviceSocketRef, nodeId, appType, appId]);

    const subscribe = useCallback(() => {
        if (serviceSocketRef.current?.active && nodeId && appId && appType) {
            serviceSocketRef.current.emit("init", {nodeId, appType, appId});
            setProgrammStop(false);
        }
    }, [serviceSocketRef, nodeId, appType, appId]);

    const dataHandler = useCallback(
        (event: ILogTypeDataEvent) => {
            if (
                nodeId === event.nodeId &&
                appType === event.appType &&
                appId === event.appId &&
                appLogsTypes?.includes(event.appLogType)
            ) {
                setLogs((state) => {
                    const logs = event.records.map((log) => {
                        return {id: v4(), ...log};
                    });
                    const typeLogs = state.get(event.appLogType) || [];
                    const newState = new Map(state);
                    if (typeLogs.length < 999) {
                        newState.set(event.appLogType, [...logs, ...typeLogs]);
                    } else {
                        newState.set(event.appLogType, [...logs, ...typeLogs.slice(0, 999)]);
                    }
                    return newState;
                });
            }
        },
        [nodeId, appId, appType, appLogsTypes]
    );

    const subscribedHandler = useCallback(
        (event: ILogTypeDataEvent) => {
            if (
                nodeId === event.nodeId &&
                appType === event.appType &&
                appId === event.appId &&
                appLogsTypes?.includes(event.appLogType)
            ) {
                if (!subscribed && !programmStop) {
                    setSubscribed(true);
                    setGlobalStatus("Connected to logs service");
                }
                if (!initialRecieved) {
                    setInitialRecieved(true);
                    setLogs((state) => {
                        const logs = event.records.map((log) => {
                            return {id: v4(), ...log};
                        });
                        const typeLogs = state.get(event.appLogType) || [];
                        const newState = new Map(state);
                        if (typeLogs.length < 999) {
                            newState.set(event.appLogType, [...logs, ...typeLogs]);
                        } else {
                            newState.set(event.appLogType, [...logs, ...typeLogs.slice(0, 999)]);
                        }
                        return newState;
                    });
                }
            }
        },
        [nodeId, appId, appType, appLogsTypes, subscribed, programmStop, initialRecieved]
    );
    const connectHandler = useCallback(() => {
        setConnected(true);
        setGlobalStatus("Connected to main");
    }, []);
    const disconnectHandler = useCallback(() => {
        setConnected(false);
        setSubscribed(false);
        setProgrammStop(true);
    }, []);
    const faultHandler = useCallback(
        (event: ICommonFaultEvent<IAppIdAppTypeOrigin>) => {
            const {origin} = event;
            if (nodeId === origin.nodeId && appType === origin.appType && appId === origin.appId) {
                setGlobalStatus(event.message ?? event.type);
            }
        },
        [nodeId, appId, appType]
    );
    const initLogListHandler = useCallback(
        (event: {nodeId: NumericId; appType: string; appId: NumericId; appLogsTypes: Optional<Array<string>>}) => {
            if (nodeId === event.nodeId && appType === event.appType && appId === event.appId) {
                const appLogsTypes = event.appLogsTypes ?? [];
                setLogsTypes(appLogsTypes.map((value) => ({value, id: v4()})));
            }
        },
        [nodeId, appId, appType]
    );
    // initial and on unmount effects only
    useEffect(() => {
        if (serviceSocketRef.current?.active && nodeId && appId && appType) {
            serviceSocketRef.current.emit("init", {nodeId, appType, appId});
            setProgrammStop(false);
        }
        return () => {
            if (shouldUnsub && serviceSocketRef.current?.active && nodeId && appId && appType) {
                serviceSocketRef.current.emit("unsubscribe", {nodeId, appType, appId, appLogsTypes: null});
                setSubscribed(false);
                setProgrammStop(true);
                RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).cleanup("/logging");
            }
        };
    }, [nodeId, appType, appId, shouldUnsub]);

    useEffect(() => {
        if (nodeId && appType && appId) {
            setLogs(new Map());
            setLogsTypes([]);
        }
    }, [nodeId, appType, appId]);

    // log subscription
    useEffect(() => {
        if (!programmStop && !subscribed && nodeId && appType && appId && appLogsTypes?.length) {
            serviceSocketRef.current.emit("subscribe", {nodeId, appType, appId, appLogsTypes});
        }
    }, [nodeId, appType, appId, appLogsTypes, subscribed, programmStop, shouldUnsub]);

    // data handlers
    useEffect(() => {
        serviceSocketRef.current.on("connect", connectHandler);
        serviceSocketRef.current.on("disconnect", disconnectHandler);
        serviceSocketRef.current.on("appLogsTypes", initLogListHandler);
        serviceSocketRef.current.on("data", dataHandler);
        serviceSocketRef.current.on("fault", faultHandler);
        serviceSocketRef.current.on("subscribed", subscribedHandler);
        return () => {
            if (serviceSocketRef.current) {
                serviceSocketRef.current.removeListener("data", dataHandler);
                serviceSocketRef.current.removeListener("fault", faultHandler);
                serviceSocketRef.current.removeListener("appLogsTypes", initLogListHandler);
                serviceSocketRef.current.removeListener("connect", connectHandler);
                serviceSocketRef.current.removeListener("disconnect", disconnectHandler);
                serviceSocketRef.current.removeListener("subscribed", subscribedHandler);
            }
        };
    }, [connectHandler, disconnectHandler, initLogListHandler, dataHandler, subscribedHandler, faultHandler]);

    return {connected, logs, logsTypes, unsubscribe, subscribe, subscribed, programmStop, globalStatus};
}

export function useChangeFormListener(values: Record<string, any>) {
    const dispatch = useDispatch();
    const prevValues = useRef<Record<string, unknown>>();
    const isEdit = useEditMode();
    const unnecessayKeys = useMemo(() => ["status", "startedAtMs", "statusChange"], []);
    useEffect(() => {
        const currentValues = {...values};
        const prevValuesCurrent = prevValues && {...prevValues.current};
        deleteKeysFromObject(unnecessayKeys, currentValues);
        deleteKeysFromObject(unnecessayKeys, prevValuesCurrent);
        const stringifyCurrentValues = JSON.stringify(currentValues);
        const stringifyPrevValues = JSON.stringify(prevValuesCurrent);
        const dataIsReadyToCheck =
            !!prevValues.current && ((isEdit && prevValues.current["id"]) || (!isEdit && !prevValues.current["id"]));
        if (dataIsReadyToCheck && stringifyCurrentValues !== stringifyPrevValues) {
            dispatch(commonActions.applicationActions.setAppFormChangedStatus(true));
        }
        prevValues.current = currentValues;
    }, [values, dispatch, isEdit, prevValues, unnecessayKeys]);
}

export function useRemoveChangeFormListener() {
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(commonActions.applicationActions.setAppFormChangedStatus(false));
        };
    });
}

export function useVisibilityChange() {
    const dispatch = useDispatch();

    const setVisibleHandle = useCallback(() => {
        if (document.hidden) {
            dispatch(commonActions.baseAppActions.setTabVisible(false));
        } else {
            dispatch(commonActions.baseAppActions.setTabVisible(true));
        }
    }, [dispatch]);

    useEffect(() => {
        document.addEventListener("visibilitychange", setVisibleHandle);
        return () => {
            document.removeEventListener("visibilitychange", setVisibleHandle);
        };
    });
}

export function useInitialRequest(): boolean {
    const dispatch = useDispatch();
    const [logged, setLogged] = useState<boolean>(false);

    useEffect(() => {
        const redirectToLogin = () => {
            window.location.assign(`${window.location.origin}/login`);
        };
        const getUserData = async () => {
            try {
                const userResult = await dispatch(commonActions.userActions.getUser());
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                unwrapResult(userResult);
                setLogged(true);
            } catch (e) {
                redirectToLogin();
            }
        };
        getUserData().catch(redirectToLogin);
    }, [dispatch]);

    return logged;
}

export const useRealtimeTsMonitoring = (nodeId: Optional<number>, ip: Optional<string>, port: Optional<number>) => {
    const serviceSocketRef = useRef(RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).namespace("/redis"));
    const [programs, setPrograms] = useState<Optional<Array<ITsMonitoringMappedData>>>(null);
    const [p1Errors, setP1Errors] = useState<Optional<IP1ErrorMapped>>(null);
    const [p2Errors, setP2Errors] = useState<Optional<IP2ErrorMapped>>(null);
    const [connected, setConnected] = useState<boolean>(false);

    useEffect(() => {
        if (nodeId && ip && port) {
            serviceSocketRef.current?.emit("subscribe", {
                origin: {nodeId, ip, port},
                subscriptionType: ESubscriptionType.tsMonitoring,
            });
        }
        serviceSocketRef.current.on("connect", () => setConnected(true));
        serviceSocketRef.current.on(
            "subscribed",
            (data: ISubscribedEvent<IIpPortOrigin, ITsMonitoringSubscribedPayload>) => {
                const {subscriptionType, origin} = data;
                if (subscriptionType === ESubscriptionType.tsMonitoring) {
                    if (origin.nodeId === nodeId && origin.ip === ip && origin.port === port) {
                        if (data.payload.program) {
                            const mapped = tsMonitoringMapper(data.payload.program);
                            setPrograms(mapped);
                        }
                        if (data.payload.stats) {
                            const mappedP1 = tsP1ErrorMapper(data.payload.stats);
                            const mappedP2 = tsP2ErrorMapper(data.payload.stats);
                            setP1Errors(mappedP1);
                            setP2Errors(mappedP2);
                        }
                    }
                }
            }
        );
        serviceSocketRef.current.on("data", (data: IDataEvent<IIpPortOrigin, ITsMonitoringDataPayload>) => {
            const {subscriptionType, origin} = data;
            if (subscriptionType === ESubscriptionType.tsMonitoring) {
                if (origin.nodeId === nodeId && origin.ip === ip && origin.port === port) {
                    if (isTsStatsData(data.payload)) {
                        const mappedP1 = tsP1ErrorMapper(data.payload);
                        const mappedP2 = tsP2ErrorMapper(data.payload);
                        setP1Errors(mappedP1);
                        setP2Errors(mappedP2);
                    } else {
                        const mapped = tsMonitoringMapper(data.payload);
                        setPrograms(mapped);
                    }
                }
            }
        });
        return () => {
            if (serviceSocketRef.current && nodeId && ip && port) {
                serviceSocketRef.current.emit("unsubscribe", {
                    origin: {nodeId, ip, port},
                    subscriptionType: ESubscriptionType.tsMonitoring,
                });
                RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).cleanup("/redis");
            }
        };
    }, [nodeId, ip, port]);

    return {programs, p1Errors, p2Errors, connected};
};

export const useUserNotifications = () => {
    const email = useSelector(commonSelectors.user.email);
    // const email = "test2@nextologies.com";
    const serviceSocketRef = useRef(RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).namespace("/redis"));
    const [connected, setConnected] = useState<boolean>(false);
    const [globalStatus, setGlobalStatus] = useState<string>("Connecting to service");
    const [subscribed, setSubscribed] = useState<boolean>(false);
    const [data, setData] = useState<INotificationRawData[]>([]);

    const dataReceived = useCallback(
        (eventData: IDataEvent<{email: string}, INotificationRawData>) => {
            const {subscriptionType, payload, origin} = eventData;
            if (subscriptionType === ESubscriptionType.notifications && email === origin.email) {
                setData((prev) => {
                    const items = [...prev, payload];
                    if (items.length >= 100) {
                        return items.slice(-100);
                    } else {
                        return items;
                    }
                });
            }
        },
        [email]
    );

    const subscribedEvent = useCallback(
        (data: ISubscribeEvent<{email: string}>) => {
            const {subscriptionType, origin} = data;
            if (subscriptionType === ESubscriptionType.notifications && email === origin.email) {
                setSubscribed((prev) => (!prev ? true : prev));
            }
        },
        [email]
    );

    useEffect(() => {
        if (email && !subscribed) {
            serviceSocketRef.current.emit("subscribe", {
                subscriptionType: ESubscriptionType.notifications,
                origin: {email},
            });
        }
        return () => {
            if (email && subscribed) {
                serviceSocketRef.current.emit("unsubscribe", {
                    subscriptionType: ESubscriptionType.notifications,
                    origin: {email},
                });
                setSubscribed(false);
                RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).cleanup("/redis");
            }
        };
    }, [email, subscribed]);

    useEffect(() => {
        serviceSocketRef.current.on("connect", () => {
            setConnected(true);
            setGlobalStatus("Connected to service");
        });
        serviceSocketRef.current.on("data", dataReceived);
        serviceSocketRef.current.on("subscribed", subscribedEvent);
        return () => {
            serviceSocketRef.current.removeListener("data", dataReceived);
            serviceSocketRef.current.removeListener("subscribed", subscribedEvent);
        };
    }, [dataReceived, subscribedEvent]);

    return {connected, globalStatus, data};
};

export const useUserNotificationList = () => {
    const dispatch = useDispatch();
    const email = useSelector(commonSelectors.user.email);

    useEffect(() => {
        if (email) {
            dispatch(notificationRuleActions.getNotificationsHistory({userId: email, quantity: 20}));
        }
    }, [dispatch, email]);
};

export const useMouseOut = <T extends HTMLElement>(handler?: (e?: MouseEvent) => void): RefObject<T> => {
    const elemRef = useRef<T>(null);

    const handleHandler = useCallback((e?: MouseEvent) => handler?.(e), [handler]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (elemRef.current && !elemRef.current.contains(e.target as HTMLElement)) {
                handleHandler(e);
            }
        };
        document.addEventListener("mouseover", handleClickOutside);
        return () => {
            document.removeEventListener("mouseover", handleClickOutside);
        };
    }, [elemRef, handleHandler]);

    return elemRef;
};
