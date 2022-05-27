import {ChangeEventHandler, FC, useCallback, useMemo} from "react";
import {InputText, Dropdown} from "@nxt-ui/components";
import {Columns, FlexHolder, BorderBox, NodeSchema} from "@nxt-ui/cp/components";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {
    EIpbeApplicationType,
    EIpbeEncoderVersion,
    EIpbeEncoderVideoFormat,
    EIpbeLatency,
    EIpbeVideoConnection,
} from "@nxt-ui/cp/types";
import {ApplicationType} from "./application-type";
import {Icon} from "@nxt-ui/icons";
import {SelectCompany, SelectNode} from "../../../../common";
import {useDispatch, useSelector} from "react-redux";
import {ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";

export const Main: FC = () => {
    const dispatch = useDispatch();
    const {errors, values} = useSelector(ipbeEditSelectors.selectIpbeEditMain);
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
            const value = e.target.value as EIpbeEncoderVersion;
            const key = Object.keys(EIpbeEncoderVersion).find(
                (item) => EIpbeEncoderVersion[item as keyof typeof EIpbeEncoderVersion] === value
            );

            if (key) {
                dispatch(ipbeEditActions.changeEncoder(key as keyof typeof EIpbeEncoderVersion));
            }
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

    const encoderVersion = useMemo(() => {
        if (values.encoderVersion) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return EIpbeEncoderVersion[values.encoderVersion];
        }
        return;
    }, [values.encoderVersion]);

    const changeApplicationHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.changeApplication(e.target.value as EIpbeApplicationType));
        },
        [dispatch]
    );
    const changeSDIDeviceHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(ipbeEditActions.changeSDIDevice(e.target.value as number));
        },
        [dispatch]
    );

    const sdiDeviceSel = ["1", "2"];

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
                    label="ENCODER VERSION"
                    value={encoderVersion}
                    onChange={changeEncoderHandler}
                    values={Object.values(EIpbeEncoderVersion)}
                />
                <Dropdown
                    label="APPLICATION TYPE"
                    value={values.applicationType}
                    onChange={changeApplicationHandler}
                    values={Object.values(EIpbeApplicationType)}
                />
            </Columns>

            <BorderBox gap={24}>
                <FlexHolder className="card-idx-holder">
<<<<<<< HEAD
                    <Dropdown
                        label="SDI Device"
                        onChange={changeSDIDeviceHandler}
                        values={sdiDeviceSel}
                        value={values.cardIdx}
                    />
                    <NodeSchema />
=======
                    <Dropdown label="SDI Device" values={sdiDeviceSel} value="2" />
                    <NodeSchema inputsImgs={inputsNodeScheme} />
>>>>>>> c138ba00d1c8678ff0c24ef1ce0f7bae24afc7e7
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
                <ApplicationType
                    type={values.outputType}
                    applicationType={values.applicationType}
                    audioOutputIp={values.audioOutputIp}
                    audioOutputPort={values.audioOutputPort}
                    videoOutputIp={values.videoOutputIp}
                    videoOutputPort={values.videoOutputPort}
                    ipbeDestinations={values.ipbeDestinations}
                    errors={{
                        typeError: errors.applicationTypeError,
                        videoOutputIpError: errors.videoOutputIpError,
                        videoOutputPortError: errors.videoOutputPortError,
                        audioOutputIpError: errors.audioOutputIpError,
                        audioOutputPortError: errors.audioOutputPortError,
                        ipbeDestinations: errors.ipbeDestinations,
                    }}
                />
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
