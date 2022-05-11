import {FC} from "react";
import {Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {ImgUploadItemProps} from "./types";
import "./img-upload-item.css";

export const ImgUploadItem: FC<ImgUploadItemProps> = (props) => {
    const {children, title, size, image, ...other} = props;

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
