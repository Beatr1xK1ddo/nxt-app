import {FC} from "react";
import styled from "@emotion/styled";

export const FlexHolder: FC<{justify?: string; className?: string}> = styled("div")<{
    justify?: string;
}>(
    ({justify}) => `
    justify-content: ${justify ? justify : "space-between"};
    display: flex;
    align-items: center;
    &.app-info {
        margin:0 0 1rem;
        >* {
            margin:0 0.5rem 0 0;
        }
        button[data-type='btn-icon'] {
            width: 1.5rem;
            height: 1.5rem;
            padding: 0;
        }
    }
    &.align-top {
        align-items: flex-start;
    }
    &.heading-section {
        margin: 0 0 1rem;
        h1 {
            margin: 0 auto 0 0;
            padding: 0 0.625rem 0 0;
        }
        .divider {
            color: var(--grey-black);
            margin: 0 0 0 0.625rem;
        }
        button {
            background: none;
            margin: 0 0 0 0.625rem;
          }
    }
`
);
