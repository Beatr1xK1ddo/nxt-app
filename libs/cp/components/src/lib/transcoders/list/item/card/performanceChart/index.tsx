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

    const {monitoring} = useRealtimeMonitoring(nodeId, destination.outputIp, destination.outputPort);

    const {errors} = useRealtimeMonitoringError(nodeId, destination.outputIp, destination.outputPort, "ipbe", appId);

    const toggleAccordion = useCallback(() => setOpen((prev) => !prev), []);

    const errorsAmmount = useMemo(() => {
        const errorsExist = typeof errors?.cc === "number" && errors.cc !== 0;
        return errorsExist && !open ? ` [${errors.cc}]` : "";
    }, [errors?.cc, open]);

    const bitrateValue = useMemo(() => {
        const bitrateString =
            typeof monitoring?.bitrate === "number" ? `${Math.round(monitoring.bitrate / 1000000)} Mbps` : "";
        return bitrateString;
    }, [monitoring?.bitrate]);

    return (
        <Accordion
            onClick={toggleAccordion}
            expanded={open}
            header={
                <IpbeCardAccordionHeader
                    title={
                        <>
                            {`${destination.outputIp}:${destination.outputPort}`} /&nbsp;
                            <CustomText bitrate={monitoring?.bitrate} errors={errors?.cc}>
                                {bitrateValue}
                                {errorsAmmount}
                            </CustomText>
                        </>
                    }
                    paragraph={<></>}
                />
            }
            TransitionProps={{unmountOnExit: true}}
        >
            <>
                <BitrateMonitoring data={monitoring} />
                <ErrorTable data={errors} />
            </>
        </Accordion>
    );
};

export default PerformanceChart;
