import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {
    EAppGeneralStatus,
    INodesListItem,
    IRealtimeAppEvent,
    IRealtimeNodeStatusEvent,
    ISdiValues,
    IBitrateMonitoring,
    NumericId,
} from "@nxt-ui/cp/types";
import {isIRealtimeAppStatusEvent, isIRealtimeAppTimingEvent, sdiDeviceMapper} from "@nxt-ui/cp/utils";
import {RealtimeServicesSocketFactory} from "@nxt-ui/shared/utils";
import {commonActions, commonSelectors} from "@nxt-ui/cp-redux";

export function useRealtimeAppData(
    nodeId: number,
    appType: string,
    appId: number,
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
        return () => {
            if (serviceSocketRef.current) {
                serviceSocketRef.current.emit("unsubscribeApp", {appId, nodeId, appType: "ipbe"});
                RealtimeServicesSocketFactory.server("https://qa.nextologies.com:1987/").cleanup("/redis");
            }
        };
    }, [appId, appType, nodeId]);

    return {connected, status, startedAt};
}

export function useRealtimeMonitoring(nodeId: NumericId, ip: string, port: null | number) {
    const [data, setData] = useState<null | IBitrateMonitoring>(null);

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
                setData(data);
                return true;
            } catch (e) {
                console.log("monitoring data fetch failure:", e);
                setData(null);
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

    return data;
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
            serviceSocketRef.current.on("realtimeNodeData", (event: IRealtimeNodeStatusEvent) => {
                dispatch(commonActions.nodesActions.setNodeStatus(event));
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

export function useEncoderVersionsList(node?: INodesListItem) {
    const [encoderValues, setEncoder] = useState<ISdiValues>();

    useEffect(() => {
        const result = sdiDeviceMapper(node?.sdiPortMapping, node?.decklinkPortsNum);
        setEncoder(result);
    }, [node]);

    return encoderValues;
}

export function useEncoderVersion(nodeId?: number, application?: string) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (nodeId && application) {
            dispatch(commonActions.applicationTypesActions.fetchApplicationTypes({nodeId, application}));
        }
    }, [dispatch, nodeId, application]);
}

//todo: remove everything beneath

export function useFormData<T>(id: number, cb: (id: number) => Promise<T | undefined>) {
    const [data, set] = useState<T>();

    useEffect(() => {
        cb(id).then((data) => set(data));
    }, [id, cb]);

    return {data};
}
