import {ChangeEventHandler, FC, useCallback, useMemo} from "react";
import {InputText, Dropdown} from "@nxt-ui/components";
import {Columns, FlexHolder, BorderBox} from "../../../containers";
import {CompanyDropdown, NodeDropdown} from "../../../dropdowns";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {SignalBox} from "../../../index";
import {
    EEncoderVersion,
    EErrorType,
    EIpbeEncoderVideoFormat,
    EIpbeVideoConnection,
    ELatency,
    EVideoConnection,
    EVideoFormat,
    EOutputType,
} from "@nxt-ui/cp/types";
import {IMainProps} from "../types";
import {
    changeCompany,
    changeEncoder,
    changeInputFormat,
    changeLatency,
    changeName,
    changeNode,
    changeVideoConnection,
    changeInputFormat,
    changeLatency,
    setError,
    ETabs,
    removeError,
    changeApplication,
} from "../reducers";
import {ApplicationType} from "./application-type";
import {EApplicationType} from "@nxt-ui/cp/api";

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
            <CompanyDropdown label="COMPANY" value={props.company || ""} onChange={changeCompanyHandler} />
            <NodeDropdown label="NODE" value={props.node} onChange={changeNodeHandler} />
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
                    <SignalBox />
                </FlexHolder>
                <Columns gap={24} col={2}>
                    <Dropdown
                        label="INPUT FORMAT"
                        value={props.inputFormat}
                        values={Object.values(EVideoFormat)}
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
