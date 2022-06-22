import {useCallback, useMemo, useState} from "react";
import {Accordion} from "@nxt-ui/components";
import {BitrateMonitoring} from "@nxt-ui/cp/components";
import {IIpbeListItemDestination, NumericId} from "@nxt-ui/cp/types";

import IpbeCardAccordionHeader from "../accordionHeader";
import {useRealtimeMonitoring, useRealtimeMonitoringError} from "@nxt-ui/cp/hooks";
import styled from "@emotion/styled";
import ErrorTable from "./errorTable";

type Props = {
    nodeId: NumericId;
    destination: IIpbeListItemDestination;
    appId: number;
};

const CustomText = styled.strong<{bitrate?: number; errors?: number}>`
    color: ${({bitrate, errors}) =>
        bitrate === 0 ? "var(--danger)" : errors ? "var(--caution)" : "var(--grey-black)"};
`;

const PerformanceChart = ({nodeId, destination, appId}: Props) => {
    const [open, setOpen] = useState<boolean>(false);

    const {bitrate} = useRealtimeMonitoring(nodeId, destination.outputIp, destination.outputPort);

    const {errors} = useRealtimeMonitoringError(nodeId, destination.outputIp, destination.outputPort, "ipbe", appId);

    const toggleAccordion = useCallback(() => setOpen((prev) => !prev), []);

    const arrorsAmmount = useMemo(() => {
        const errorsExist = typeof errors?.cc === "number" && errors.cc !== 0;
        return errorsExist && !open ? ` [${errors.cc}]` : "";
    }, [errors?.cc, open]);

    const bitrateValue = useMemo(() => {
        const bitrateString =
            typeof bitrate?.bitrate === "number" ? `${Math.round(bitrate.bitrate / 1000000)} Mbps` : "";
        return bitrateString;
    }, [bitrate?.bitrate]);

    return (
        <Accordion
            onClick={toggleAccordion}
            expanded={open}
            header={
                <IpbeCardAccordionHeader
                    title={"Performance chart"}
                    paragraph={
                        <>
                            {`${destination.outputIp}:${destination.outputPort}`}
                            <CustomText bitrate={bitrate?.bitrate} errors={errors?.cc}>
                                {bitrateValue}
                                {arrorsAmmount}
                            </CustomText>
                        </>
                    }
                />
            }
            TransitionProps={{unmountOnExit: true}}>
            <>
                <BitrateMonitoring data={bitrate} />
                <ErrorTable data={errors} />
            </>
        </Accordion>
    );
};

export default PerformanceChart;
