import styled from "@emotion/styled";
import {ModalComponent} from "@nxt-ui/components";
import {TsMonitoring} from "@nxt-ui/cp/components";

import {useRealtimeMonitoring} from "@nxt-ui/cp/hooks";
import {BasicApplication, IListItemDestination} from "@nxt-ui/cp/types";
import {useCallback, useMemo, useState} from "react";

type Props = {
    nodeId: number;
    destination: IListItemDestination;
    appId: number;
    app: BasicApplication;
};

const CustomText = styled.strong<{bitrate?: number; cc?: boolean}>`
    color: ${({bitrate, cc}) => (bitrate === 0 ? "var(--danger)" : cc ? "var(--caution)" : "var(--grey-black)")};
`;

const Monitoring = ({nodeId, destination, appId, app}: Props) => {
    const [openTsMonitoring, setOpenTsMonitoring] = useState<boolean>(false);
    const {monitoring: monitoringData, errors} = useRealtimeMonitoring(
        nodeId,
        destination.outputIp,
        destination.outputPort,
        false
    );
    const monitoring = monitoringData.at(-1);

    const bitrateValue = useMemo(() => {
        const value = monitoring?.muxrate || monitoring?.bitrate;
        return typeof value === "number" ? `${(value / 1000000).toFixed(2)} Mbps` : "";
    }, [monitoring]);

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

    const closeTsHandler = useCallback(() => openTsMonitoring && setOpenTsMonitoring(false), [openTsMonitoring]);

    const openTsHandler = useCallback(() => setOpenTsMonitoring(true), []);

    return (
        <>
            <CustomText onClick={openTsHandler} bitrate={monitoring?.bitrate} cc={Boolean(errorValue)}>
                {`${bitrateValue} ${errorValue ? `[${errorValue}]` : ""}`}
            </CustomText>
            <ModalComponent
                className="thumbnail-modal"
                open={openTsMonitoring}
                onClose={closeTsHandler}
                aria-labelledby="thumbnail-modal">
                <TsMonitoring
                    closeMonitoringWrap={closeTsHandler}
                    nodeId={nodeId}
                    app={app}
                    destination={destination}
                />
            </ModalComponent>
        </>
    );
};

export default Monitoring;
