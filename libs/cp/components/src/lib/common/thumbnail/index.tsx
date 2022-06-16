import {FC, useState} from "react";
import {useRealtimeThumbnails} from "@nxt-ui/cp/hooks";
import {NumericId, Optional, StringId} from "@nxt-ui/cp/types";
import {Button, ModalComponent} from "@nxt-ui/components";
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
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div className="thumbnail-holder">
            <Button onClick={handleOpen}>
                <img src={thumbnail} alt="channel thumbnail" />
            </Button>
            <ModalComponent
                className="thumbnail-modal"
                open={open}
                onClose={handleClose}
                aria-labelledby="thumbnail-modal">
                <img className="img-modal" src={thumbnail} alt="channel thumbnail" />
            </ModalComponent>
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
