import {useCallback, useMemo, useState} from "react";
import {Accordion} from "@nxt-ui/components";
import {BitrateMonitoring, CardAccordionHeader} from "@nxt-ui/cp/components";
import {EAppGeneralStatus, IListItemDestination, NumericId} from "@nxt-ui/cp/types";
import {useRealtimeMonitoring} from "@nxt-ui/cp/hooks";
import styled from "@emotion/styled";
import ErrorTable from "./errorTable";

type Props = {
    nodeId: NumericId;
    destination: IListItemDestination;
    monitor: boolean;
    status?: EAppGeneralStatus;
};

const CustomText = styled.strong<{bitrate?: number; errors?: number}>`
    color: ${({bitrate, errors}) =>
        bitrate === 0 ? "var(--danger)" : errors ? "var(--caution)" : "var(--grey-black)"};
`;

export const PerformanceChart = ({nodeId, destination, monitor, status}: Props) => {
    const [open, setOpen] = useState<boolean>(false);

    const {monitoring, errors} = useRealtimeMonitoring(nodeId, destination.outputIp, destination.outputPort);

    const toggleAccordion = useCallback(() => setOpen((prev) => !prev), []);

    const errorsAmmount = useMemo(() => {
        const errorsExist = typeof errors?.cc === "number" && errors.cc !== 0;
        return errorsExist && !open ? ` [${errors.cc}]` : "";
    }, [open, errors]);

    const bitrateValue = useMemo(() => {
        const bitrateString =
            typeof monitoring?.bitrate === "number" ? `${Math.round(monitoring.bitrate / 1000000)} Mbps` : "";
        return bitrateString;
    }, [monitoring]);

    const activeApp = useMemo(() => {
        return monitor && (status === EAppGeneralStatus.active || status === EAppGeneralStatus.error);
    }, [monitor, status]);

    return (
        <Accordion
            onClick={toggleAccordion}
            expanded={open}
            header={
                <CardAccordionHeader
                    title={
                        <>
                            {`${destination.outputIp}:${destination.outputPort}`} /&nbsp;
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
