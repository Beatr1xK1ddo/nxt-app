import {FC, useMemo} from "react";
import {BasicApplication} from "@nxt-ui/cp/types";
import {CardAccordionHeader} from "../card/accordionHeader";
import {format} from "date-fns";

import {useState} from "react";
import {useRealtimeThumbnails} from "@nxt-ui/cp/hooks";
import {Button, Accordion, ModalComponent} from "@nxt-ui/components";
import noImage from "./no-img.svg";

type Props = {
    app: BasicApplication;
};

type IRealtimeThumbnailProps = {
    thumbnail: string;
};

const RealtimeThumbnail: FC<IRealtimeThumbnailProps> = ({thumbnail}) => {
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

export const ThumbnailAccordion: FC<Props> = ({app}) => {
    const thumbnailId = useMemo(() => `${app.type}${app.id}`, [app]);

    const {thumbnail, moment} = useRealtimeThumbnails(thumbnailId, noImage);

    const momentValue = useMemo(() => moment ?? +new Date(), [moment]);

    const renderThumbnail = useMemo(() => {
        if (app.type && app.id) {
            return <RealtimeThumbnail thumbnail={thumbnail} />;
        } else {
            return <img src={noImage} alt="channel thumbnail" />;
        }
    }, [thumbnail, app]);

    return (
        <Accordion
            active
            header={
                <CardAccordionHeader title={"Media view"} paragraph={format(momentValue, "yyyy-MM-dd'  'HH:mm:ss")} />
            }>
            {renderThumbnail}
        </Accordion>
    );
};
