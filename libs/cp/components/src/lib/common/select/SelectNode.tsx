import {ChangeEventHandler, FC, useCallback, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import {SelectChangeEvent} from "@mui/material/Select/Select";

import {Dropdown, IDropdownProps} from "@nxt-ui/components";
import {commonSelectors, CpRootState} from "@nxt-ui/cp-redux";
import {EDataProcessingStatus, INodesListItem, NumericId, Optional} from "@nxt-ui/cp/types";

import {NodeName} from "../node";

interface ISelectNodeProps extends IDropdownProps<INodesListItem> {
    value: Optional<NumericId>;
    onChange?: (e: SelectChangeEvent<unknown>) => void;
}

export const SelectNode: FC<ISelectNodeProps> = ({value, onChange, ...rest}) => {
    const [filter, setFilter] = useState<string>("");
    const nodes = useSelector<CpRootState, Array<INodesListItem>>((state) =>
        commonSelectors.nodes.selectWithFilter(state, filter)
    );
    const nodeStatus = useSelector(commonSelectors.nodes.selectStatus);
    const node = useSelector<CpRootState>((state) => commonSelectors.nodes.selectById(state, value));

    const renderNode = useCallback((node) => {
        if (node) {
            return `${node?.name} (${node?.hostname})${node?.serialNumber ? ` - ${node.serialNumber}` : ""}`;
        } else {
            return "";
        }
    }, []);

    const selectItems = useMemo(() => {
        return nodes.map((node) => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <MenuItem key={node.id} value={node} selected={node.id === value}>
                <NodeName nodeId={node.id} />
            </MenuItem>
        ));
    }, [nodes, value]);

    const disabled = useMemo(() => {
        return nodeStatus === EDataProcessingStatus.loading;
    }, [nodeStatus]);

    const title = useMemo(() => {
        return nodeStatus === EDataProcessingStatus.loading ? "Nodes are loading ..." : "NODE";
    }, [nodeStatus]);

    const handleSelect = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            e.target.value = e.target.value ? e.target.value.id : null;
            onChange && onChange(e);
        },
        [onChange]
    );

    const handleFilterChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback((event) => {
        event.stopPropagation();
        setFilter(event.currentTarget.value);
    }, []);

    return (
        <Dropdown
            withSearch
            value={node}
            searchValue={filter}
            renderValue={renderNode}
            onChange={handleSelect}
            onSearch={handleFilterChange}
            disabled={disabled}
            label={title}
            {...rest}>
            <MenuItem value={""} selected={value === null}>
                None
            </MenuItem>
            {selectItems}
        </Dropdown>
    );
};
