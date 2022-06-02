import {FC, useCallback, useMemo} from "react";

import {NodeName} from "@nxt-ui/cp/components";
import {TooltipComponent} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {NumericId} from "@nxt-ui/cp/types";

import "./index.css";

import img from "../../img.png";
import {useNavigate} from "react-router-dom";

type ICardTableInfoProps = {
    id: NumericId;
    name: string;
    nodeId: NumericId;
};

export const Caption: FC<ICardTableInfoProps> = ({id, name, nodeId}) => {
    const navigate = useNavigate();

    const handleIpbeNameClick = useCallback(() => {
        navigate(`/ipbe/${id}`);
    }, [id, navigate]);

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
                <div className="card-title-holder">
                    <Icon name="allocation" />{" "}
                    <h4 className="card-title" onClick={handleIpbeNameClick}>
                        {name}
                    </h4>
                </div>

                <TooltipComponent
                    className="white-tooltip"
                    arrow={true}
                    title={
                        <>
                            <p className="heading">NXT-RXm3-4S-359</p>
                            <dl>
                                <dt>Code:</dt>
                                <dd>M963245</dd>
                            </dl>
                            <p>
                                <a href="/">central login</a>
                                <a href="/">ssh nxta@localhost -p 48241</a>
                            </p>
                            <a href="/">Applications dashboard</a>
                        </>
                    }>
                    <NodeName nodeId={nodeId} className={"card-text"} />
                </TooltipComponent>
            </div>
        </div>
    );
};
