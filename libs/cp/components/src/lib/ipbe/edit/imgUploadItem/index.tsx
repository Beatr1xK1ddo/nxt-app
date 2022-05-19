import {FC} from "react";
import {Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";

import "./index.css";

type ImgUploadItemProps = {
    children?: React.ReactNode;
    image: string;
    size: string;
    title: string;
};

export const ImgUploadItem: FC<ImgUploadItemProps> = (props) => {
    const {children, title, size, image} = props;

    return (
        <div className="img-upload-item">
            <img src={image} alt="" />
            <strong>{title}</strong>
            <em>{size}</em>
            {children}
            <Button data-type="btn-icon">
                <Icon name="clear" />
            </Button>
        </div>
    );
};
