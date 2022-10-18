import {useCallback, useMemo, useState} from "react";
import {Accordion} from "@nxt-ui/components";
import {CardAccordionHeader, BitrateMonitoring} from "@nxt-ui/cp/components";
import {EAppGeneralStatus, IDestination, NumericId, Optional} from "@nxt-ui/cp/types";
import {useRealtimeMonitoring} from "@nxt-ui/cp/hooks";
import styled from "@emotion/styled";
import ErrorTable from "./errorTable";

type Props = {
    nodeId: Optional<NumericId>;
    destination: IDestination;
    monitor: boolean;
    status: Optional<EAppGeneralStatus>;
};

const CustomText = styled.strong<{bitrate?: number; cc?: number}>`
    color: ${({bitrate, cc}) => (bitrate === 0 ? "var(--danger)" : cc ? "var(--caution)" : "var(--grey-black)")};
`;

export const PerformanceChart = ({nodeId, destination, monitor, status}: Props) => {
    const [open, setOpen] = useState<boolean>(false);

    const {monitoring: monitoringData, errors} = useRealtimeMonitoring(
        nodeId,
        destination.outputIp,
        destination.outputPort
    );
    const monitoring = monitoringData.at(-1);
    const activeApp = useMemo(() => {
        return (
            monitor &&
            (status === EAppGeneralStatus.active || status === EAppGeneralStatus.error) &&
            Boolean(monitoring)
        );
    }, [monitor, status, monitoring]);

    const toggleAccordion = useCallback(() => activeApp && setOpen((prev) => !prev), [activeApp]);

    const errorValue = useMemo(() => {
        const error = errors?.cc.amount;
        return error ? error : "";
    }, [errors]);

    const bitrateValue = useMemo(() => {
        return typeof monitoring?.bitrate === "number" ? `${(monitoring.bitrate / 1000000).toFixed(2)} Mbps` : "";
    }, [monitoring]);

    return (
        <Accordion
            onClick={toggleAccordion}
            expanded={open}
            active={activeApp}
            header={
                <CardAccordionHeader
                    title={
                        <div className="ipbe-destination-title">
                            {`${destination.outputIp}:${destination.outputPort} ${activeApp ? " / " : ""}`}
                            {activeApp && (
                                <CustomText bitrate={monitoring?.bitrate} cc={errors?.cc.amount}>
                                    {bitrateValue}
                                    {errorValue && `[${errorValue}]`}
                                </CustomText>
                            )}
                        </div>
                    }
                    paragraph={<></>}
                />
            }
            TransitionProps={{unmountOnExit: true}}>
            {activeApp && (
                <>
                    {/* @ts-ignore */}
                    {monitoringData && <BitrateMonitoring data={monitoringData} />}
                    <ErrorTable data={errors} />
                </>
            )}
        </Accordion>
    );
};
