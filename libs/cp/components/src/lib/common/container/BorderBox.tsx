import {FC} from "react";
import styled from "@emotion/styled";

export const BorderBox: FC<{gap?: number; className?: string}> = styled("div")<{gap?: number}>(
    ({gap}) => `
    border: 0.0625rem solid var(--grey-dark);
    padding: ${gap ? gap / 1.5 : 16}px;
    margin: 0 0 ${gap ? gap : 24}px;
    border-radius: 0.5rem;
    >div:last-child {
        margin: 0;
    }
`
);
