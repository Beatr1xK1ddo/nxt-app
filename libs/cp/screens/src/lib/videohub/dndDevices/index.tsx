import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {DragInput, DropOutput} from "./dragableElement";
import {commandsChangeEventCreator} from "@nxt-ui/cp/utils";
import "./index.css";
import {useVideohubMapper} from "@nxt-ui/cp/hooks";
import {IVideohub, Optional} from "@nxt-ui/cp/types";
import {Button, TooltipComponent} from "@nxt-ui/components";

export enum EDndItemType {
    input = "input",
    output = "output",
}

type IVideohubValue = {
    label: string;
};

export interface IInputValue extends IVideohubValue {
    input: number;
}
export interface IOutputValue extends IVideohubValue {
    output: number;
    input: number;
}

type IOutputInputProps = {
    label?: string;
    input?: number;
};

type IHistoryState = {
    [key: number]: Array<IVideohub>;
};

const OutputInput: FC<IOutputInputProps> = ({label, input}) => {
    return (
        <TooltipComponent className="card-text" arrow title={<div>{label}</div>}>
            <div className="output-input-wrapper">
                <div>
                    <div>{input}</div>
                </div>
            </div>
        </TooltipComponent>
    );
};

const initial = ["VIDEO OUTPUT ROUTING:\n\n", "INPUT LABELS:\n\n", "OUTPUT LABELS:\n\n"];

export const DndDevices: FC = () => {
    const [commands, setCommands] = useState<Array<string>>(initial);
    // const [initialState, setInitialState] = useState<Array<IVideohub>>([]);
    const [history, setHistory] = useState<IHistoryState>({});
    const [historyIndex, setHistoryIndex] = useState<number>(0);
    const {videohubMap, inputMap, outputMap, globalStatus, loading} = useVideohubMapper(
        2151,
        "192.168.99.23",
        9990,
        commands
    );
    const [selectedOutput, setSelectedOutput] = useState<Optional<IVideohub>>(null);
    const [selectedInput, setSelectedInput] = useState<Optional<number>>(null);

    const inputValues = useMemo(() => {
        const result: {[id: string]: IInputValue} = {};
        if (inputMap) {
            const inputIds = Object.keys(inputMap);
            inputIds.forEach((id) => {
                result[id] = {
                    label: inputMap[id],
                    input: parseInt(id),
                };
            });
        }
        return result;
    }, [inputMap]);

    const outputValues = useMemo(() => {
        const result: Array<IOutputValue> = [];
        if (outputMap) {
            return videohubMap.map((hub) => ({...hub, label: outputMap[hub.output]}));
        }
        return result;
    }, [outputMap, videohubMap]);

    const isBlockedReset = useMemo(() => {
        const keys = Object.keys(history);
        if (keys.length) {
            const sortedHub = videohubMap.sort((a, b) => a.output - b.output);
            return JSON.stringify(history[0]) === JSON.stringify(sortedHub);
        }
        return true;
    }, [history, videohubMap]);

    const selectOutput = useCallback(
        (data: IVideohub) => () => {
            setSelectedOutput((prev) => (prev?.output === data.output ? null : data));
        },
        []
    );
    const selectInput = useCallback(
        (input: number) => () => {
            if (selectedOutput && selectedOutput.input !== input) {
                setSelectedInput(input);
            }
        },
        [selectedOutput]
    );

    const changeInputOutput = useCallback(
        (inputId: number, outputId: number) => {
            setCommands([`VIDEO OUTPUT ROUTING:\n${outputId} ${inputId}\n\n`]);
            const keysMap = Object.keys(history);
            setHistoryIndex(keysMap.length);
        },
        [history]
    );

    const resetVideohub = useCallback(() => {
        if (!isBlockedReset) {
            const mappedCommands = commandsChangeEventCreator(history[0], videohubMap);
            if (mappedCommands) {
                setCommands([mappedCommands]);
                setHistoryIndex(0);
            }
        }
    }, [videohubMap, history, isBlockedReset]);

    const disabledBack = useMemo(() => !historyIndex, [historyIndex]);

    const disabledFront = useMemo(() => {
        const keysMap = Object.keys(history);
        return historyIndex + 1 > keysMap.length - 1;
    }, [historyIndex, history]);

    const goHistoryBack = useCallback(() => {
        if (historyIndex) {
            const mappedCommands = commandsChangeEventCreator(history[historyIndex - 1], videohubMap);
            if (mappedCommands) {
                setCommands([mappedCommands]);
                setHistoryIndex((prev) => prev - 1);
            }
        }
    }, [videohubMap, history, historyIndex]);

    const goHistoryFront = useCallback(() => {
        if (!disabledFront) {
            const mappedCommands = commandsChangeEventCreator(history[historyIndex + 1], videohubMap);
            if (mappedCommands) {
                setCommands([mappedCommands]);
                setHistoryIndex((prev) => prev + 1);
            }
        }
    }, [videohubMap, history, disabledFront, historyIndex]);

    useEffect(() => {
        setHistory((prev) => {
            const keys = Object.keys(prev);
            if (!keys.length && videohubMap.length) {
                const sortedHub = videohubMap.sort((a, b) => a.output - b.output);
                return {0: sortedHub};
            }
            if (historyIndex === keys.length) {
                const prevIndex = parseInt(keys[keys.length - 1]);
                const sortedPrev = prev[prevIndex]?.sort((a, b) => a.output - b.output) ?? [];
                const sortedNew = videohubMap?.sort((a, b) => a.output - b.output);

                if (sortedPrev.length && sortedNew.length && JSON.stringify(sortedPrev) !== JSON.stringify(sortedNew)) {
                    const state = {...prev};
                    const newIndex = prevIndex + 1;
                    state[newIndex] = sortedNew;
                    return state;
                }
            }
            return prev;
        });
    }, [videohubMap, historyIndex]);

    useEffect(() => {
        if (typeof selectedOutput?.output === "number" && typeof selectedInput === "number") {
            changeInputOutput(selectedInput, selectedOutput.output);
            setSelectedInput(null);
        }
    }, [selectedInput, selectedOutput, changeInputOutput]);

    useEffect(() => {
        if (selectedOutput) {
            const item = videohubMap.find((item) => item.output === selectedOutput.output);
            if (item) {
                setSelectedOutput((prev) => (item.input !== prev?.input ? item : prev));
            }
        }
    }, [videohubMap, selectedOutput]);

    return (
        <>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <h4>
                    {globalStatus}
                    {loading ? " Processing command..." : ""}
                </h4>
                <div style={{display: "flex", gap: 10}}>
                    <Button
                        style={{background: isBlockedReset ? "#c6cacc" : "#367bf5"}}
                        disabled={isBlockedReset}
                        onClick={resetVideohub}>
                        Reset
                    </Button>
                    <Button
                        style={{background: disabledBack ? "#c6cacc" : "#367bf5"}}
                        disabled={disabledBack}
                        onClick={goHistoryBack}>
                        Back
                    </Button>
                    <Button
                        style={{background: disabledFront ? "#c6cacc" : "#367bf5"}}
                        disabled={disabledFront}
                        onClick={goHistoryFront}>
                        Front
                    </Button>
                </div>
            </div>
            <div className="dragable-devices-container">
                <div className="devices-aria-container">
                    <h2>Outputs</h2>
                    <div className="videohub-box-container">
                        {outputValues
                            .sort((a, b) => a.output - b.output)
                            .map((hub) => {
                                return (
                                    <DropOutput
                                        active={selectedOutput?.output === hub.output}
                                        item={hub}
                                        key={hub.label}
                                        onSelect={selectOutput(hub)}>
                                        {/* <OutputInput label={inputMap?.[hub.input.toString()]} input={hub.input} /> */}
                                    </DropOutput>
                                );
                            })}
                    </div>
                </div>
                <div className="devices-aria-container">
                    <h2>Inputs</h2>
                    <div className="videohub-box-container">
                        {Object.keys(inputValues)
                            .sort((a, b) => parseInt(a) - parseInt(b))
                            .map((key) => {
                                return (
                                    <DragInput
                                        onSelect={selectInput(inputValues[key].input)}
                                        active={inputValues[key].input === selectedOutput?.input}
                                        key={parseInt(key)}
                                        item={inputValues[key]}
                                    />
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
};
