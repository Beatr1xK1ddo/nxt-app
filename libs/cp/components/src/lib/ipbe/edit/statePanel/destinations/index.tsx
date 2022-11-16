import {FC, useState, useEffect} from "react";
import {BasicApplication, EDataProcessingStatus, IDestination, Optional} from "@nxt-ui/cp/types";
import Destination from "../../../../common/destinations/destination";
import {useSelector} from "react-redux";
import {ipbeEditSelectors} from "@nxt-ui/cp-redux";

export type IDestinations = {
    nodeId: Optional<number>;
    destinations: Array<IDestination> | IDestination;
    app: BasicApplication;
};

const AppDestinations: FC<IDestinations> = ({nodeId, destinations, app}) => {
    const [destinationsState, setDestination] = useState<Array<IDestination> | IDestination>(destinations);
    const [updateRequired, setUpdateRequired] = useState<boolean>(false);
    const status = useSelector(ipbeEditSelectors.selectStatus);

    useEffect(() => {
        if (status === EDataProcessingStatus.loading) {
            setUpdateRequired(true);
        }
    }, [status]);

    useEffect(() => {
        if (status === EDataProcessingStatus.succeeded && updateRequired) {
            setDestination(destinations);
            setUpdateRequired(false);
        }
    }, [destinations, updateRequired, status]);

    if (nodeId && destinations) {
        if (Array.isArray(destinationsState)) {
            return (
                <>
                    {destinationsState.map((destination, index) => (
                        <Destination key={index} nodeId={nodeId} destination={destination} app={app} />
                    ))}
                </>
            );
        } else {
            return <Destination nodeId={nodeId} destination={destinationsState} app={app} />;
        }
    }
    return null;
};

export default AppDestinations;
