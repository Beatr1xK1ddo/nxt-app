import styled from "@emotion/styled";

import {useRealtimeMonitoring} from "@nxt-ui/cp/hooks";
import {EAppType, IListItemDestination} from "@nxt-ui/cp/types";
import {useCallback, useMemo} from "react";
import {useNavigate} from "react-router-dom";

type Props = {
    nodeId: number;
    destination: IListItemDestination;
    appId: number;
};

const CustomText = styled.strong<{bitrate?: number; syncLoss?: number; cc?: number}>`
    color: ${({bitrate, cc, syncLoss}) =>
        bitrate === 0 || syncLoss ? "var(--danger)" : cc ? "var(--caution)" : "var(--grey-black)"};
`;

const Monitoring = ({nodeId, destination, appId}: Props) => {
    const {monitoring: monitoringData, errors} = useRealtimeMonitoring(
        nodeId,
        destination.outputIp,
        destination.outputPort
    );
    const monitoring = monitoringData.at(-1);

    const navigate = useNavigate();

    const bitrateValue = useMemo(() => {
        return typeof monitoring?.bitrate === "number" ? `${(monitoring.bitrate / 1000000).toFixed(2)} Mbps` : "";
    }, [monitoring?.bitrate]);

    const errorsValue = useMemo(() => {
        const error = errors?.syncLosses.amount || errors?.cc.amount;
        return error ? ` [${error}]` : "";
    }, [errors]);

    const navigateTsMonitoring = useCallback(() => {
        const queryString = {
            nodeId: nodeId.toString(),
            ip: destination.outputIp || "",
            port: destination.outputPort?.toString() || "",
            appType: EAppType.IPBE,
            appId: appId.toString(),
        };
        const searchString = new URLSearchParams(queryString).toString();
        navigate(`/ipbe/${appId}/monitoring?${searchString}`);
    }, [navigate, nodeId, destination, appId]);

    return (
        <CustomText
            onClick={navigateTsMonitoring}
            bitrate={monitoring?.bitrate}
            cc={errors?.cc.amount}
            syncLoss={errors?.syncLosses.amount}>
            {bitrateValue}
            {errorsValue}
        </CustomText>
    );
};

export default Monitoring;
