export const txrMainRequiredFields = [
    "name",
    "company",
    "appType",
    "sourceIp",
    "sourcePort",
    "transmissionIp",
    "destinationIp",
    "destinationPort",
    "transmissionPort",
    "rxRunMonitor",
    "txNodeId",
    "rxNodeId",
];

export const ttlValues = Array.from(Array(65).keys());

export const doubleRetransmissionValues = [
    "always on",
    "off",
    "after 1 retransmission",
    "after 2 retransmission",
    "after 3 retransmission",
    "after 4 retransmission",
    "after 5 retransmission",
];

export const LatencyMultiplier = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4];
