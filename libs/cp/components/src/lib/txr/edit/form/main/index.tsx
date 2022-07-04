import {ChangeEventHandler, FC, useCallback, useMemo} from "react";
import {Dropdown, InputText} from "@nxt-ui/components";
import {BorderBox, Columns, FlexHolder, NodeSchema, SelectCompany, SelectNode} from "@nxt-ui/cp/components";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {
    ETxrApplicationType,
    ETxrEncoderVideoFormat,
    ETxrLatency,
    ETxrVideoConnection,
    INodesListItem,
} from "@nxt-ui/cp/types";
import {ApplicationType} from "./application-type";
import {useDispatch, useSelector} from "react-redux";
import {commonSelectors, CpRootState, txrEditActions, txrEditSelectors} from "@nxt-ui/cp-redux";
import {useSdiDeviceList} from "@nxt-ui/cp/hooks";
import {SelectEncoderVersion} from "./SelectEncoderVersion";

export const Main: FC = () => {
    const dispatch = useDispatch();
    const values = useSelector(txrEditSelectors.main.values);
    const errors = useSelector(txrEditSelectors.main.errors);
    const node = useSelector<CpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, values.nodeId)
    );
    const sdiDeviceData = useSdiDeviceList(node);

    const changeCompanyHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(txrEditActions.setCompany(e.target.value as number));
        },
        [dispatch]
    );

    const changeNodeHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(txrEditActions.setNode(e.target.value as number));
        },
        [dispatch]
    );

    const changeVideoConnectionHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(txrEditActions.setVideoConnection(e.target.value as ETxrVideoConnection));
        },
        [dispatch]
    );

    const changeInputFormatHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(txrEditActions.setInputFormat(e.target.value as ETxrEncoderVideoFormat));
        },
        [dispatch]
    );

    const changeLatencyHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(txrEditActions.setLatency(e.target.value as ETxrLatency));
        },
        [dispatch]
    );

    const changeEncoderHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(txrEditActions.setEncoder(e.target.value as string));
        },
        [dispatch]
    );

    const changeNameHandler = useCallback(
        (e) => {
            const value = e.currentTarget.value;
            dispatch(txrEditActions.setName(value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeApplicationHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(txrEditActions.setApplication(e.target.value as ETxrApplicationType));
        },
        [dispatch]
    );

    const applicationType = useMemo(() => {
        const value = Object.keys(ETxrApplicationType).find(
            (key) => ETxrApplicationType[key as keyof typeof ETxrApplicationType] === values.applicationType
        );
        if (value) {
            return value;
        }
        return "";
    }, [values.applicationType]);

    const latency = useMemo(() => {
        if (values.latency) {
            return ETxrLatency[values.latency];
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
                    dispatch(txrEditActions.setSDIDevice(result));
                }
            }
        },
        [dispatch, sdiDeviceData]
    );

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
                    values={Object.values(ETxrApplicationType)}
                    error={errors.applicationType.error}
                    helperText={errors.applicationType.helperText}
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
                            value={values.sdiDevice?.toString() || ""}
                            error={errors.sdiDevice.error}
                            helperText={errors.sdiDevice.helperText}
                        />
                        <NodeSchema nodeId={values.nodeId} selected={values.sdiDevice} />
                    </FlexHolder>
                ) : null}
                <Columns gap={24} col={2}>
                    <Dropdown
                        label="INPUT FORMAT"
                        value={values.inputFormat}
                        values={Object.values(ETxrEncoderVideoFormat)}
                        onChange={changeInputFormatHandler}
                        error={errors.inputFormat.error}
                        helperText={errors.inputFormat.helperText}
                    />
                    <Dropdown
                        label="VIDEO CONNECTION"
                        value={values.videoConnection}
                        values={Object.values(ETxrVideoConnection)}
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
                values={Object.values(ETxrLatency)}
                onChange={changeLatencyHandler}
            />
        </>
    );
};
