import {ChangeEventHandler, FC, useCallback, useMemo} from "react";
import {InputText, Dropdown} from "@nxt-ui/components";
import {Columns, FlexHolder, BorderBox, NodeSchema} from "@nxt-ui/cp/components";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {EEncoderVersion, EErrorType, EIpbeEncoderVideoFormat, EIpbeVideoConnection, ELatency} from "@nxt-ui/cp/types";
import {IMainProps} from "../types";
import {
    changeCompany,
    changeEncoder,
    changeInputFormat,
    changeLatency,
    changeName,
    changeNode,
    changeVideoConnection,
    setError,
    ETabs,
    removeError,
    changeApplication,
    EMainFormError,
} from "../reducers";
import {ApplicationType} from "./application-type";
import {EApplicationType} from "@nxt-ui/cp/api";
import {Icon} from "@nxt-ui/icons";
import {SelectCompany, SelectNode} from "../../../../common";

export const Main: FC<IMainProps> = (props) => {
    const {dispatch, errors} = props;

    const changeCompanyHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch?.(changeCompany(e.target.value as number));
        },
        [dispatch]
    );

    const changeNodeHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch?.(changeNode(e.target.value as number));
        },
        [dispatch]
    );

    const changeVideoConnectionHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch?.(changeVideoConnection(e.target.value as EIpbeVideoConnection));
        },
        [dispatch]
    );

    const changeInputFormatHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch?.(changeInputFormat(e.target.value as EIpbeEncoderVideoFormat));
        },
        [dispatch]
    );

    const changeLatencyHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch?.(changeLatency(e.target.value as ELatency));
        },
        [dispatch]
    );

    const changeEncoderHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as EEncoderVersion;
            const key = Object.keys(EEncoderVersion).find(
                (item) => EEncoderVersion[item as keyof typeof EEncoderVersion] === value
            );

            if (key) {
                dispatch?.(changeEncoder(key as keyof typeof EEncoderVersion));
            }
        },
        [dispatch]
    );

    const changeNameHandler = useCallback(
        (e) => {
            const value = e.currentTarget.value as string;
            const payload = {
                tab: ETabs.main,
                field: EMainFormError.name,
                text: EErrorType.required,
            };
            if (!value) {
                dispatch?.(setError(payload));
            }

            if (value && errors.nameError.error) {
                dispatch?.(removeError(payload));
            }

            dispatch?.(changeName(e.currentTarget.value as string));
        },
        [dispatch, errors.nameError]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const encoderVersion = useMemo(() => {
        if (props.encoderVersion) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return EEncoderVersion[props.encoderVersion];
        }
        return;
    }, [props.encoderVersion]);

    const changeApplicationHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch?.(changeApplication(e.target.value as EApplicationType));
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
                value={props.name || ""}
                fullWidth
                onChange={changeNameHandler}
                error={errors.nameError.error}
                helperText={errors.nameError.helperText}
            />
            <SelectCompany label="COMPANY" value={props.company} onChange={changeCompanyHandler} />
            <SelectNode label="NODE" value={props.node} onChange={changeNodeHandler} />
            <Columns gap={24} col={2}>
                <Dropdown
                    label="ENCODER VERSION"
                    value={encoderVersion}
                    onChange={changeEncoderHandler}
                    values={Object.values(EEncoderVersion)}
                />
                <Dropdown
                    label="APPLICATION TYPE"
                    value={props.applicationType}
                    onChange={changeApplicationHandler}
                    values={Object.values(EApplicationType)}
                />
            </Columns>

            <BorderBox gap={24}>
                <FlexHolder className="card-idx-holder">
                    <Dropdown label="SDI Device" values={sdiDeviceSel} value="2" />
                    {/* <NodeSchema inputsImgs={inputsNodeScheme} /> */}
                </FlexHolder>
                <Columns gap={24} col={2}>
                    <Dropdown
                        label="INPUT FORMAT"
                        value={props.inputFormat}
                        values={Object.values(EIpbeEncoderVideoFormat)}
                        onChange={changeInputFormatHandler}
                    />
                    <Dropdown
                        label="VIDEO CONNECTION"
                        value={props.videoConnection}
                        values={Object.values(EIpbeVideoConnection)}
                        onChange={changeVideoConnectionHandler}
                    />
                </Columns>
            </BorderBox>
            <BorderBox gap={24}>
                <ApplicationType
                    type={props.outputType}
                    applicationType={props.applicationType}
                    audioOutputIp={props.audioOutputIp}
                    audioOutputPort={props.audioOutputPort}
                    videoOutputIp={props.videoOutputIp}
                    videoOutputPort={props.videoOutputPort}
                    ipbeDestinations={props.ipbeDestinations}
                    dispatch={dispatch}
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
                value={props.latency}
                values={Object.values(ELatency)}
                onChange={changeLatencyHandler}
            />
        </>
    );
};
