import React, {useMemo} from "react";
import {Accordion} from "@nxt-ui/components";
import {BitrateMonitoring} from "@nxt-ui/cp/components";
import {IIpbeListItemDestination, NumericId} from "@nxt-ui/cp/types";

import IpbeCardAccordionHeader from "../accordionHeader";
import {useRealtimeMonitoring} from "@nxt-ui/cp/hooks";
import {bitrateFormatter} from "@nxt-ui/cp/utils";

type Props = {
    nodeId: NumericId;
    destination: IIpbeListItemDestination;
};

const PerformanceChart = ({nodeId, destination}: Props) => {
    const data = useRealtimeMonitoring(nodeId, destination.outputIp, destination.outputPort);

    const lastBitrateValue = useMemo(() => {
        const lastItem = data?.data[data?.data.length - 1];
        if (lastItem) {
            return bitrateFormatter(lastItem.bitrate, 0);
        } else {
            return "unknown";
        }
    }, [data]);

    const gotData = useMemo(() => {
        return !!(data !== null && data.data && data.data.length);
    }, [data]);

    return (
        <Accordion
            header={
                <IpbeCardAccordionHeader
                    title={"Performance chart"}
                    paragraph={
                        <>
                            {`${destination.outputIp}:${destination.outputPort}`}
                            <strong>{lastBitrateValue}</strong>
                        </>
                    }
                />
            }
            TransitionProps={{unmountOnExit: true}}>
            {gotData && <BitrateMonitoring data={data} />}
        </Accordion>
    );
};

export default PerformanceChart;
