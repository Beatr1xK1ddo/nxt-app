import {ChangeEventHandler, FC, useCallback, useEffect, useMemo} from "react";
import {Dropdown, InputText} from "@nxt-ui/components";
import {BorderBox, Columns} from "../../../containers";
import {CompanyDropdown, NodeDropdown} from "../../../dropdowns";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {
    EEncoderVersion, EErrorType, EIpbeEncoderVideoFormat, EIpbeVideoConnection, ELatency, EOutputType,
} from "@nxt-ui/cp/types";
import {IMainProps} from "../types";
import {
    changeCompany, changeEncoder, changeInputFormat, changeLatency, changeName, changeNode, changeOutputType,
    changeVideoConnection, EMainFormError, ETabs, removeError, setError,
} from "../reducers";
import {ApplicationType} from "./application-type";

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

    const changeOutputTypeHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch?.(changeOutputType(e.target.value as EOutputType));
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
                dispatch?.(changeEncoder(key as EEncoderVersion));
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
            // @ts-ignore
            return EEncoderVersion[props.encoderVersion];
        }
        return;
    }, [props.encoderVersion]);

    useEffect(() => {
        console.log("props.latency", props.latency);
    }, [props.latency]);

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
            <CompanyDropdown label="COMPANY" value={props.company} onChange={changeCompanyHandler} />
            <NodeDropdown label="NODE" value={props.node} onChange={changeNodeHandler} />
            <Dropdown
                label="VIDEO CONNECTION"
                value={props.videoConnection}
                values={Object.values(EIpbeVideoConnection)}
                onChange={changeVideoConnectionHandler}
            />
            <BorderBox gap={24}>
                <ApplicationType
                    type={props.applicationType}
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
            <Columns gap={24} col={2}>
                <Dropdown
                    label="ENCODER VERSION"
                    value={encoderVersion}
                    onChange={changeEncoderHandler}
                    values={Object.values(EEncoderVersion)}
                />
                <Dropdown
                    label="LATENCY"
                    value={props.latency}
                    values={Object.values(ELatency)}
                    onChange={changeLatencyHandler}
                />
                <Dropdown
                    label="INPUT FORMAT"
                    value={props.inputFormat}
                    values={Object.values(EIpbeEncoderVideoFormat)}
                    onChange={changeInputFormatHandler}
                />
                <Dropdown
                    label="OUTPUT TYPE"
                    value={props.outputType}
                    values={Object.values(EOutputType)}
                    onChange={changeOutputTypeHandler}
                />
            </Columns>
            {/* <FlexHolder justify="flex-start" className="btn-footer-holder">
                <Button icon="arrow" iconAfter>
                    Save &nbsp; |
                </Button>
                <Button
                    data-type="btn-border"
                    style={{color: "var(--grey-dark)"}}
                    icon="copy"
                    onClick={sendPutRequest}
                    iconBefore>
                    Clone
                </Button>
            </FlexHolder> */}
        </>
    );
};
