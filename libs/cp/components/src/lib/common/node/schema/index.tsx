import {FC, useCallback, useEffect, useState} from "react";
import {NodePort} from "./port";
import "./index.css";
import {commonSelectors, CpRootState} from "@nxt-ui/cp-redux";
import {IDeckLinkDeviceStatus, INodesListItem, NumericId, Optional} from "@nxt-ui/cp/types";
import {useSelector} from "react-redux";
import {sdiDeviceMapper} from "@nxt-ui/cp/utils";
import {useRealtimeBmdd} from "@nxt-ui/cp/hooks";

interface INodeSchema {
    nodeId: Optional<NumericId>;
    className?: string;
    selected: Optional<number>;
    onChange?(key: number): void;
}

export const NodeSchema: FC<INodeSchema> = ({nodeId, className, selected, onChange}) => {
    const node = useSelector<CpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, nodeId)
    );
    const {decklinkState, globalStatus} = useRealtimeBmdd(nodeId);
    const [originalSelected] = useState(selected);
    const portMapper = sdiDeviceMapper(node?.sdiPortMapping, node?.decklinkPortsNum);

    const changeSDIDeviceHandler = useCallback(
        (key?: number, status?: IDeckLinkDeviceStatus) => () => {
            if (typeof key === "number" && (status !== "Busy" || key === originalSelected)) {
                onChange?.(key);
            }
        },
        [onChange, originalSelected]
    );

    return (
        <ul className={className ? `${className} signal-box` : "signal-box"}>
            {portMapper?.keys.map((index, i) => (
                <li
                    key={index}
                    onClick={changeSDIDeviceHandler(
                        portMapper?.values[i],
                        decklinkState?.[portMapper?.values[i]].status
                    )}
                    className="sdi-item-element">
                    <NodePort
                        index={portMapper?.values[i]}
                        status={
                            selected === portMapper?.values[i]
                                ? "Selected"
                                : selected !== originalSelected && index === originalSelected
                                ? "Available"
                                : decklinkState?.[portMapper?.values[i]].status
                        }
                        detectedMode={decklinkState?.[i].detectedMode || decklinkState?.[i].currentMode || globalStatus}
                        pixelFormat={decklinkState?.[i].pixelFormat}
                    />
                </li>
            ))}
        </ul>
    );
};
