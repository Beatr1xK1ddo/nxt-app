import {FC, useMemo} from "react";

import {NodeName} from "@nxt-ui/cp/components";
import {TooltipComponent} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {INodesListItem, NumericId} from "@nxt-ui/cp/types";

import "./index.css";

import img from "../../img.png";
import {useSelector} from "react-redux";
import {commonSelectors, CpRootState} from "@nxt-ui/cp-redux";

type ICardTableInfoProps = {
    name: string;
    nodeId: NumericId;
};

export const Caption: FC<ICardTableInfoProps> = (props) => {
    const {name, nodeId} = props;

    const node = useSelector<CpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, nodeId)
    );

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
                    <Icon name="allocation" /> <h4 className="card-title">{name}</h4>
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
                                <a href="/">central login ssh nxta@localhost -p 48241</a>
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
