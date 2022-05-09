import {ChangeEventHandler, FC, useCallback, useMemo} from "react";
import {InputText, Dropdown, Button} from "@nxt-ui/components";
import {Columns, FlexHolder, BorderBox} from "../../../containers";
import {CompanyDropdown, NodeDropdown} from "../../../dropdowns";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {EEncoderVersion, ELatency, EOutputType, EIpbeVideoConnection, EIpbeEncoderVideoFormat} from "@nxt-ui/cp/types";
import {IFormProps} from "../types";
import {changeCompany, changeName, changeNode, sendForm} from "../reducers";
import {ApplicationType} from "./application-type";

export const Main: FC<IFormProps> = (props) => {
    const {dispatch} = props;

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

    const changeNameHandler = useCallback(
        (e) => {
            dispatch?.(changeName(e.currentTarget.value as string));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const sendPutRequest = useCallback(() => {
        dispatch?.(sendForm());
    }, [dispatch]);

    const encoderVersion = useMemo(() => {
        if (props.encoderVersion) {
            return EEncoderVersion[props.encoderVersion];
        }
        return;
    }, [props.encoderVersion]);

    return (
        <>
            <InputText
                label="Application name"
                value={props.name}
                //InputLabelProps={{filled: props.name ? true : false}}
                fullWidth
                onChange={changeNameHandler}
            />
            <CompanyDropdown
                label="COMPANY"
                value={props.company}
                onChange={changeCompanyHandler}
            />
            <NodeDropdown label="NODE" value={props.nodeId} onChange={changeNodeHandler} />
            <Dropdown
                label="VIDEO CONNECTION"
                value={props.videoConnection}
                values={Object.values(EIpbeVideoConnection)}
            />
            <BorderBox gap={24}>
                <ApplicationType
                    type={props.applicationType}
                    audioOutputIp={props.audioOutputIp}
                    audioOutputPort={props.audioOutputPort}
                    videoOutputIp={props.videoOutputIp}
                    videoOutputPort={props.videoOutputPort}
                    ipbeDestinations={props.ipbeDestinations}
                />
            </BorderBox>
            <Columns gap={24} col={2}>
                <Dropdown label="ENCODER VERSION" value={encoderVersion} values={Object.values(EEncoderVersion)} />
                <Dropdown label="LATENCY" value={props.latency} values={Object.values(ELatency)} />
                <Dropdown
                    label="INPUT FORMAT"
                    value={props.inputFormat}
                    values={Object.values(EIpbeEncoderVideoFormat)}
                />
                <Dropdown label="OUTPUT TYPE" value={props.outputType} values={Object.values(EOutputType)} />
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
