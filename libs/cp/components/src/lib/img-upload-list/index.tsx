import {FC, useCallback} from "react";
import {Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {ImgUploadItemProps} from "./types";
import "./img-upload-item.css";
import {deleteSlateImage} from "../forms/app-edit-form/reducers";

export const ImgUploadItem: FC<ImgUploadItemProps> = (props) => {
    const {children, title, size, image, dispatch} = props;

    const deleteImage = useCallback(() => {
        dispatch?.(deleteSlateImage());
    }, [dispatch]);

    return (
        <div className="img-upload-item">
            <img src={image} alt="" />
            <strong>{title}</strong>
            <em>{size}</em>
            {children}
            <Button data-type="btn-icon" onClick={deleteImage}>
                <Icon name="clear" />
            </Button>
        </div>
    );
};
