import {Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {useRealtimeMonitoring} from "@nxt-ui/cp/hooks";
import {IListItemDestination} from "@nxt-ui/cp/types";
import styled from "@emotion/styled";
import {useMemo} from "react";

type Props = {
    nodeId: number;
    destination: IListItemDestination;
};

const CustomText = styled.strong<{bitrate?: number; errors?: number}>`
    color: ${({bitrate, errors}) => (!bitrate ? "var(--danger)" : errors ? "var(--caution)" : "var(--grey-black)")};
`;

const Monitoring = ({nodeId, destination}: Props) => {
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

    const bitrateValue = useMemo(() => {
        return monitoringValue?.bitrate ? `${Math.round(monitoringValue.bitrate / 1000000)} Mbps` : "";
    }, [monitoringValue]);

    const errorValue = useMemo(() => {
        return !errorsValue || errorsValue.cc === 0 ? "" : ` [${errorsValue.cc}]`;
    }, [errorsValue]);

    return (
        <>
            {/* <Button data-type="btn-icon">
                <Icon name="chart" />
            </Button> */}
            <CustomText bitrate={monitoring?.bitrate} errors={errors?.cc}>
                {bitrateValue}
                {errorValue}
            </CustomText>
        </>
    );
};

export default Monitoring;
