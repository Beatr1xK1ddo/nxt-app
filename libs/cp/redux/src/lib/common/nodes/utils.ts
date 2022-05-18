import {IApiNodesListItem} from "@nxt-ui/cp/api";
import {INodesListItem} from "@nxt-ui/cp/types";

export const nodesMapper = (node: IApiNodesListItem): INodesListItem => ({
    id: node.id,
    serialNumber: node.digit_code,
    name: node.name,
    hostname: node.hostname,
    online: node.is_online,
    cpuCoresNumber: node.cpu_core,
    cpuGovernorMode: node.cpu_governor,
    cpuLoad: node.cpu,
    cpuTemperature: node.temperature,
    cpuLoadAverage: node.load_average,
    ramUsed: node.memory_used,
    ramTotal: node.memory_total,
});
