import {MouseEvent, useCallback, useMemo, useState} from "react";
import {Accordion, ModalComponent} from "@nxt-ui/components";
import {CardAccordionHeader, BitrateMonitoring, TsMonitoring} from "@nxt-ui/cp/components";
import {BasicApplication, EAppGeneralStatus, IDestination, Optional} from "@nxt-ui/cp/types";
import {useRealtimeAppData, useRealtimeMonitoring} from "@nxt-ui/cp/hooks";
import styled from "@emotion/styled";
import ErrorTable from "./errorTable";

type Props = {
    app: BasicApplication;
    destination: IDestination;
    monitor: boolean;
    nodeId: Optional<number>;
};

const CustomText = styled.strong<{bitrate?: number; cc?: number}>`
    color: ${({bitrate, cc}) => (bitrate === 0 ? "var(--danger)" : cc ? "var(--caution)" : "var(--grey-black)")};
`;

export const PerformanceChart = ({destination, monitor, app, nodeId}: Props) => {
    const {type} = app;
    const [openAccordion, setOpenAccordion] = useState<boolean>(false);
    const [openTsMonitoring, setOpenTsMonitoring] = useState<boolean>(false);

    const {status} = useRealtimeAppData(app, nodeId);

    const {monitoring: monitoringData, errors} = useRealtimeMonitoring(
        nodeId,
        destination.outputIp,
        destination.outputPort
    );
    const monitoring = monitoringData.at(-1);
    const activeApp = useMemo(() => {
        const activeStatus = status === EAppGeneralStatus.active || status === EAppGeneralStatus.error;
        return monitor && activeStatus && Boolean(monitoring);
    }, [monitor, status, monitoring]);

    const toggleAccordion = useCallback(() => activeApp && setOpenAccordion((prev) => !prev), [activeApp]);

    const closeTsHandler = useCallback(() => openTsMonitoring && setOpenTsMonitoring(false), [openTsMonitoring]);

    const errorValue = useMemo(() => {
        if (!errors) {
            return "";
        }
        const errTime = errors.cc.time;
        const date = +new Date() - +new Date(errTime);
        if (date > 60000) {
            return "";
        }
        return errors.cc.amount;
    }, [errors]);

    const bitrateValue = useMemo(() => {
        return typeof monitoring?.bitrate === "number"
            ? `${((monitoring.muxrate || monitoring.bitrate) / 1000000).toFixed(2)} Mbps`
            : "";
    }, [monitoring]);

    const openTsHandler = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            if (openAccordion) {
                setOpenTsMonitoring(true);
            }
        },
        [openAccordion]
    );

    return (
        <>
            <Accordion
                expanded={openAccordion}
                active={activeApp}
                onClick={toggleAccordion}
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
                        {monitoringData && <BitrateMonitoring onClick={openTsHandler} data={monitoringData} />}
                        <ErrorTable data={errors} />
                    </>
                )}
            </Accordion>
            <ModalComponent
                className="thumbnail-modal"
                open={openTsMonitoring}
                onClose={closeTsHandler}
                aria-labelledby="thumbnail-modal">
                <TsMonitoring nodeId={nodeId} app={app} destination={destination} />
            </ModalComponent>
        </>
    );
};
