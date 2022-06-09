import {FC} from "react";

import {useRealtimeThumbnails} from "@nxt-ui/cp/hooks";
import {NumericId, Optional, StringId} from "@nxt-ui/cp/types";

import noImage from "./presets/no-image.png";

type Props = {
    type: string;
    id: Optional<NumericId>;
};

type RealtimeThumbnailProps = {
    id: StringId;
};

const RealtimeThumbnail = ({id}: RealtimeThumbnailProps) => {
    const {thumbnail} = useRealtimeThumbnails(id, noImage);
    //todo kan: update thumbnail styles according to design
    return (
        <div style={{width: "5rem", aspectRatio: "16/9"}}>
            <img src={thumbnail} alt="channel thumbnail" />
        </div>
    );
};

export const Thumbnail: FC<Props> = ({type, id}) => {
    //todo kan: handle enablePreviewImages accordingly
    if (type && id) {
        const thumbnailId = `${type}${id}`;
        return <RealtimeThumbnail id={thumbnailId} />;
    } else {
        return <img src={noImage} alt="channel thumbnail" />;
    }
};
