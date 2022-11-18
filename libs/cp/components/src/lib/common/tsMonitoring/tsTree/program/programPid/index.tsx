import {ITsMonitoringMappedPid} from "@nxt-ui/cp/types";
import {FC, useMemo} from "react";
import {AppLabel} from "./appLabel";
import {FieldLabel} from "./fieldLabel";
import {CustomTreeItem} from "./treeItem";

type IAppStaticField = {
    field: string;
    value: keyof ITsMonitoringMappedPid;
};

const appFields: Array<IAppStaticField> = [
    {field: "PID: ", value: "pid"},
    {field: "Bitrate:", value: "rate"},
    {field: "StreamID:", value: "streamId"},
];

type IProgramPidProps = {
    program: ITsMonitoringMappedPid;
};

export const ProgramPid: FC<IProgramPidProps> = ({program}) => {
    const appText = useMemo(
        () => `(${(program.rate / 1000000).toFixed(2)} Mbps/${program.ratePercent.toFixed(2)}%)`,
        [program.rate, program.ratePercent]
    );

    return (
        <CustomTreeItem
            key={program.pid}
            nodeId={program.pid.toString()}
            label={<AppLabel title={program.streamTypeStr} text={appText} />}>
            {appFields.map((item, index) => (
                <CustomTreeItem
                    key={index}
                    nodeId={`${item.value}-${program[item.value]}`}
                    label={
                        <FieldLabel
                            title={item.field}
                            text={
                                item.field === "Bitrate"
                                    ? `${((program[item.value] as number) / 1000000).toFixed(2)} Mbps`
                                    : program[item.value]
                            }
                        />
                    }
                />
            ))}
        </CustomTreeItem>
    );
};
