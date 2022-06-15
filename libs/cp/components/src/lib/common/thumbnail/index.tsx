import {FC} from "react";
import {useRealtimeThumbnails} from "@nxt-ui/cp/hooks";
import {NumericId, Optional, StringId} from "@nxt-ui/cp/types";
import noImage from "./presets/no-img.svg";

import "./index.css";

type Props = {
    type: string;
    id: Optional<NumericId>;
};

type RealtimeThumbnailProps = {
    id: StringId;
};

const RealtimeThumbnail = ({id}: RealtimeThumbnailProps) => {
    const {thumbnail} = useRealtimeThumbnails(id, noImage);
    return (
        <div className="thumbnail-holder">
            <img src={thumbnail} alt="channel thumbnail" />
        </div>
    );
};

export const Thumbnail: FC<Props> = ({type, id}) => {
    if (type && id) {
        const thumbnailId = `${type}${id}`;
        return <RealtimeThumbnail id={thumbnailId} />;
    } else {
        return <img src={noImage} alt="channel thumbnail" />;
    }
};
