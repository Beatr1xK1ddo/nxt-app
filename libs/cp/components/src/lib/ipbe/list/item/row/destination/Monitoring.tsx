import styled from "@emotion/styled";

import {useRealtimeMonitoring} from "@nxt-ui/cp/hooks";
import {IListItemDestination} from "@nxt-ui/cp/types";
import {useMemo} from "react";

type Props = {
    nodeId: number;
    destination: IListItemDestination;
};

const CustomText = styled.strong<{bitrate?: number; syncLoss?: number; cc?: number}>`
    color: ${({bitrate, cc, syncLoss}) =>
        bitrate === 0 || syncLoss ? "var(--danger)" : cc ? "var(--caution)" : "var(--grey-black)"};
`;

const Monitoring = ({nodeId, destination}: Props) => {
    const {monitoring: monitoringData, errors} = useRealtimeMonitoring(
        nodeId,
        destination.outputIp,
        destination.outputPort
    );
    const monitoring = monitoringData.at(-1);

    const bitrateValue = useMemo(() => {
        return typeof monitoring?.bitrate === "number" ? `${(monitoring.bitrate / 1000000).toFixed(2)} Mbps` : "";
    }, [monitoring?.bitrate]);

    const errorsValue = useMemo(() => {
        const error = errors?.syncLosses.amount || errors?.cc.amount;
        return error ? ` [${error}]` : "";
    }, [errors]);

    return (
        <CustomText bitrate={monitoring?.bitrate} cc={errors?.cc.amount} syncLoss={errors?.syncLosses.amount}>
            {bitrateValue}
            {errorsValue}
        </CustomText>
    );
};

export default Monitoring;
