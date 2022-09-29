import {FC} from "react";

import {IPost} from "@nxt-ui/cp/types";
import clsx from "clsx";
import styled from "@emotion/styled";

const GridRowList = styled.ul`
    display: grid;
    gap: 2px 15px;
    font-size: calc(var(--fz) - 4px);
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto 1fr;
    grid-auto-columns: 1fr 1fr 1fr;
    grid-auto-rows: 1fr 1fr;
    grid-auto-flow: column;
    font-weight: 600;
    margin: 0 0 12px;
    text-align: left;
    .app-log & {
        padding: 0 16% 0 0;
    }
    @media (max-width: 992px) {
        .app-log & {
            /*--q-l*/
            padding: 0;
            text-align: center;
        }
    }
    .speed-ok {
        color: var(--ok);
    }
    .speed-bad {
        color: var(--r-premium);
    }
    .img-graph {
        display: block;
        margin: 3px 0 0;
    }
    & > li[class^="speed"] img {
        display: block;
    }
    .text-light {
        font-weight: 300;
    }
    .text-bold {
        font-weight: 700;
        color: var(--blacked);
    }
    .text-c {
        display: block;
        text-align: center;
    }
`;

interface IGridRowProps {
    posts: IPost[];
    className?: string;
}

export const GridRow: FC<IGridRowProps> = ({posts, className}) => {
    return (
        <GridRowList className={clsx(className && className)}>
            {posts.map((post) => (
                <li key={post.id}>{post.content}</li>
            ))}
        </GridRowList>
    );
};
