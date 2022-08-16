import styled from "@emotion/styled";

import {useRealtimeMonitoring} from "@nxt-ui/cp/hooks";
import {IListItemDestination} from "@nxt-ui/cp/types";

type Props = {
    nodeId: number;
    destination: IListItemDestination;
};

const CustomText = styled.strong<{bitrate?: number; errors?: number}>`
    color: ${({bitrate, errors}) => (!bitrate ? "var(--danger)" : errors ? "var(--caution)" : "var(--grey-black)")};
`;

const Monitoring = ({nodeId, destination}: Props) => {
    const {monitoring, errors} = useRealtimeMonitoring(nodeId, destination.outputIp, destination.outputPort);

    return (
        <>
            {/* <Button data-type="btn-icon">
                <Icon name="chart" />
            </Button> */}
            <CustomText bitrate={monitoring?.bitrate} errors={errors?.cc}>
                {monitoring?.bitrate}
                {errors?.cc}
            </CustomText>
        </>
    );
};

export default Monitoring;
