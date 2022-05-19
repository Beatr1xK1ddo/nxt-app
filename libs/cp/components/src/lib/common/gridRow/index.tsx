import {FC} from "react";

import {IPost} from "@nxt-ui/cp/types";

import "./index.css";

interface IGridRowProps {
    posts: IPost[];
    className?: string;
}

export const GridRow: FC<IGridRowProps> = ({posts, className}) => {
    return (
        <ul className={className ? `${className} grid-column` : "grid-column"}>
            {posts.map((post) => (
                <li key={post.id}>{post.content}</li>
            ))}
        </ul>
    );
};
