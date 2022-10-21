import styled from "@emotion/styled";
import TreeView from "@mui/lab/TreeView";
import {ITsMonitoringMappedData, Optional} from "@nxt-ui/cp/types";
import {Program} from "./program";

const CustomTreeView = styled(TreeView)`
    width: 100%;
`;

type ITsMonitoringTreeProps = {
    programs: Optional<Array<ITsMonitoringMappedData>>;
};

export function TsMonitoringTree(props: ITsMonitoringTreeProps) {
    return (
        <div className="ts-monitoring-tree">
            <p>TRANSPORT STREAM</p>
            <CustomTreeView>
                {props.programs?.map((value) => (
                    <Program program={value} />
                ))}
            </CustomTreeView>
        </div>
    );
}
