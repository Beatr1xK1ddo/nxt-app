import {FC} from "react";
import {Button, InputText} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {IPost} from "../types";
import "./log-box.css";

interface ILogBoxProps {
    posts: IPost[];
    className?: string;
    children?: React.ReactChild | React.ReactNode;
}
export const LogBox: FC<ILogBoxProps> = ({children, className, posts}) => {
    return (
        <div className={className ? `${className} log-box` : "log-box"}>
            <form className="log-search-form" action="#">
                <InputText label="Search" fullWidth />
                <Button data-type="btn-icon">
                    <Icon name="search" />
                </Button>
            </form>
            <ul className="log-list">
                {posts.map((post) => (
                    <li key={post.id}>{post.content}</li>
                ))}
            </ul>
            {children}
        </div>
    );
};
