import {useCallback, useMemo, useState} from "react";
import {Accordion} from "@nxt-ui/components";
import {BitrateMonitoring, CardAccordionHeader} from "@nxt-ui/cp/components";
import {IListItemDestination, NumericId} from "@nxt-ui/cp/types";
import {useRealtimeMonitoring} from "@nxt-ui/cp/hooks";
import styled from "@emotion/styled";
import ErrorTable from "./errorTable";

type Props = {
    nodeId: NumericId;
    destination: IListItemDestination;
};

const CustomText = styled.strong<{bitrate?: number; errors?: number}>`
    color: ${({bitrate, errors}) =>
        bitrate === 0 ? "var(--danger)" : errors ? "var(--caution)" : "var(--grey-black)"};
`;

export const PerformanceChart = ({nodeId, destination}: Props) => {
    const [open, setOpen] = useState<boolean>(false);

    const {monitoring, errors, initial} = useRealtimeMonitoring(nodeId, destination.outputIp, destination.outputPort);

    const errorsValue = useMemo(() => {
        if (errors) return errors;
        return initial
            ? {
                  ...initial?.[initial.length - 1].errors,
                  moment: initial?.[initial.length - 1].moment,
              }
            : null;
    }, [errors, initial]);

    const monitoringValue = useMemo(() => {
        if (monitoring) return monitoring;
        return initial
            ? {
                  ...initial?.[initial.length - 1].monitoring,
                  moment: initial?.[initial.length - 1].moment,
              }
            : null;
    }, [monitoring, initial]);

    const toggleAccordion = useCallback(() => setOpen((prev) => !prev), []);

    const errorsAmmount = useMemo(() => {
        const errorsExist = typeof errorsValue?.cc === "number" && errorsValue.cc !== 0;
        return errorsExist && !open ? ` [${errorsValue.cc}]` : "";
    }, [errorsValue, open]);

    const bitrateValue = useMemo(() => {
        const bitrateString =
            typeof monitoringValue?.bitrate === "number" ? `${Math.round(monitoringValue.bitrate / 1000000)} Mbps` : "";
        return bitrateString;
    }, [monitoringValue?.bitrate]);

    return (
        <Accordion
            onClick={toggleAccordion}
            expanded={open}
            header={
                <CardAccordionHeader
                    title={
                        <>
                            {`${destination.outputIp}:${destination.outputPort}`} /&nbsp;
                            <CustomText bitrate={monitoringValue?.bitrate} errors={errorsValue?.cc}>
                                {bitrateValue}
                                {errorsAmmount && `[${errorsAmmount}]`}
                            </CustomText>
                        </>
                    }
                    paragraph={<></>}
                />
            }
            TransitionProps={{unmountOnExit: true}}
        >
            <>
                <BitrateMonitoring data={monitoringValue} />
                <ErrorTable data={errorsValue} />
            </>
        </Accordion>
    );
};
