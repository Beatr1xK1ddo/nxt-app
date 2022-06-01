import {FC, useMemo} from "react";

import {NodeName} from "@nxt-ui/cp/components";
import {TooltipComponent} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
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
                <div className="card-title-holder">
                    <Icon name="allocation" /> <h4 className="card-title">{name}</h4>
                </div>

                <TooltipComponent
                    className="white-tooltip"
                    arrow={true}
                    title={
                        <div>
                            <p className="heading">NXT-RXm3-4S-359</p>
                            <dl>
                                <dt>Code:</dt>
                                <dd>M963245</dd>
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
