import {FC} from "react";

import Destination from "./destination";
import {IDestination, Optional} from "@nxt-ui/cp/types";

export type IDestinations = {
    nodeId: Optional<number>;
    destinations: Array<IDestination> | IDestination;
};

const Destinations: FC<IDestinations> = ({nodeId, destinations}) => {
    if (nodeId && destinations) {
        if (Array.isArray(destinations)) {
            return (
                <>
                    {destinations.map((destination, index) => (
                        <Destination key={index} nodeId={nodeId} destination={destination} />
                    ))}
                </>
            );
        } else {
            return <Destination nodeId={nodeId} destination={destinations} />;
        }
    }
    return null;
};

export default Destinations;
