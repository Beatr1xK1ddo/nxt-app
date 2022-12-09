import styled from "@emotion/styled";
import {FC} from "react";

type ITsStatusIcon = {
    error?: number;
};

const StatusIconContainer = styled.div<{error?: number}>`
    display: inline-block;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background: ${({error}) => (error ? "#EA3D2F" : "#2FA84F")};
    margin-right: 0.4375rem;
`;

export const TsStatusIcon: FC<ITsStatusIcon> = ({error}) => {
    return <StatusIconContainer error={error} />;
};
