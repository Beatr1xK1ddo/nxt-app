import React, {useMemo} from "react";
import {useSelector} from "react-redux";

import {txrEditSelectors} from "@nxt-ui/cp-redux";

import Destination from "./destination";

const Destinations = () => {
    const {txNodeId, rxNodeId, destinationIp, destinationPort, id, ttl} = useSelector(txrEditSelectors.main.values);

    const destinations = useMemo(() => {
        const destination = {outputIp: destinationIp, outputPort: destinationPort, ttl: ttl};
        txNodeId && <Destination appId={id} nodeId={txNodeId} destination={destination} />;
        rxNodeId && <Destination appId={id} nodeId={rxNodeId} destination={destination} />;
    }, [txNodeId, destinationIp, destinationPort, id]);

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{destinations}</>;
};

export default Destinations;
