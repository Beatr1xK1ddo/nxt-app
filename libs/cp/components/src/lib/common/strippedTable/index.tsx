import {FC} from "react";

import styled from "@emotion/styled";

export const StrippedTable: FC<{stripColor?: string; className?: string}> = styled("table")<{
    stripColor?: string;
}>(
    ({stripColor}) => `
    width: 100%;
    margin: 0 0 1.25rem;
    tr:nth-of-type(even) {
        background: ${stripColor ? stripColor : "var(--bluer)"};
    }
    th {
        padding: 0.5rem;
        text-align: left;
        color: var(--grey-dark);
        text-transform: uppercase;
        font-size: calc(var(--fz) - 0.1875rem);
        @media (max-width: 48rem) {
            padding: 0.25rem;
        }
    }
    td {
        height: 4rem;
        padding: 0.375rem 1.75rem 0.375rem 0.5rem;
        font-size: calc(var(--fz) - 0.25rem);
        font-weight: 600;
        color: var(--grey-black);
        text-align: left;
        width: 20%;
        box-sizing: border-box;
        @media (max-width: 48rem) {
            padding: 0.25rem 0.75rem 0.25rem 0.25rem;
        }
        &:nth-of-type(3) {
            width: 29%;
        }
        .nrules-actions {
            display: inline-flex;
            align-items: center;
            width: 100%;
            word-break: break-word;
            p {
                margin: 0.3125rem 0;
            }
            ul {
                margin-left: auto;
                flex-shrink: 0;
                font-size: 0;
                li {
                    display: inline-block;
                    margin: 0 0 0 0.625rem;
                    button {
                        width: 1.5rem;
                        height: 1.5rem;
                        padding: 0;
                    }
                }
            }
        }
        &:last-of-type {
            width: 100%;
            padding: 0.375rem 0.25rem;
        }
        strong {
            font-size: var(--fz);
            color: var(--blacked);
            font-family: var(--osc-bold);
            @media (max-width: 48rem) {
              font-size: calc(var(--fz) - 0.0625rem);
            }
        }
    }
    &.notification-table {
        margin: 0 0 2rem;
        th>div {
            position: relative;
            top: 0.125rem;
        }
        .rule-notn {
            display: table;
            table-layout: fixed;
            width: 100%;
            
            strong {
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                max-width: 100%;
                display: inline-block;
            }
            button {
                font-family: var(--osc-bold);
                font-size: 0.875rem;
                text-align: left;
            }
        }
        th:first-of-type,
        td:first-of-type {
            width: 2.5rem;
            max-width: 2.5rem;
            box-sizing: border-box;
            padding: 0.5rem;
        }
        td:nth-of-type(2) {
            width: 16%;
        }
        td:nth-of-type(3) {
            width: 22%;
        }
        td:nth-of-type(4) {
            width: 22%;
        }
        td:nth-of-type(5) {
            width: 14rem;
            min-width: 14rem;
            @media (max-width: 112.5rem) {
                width: 11rem;
                min-width: 11rem;
            }
            @media (max-width: 87.5rem) {
                width: 7rem;
            min-width: 7rem;
            }
        }
        tr.checked-row td {
            background: var(--b-gblue);
        }
        @media (max-width: 58.75rem) {
            th, td:first-of-type {
                padding: 0.25rem;
            }
            th:first-of-type {
                label {
                    display: none;
                }
            }
            td {
                padding: 0.35rem 0.5rem 0.35rem 0.25rem;
                &:first-of-type {
                    width: 2.5rem;
                    min-width: 2.5rem;
                }
                &:last-of-type {
                    width: auto;
                }
                &:nth-of-type(2) {
                    width: 21%;
                }
                &:nth-of-type(3) {
                    width: 19%;
                }
                &:nth-of-type(4) {
                    width: 18%;
                }
                &:nth-of-type(5) {
                    width: 5rem;
                    min-width: 5rem;
                }
                .nrules-actions {
                    display: block;
                }
            }
        }
    }
`
);
