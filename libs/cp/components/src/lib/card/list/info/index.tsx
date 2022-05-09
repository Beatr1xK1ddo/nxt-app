import {FC, useMemo} from "react";
import "./tableinfo.css";
import {ICardTableInfoProps} from "./types";

export const CardTableInfo: FC<ICardTableInfoProps> = (props) => {
    const {text, title, image} = props;

    const imageCss = useMemo(
        () => ({
            backgroundImage: `url(${image})`,
        }),
        [image]
    );

    return (
        <div className="table-info-wrap">
            <div className="card-img" style={imageCss}></div>
            <div className="table-info-left">
                <h4 className="card-title">{title}</h4>
                <p className="card-text">{text}</p>
            </div>
        </div>
    );
};
