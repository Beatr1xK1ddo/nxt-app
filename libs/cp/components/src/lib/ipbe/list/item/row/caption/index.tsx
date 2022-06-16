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
    isEndpoint?: boolean;
};

export const Caption: FC<ICardTableInfoProps> = ({id, name, nodeId, isEndpoint}) => {
    const navigate = useNavigate();

    const handleIpbeNameClick = useCallback(() => {
        navigate(`/ipbe/${id}`);
    }, [id, navigate]);

    const handleCopySsh = useCallback(() => {
        const type = "text/plain";
        const blob = new Blob(["ssh://glebn@s2.nextologies.com"], {type});
        const data = new ClipboardItem({[type]: blob});
        return navigator.clipboard.write([data]);
    }, []);

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
                                <a href="/">ssh://glebn@s2.nextologies.com</a>
                            </p>
                            <div onClick={handleCopySsh} style={{cursor: "pointer"}}>
                                Copy ssh
                            </div>
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
