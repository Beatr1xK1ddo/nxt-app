import {FC} from "react";
import {IPost} from "../types";
import "./grid-column.css";

interface IGridColumnProps {
    posts: IPost[];
    className?: string;
}

export const GridColumn: FC<IGridColumnProps> = ({posts, className}) => {
    return (
        <ul className={className ? `${className} grid-column` : "grid-column"}>
            {posts.map((post) => (
                <li key={post.id}>{post.content}</li>
            ))}
        </ul>
    );
};
