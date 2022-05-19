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
        margin:0 0 16px;
        >* {
            margin:0 8px 0 0;
        }
        button[data-type='btn-icon'] {
            width: 24px;
            height: 24px;
            padding: 0;
        }
    }
    &.align-top {
        align-items: flex-start;
    }
    &.heading-section {
        margin: 0 0 16px;
        h1 {
            margin: 0 auto 0 0;
            padding: 0 10px 0 0;
        }
        .divider {
            color: var(--grey-black);
            margin: 0 0 0 10px;
        }
        button {
            background: none;
            margin: 0 0 0 10px;
          }
    }
`
);
