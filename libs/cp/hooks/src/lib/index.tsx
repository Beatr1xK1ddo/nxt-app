import {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {formatDistance} from "date-fns";
import {useParams} from "react-router-dom";
import {v4} from "uuid";

import {
    BasicApplication,
    EAppGeneralStatus,
    EAppGeneralStatusChange,
    EAppType,
    ENotificationType,
    ESubscriptionType,
    IAppData,
    IAppDataSubscribedEvent,
    IAppIdAppTypeOrigin,
    IAppStatusData,
    IAppTimingData,
    IDataEvent,
    IDeckLinkDeviceEvent,
    IDeckLinkDevices,
    IIpPortOrigin,
    ILogRecordState,
    ILogTypeDataEvent,
    ILogTypeState,
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
import {sdiDeviceMapper} from "@nxt-ui/cp/utils";
import {RealtimeServicesSocketFactory} from "@nxt-ui/shared/utils";
import {
    commonActions,
    commonSelectors,
    CpRootState,
    ipbeEditActions,
    ipbeEditSelectors,
    txrEditActions,
} from "@nxt-ui/cp-redux";
import {History, Transition} from "history";
import {Navigator} from "react-router";
import {UNSAFE_NavigationContext as NavigationContext} from "react-router-dom";

const REALTIME_SERVICE_URL = "https://qa.nextologies.com:1987";
// const REALTIME_SERVICE_URL = "https://nxt-dev-env.nextologies.com:1987";

export function useRealtimeAppData(app: BasicApplication, nodeId: Optional<NumericId>) {
    const serviceSocketRef = useRef(RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).namespace("/redis"));

    const [connected, setConnected] = useState<boolean>(serviceSocketRef.current.connected);
    const [subscribed, setSubscribed] = useState<boolean>(false);
    const [status, setStatus] = useState<Optional<EAppGeneralStatus>>(app.status);
    const [statusChange, setStatusChange] = useState<Optional<EAppGeneralStatusChange>>(app.statusChange);
    const [startedAt, setStartedAt] = useState<Optional<number>>(app.startedAtMs);

    useEffect(() => {
        serviceSocketRef.current.on("connect", () => setConnected(true));
        serviceSocketRef.current.on("disconnect", () => {
            setConnected(false);
            setSubscribed(false);
        });
        serviceSocketRef.current.on("error", console.error);
    }, []);

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
        return () => {
            if (connected && subscribed) {
                serviceSocketRef.current.emit("unsubscribe", {...event, subscriptionType: "appStatus"});
                serviceSocketRef.current.emit("unsubscribe", {...event, subscriptionType: "appRuntime"});
            }
            RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).cleanup("/redis");
        };
    }, [nodeId, app, connected, subscribed]);

    const runTime = useMemo(() => {
        if (startedAt) {
            return formatDistance(startedAt, new Date(), {addSuffix: false});
        } else {
            return "Unknown";
        }
    }, [startedAt]);

    return {connected, status, statusChange, startedAt, runTime};
}

export function useRealtimeNodeData(id: Optional<NumericId>) {
    const serviceSocketRef = useRef(RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).namespace("/redis"));

    const node = useSelector<CpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, id)
    );

    const [subscribed, setSubscribed] = useState<boolean>(false);
    const [connected, setConnected] = useState<boolean>(serviceSocketRef.current.connected);
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
                    if (subscriptionType === "nodeSystem") {
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
            }
            RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).cleanup("/redis");
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
    const [connected, setConnected] = useState<boolean>(serviceSocketRef.current.connected);
    const [subscribed, setSubscribed] = useState<boolean>(false);

    useEffect(() => {
        const event = {origin: {nodeId, ip, port}, subscriptionType: ESubscriptionType.monitoring};
        serviceSocketRef.current.on("connect", () => setConnected(true));
        if (!subscribed && connected && nodeId && ip && port) {
            serviceSocketRef.current?.emit("subscribe", event);
        }
        serviceSocketRef.current.on("subscribed", (event: ISubscribedEvent<IIpPortOrigin, Array<IMonitoringData>>) => {
            const {subscriptionType, origin, payload} = event;
            if (subscriptionType === ESubscriptionType.monitoring) {
                const {nodeId: eventNodeId, ip: eventIp, port: eventPort} = origin;
                if (eventNodeId === nodeId && eventIp === ip && eventPort === port && payload.length) {
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
            setSubscribed(true);
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
        serviceSocketRef.current.on("disconnect", () => {
            setConnected(false);
            setSubscribed(false);
        });
        return () => {
            if (connected && subscribed) {
                serviceSocketRef.current.emit("unsubscribe", event);
                RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).cleanup("/redis");
            }
        };
    }, [nodeId, ip, port, connected, subscribed]);

    return {monitoring, errors, connected, initial};
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

    const [subscribed, setSubscribed] = useState<boolean>(false);
    const [connected, setConnected] = useState<boolean>(serviceSocketRef.current.connected);

    useEffect(() => {
        dispatch(commonActions.nodesActions.fetchNodes(appType));
    }, [appType, dispatch]);

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
    appType: string,
    appId: Optional<NumericId>,
    appLogsTypes?: Optional<Array<string>>
) {
    const serviceSocketRef = useRef(RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).namespace("/logging"));

    const [connected, setConnected] = useState<boolean>(false);
    const [logsTypes, setLogsTypes] = useState<Array<ILogTypeState>>([]);
    const [logs, setLogs] = useState<Map<string, Array<ILogRecordState>>>(new Map());

    useEffect(() => {
        if (appLogsTypes?.length) {
            serviceSocketRef.current.emit("subscribe", {nodeId, appType, appId, appLogsTypes});
        }
    }, [appLogsTypes, nodeId, appType, appId]);

    useEffect(() => {
        if (serviceSocketRef.current?.active) {
            serviceSocketRef.current.emit("init", {nodeId, appType, appId});
        }
        serviceSocketRef.current.on("connect", () => setConnected(true));
        serviceSocketRef.current.on("disconnect", () => setConnected(false));
        serviceSocketRef.current.on(
            "appLogsTypes",
            (event: {nodeId: NumericId; appType: string; appId: NumericId; appLogsTypes: Optional<Array<string>>}) => {
                if (nodeId === event.nodeId && appType === event.appType && appId === event.appId) {
                    const appLogsTypes = event.appLogsTypes ?? [];
                    setLogsTypes(appLogsTypes.map((value) => ({value, id: v4()})));
                }
            }
        );
        serviceSocketRef.current.on("data", (event: ILogTypeDataEvent) => {
            if (
                nodeId === event.nodeId &&
                appType === event.appType &&
                appId === event.appId &&
                appLogsTypes?.includes(event.appLogType)
            ) {
                setLogs((state) => {
                    const logRecord = {id: v4(), ...event.records[0]};
                    const typeLogs = state.get(event.appLogType) || [];
                    const logs = new Map(state);
                    if (typeLogs.length < 99) {
                        logs.set(event.appLogType, [logRecord, ...typeLogs]);
                    } else {
                        logs.set(event.appLogType, [logRecord, ...typeLogs.slice(0, 99)]);
                    }
                    return logs;
                });
            }
        });
        return () => {
            if (serviceSocketRef.current) {
                serviceSocketRef.current.emit("unsubscribe", {nodeId, appType, appId, appLogsTypes: null});
                RealtimeServicesSocketFactory.server(REALTIME_SERVICE_URL).cleanup("/logging");
            }
        };
    }, [nodeId, appType, appId, appLogsTypes, connected]);

    return {connected, logs, logsTypes};
}

export function useChangeFormListener(values: any) {
    const dispatch = useDispatch();
    const prevValues = useRef(null);
    const isEdit = useEditMode();
    useEffect(() => {
        const currentValues = values;
        const stringifyCurrentValues = JSON.stringify(currentValues);
        const stringifyPrevValues = JSON.stringify(prevValues.current);
        const dataIsReadyToCheck =
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            !!prevValues.current && ((isEdit && prevValues.current?.id) || (!isEdit && !prevValues.current?.id));
        if (dataIsReadyToCheck && stringifyCurrentValues !== stringifyPrevValues) {
            dispatch(commonActions.applicationActions.setAppFormStatus(true));
        }
        prevValues.current = currentValues;
    }, [values, dispatch, isEdit, prevValues]);
}

export function useRemoveChangeFormListener() {
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(commonActions.applicationActions.setAppFormStatus(false));
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
