import {FC, useCallback} from "react";
import {Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import "./index.css";
import {useDispatch} from "react-redux";
import {ipbeEditActions} from "@nxt-ui/cp-redux";

type ComponentProps = {
    image?: string;
    title?: string;
    size?: string;
};

export const ImgUploadItem: FC<ComponentProps> = (props) => {
    const {image, title, size} = props;
    const dispatch = useDispatch();
    const deleteImage = useCallback(() => {
        dispatch(ipbeEditActions.deleteSlateImage());
    }, [dispatch]);

    return (
        <div className="img-upload-item">
            <img src={image} alt="" />
            <strong>{title}</strong>
            <em>{size}</em>
            {props.children}
            <Button data-type="btn-icon" onClick={deleteImage}>
                <Icon name="clear" />
            </Button>
        </div>
    );
};
