import {txrEditMainSlice} from "./slice";

const {
    setName,
    setCompany,
    setSourceIp,
    setTxNodeId,
    setRxNodeId,
    setSourcePort,
    setTxUseInterface,
    setTransmissionIp,
    setDestinationIp,
    setDestinationPort,
    setRxUseInterface,
    setTransmissionPort,
    setBufferHandler,
    setTTLPort,
    setDoubleRetransmission,
    setOpenPortAt,
    toggleRxRunMonitor,
    setAppType,
    setTxrFromTemplate,
    setLatencyMode,
    setLatencyMultiplier,
    setLatencyTime,
    setRecvBuffer,
    setFecSize,
    toggleFec,
    toggleTxRunMonitor,
    toggleArq,
    toggleEndpoint,
    setProxyServers,
    removeProxyServerItem,
    toggleLockTransmission,
} = txrEditMainSlice.actions;

export {
    setName,
    setCompany,
    setSourceIp,
    setTxNodeId,
    setRxNodeId,
    setSourcePort,
    setTxUseInterface,
    setTransmissionIp,
    setDestinationIp,
    setDestinationPort,
    setRxUseInterface,
    setTransmissionPort,
    setBufferHandler,
    setTTLPort,
    setDoubleRetransmission,
    setOpenPortAt,
    toggleRxRunMonitor,
    setAppType,
    setTxrFromTemplate,
    setLatencyMode,
    setLatencyMultiplier,
    setLatencyTime,
    setRecvBuffer,
    setFecSize,
    toggleFec,
    toggleTxRunMonitor,
    toggleArq,
    toggleEndpoint,
    setProxyServers,
    removeProxyServerItem,
    toggleLockTransmission,
};
