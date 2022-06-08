import {FC} from "react";
import {TooltipComponent} from "@nxt-ui/components";
import {NodePort} from "./port";
import "./index.css";
import {commonSelectors, CpRootState} from "@nxt-ui/cp-redux";
import {EPortStatus, INodesListItem, NumericId, Optional} from "@nxt-ui/cp/types";
import {useSelector} from "react-redux";
import {sdiDeviceMapper} from "@nxt-ui/cp/utils";

interface INodeSchema {
    nodeId: Optional<NumericId>;
    className?: string;
    selected?: number;
}

export const NodeSchema: FC<INodeSchema> = ({nodeId, className, selected}) => {
    const node = useSelector<CpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, nodeId)
    );
    const portMapper = sdiDeviceMapper(node?.sdiPortMapping, node?.decklinkPortsNum);

    return (
        <ul className={className ? `${className} signal-box` : "signal-box"}>
            {Array.from(Array(node?.decklinkPortsNum || 0).keys()).map((index) => (
                <TooltipComponent arrow title={"Signal good"} key={index}>
                    <li>
                        <NodePort
                            index={portMapper?.values[index]}
                            status={selected === index ? EPortStatus.available : EPortStatus.default}
                        />
                    </li>
                </TooltipComponent>
            ))}
        </ul>
    );
};
