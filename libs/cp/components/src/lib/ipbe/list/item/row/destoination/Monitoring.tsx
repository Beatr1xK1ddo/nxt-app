import {Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {useRealtimeMonitoring, useRealtimeMonitoringError} from "@nxt-ui/cp/hooks";
import {IIpbeListItemDestination} from "@nxt-ui/cp/types";
import styled from "@emotion/styled";
import {useMemo} from "react";

type Props = {
    appId: number;
    nodeId: number;
    destination: IIpbeListItemDestination;
};

const CustomText = styled.strong<{bitrate?: number; errors?: number}>`
    color: ${({bitrate, errors}) => (!bitrate ? "var(--danger)" : errors ? "var(--caution)" : "var(--grey-black)")};
`;

const Monitoring = ({appId, nodeId, destination}: Props) => {
    const {bitrate} = useRealtimeMonitoring(nodeId, destination.outputIp, destination.outputPort);

    const {errors} = useRealtimeMonitoringError(nodeId, destination.outputIp, destination.outputPort, "ipbe", appId);

    const bitrateValue = useMemo(() => {
        return bitrate?.bitrate ? `${Math.round(bitrate.bitrate / 1000000)} Mbps` : "";
    }, [bitrate]);

    const errorValue = useMemo(() => {
        return !errors || errors.cc === 0 ? "" : ` [${errors.cc}]`;
    }, [errors]);

    return (
        <>
            <Button data-type="btn-icon">
                <Icon name="chart" />
            </Button>
            <CustomText bitrate={bitrate?.bitrate} errors={errors?.cc}>
                {bitrateValue}
                {errorValue}
            </CustomText>
        </>
    );
};

export default Monitoring;
