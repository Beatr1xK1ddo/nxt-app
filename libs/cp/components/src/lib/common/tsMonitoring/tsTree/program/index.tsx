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
    {field: "PMT PID:", value: "pmtPid"},
    {field: "Provider:", value: "providerName"},
    {field: "Program:", value: "programNumber"},
];

type IProgramProps = {
    program: ITsMonitoringMappedData;
};
const IconPlus = styled(Icon)`
    svg {
        width: 1.125rem;
        height: 1.125rem;
    }
`;

const IconMinus = styled(Icon)`
    width: 1.25rem;
    height: 0.1875rem;
`;

const CustomTreeRootItem = styled(TreeItem)`
    .MuiCollapse-root {
        border: none;
    }
    .MuiTreeItem-content .MuiTreeItem-label {
        font-size: var(--fz);
        font-weight: 100;
        span {
            font-size: var(--fz);
        }
    }
    .MuiTreeItem-root {
        padding-left: 0.125rem;
        &[aria-expanded] .MuiTreeItem-iconContainer > div > div,
        &:not([aria-expanded]) .MuiTreeItem-iconContainer > div {
            border: none;
            padding: 0 0.125rem;
            display: flex;
            align-items: center;
            width: auto;
            &:before {
                content: "";
                width: 0.4375rem;
                border-bottom: 0.0625rem dotted var(--grey-black);
            }
            &:after {
                margin: 0 0 0 0.125rem;
                content: "";
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 0.25rem 0 0.25rem 0.375rem;
                border-color: transparent transparent transparent var(--grey-black);
            }
        }
        &[aria-expanded] .MuiTreeItem-iconContainer > div > div {
            &:after {
                border: none;
                width: 0.8125rem;
                height: 0.8125rem;
                margin: 0;
                color: var(--blacked);
                background-image: url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M13.6663 7.00065C13.6663 10.6825 10.6816 13.6673 6.99967 13.6673C3.31778 13.6673 0.333008 10.6825 0.333008 7.00065C0.333008 3.31875 3.31778 0.333984 6.99967 0.333984C10.6816 0.333984 13.6663 3.31875 13.6663 7.00065ZM7.66634 10.334V9.00065H6.33301V10.334H7.66634ZM7.66634 7.66732V3.66732H6.33301V7.66732H7.66634Z' fill='%234E5254'/%3E%3C/svg%3E");
                background-size: cover;
            }
        }
    }
    .MuiTreeItem-group {
        margin: 0;
    }
    & .${treeItemClasses.group} {
        margin-left: 0.625rem;
        border: none;
        position: relative;
        &:before {
            position: absolute;
            top: 0;
            bottom: 0.75rem;
            left: 0;
            width: 0;
            content: "";
            display: block;
            border-left: 0.0625rem dotted var(--grey-black);
        }
    }
    && .${treeItemClasses.iconContainer} {
        width: auto;
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
