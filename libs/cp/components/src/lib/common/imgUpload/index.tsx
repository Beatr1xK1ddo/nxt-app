import {FC} from "react";

import {IPost} from "@nxt-ui/cp/types";

import "./index.css";

interface IImgUploadProps {
    posts: IPost[];
    className?: string;
}

export const ImgUpload: FC<IImgUploadProps> = ({posts, className}) => {
    return (
        <ul className={className ? `${className} grid-column` : "grid-column"}>
            {posts.map((post) => (
                <li key={post.id}>{post.content}</li>
            ))}
        </ul>
    );
};
