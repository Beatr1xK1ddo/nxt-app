import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {InputText, Button, CheckboxComponent} from "@nxt-ui/components";
import {loadImage} from "@nxt-ui/cp/utils";
import {Columns, FlexHolder} from "../../../../common";
import {ImgUploadItem} from "../../../index";
import {useDispatch, useSelector} from "react-redux";
import {ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {EIpbeApplicationTypeKeys} from "@nxt-ui/cp/types";
import {useChangeFormListener} from "@nxt-ui/cp/hooks";
import styled from "@emotion/styled";

// IIpbeEditAdvanced
const ColumnsAdvanced = styled(Columns)`
    .switch {
        max-width: 210px;
    }
`;

export const Advanced: FC = () => {
    const [imgName, setImgName] = useState<string>("Slate Image");
    const dispatch = useDispatch();
    const values = useSelector(ipbeEditSelectors.advanced.values);
    const applicationType = useSelector(ipbeEditSelectors.main.applicationType);
    const {dirty, slateImage, slateImageUrl} = useSelector(ipbeEditSelectors.advanced.imageUrl);
    useChangeFormListener(values);
    const changeAddTimecodeHandler = useCallback(() => {
        dispatch(ipbeEditActions.setAddTimecode());
    }, [dispatch]);

    const changeEnablePsfEncodingHandler = useCallback(() => {
        dispatch(ipbeEditActions.setEnablePsfEncoding());
    }, [dispatch]);

    const changeRunMonitorHandler = useCallback(() => {
        dispatch(ipbeEditActions.setRunMonitor());
    }, [dispatch]);

    const changeRestartOnErrorHandler = useCallback(() => {
        dispatch(ipbeEditActions.setRestartOnError());
    }, [dispatch]);

    const changeEnableLoopbackHandler = useCallback(() => {
        dispatch(ipbeEditActions.setEnableLoopback());
    }, [dispatch]);

    const changeEnablePreviewImagesHandler = useCallback(() => {
        dispatch(ipbeEditActions.setEnablePreviewImages());
    }, [dispatch]);

    const changeIsEndpointHandler = useCallback(() => {
        dispatch(ipbeEditActions.setIsEndpoint());
    }, [dispatch]);

    const changeEnableSlateIfNoSignalHandler = useCallback(() => {
        dispatch(ipbeEditActions.setEnableSlateIfNoSignal());
    }, [dispatch]);

    const changeSlateImageHandler = useCallback(() => {
        const imageInput = document.createElement("input");
        imageInput.type = "file";
        imageInput.onchange = async () => {
            const file = imageInput.files?.[0];
            if (!file) {
                return;
            }
            const data = await loadImage(file);
            if (typeof data === "string") {
                dispatch(ipbeEditActions.setSlateImage(data));
            }
            setImgName(file.name);
        };
        imageInput.click();
    }, [dispatch]);

    useEffect(() => {
        if (!dirty && slateImageUrl) {
            const stringArr = slateImageUrl.split("/");
            setImgName(stringArr[stringArr.length - 1]);
        }
        if (dirty && !slateImage) {
            setImgName("Slate Image");
        }
    }, [slateImageUrl, slateImage, dirty]);

    const allowedForIPBEAvds2 = useMemo(() => {
        if (applicationType === EIpbeApplicationTypeKeys.Sdi2Web) {
            return false;
        } else {
            return true;
        }
    }, [applicationType]);

    const allowedForIPBE = useMemo(() => {
        if (applicationType === "IPBE") {
            return true;
        } else {
            return false;
        }
    }, [applicationType]);

    const image = useMemo(() => {
        if (dirty) {
            return slateImage;
        } else {
            return slateImageUrl ? `${window.location.origin}${slateImageUrl}` : slateImageUrl;
        }
    }, [dirty, slateImage, slateImageUrl]);

    return (
        <>
            <ColumnsAdvanced className="switch-holder" gap={24} col={2}>
                {allowedForIPBEAvds2 ? (
                    <CheckboxComponent
                        checked={values.addTimecode}
                        checkId="checkTimecode"
                        className="switch label-start"
                        labelText="Add Timecode"
                        onClick={changeAddTimecodeHandler}
                    />
                ) : null}
                {allowedForIPBE ? (
                    <CheckboxComponent
                        checked={values.enablePsfEncoding}
                        checkId="checkEncoding"
                        className="switch label-start"
                        labelText="Enable PSF Encoding"
                        onClick={changeEnablePsfEncodingHandler}
                    />
                ) : null}
                <CheckboxComponent
                    checked={values.runMonitor}
                    checkId="checkMonitor"
                    className="switch label-start"
                    labelText="Run monitor"
                    onClick={changeRunMonitorHandler}
                />
                <CheckboxComponent
                    checked={values.restartOnError}
                    checkId="checkRestartErr"
                    className="switch label-start"
                    labelText="Restart On Error"
                    onClick={changeRestartOnErrorHandler}
                />
                {allowedForIPBE ? (
                    <CheckboxComponent
                        checked={values.enableLoopback}
                        checkId="checkLoopback"
                        className="switch label-start"
                        labelText="Enable Loopback"
                        onClick={changeEnableLoopbackHandler}
                    />
                ) : null}
                <CheckboxComponent
                    checked={values.enablePreviewImages}
                    checkId="checkImgPreview"
                    className="switch label-start"
                    labelText="Enable Preview Images"
                    onClick={changeEnablePreviewImagesHandler}
                />
                <CheckboxComponent
                    checked={values.isEndpoint}
                    checkId="IsEndpoint"
                    className="switch label-start"
                    labelText="Is Endpoint"
                    onClick={changeIsEndpointHandler}
                />
                {allowedForIPBEAvds2 ? (
                    <CheckboxComponent
                        checked={values.enableSlateIfNoSignal}
                        checkId="checkEnableState"
                        className="switch label-start"
                        labelText="Enable Slate If No Signal"
                        onClick={changeEnableSlateIfNoSignalHandler}
                    />
                ) : null}
            </ColumnsAdvanced>
            {allowedForIPBEAvds2 ? (
                <div className="img-upload-holder">
                    <FlexHolder className="image-upload">
                        <InputText
                            InputProps={{
                                endAdornment: <span className="adornment-text">IMG</span>,
                            }}
                            label={imgName}
                            disabled
                        />
                        <Button
                            disabled={!values.enableSlateIfNoSignal}
                            data-type="btn-gray"
                            onClick={changeSlateImageHandler}>
                            Browse Files
                        </Button>
                    </FlexHolder>
                    <p>Accepted File Types : Accepted File Types : .jp[e]g, .png, .gif</p>
                    {image && <ImgUploadItem image={image} />}
                </div>
            ) : null}
        </>
    );
};
