import {useCallback, useMemo, useState} from "react";
import {Accordion} from "@nxt-ui/components";
import {BitrateMonitoring} from "@nxt-ui/cp/components";
import {IIpbeListItemDestination, NumericId} from "@nxt-ui/cp/types";

import IpbeCardAccordionHeader from "../accordionHeader";
import {useRealtimeMonitoring} from "@nxt-ui/cp/hooks";
import styled from "@emotion/styled";
import ErrorTable from "./errorTable";

type Props = {
    nodeId: NumericId;
    destination: IIpbeListItemDestination;
};

const CustomText = styled.strong<{bitrate: number; errors: number}>`
    color: ${({bitrate, errors}) =>
        bitrate === 0 ? "var(--danger)" : errors ? "var(--caution)" : "var(--grey-black)"};
`;

const PerformanceChart = ({nodeId, destination}: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [data, bitrate] = useRealtimeMonitoring(nodeId, destination.outputIp, destination.outputPort);

    const integerBitrate = useMemo(() => {
        const value = parseInt(bitrate);
        return value;
    }, [bitrate]);

    const bitrateErrorCount = useMemo(() => {
        const errors = data?.errors;
        let count = 0;
        if (errors) {
            const keys = Object.keys(errors);
            keys.forEach((key) => {
                if (errors[key]?.errorCount) {
                    count += errors[key]?.errorCount;
                }
            });
        }
        return count;
    }, [data]);

    const toggleAccordion = useCallback(() => setOpen((prev) => !prev), []);

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
                            <CustomText bitrate={integerBitrate} errors={bitrateErrorCount}>
                                {bitrate}
                                {Number(bitrateErrorCount) !== 0 && !open ? ` [${bitrateErrorCount}]` : ""}
                            </CustomText>
                        </>
                    }
                />
            }
            TransitionProps={{unmountOnExit: true}}>
            <>
                <BitrateMonitoring data={data} />
                <ErrorTable data={data} />
            </>
        </Accordion>
    );
};

export default PerformanceChart;
