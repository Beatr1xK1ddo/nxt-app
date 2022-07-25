import {IApiProxyServerItem} from "@nxt-ui/cp/api";
import {IProxyServerItem} from "@nxt-ui/cp/types";

export const proxyServersMapper = (item: IApiProxyServerItem): IProxyServerItem => ({
    startedAtMs: item.startedAtMs,
    node: item.node,
    type: item._appType,
    company: item.company,
    id: item.id,
    name: item.name,
    ip: item.ip,
    port: item.port,
    status: item.status,
    statusChange: item.statusChange,
});
