import React, {useMemo} from "react";
import {useSelector} from "react-redux";

import {txrEditSelectors} from "@nxt-ui/cp-redux";

import Destination from "./destination";

const Destinations = () => {
    const {nodeId, txrDestinations, id} = useSelector(txrEditSelectors.main.values);

    const destinations = useMemo(() => {
        if (nodeId && txrDestinations) {
            return txrDestinations.map((destination) => (
                <Destination key={destination.id} appId={id} nodeId={nodeId} destination={destination} />
            ));
        } else {
            return null;
        }
    }, [nodeId, txrDestinations, id]);

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{destinations}</>;
};

export default Destinations;
