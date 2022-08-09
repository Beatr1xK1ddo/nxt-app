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
