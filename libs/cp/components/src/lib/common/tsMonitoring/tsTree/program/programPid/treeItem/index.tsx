import TreeItem, {treeItemClasses, TreeItemProps} from "@mui/lab/TreeItem";
import styled from "@emotion/styled";
import {IconMinus, IconPlus} from "../styled";
import {useMemo} from "react";

const ExpandIconWrapper = styled.div`
    display: flex;
    align-items: center;
`;
const ExpandBorderDotted = styled.div`
    height: 0.0625rem;
    width: 1.25rem;
    border-bottom: 0.0625rem dotted;
    border-width: 0;
`;
export const CustomTreeItemComponent = styled(TreeItem)`
    & .${treeItemClasses.group} {
        border-left: 0.0625rem dotted;
        border-width: 0;
    }
    && .${treeItemClasses.iconContainer} {
        width: 2.75rem;
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
