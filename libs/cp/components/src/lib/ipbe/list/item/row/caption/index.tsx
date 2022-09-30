import {FC, useCallback, useMemo} from "react";
import {useNavigate} from "react-router-dom";

import {Icon} from "@nxt-ui/icons";
import {TooltipComponent} from "@nxt-ui/components";
import {NodeName, Thumbnail} from "@nxt-ui/cp/components";
import {IIpbeListItem} from "@nxt-ui/cp/types";

import {ServerLoginTooltip} from "../../../../../common/node";

import "./index.css";

type ICardTableInfoProps = {
    ipbe: IIpbeListItem;
};

export const Caption: FC<ICardTableInfoProps> = ({ipbe}) => {
    const navigate = useNavigate();

    const {id, name, nodeId, isEndpoint} = useMemo(() => {
        const {id, name, nodeId, isEndpoint} = ipbe;
        return {id, name, nodeId, isEndpoint};
    }, [ipbe]);

    const handleIpbeNameClick = useCallback(() => {
        navigate(`/ipbe/${id}`);
    }, [id, navigate]);

    return (
        <div className="table-info-wrap">
            <Thumbnail app={ipbe} />
            <div className="table-info-left">
                <div className="card-title-holder">
                    {isEndpoint ? <Icon name="allocation" /> : null}{" "}
                    <h4 className="card-title" onClick={handleIpbeNameClick}>
                        <TooltipComponent className="card-text" arrow={true} title={name}>
                            <span>{name}</span>
                        </TooltipComponent>
                    </h4>
                </div>

                <TooltipComponent className="card-text" arrow={true} title={<ServerLoginTooltip nodeId={nodeId} />}>
                    <div>
                        <NodeName nodeId={nodeId} className={"card-text"} />
                    </div>
                </TooltipComponent>
            </div>
        </div>
    );
};
