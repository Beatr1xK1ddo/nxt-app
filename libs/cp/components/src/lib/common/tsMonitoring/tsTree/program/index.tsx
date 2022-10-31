import {FC, useMemo} from "react";
import styled from "@emotion/styled";
import {Icon} from "@nxt-ui/icons";
import TreeItem, {treeItemClasses} from "@mui/lab/TreeItem";
import {AppLabel} from "./programPid/appLabel";
import {CustomTreeItem} from "./programPid/treeItem";
import {FieldLabel} from "./programPid/fieldLabel";
import {ProgramPid} from "./programPid";
import {ITsMonitoringMappedData} from "@nxt-ui/cp/types";

type IRootAppStaticField = {
    field: string;
    value: Exclude<keyof ITsMonitoringMappedData, "children">;
};

const rootAppFields: Array<IRootAppStaticField> = [
    {field: "PCR PID: ", value: "pcrPid"},
    {field: "PMT PID", value: "pmtPid"},
    {field: "Provider", value: "providerName"},
    {field: "Program", value: "programNumber"},
];

type IProgramProps = {
    program: ITsMonitoringMappedData;
};
const IconPlus = styled(Icon)`
    & path {
        width: 20px;
        height: 20px;
    }
`;

const IconMinus = styled(Icon)`
    width: 24px;
    height: 3px;
`;

const CustomTreeRootItem = styled(TreeItem)`
    & .${treeItemClasses.group} {
        border-left: 1px dotted;
        border-width: 2px;
    }
    && .${treeItemClasses.iconContainer} {
        width: 24px;
    }
`;

export const Program: FC<IProgramProps> = ({program}) => {
    const appRootTitle = useMemo(
        () => `${program.programNumber} ${program.serviceName}`,
        [program.serviceName, program.programNumber]
    );

    const appRootText = useMemo(
        () => `(${(program.rate / 1000000).toFixed(2)} Mbps/${program.ratePercent.toFixed(2)}%)`,
        [program.rate, program.ratePercent]
    );

    return (
        <CustomTreeRootItem
            key={appRootTitle}
            nodeId={appRootTitle}
            label={<AppLabel title={appRootTitle} text={appRootText} />}
            expandIcon={<IconPlus name="plus" />}
            collapseIcon={<IconMinus name="minus" />}>
            {Array.isArray(program.children)
                ? program.children.map((item, index) => <ProgramPid key={index} program={item} />)
                : null}
            {rootAppFields?.map((item) => (
                <CustomTreeItem
                    key={`${item.value}-${program[item.value]}`}
                    nodeId={`${item.value}-${program[item.value]}`}
                    label={<FieldLabel title={item.field} text={program[item.value]} />}
                />
            ))}
        </CustomTreeRootItem>
    );
};
