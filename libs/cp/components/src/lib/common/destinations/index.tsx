import {FC} from "react";

import Destination from "./destination";
import {BasicApplication, IDestination, Optional} from "@nxt-ui/cp/types";

export type IDestinations = {
    nodeId: Optional<number>;
    destinations: Array<IDestination> | IDestination;
    app: BasicApplication;
};

const Destinations: FC<IDestinations> = ({nodeId, destinations, app}) => {
    if (nodeId && destinations) {
        if (Array.isArray(destinations)) {
            return (
                <>
                    {destinations.map((destination, index) => (
                        <Destination key={index} nodeId={nodeId} destination={destination} app={app} />
                    ))}
                </>
            );
        } else {
            return <Destination nodeId={nodeId} destination={destinations} app={app} />;
        }
    }
    return null;
};

export default Destinations;
