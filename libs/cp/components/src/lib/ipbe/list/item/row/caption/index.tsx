import {FC, useCallback} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {NodeName, Thumbnail} from "@nxt-ui/cp/components";
import {TooltipComponent} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {INodesListItem, NumericId} from "@nxt-ui/cp/types";
import {commonSelectors, CpRootState} from "@nxt-ui/cp-redux";

import "./index.css";

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

    const node = useSelector<CpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, nodeId)
    );

    return (
        <div className="table-info-wrap">
            <Thumbnail type="ipbe" id={id} />
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
                        <div>
                            <p className="heading">{node?.hostname || ""}</p>
                            <dl>
                                <dt>Code:</dt>
                                <dd>{node?.digitCode || ""}</dd>
                            </dl>
                            <p>
                                <a href="/">central login</a>
                                <a href="/">ssh nxta@localhost -p 48241</a>
                            </p>
                            <a href="/">Applications dashboard</a>
                        </div>
                    }>
                    <div>
                        <NodeName nodeId={nodeId} className={"card-text"} />
                    </div>
                </TooltipComponent>
            </div>
        </div>
    );
};
