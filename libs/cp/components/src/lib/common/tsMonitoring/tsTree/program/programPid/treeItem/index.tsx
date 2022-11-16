import TreeItem, {treeItemClasses, TreeItemProps} from "@mui/lab/TreeItem";
import styled from "@emotion/styled";
import {IconMinus, IconPlus} from "../styled";
import {useMemo} from "react";

const ExpandIconWrapper = styled.div`
    display: flex;
    align-items: center;
`;
const ExpandBorderDotted = styled.div`
    height: 1px;
    width: 20px;
    border-bottom: 1px dotted;
    border-width: 0;
`;
export const CustomTreeItemComponent = styled(TreeItem)`
    & .${treeItemClasses.group} {
        border-left: 1px dotted;
        border-width: 0;
    }
    && .${treeItemClasses.iconContainer} {
        width: 44px;
    }
`;
export const CustomTreeItem = (props: TreeItemProps) => {
    const expandIcon = useMemo(
        () => (
            <ExpandIconWrapper>
                <IconPlus name="plus" />
                <ExpandBorderDotted />
            </ExpandIconWrapper>
        ),
        []
    );
    const collapseIcon = useMemo(
        () => (
            <ExpandIconWrapper>
                <IconMinus name="minus" />
                <ExpandBorderDotted />
            </ExpandIconWrapper>
        ),
        []
    );

    return (
        <CustomTreeItemComponent
            {...props}
            expandIcon={expandIcon}
            collapseIcon={collapseIcon}
            endIcon={<ExpandBorderDotted />}
        />
    );
};
