import {ITsMonitoringMappedData} from "@nxt-ui/ts-monitoring/types";
import {FC} from "react";

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

type IProgramProps = {
    program: ITsMonitoringMappedData;
};

export const Program: FC<IProgramProps> = ({program}) => {
    const renderTree = (programPid: ITsMonitoringMappedPid) => {
        const appText = `(${programPid.rate} Mbps/${programPid.ratePercent}%)`;
        return (
            <CustomTreeItem
                key={programPid.pid}
                nodeId={programPid.pid.toString()}
                label={<AppLabel title={programPid.streamTypeStr} text={appText} />}>
                {appFields.map((item) => (
                    <CustomTreeItem
                        nodeId={`${item.value}-${programPid[item.value]}`}
                        label={<FieldLabel title={item.field} text={programPid[item.value]} />}
                    />
                ))}
            </CustomTreeItem>
        );
    };

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
