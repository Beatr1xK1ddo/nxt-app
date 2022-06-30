import React, {useMemo} from "react";
import {useSelector} from "react-redux";

import {ipbeEditSelectors} from "@nxt-ui/cp-redux";

import Destination from "./destination";

const Destinations = () => {
    const {nodeId, ipbeDestinations, id} = useSelector(ipbeEditSelectors.main.values);

    const destinations = useMemo(() => {
        if (nodeId && ipbeDestinations) {
            return ipbeDestinations.map((destination) => (
                <Destination key={destination.id} appId={id} nodeId={nodeId} destination={destination} />
            ));
        } else {
            return null;
        }
    }, [nodeId, ipbeDestinations, id]);

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{destinations}</>;
};

export default Destinations;
