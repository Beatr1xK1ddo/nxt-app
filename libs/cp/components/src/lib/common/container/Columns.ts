import {FC} from "react";
import styled from "@emotion/styled";

export const Columns: FC<{gap?: number; valign?: string; col?: number | string; className?: string}> = styled("div")<{
    gap?: number;
    col?: number | string;
    valign?: string;
}>(
    ({gap, col, valign}) => `
    gap: ${gap ? gap : 24}px;
    display: grid;
    grid-template-columns: ${
        col === 2
            ? "1fr 1fr"
            : col === "2minmax"
            ? "minmax(60px, 1fr) minmax(60px, 1fr)"
            : col === 3
            ? "1fr 1fr 1fr"
            : col === 4
            ? "1fr 1fr 1fr 1fr"
            : "1fr"
    };
    grid-auto-flow: row;
    margin:0 0 ${gap ? gap : 24}px;
    align-items: ${valign};
`
);
