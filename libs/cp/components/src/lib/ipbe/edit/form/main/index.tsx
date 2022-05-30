import {ChangeEventHandler, FC, useCallback, useMemo, useState} from "react";
import {InputText, Dropdown} from "@nxt-ui/components";
import {Columns, FlexHolder, BorderBox, NodeSchema} from "@nxt-ui/cp/components";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {
    EIpbeApplicationType,
    EIpbeEncoderVideoFormat,
    EIpbeLatency,
    EIpbeVideoConnection,
    INodesListItem,
} from "@nxt-ui/cp/types";
import {ApplicationType} from "./application-type";
import {Icon} from "@nxt-ui/icons";
import {SelectCompany, SelectNode} from "../../../../common";
import {useDispatch, useSelector} from "react-redux";
import {commonSelectors, CpRootState, ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {useEncoderVersion, useCompaniesList, useNodesList, useEncoderVersionsList} from "@nxt-ui/cp/hooks";
import {SelectEncoderVersion} from "./SelectEncoderVersion";

export const Main: FC = () => {
    const dispatch = useDispatch();
    const values = useSelector(ipbeEditSelectors.selectMainValues);
    const errors = useSelector(ipbeEditSelectors.selectMainErrors);
    const node = useSelector<CpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, values.node)
    );
    const encoderVersionData = useEncoderVersionsList(node);
    useNodesList("ipbe");
    useCompaniesList("ipbe");
    useEncoderVersion(values.node, values.applicationType.toLocaleLowerCase());

    const changeCompanyHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.changeCompany(e.target.value as number));
        },
        [dispatch]
    );

    const changeNodeHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.changeNode(e.target.value as number));
        },
        [dispatch]
    );

    const changeVideoConnectionHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.changeVideoConnection(e.target.value as EIpbeVideoConnection));
        },
        [dispatch]
    );

    const changeInputFormatHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.changeInputFormat(e.target.value as EIpbeEncoderVideoFormat));
        },
        [dispatch]
    );

    const changeLatencyHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.changeLatency(e.target.value as EIpbeLatency));
        },
        [dispatch]
    );

    const changeEncoderHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.changeEncoder(e.target.value as string));
        },
        [dispatch]
    );

    const changeNameHandler = useCallback(
        (e) => {
            const value = e.currentTarget.value;
            dispatch(ipbeEditActions.changeName(value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeApplicationHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.changeApplication(e.target.value as EIpbeApplicationType));
        },
        [dispatch]
    );

    const applicationType = useMemo(() => {
        const value = Object.keys(EIpbeApplicationType).find(
            (key) => EIpbeApplicationType[key as keyof typeof EIpbeApplicationType] === values.applicationType
        );
        console.log(values.applicationType, value);
        if (value) {
            return value;
        }
        return "";
    }, [values.applicationType]);

    const changeSDIDeviceHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as number;
            const indexValue = encoderVersionData?.values.indexOf(value);
            if (indexValue) {
                const result = encoderVersionData?.keys[indexValue];
                if (result) {
                    dispatch(ipbeEditActions.changeSDIDevice(result));
                }
            }
        },
        [dispatch, encoderVersionData]
    );

    const inputsNodeScheme = [
        {id: 1, content: <Icon name="input1" />},
        {id: 2, content: <Icon name="input2" />},
        {id: 3, content: <Icon name="input3" />},
        {id: 4, content: <Icon name="input4" />},
        {id: 5, content: <Icon name="input5" />},
    ];

    return (
        <>
            <InputText
                label="Application name"
                value={values.name || ""}
                fullWidth
                onChange={changeNameHandler}
                error={errors.nameError.error}
                helperText={errors.nameError.helperText}
            />
            <SelectCompany label="COMPANY" value={values.company} onChange={changeCompanyHandler} />
            <SelectNode label="NODE" value={values.node} onChange={changeNodeHandler} />
            <Columns gap={24} col={2}>
                <Dropdown
                    label="APPLICATION TYPE"
                    value={applicationType}
                    onChange={changeApplicationHandler}
                    values={Object.values(EIpbeApplicationType)}
                />
                <SelectEncoderVersion
                    label="ENCODER VERSION"
                    value={values.encoderVersion}
                    onChange={changeEncoderHandler}
                />
            </Columns>

            <BorderBox gap={24}>
                <FlexHolder className="card-idx-holder">
                    {encoderVersionData?.values.length ? (
                        <Dropdown
                            label="SDI Device"
                            onChange={changeSDIDeviceHandler}
                            values={encoderVersionData.values}
                            value={values.cardIdx?.toString() || ""}
                        />
                    ) : null}
                    <NodeSchema inputsImgs={inputsNodeScheme} />
                </FlexHolder>
                <Columns gap={24} col={2}>
                    <Dropdown
                        label="INPUT FORMAT"
                        value={values.inputFormat}
                        values={Object.values(EIpbeEncoderVideoFormat)}
                        onChange={changeInputFormatHandler}
                    />
                    <Dropdown
                        label="VIDEO CONNECTION"
                        value={values.videoConnection}
                        values={Object.values(EIpbeVideoConnection)}
                        onChange={changeVideoConnectionHandler}
                    />
                </Columns>
            </BorderBox>
            <BorderBox gap={24}>
                <ApplicationType />
            </BorderBox>
            <Dropdown
                label="LATENCY"
                value={values.latency}
                values={Object.values(EIpbeLatency)}
                onChange={changeLatencyHandler}
            />
        </>
    );
};
