import {Dispatch, FC, useCallback} from "react";

import {Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";

import {deleteSlateImage} from "../form/reducers";

import "./index.css";
import {AnyAction} from "@reduxjs/toolkit";

type ImgUploadItemProps = {
    dispatch: Dispatch<AnyAction>;
    children?: React.ReactNode;
    image: string;
    size?: string;
    title?: string;
};

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
