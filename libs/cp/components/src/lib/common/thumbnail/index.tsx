import {useRealtimeThumbnails} from "@nxt-ui/cp/hooks";
import {FC} from "react";

type ComponentProps = {
    channel: string;
};

export const Thumbnail: FC<ComponentProps> = (props) => {
    const {image} = useRealtimeThumbnails(props.channel);
    return <img src={image} alt="Thumbnail" />;
};
