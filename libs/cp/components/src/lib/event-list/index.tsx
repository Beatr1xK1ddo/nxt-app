import {FC} from "react";
import {IPost} from "../types";
import {Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import "./event-list.css";

interface IEventListProps {
    posts: IPost[];
    className?: string;
}

export const EventList: FC<IEventListProps> = ({posts, className}) => {
    return (
        <ul className={className ? `${className} event-list` : "event-list"}>
            {posts.map((post) => (
                <li key={post.id}>
                    <strong className="action-text">{post.heading}</strong>
                    <p className="event-text">{post.content}</p>
                    <Button data-type="btn-icon">
                        <Icon name="edit" />
                    </Button>
                    <Button data-type="btn-icon">
                        <Icon name="delete" />
                    </Button>
                </li>
            ))}
        </ul>
    );
};
