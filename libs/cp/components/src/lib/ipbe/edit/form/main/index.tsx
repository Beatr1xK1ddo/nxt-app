import {ChangeEventHandler, FC, useCallback, useEffect, useMemo} from "react";
import {Dropdown, InputText} from "@nxt-ui/components";
import {BorderBox, Columns, FlexHolder, NodeSchema, SelectCompany, SelectNode} from "@nxt-ui/cp/components";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {
    EIpbeApplicationType,
    EIpbeEncoderVideoFormat,
    EIpbeLatency,
    EIpbeOutputType,
    EIpbeVideoConnection,
    INodesListItem,
} from "@nxt-ui/cp/types";
import {ApplicationType} from "./application-type";
import {useDispatch, useSelector} from "react-redux";
import {commonSelectors, CpRootState, ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {useCompaniesList, useNodesList, useSDIDeviceList, useSelectData} from "@nxt-ui/cp/hooks";
import {SelectEncoderVersion} from "./SelectEncoderVersion";

export const Main: FC = () => {
    const dispatch = useDispatch();
    const values = useSelector(ipbeEditSelectors.selectMainValues);
    const errors = useSelector(ipbeEditSelectors.selectMainErrors);
    const node = useSelector<CpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, values.nodeId)
    );
    const sdiDeviceData = useSDIDeviceList(node);
    useNodesList();
    useCompaniesList();
    useSelectData(values.nodeId);

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
        if (value) {
            return value;
        }
        return "";
    }, [values.applicationType]);

    const latency = useMemo(() => {
        if (values.latency) {
            return EIpbeLatency[values.latency];
        }
        return "";
    }, [values.latency]);

    const changeSDIDeviceHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as number;
            const indexValue = sdiDeviceData?.values.indexOf(value);
            if (typeof indexValue === "number") {
                const result = sdiDeviceData?.keys[indexValue];
                if (typeof result === "number") {
                    dispatch(ipbeEditActions.changeSDIDevice(result));
                }
            }
        },
        [dispatch, sdiDeviceData]
    );

    useEffect(() => {
        if (values.applicationType === EIpbeApplicationType.Sdi2Web && values.outputType === EIpbeOutputType.udp) {
            dispatch(ipbeEditActions.changeOutputType(EIpbeOutputType.rtp));
        }
        if (values.applicationType !== EIpbeApplicationType.Sdi2Web && values.outputType === EIpbeOutputType.rtp) {
            dispatch(ipbeEditActions.changeOutputType(EIpbeOutputType.udp));
        }
    }, [values.applicationType, dispatch, values.outputType]);

    return (
        <>
            <InputText
                label="Application name"
                value={values.name || ""}
                fullWidth
                onChange={changeNameHandler}
                error={errors.name.error}
                helperText={errors.name.helperText}
            />
            <SelectCompany
                error={errors.company.error}
                helperText={errors.company.helperText}
                value={values.company}
                onChange={changeCompanyHandler}
            />
            <SelectNode
                error={errors.nodeId.error}
                helperText={errors.nodeId.helperText}
                value={values.nodeId}
                onChange={changeNodeHandler}
            />
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
                    error={errors.encoderVersion.error}
                    helperText={errors.encoderVersion.helperText}
                />
            </Columns>

            <BorderBox gap={24}>
                {sdiDeviceData?.values.length ? (
                    <FlexHolder className="card-idx-holder">
                        <Dropdown
                            label="SDI Device"
                            onChange={changeSDIDeviceHandler}
                            values={sdiDeviceData.values}
                            value={values.cardIdx?.toString() || ""}
                            error={errors.cardIdx.error}
                            helperText={errors.cardIdx.helperText}
                        />

                        <NodeSchema nodeId={values.nodeId} selected={values.cardIdx} />
                    </FlexHolder>
                ) : null}
                <Columns gap={24} col={2}>
                    <Dropdown
                        label="INPUT FORMAT"
                        value={values.inputFormat}
                        values={Object.values(EIpbeEncoderVideoFormat)}
                        onChange={changeInputFormatHandler}
                        error={errors.inputFormat.error}
                        helperText={errors.inputFormat.helperText}
                    />
                    <Dropdown
                        label="VIDEO CONNECTION"
                        value={values.videoConnection}
                        values={Object.values(EIpbeVideoConnection)}
                        onChange={changeVideoConnectionHandler}
                        error={errors.videoConnection.error}
                        helperText={errors.videoConnection.helperText}
                    />
                </Columns>
            </BorderBox>
            <BorderBox gap={24}>
                <ApplicationType />
            </BorderBox>
            <Dropdown
                label="LATENCY"
                value={latency}
                values={Object.values(EIpbeLatency)}
                onChange={changeLatencyHandler}
            />
        </>
    );
};
