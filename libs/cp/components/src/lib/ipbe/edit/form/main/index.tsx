import {ChangeEventHandler, FC, useCallback} from "react";
import {Dropdown, InputText} from "@nxt-ui/components";
import {BorderBox, Columns, FlexHolder, NodeSchema, SelectCompany, SelectNode} from "@nxt-ui/cp/components";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {
    EIpbeApplicationTypeKeys,
    EIpbeEncoderVideoFormatKeys,
    EIpbeLatencyKeys,
    EIpbeVideoConnection,
    INodesListItem,
} from "@nxt-ui/cp/types";
import {ApplicationType} from "./application-type";
import {useDispatch, useSelector} from "react-redux";
import {commonSelectors, CpRootState, ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {useChangeFormListener, useSdiDeviceList} from "@nxt-ui/cp/hooks";
import {SelectEncoderVersion} from "./SelectEncoderVersion";
import {SelectApplicationType} from "./SelectApplicationType";
import {SelectInputFormat} from "./SelectInputFormat";
import {SelectLatency} from "./SelectLatency";

export const Main: FC = () => {
    const dispatch = useDispatch();
    const values = useSelector(ipbeEditSelectors.main.values);
    const errors = useSelector(ipbeEditSelectors.main.errors);
    const node = useSelector<CpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, values.nodeId)
    );
    const sdiDeviceData = useSdiDeviceList(node);

    useChangeFormListener(values);

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
            dispatch(ipbeEditActions.setInputFormat(e.target.value as EIpbeEncoderVideoFormatKeys));
        },
        [dispatch]
    );

    const changeLatencyHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore todo: damn ts build bug
            dispatch(ipbeEditActions.setLatency(e.target.value as EIpbeLatencyKeys));
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
            dispatch(ipbeEditActions.setApplication(e.target.value as EIpbeApplicationTypeKeys));
        },
        [dispatch]
    );

    const changeSdiDeviceeHandler = useCallback(
        (key: number) => {
            dispatch(ipbeEditActions.setSDIDevice(key));
        },
        [dispatch]
    );

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
                    focused={false}
                    onChange={changeEncoderHandler}
                    error={errors.encoderVersion.error}
                    helperText={errors.encoderVersion.helperText}
                />
            </Columns>
            <BorderBox gap={24}>
                <div className="sdi-wrapper">
                    {sdiDeviceData?.values.length ? (
                        <FlexHolder className="card-idx-holder">
                            <NodeSchema
                                nodeId={values.nodeId}
                                onChange={changeSdiDeviceeHandler}
                                selected={values.sdiDevice}
                                error={errors.sdiDevice.error}
                                helperText={errors.sdiDevice.helperText}
                            />
                        </FlexHolder>
                    ) : null}
                    <SelectInputFormat
                        label="INPUT FORMAT"
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
                </div>
            </BorderBox>
            <BorderBox gap={24}>
                <ApplicationType />
            </BorderBox>
            <SelectLatency label="LATENCY" value={values.latency} onChange={changeLatencyHandler} />
        </>
    );
};
