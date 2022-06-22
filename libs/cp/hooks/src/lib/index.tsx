import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {formatDistance} from "date-fns";
import {v4} from "uuid";

import {
    EAppGeneralStatus,
    ENotificationType,
    IMonitoringData,
    IMonitoringErrorsData,
    INodesListItem,
    IRealtimeAppEvent,
    IRealtimeNodeEvent,
    IRedisSubscribeToKeyBitrateEvent,
    IRedisSubscribeToKeyErrorEvent,
    ISdiValues,
    IThumbnailEvent,
    NodeSystemState,
    NumericId,
    Optional,
} from "@nxt-ui/cp/types";
import {
    isIRealtimeAppStatusEvent,
    isIRealtimeAppTimingEvent,
    isIRealtimeNodePingEvent,
    isIRealtimeNodeStatusEvent,
    isIRealtimeNodeSystemStateEvent,
    sdiDeviceMapper,
} from "@nxt-ui/cp/utils";
import {RealtimeServicesSocketFactory} from "@nxt-ui/shared/utils";
import {commonActions, commonSelectors, CpRootState, ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {Socket} from "socket.io-client";

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
        setStatus(initialStatus);
        setStartedAt(initialStartedAt);
    }, [initialStartedAt, initialStatus]);

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
            return "";
        }
    }, [status, startedAt]);

    return {connected, status, startedAt, runTime};
}

export function useRealtimeNodeData(nodeId: Optional<NumericId>) {
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
        serviceSocketRef.current.on("thumbnail", (data: IThumbnailEvent) => {
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

export function useRealtimeMonitoring(data: IRedisSubscribeToKeyBitrateEvent) {
    const serviceSocketRef = useRef<Socket>();

    const [bitrate, setBitrate] = useState<Optional<IMonitoringData>>(null);
    const [connected, setConnected] = useState<boolean>(false);

    useEffect(() => {
        if (!serviceSocketRef.current || serviceSocketRef.current.disconnected) {
            serviceSocketRef.current =
                RealtimeServicesSocketFactory.server("http://localhost:1987").namespace("/redis");
        }
        serviceSocketRef.current.on("connect", () => {
            setConnected(true);
        });
        serviceSocketRef.current.on("realtimeMonitoring", (data) => {
            const cleanData = JSON.parse(data) as IMonitoringData;
            setBitrate(cleanData);
        });
        serviceSocketRef.current?.emit("subscribe", data);

        return () => {
            if (serviceSocketRef.current) {
                serviceSocketRef.current.emit("unsubscribe", data);
                RealtimeServicesSocketFactory.server("http://localhost:1987").cleanup("/redis");
            }
        };
    }, [data]);

    useEffect(() => {
        if (serviceSocketRef.current?.disconnected) {
            setConnected(false);
        }
    }, [serviceSocketRef.current?.disconnect]);

    return {bitrate, connected};
}

export function useRealtimeMonitoringError(data: IRedisSubscribeToKeyErrorEvent) {
    const serviceSocketRef = useRef<Socket>();

    const [errors, setErrors] = useState<Optional<IMonitoringErrorsData>>(null);
    const [connected, setConnected] = useState<boolean>(false);

    useEffect(() => {
        if (!serviceSocketRef.current || serviceSocketRef.current.disconnected) {
            serviceSocketRef.current =
                RealtimeServicesSocketFactory.server("http://localhost:1987").namespace("/redis");
        }
        serviceSocketRef.current.on("connect", () => {
            setConnected(true);
        });
        serviceSocketRef.current.on("realtimeMonitoringErrors", (data) => {
            const cleanData = JSON.parse(data) as IMonitoringErrorsData;
            setErrors(cleanData);
        });
        serviceSocketRef.current?.emit("subscribe", data);

        return () => {
            if (serviceSocketRef.current) {
                serviceSocketRef.current.emit("unsubscribe", data);
                RealtimeServicesSocketFactory.server("http://localhost:1987").cleanup("/redis");
            }
        };
    }, [data]);

    useEffect(() => {
        if (serviceSocketRef.current?.disconnected) {
            setConnected(false);
        }
    }, [serviceSocketRef.current?.disconnect]);

    return {errors, connected};
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
