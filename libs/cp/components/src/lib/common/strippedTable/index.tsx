import {FC} from "react";

import styled from "@emotion/styled";

export const StrippedTable: FC<{stripColor?: string; className?: string}> = styled("table")<{
    stripColor?: string;
}>(
    ({stripColor}) => `
    width: 100%;
    margin: 0 0 20px;
    tr:nth-child(even) {
        background: ${stripColor ? stripColor : "var(--bluer)"};
    }
    th {
        padding: 8px;
        text-align: left;
        color: var(--grey-dark);
        text-transform: uppercase;
        font-size: calc(var(--fz) - 3px);
        @media (max-width: 768px) {
            padding: 4px;
        }
    }
    td {
        height: 64px;
        padding: 6px 32px 6px 4px;
        font-size: calc(var(--fz) - 4px);
        font-weight: 600;
        color: var(--grey-black);
        text-align: left;
        width: 20%;
        box-sizing: border-box;
        @media (max-width: 768px) {
            padding: 4px 12px 4px 4px;
        }
        &:nth-of-type(3) {
            width: 29%;
        }
        .nrules-actions {
            display: inline-flex;
            align-items: center;
            width: 100%;
            p {
                margin: 5px 0;
            }
            a {
                white-space: nowrap;
            }
            ul {
                margin-left: auto;
                flex-shrink: 0;
                font-size: 0;
                li {
                    display: inline-block;
                    margin: 0 0 0 10px;
                    @media (max-width: 768px) {
                        display: block;
                        margin: 0 0 10px;
                        &:last-of-type {
                            margin: 0;
                        }
                    }
                    button {
                        width: 24px;
                        height: 24px;
                        padding: 0;
                    }
                    &:last-of-type button {
                        color: var(--blacked);
                    }
                }
            }
        }
        &:last-of-type {
            width: 100%;
            padding: 6px 4px;
        }
        strong {
            font-size: var(--fz);
            color: var(--blacked);
            font-family: var(--osc-bold);
            @media (max-width: 768px) {
              font-size: calc(var(--fz) - 1px);
            }
        }
    }
`
);
