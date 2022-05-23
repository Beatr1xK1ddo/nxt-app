import {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {EAppGeneralStatus, IRealtimeAppEvent, IRealtimeNodeStatusEvent} from "@nxt-ui/cp/types";
import {isIRealtimeAppStatusEvent, isIRealtimeAppTimingEvent} from "@nxt-ui/cp/utils";
import {RealtimeServicesSocketFactory} from "@nxt-ui/shared/utils";
import {commonActions, commonSelectors} from "@nxt-ui/cp-redux";

//todo: replace and remove
import {ICompany, INode, NxtAPI} from "@nxt-ui/cp/api";

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
                RealtimeServicesSocketFactory.server("https://qa.nextologies.com:1987/").cleanup(
                    "/redis"
                );
                serviceSocketRef.current.emit("unsubscribeApp", {appId, nodeId, appType: "ipbe"});
            }
        };
    }, [appId, appType, nodeId]);

    return {connected, status, startedAt};
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
                RealtimeServicesSocketFactory.server("https://qa.nextologies.com:1987/").cleanup(
                    "/redis"
                );
                serviceSocketRef.current.emit("unsubscribeNode", {
                    type: "status",
                    nodeId: nodesIds,
                });
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

//todo: remove everything beneath
export type IStatus = "pending" | "ok" | "error";

export function useGetNodes() {
    const initEffect = useCallback(async () => {
        try {
            setStatus("pending");

            const response = await NxtAPI.getNodes();

            setStatus("ok");

            set(response?.data);
        } catch (e) {
            setStatus("error");
            console.log("Error occured");
        }
    }, []);

    const [data, set] = useState<INode[]>();

    const [status, setStatus] = useState<IStatus>();

    useEffect(() => {
        initEffect();
    }, [initEffect]);

    return {data, status};
}

export function useGetCompanies() {
    const initEffect = useCallback(async () => {
        try {
            setStatus("pending");

            const response = await NxtAPI.getCompanies();

            setStatus("ok");

            set(response?.data);
        } catch (e) {
            setStatus("error");
            console.log("Error occured");
        }
    }, []);

    const [data, set] = useState<ICompany[]>();

    const [status, setStatus] = useState<IStatus>();

    useEffect(() => {
        initEffect();
    }, [initEffect]);

    return {data, status};
}

export function useFormData<T>(id: number, cb: (id: number) => Promise<T | undefined>) {
    const [data, set] = useState<T>();

    useEffect(() => {
        cb(id).then((data) => set(data));
    }, [id, cb]);

    return {data};
}
