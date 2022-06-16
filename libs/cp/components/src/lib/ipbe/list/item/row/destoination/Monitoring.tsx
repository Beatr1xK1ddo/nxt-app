import React, {useMemo} from "react";
import {Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {useRealtimeMonitoring} from "@nxt-ui/cp/hooks";
import {IIpbeListItem, IIpbeListItemDestination} from "@nxt-ui/cp/types";
import styled from "@emotion/styled";

type Props = {
    ipbe: IIpbeListItem;
    destination: IIpbeListItemDestination;
};

const CustomText = styled.span<{bitrate: number; errors: number}>`
    color: ${({bitrate, errors}) => (bitrate === 0 ? "red" : errors ? "#EFC42B" : "black")};
`;

const Monitoring = ({ipbe, destination}: Props) => {
    const [data, bitrate] = useRealtimeMonitoring(ipbe.node, destination.outputIp, destination.outputPort);

    const integerBitrate = useMemo(() => {
        const value = parseInt(bitrate);
        return value;
    }, [bitrate]);

    const bitrateErrorCount = useMemo(() => {
        const errors = data?.errors;
        let count = 0;
        if (errors) {
            const keys = Object.keys(errors);
            keys.forEach((key) => {
                if (errors[key]?.errorCount) {
                    count += errors[key]?.errorCount;
                }
            });
        }
        return count;
    }, [data]);

    return (
        <>
            <Button data-type="btn-icon">
                <Icon name="chart" />
            </Button>
            <CustomText bitrate={integerBitrate} errors={bitrateErrorCount}>
                {`${bitrate} ${bitrateErrorCount}`}
            </CustomText>
            {/* <span className="speed-destination">{bitrate}</span> */}
        </>
    );
};

export default Monitoring;
