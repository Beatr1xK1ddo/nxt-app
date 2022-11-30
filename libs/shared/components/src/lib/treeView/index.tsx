import {FC} from "react";
import {styled} from "@mui/material/styles";
import TreeView, {TreeViewProps} from "@mui/lab/TreeView";

export const TreeViewComponent: FC<TreeViewProps> = styled(TreeView)`
    @media (max-width: 768px /*--q-m*/) {
    }
    &:hover {
    }
`;
