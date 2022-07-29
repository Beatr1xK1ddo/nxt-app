import {FC, useCallback} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {NodeName, Thumbnail} from "@nxt-ui/cp/components";
import {TooltipComponent} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {INodesListItem, NumericId} from "@nxt-ui/cp/types";
import {commonSelectors, CpRootState} from "@nxt-ui/cp-redux";

import "./index.css";
import {ServerLoginTooltip} from "../../../../../common/node/serverLoginTooltip";

type ICardTableInfoProps = {
    id: NumericId;
    name: string;
    nodeId: NumericId;
    isEndpoint?: boolean;
};

export const Caption: FC<ICardTableInfoProps> = ({id, name, nodeId, isEndpoint}) => {
    const navigate = useNavigate();

    const handleIpbeNameClick = useCallback(() => {
        navigate(`/ipbe/${id}`);
    }, [id, navigate]);

    const node = useSelector<CpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, nodeId)
    );

    return (
        <div className="table-info-wrap">
            <Thumbnail type="ipbe" id={id} />
            <div className="table-info-left">
                <div className="card-title-holder">
                    {isEndpoint ? <Icon name="allocation" /> : null}{" "}
                    <h4 className="card-title" onClick={handleIpbeNameClick}>
                        {name}
                    </h4>
                </div>

                <TooltipComponent className="white-tooltip" arrow={true} title={<ServerLoginTooltip nodeId={nodeId} />}>
                    <div>
                        <NodeName nodeId={nodeId} className={"card-text"} />
                    </div>
                </TooltipComponent>
            </div>
        </div>
    );
};
