import {FC} from "react";
import {styled} from "@mui/material/styles";
import TreeItem, {TreeItemProps} from "@mui/lab/TreeItem";

export const TreeItemComponent: FC<TreeItemProps> = styled(TreeItem)`
    .MuiTreeItem-content.Mui-selected {
        background: none;
        padding: 0;
    }
    .MuiTreeItem-content {
        background: none;
    }
    .MuiTreeItem-label {
        line-height: 1;
    }
    .MuiTreeItem-content.Mui-expanded {
        padding: 0;
    }
    .MuiTreeItem-label {
        font: var(--font);
    }
    .MuiTreeItem-content.Mui-expanded.Mui-selected {
        .MuiTreeItem-iconContainer {
            width: 24px;
            height: 24px;
            padding: 0;
            margin: 0;
            dispay: inline-flex;
            svg {
                margin: auto;
                height: 24px;
                width: 24px;
            }
        }
    }
    .MuiCollapse-entered {
        padding: 5px 0 0;
        position: relative;
        margin: 0;
        &:before {
            content: "";
            position: absolute;
            left: 10px;
            top: 0;
            bottom: 23px;
            border-left: 2px dotted #78909c;
        }
        .MuiTreeItem-root {
            position: relative;
            padding: 8px 0 8px 26px;
            &:before {
                content: "";
                position: absolute;
                left: 12px;
                top: 47%;
                border-top: 2px dotted #78909c;
                width: 13px;
                transform: translateY(-50%);
            }
        }
        .MuiTreeItem-content {
            padding: 0;
            justify-content: flex-start;
            display: block;
        }
    }
    @media (max-width: 768px /*--q-m*/) {
    }
`;
