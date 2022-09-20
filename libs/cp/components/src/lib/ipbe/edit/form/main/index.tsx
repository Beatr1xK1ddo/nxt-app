import {ChangeEventHandler, FC, useCallback, useMemo} from "react";
import {Dropdown, InputText} from "@nxt-ui/components";
import {BorderBox, Columns, FlexHolder, NodeSchema, SelectCompany, SelectNode} from "@nxt-ui/cp/components";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {
    EIpbeApplicationType,
    EIpbeEncoderVideoFormat,
    EIpbeLatency,
    EIpbeVideoConnection,
    INodesListItem,
} from "@nxt-ui/cp/types";
import {ApplicationType} from "./application-type";
import {useDispatch, useSelector} from "react-redux";
import {commonSelectors, CpRootState, ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {useSdiDeviceList} from "@nxt-ui/cp/hooks";
import {SelectEncoderVersion} from "./SelectEncoderVersion";
import {SelectApplicationType} from "./SelectApplicationType";

export const Main: FC = () => {
    const dispatch = useDispatch();
    const values = useSelector(ipbeEditSelectors.main.values);
    const errors = useSelector(ipbeEditSelectors.main.errors);
    const node = useSelector<CpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, values.nodeId)
    );
    const sdiDeviceData = useSdiDeviceList(node);

    const changeCompanyHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.setCompany(e.target.value as number));
        },
        [dispatch]
    );

    const changeNodeHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.setNode(e.target.value as number));
        },
        [dispatch]
    );

    const changeVideoConnectionHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.setVideoConnection(e.target.value as EIpbeVideoConnection));
        },
        [dispatch]
    );

    const changeInputFormatHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.setInputFormat(e.target.value as EIpbeEncoderVideoFormat));
        },
        [dispatch]
    );

    const changeLatencyHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.setLatency(e.target.value as EIpbeLatency));
        },
        [dispatch]
    );

    const changeEncoderHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.setEncoder(e.target.value as string));
        },
        [dispatch]
    );

    const changeNameHandler = useCallback(
        (e) => {
            const value = e.currentTarget.value;
            dispatch(ipbeEditActions.setName(value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const changeApplicationHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.setApplication(e.target.value as EIpbeApplicationType));
        },
        [dispatch]
    );

    const changeSDIDeviceHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as number;
            const indexValue = sdiDeviceData?.values.indexOf(value);
            if (typeof indexValue === "number") {
                const result = sdiDeviceData?.keys[indexValue];
                if (typeof result === "number") {
                    dispatch(ipbeEditActions.setSDIDevice(result));
                }
            }
        },
        [dispatch, sdiDeviceData]
    );

    // const applicationType = useMemo(() => {
    //     const value = Object.keys(EIpbeApplicationType).find(
    //         (key) => EIpbeApplicationType[key as keyof typeof EIpbeApplicationType] === values.applicationType
    //     );
    //     if (value) {
    //         return value;
    //     }
    //     return "";
    // }, [values.applicationType]);

    const latency = useMemo(() => {
        if (values.latency) {
            return EIpbeLatency[values.latency];
        }
        return "";
    }, [values.latency]);

    return (
        <>
            <InputText
                label="APPLICATION NAME"
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
                <SelectApplicationType
                    label="APPLICATION TYPE"
                    onChange={changeApplicationHandler}
                    error={errors.applicationType.error}
                    helperText={errors.applicationType.helperText}
                />
                <SelectEncoderVersion
                    label="ENCODER VERSION"
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
