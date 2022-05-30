import {IApiNodesListItem} from "@nxt-ui/cp/api";
import {INodesListItem} from "@nxt-ui/cp/types";

export const nodesMapper = (node: IApiNodesListItem): INodesListItem => ({
    id: node.id,
    serialNumber: node.digitCode,
    name: node.name,
    hostname: node.hostname,
    online: node.is_online,
    cpuCoresNumber: node.cpuCore,
    cpuGovernorMode: node.cpuGovernor,
    cpuLoad: node.cpu,
    cpuTemperature: node.temperature,
    cpuLoadAverage: node.loadAverage,
    ramUsed: node.memoryUsed,
    ramTotal: node.memory_total,
    decklinkPortsNum: node.decklinkPortsNum,
    sdiPortMapping: node.sdiPortMapping,
});
