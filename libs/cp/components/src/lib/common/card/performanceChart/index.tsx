import {useCallback, useMemo, useState} from "react";
import {Accordion} from "@nxt-ui/components";
import {BitrateMonitoring, CardAccordionHeader} from "@nxt-ui/cp/components";
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

const CustomText = styled.strong<{bitrate?: number; errors?: number}>`
    color: ${({bitrate, errors}) =>
        bitrate === 0 ? "var(--danger)" : errors ? "var(--caution)" : "var(--grey-black)"};
`;

export const PerformanceChart = ({nodeId, destination, monitor, status}: Props) => {
    const [open, setOpen] = useState<boolean>(false);

    const {monitoring, errors} = useRealtimeMonitoring(nodeId, destination.outputIp, destination.outputPort);

    const activeApp = useMemo(() => {
        return (
            monitor &&
            (status === EAppGeneralStatus.active || status === EAppGeneralStatus.error) &&
            Boolean(monitoring)
        );
    }, [monitor, status, monitoring]);

    const toggleAccordion = useCallback(() => activeApp && setOpen((prev) => !prev), [activeApp]);

    const errorsAmmount = useMemo(() => {
        const errorsExist = typeof errors?.cc === "number" && errors.cc !== 0;
        return errorsExist && !open ? ` [${errors.cc}]` : "";
    }, [open, errors]);

    const bitrateValue = useMemo(() => {
        return typeof monitoring?.bitrate === "number" ? `${Math.round(monitoring.bitrate / 1000000)} Mbps` : "";
    }, [monitoring]);

    return (
        <Accordion
            onClick={toggleAccordion}
            expanded={open}
            active={activeApp}
            header={
                <CardAccordionHeader
                    title={
                        <>
                            {`${destination.outputIp}:${destination.outputPort} ${bitrateValue ? " / " : ""}`}
                            <CustomText bitrate={monitoring?.bitrate} errors={errors?.cc}>
                                {bitrateValue}
                                {errorsAmmount && `[${errorsAmmount}]`}
                            </CustomText>
                        </>
                    }
                    paragraph={<></>}
                />
            }
            TransitionProps={{unmountOnExit: true}}>
            {activeApp && (
                <>
                    <BitrateMonitoring data={monitoring} />
                    <ErrorTable data={errors} />
                </>
            )}
        </Accordion>
    );
};
