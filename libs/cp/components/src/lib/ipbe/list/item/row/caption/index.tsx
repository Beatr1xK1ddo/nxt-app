import {FC, useMemo} from "react";

import {NodeName} from "@nxt-ui/cp/components";
import {NumericId} from "@nxt-ui/cp/types";

import "./index.css";

import img from "../../img.png";

type ICardTableInfoProps = {
    name: string;
    nodeId: NumericId;
};

export const Caption: FC<ICardTableInfoProps> = (props) => {
    const {name, nodeId} = props;

    const imageCss = useMemo(
        () => ({
            backgroundImage: `url(${img})`,
        }),
        []
    );

    return (
        <div className="table-info-wrap">
            <div className="card-img" style={imageCss} />
            <div className="table-info-left">
                <h4 className="card-title">{name}</h4>
                <NodeName nodeId={nodeId} className={"card-text"} />
            </div>
        </div>
    );
};
