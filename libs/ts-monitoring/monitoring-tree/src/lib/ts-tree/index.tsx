import styled from "@emotion/styled";
import TreeItem, {treeItemClasses, TreeItemProps} from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import {Icon} from "@nxt-ui/icons";
import {ITsMonitoringMappedData, ITsMonitoringMappedPid} from "@nxt-ui/ts-monitoring/types";
import {useRealtimeTsMonitoring} from "@nxt-ui/cp/hooks";
type IAppStaticField = {
    field: string;
    value: keyof ITsMonitoringMappedPid;
};

type IRootAppStaticField = {
    field: string;
    value: Exclude<keyof ITsMonitoringMappedData, "children">;
};

const appFields: Array<IAppStaticField> = [
    {field: "PID: ", value: "pid"},
    {field: "Bitrate", value: "rate"},
    {field: "StreamID", value: "streamId"},
];

const rootAppFields: Array<IRootAppStaticField> = [
    {field: "PCR PID: ", value: "pcrPid"},
    {field: "PMT PID", value: "pmtPid"},
    {field: "Provider", value: "providerName"},
    {field: "Programm", value: "programNumber"},
];

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

const CustomTreeView = styled(TreeView)`
    flex-grow: 1;
    max-width: 380px;
    flex-shrink: 0;
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

const CustomTreeItemComponent = styled(CustomTreeRootItem)`
    && .${treeItemClasses.iconContainer} {
        width: 44px;
    }
`;

const ExpandIconWrapper = styled.div`
    display: flex;
    align-items: center;
`;
const ExpandBorderDotted = styled.div`
    height: 1px;
    width: 20px;
    border-bottom: 1px dotted;
    border-width: 2px;
`;

const BlueText = styled.span`
    color: #367bf5;
`;
const AppTitleText = styled.p`
    margin: 0;
    color: #faa74a;

    & > span {
        margin-left: 7px;
    }
`;

const FieldTitleText = styled.p`
    margin: 0;
    color: #919699;

    & > span {
        margin-left: 7px;
    }
`;

const AppLabel = ({text, title}: {text: string; title: string}) => {
    return (
        <AppTitleText>
            {title}
            <BlueText>{text}</BlueText>
        </AppTitleText>
    );
};

const FieldLabel = ({text, title}: {text: string | number; title: string}) => {
    return (
        <FieldTitleText>
            {title}
            <BlueText>{text}</BlueText>
        </FieldTitleText>
    );
};

const CustomTreeItem = (props: TreeItemProps) => {
    const expandIcon = (
        <ExpandIconWrapper>
            <IconPlus name="plus" />
            <ExpandBorderDotted />
        </ExpandIconWrapper>
    );
    const collapseIcon = (
        <ExpandIconWrapper>
            <IconMinus name="minus" />
            <ExpandBorderDotted />
        </ExpandIconWrapper>
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

export function TsMonitoringTree() {
    const nodeId = 1337;
    const ip = "123.0.0.1";
    const port = 1234;

    const {stats} = useRealtimeTsMonitoring(nodeId, ip, port);

    const renderTree = (program: ITsMonitoringMappedPid) => {
        const appText = `(${program.rate} Mbps/${program.ratePercent}%)`;
        return (
            <CustomTreeItem
                key={program.pid}
                nodeId={program.pid.toString()}
                label={<AppLabel title={program.streamTypeStr} text={appText} />}>
                {appFields.map((item) => (
                    <CustomTreeItem
                        nodeId={`${item.value}-${program[item.value]}`}
                        label={<FieldLabel title={item.field} text={program[item.value]} />}
                    />
                ))}
            </CustomTreeItem>
        );
    };

    const renderItem = (program: ITsMonitoringMappedData) => {
        const appRootTitle = `${program.programNumber} ${program.serviceName}`;
        const appRootText = `(${program.rate} Mbps/${program.ratePercent}%)`;
        return (
            <CustomTreeRootItem
                key={`${program.programNumber}${program.serviceName}`}
                nodeId={`${program.programNumber}${program.serviceName}`}
                label={<AppLabel title={appRootTitle} text={appRootText} />}
                expandIcon={<IconPlus name="plus" />}
                collapseIcon={<IconMinus name="minus" />}>
                {Array.isArray(program.children) ? program.children.map((item) => renderTree(item)) : null}
                {rootAppFields?.map((item) => (
                    <CustomTreeItem
                        nodeId={`${item.value}-${program[item.value]}`}
                        label={<FieldLabel title={item.field} text={program[item.value]} />}
                    />
                ))}
            </CustomTreeRootItem>
        );
    };

    return <CustomTreeView>{stats?.map((value) => renderItem(value))}</CustomTreeView>;
}
