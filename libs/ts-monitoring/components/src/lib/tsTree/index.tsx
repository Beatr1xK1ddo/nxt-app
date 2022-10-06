import styled from "@emotion/styled";
import TreeView from "@mui/lab/TreeView";
import {Optional} from "@nxt-ui/cp/types";
import {ITsMonitoringMappedData} from "@nxt-ui/ts-monitoring/types";
import {Program} from "./program";

const CustomTreeView = styled(TreeView)`
    flex-grow: 1;
    max-width: 380px;
    flex-shrink: 0;
`;

type ITsMonitoringTreeProps = {
    programs: Optional<Array<ITsMonitoringMappedData>>;
};

export function TsMonitoringTree(props: ITsMonitoringTreeProps) {
    return (
        <CustomTreeView>
            {props.programs?.map((value) => (
                <Program program={value} />
            ))}
        </CustomTreeView>
    );
}
