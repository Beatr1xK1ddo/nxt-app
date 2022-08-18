import {FC} from "react";
import {NodePort} from "./port";
import "./index.css";
import {commonSelectors, CpRootState} from "@nxt-ui/cp-redux";
import {INodesListItem, NumericId, Optional} from "@nxt-ui/cp/types";
import {useSelector} from "react-redux";
import {sdiDeviceMapper} from "@nxt-ui/cp/utils";
import {useRealtimeBmdd} from "@nxt-ui/cp/hooks";

interface INodeSchema {
    nodeId: Optional<NumericId>;
    className?: string;
    selected: Optional<number>;
}

export const NodeSchema: FC<INodeSchema> = ({nodeId, className, selected}) => {
    const node = useSelector<CpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, nodeId)
    );
    const {decklinkState} = useRealtimeBmdd(nodeId);

    const portMapper = sdiDeviceMapper(node?.sdiPortMapping, node?.decklinkPortsNum);

    return (
        <ul className={className ? `${className} signal-box` : "signal-box"}>
            {portMapper?.keys.map((index) => (
                <li key={index}>
                    <NodePort
                        index={portMapper?.values[index]}
                        status={selected === portMapper?.values[index] ? "Selected" : decklinkState?.[index].status}
                        detectedMode={decklinkState?.[index].detectedMode}
                        pixelFormat={decklinkState?.[index].pixelFormat}
                    />
                </li>
            ))}
        </ul>
    );
};
