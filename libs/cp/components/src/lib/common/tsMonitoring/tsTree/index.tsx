import styled from "@emotion/styled";
import TreeView from "@mui/lab/TreeView";
import {ITsMonitoringMappedData, Optional} from "@nxt-ui/cp/types";
import {Program} from "./program";
import {SyntheticEvent, useCallback, useEffect, useState} from "react";

const CustomTreeView = styled(TreeView)`
    width: 100%;

    & .MuiTreeItem-content {
        padding: 0;
    }
    .MuiTreeItem-label {
        font-weight: 600;
        font-size: calc(var(--fz) - 2px);
    }
`;

type ITsMonitoringTreeProps = {
    programs: Optional<Array<ITsMonitoringMappedData>>;
};

export function TsMonitoringTree(props: ITsMonitoringTreeProps) {
    const [expanded, setExpanded] = useState<Array<string>>([]);
    const [dirty, setDirty] = useState<boolean>(false);

    useEffect(() => {
        if (props.programs?.length && !dirty) {
            setDirty(true);
            const channels: Array<string> = [];
            props.programs.forEach((item) => {
                channels.push(`${item.programNumber} ${item.serviceName}`);
            });
            setExpanded(channels);
        }
    }, [props.programs, dirty]);

    const toggleTreeHandler = useCallback((event: SyntheticEvent<Element, Event>, nodeIds: string[]) => {
        setExpanded(nodeIds);
    }, []);

    return (
        <div className="ts-monitoring-tree">
            <h2>TRANSPORT STREAM</h2>
            <CustomTreeView expanded={expanded} onNodeToggle={toggleTreeHandler}>
                {props.programs?.map((value) => (
                    <Program key={`${value.programNumber}-${value.serviceName}`} program={value} />
                ))}
            </CustomTreeView>
        </div>
    );
}
