import {FC, useCallback, useMemo} from "react";
import {InputText, Button, CheckboxComponent} from "@nxt-ui/components";
import {loadImage} from "@nxt-ui/cp/utils";
import {Columns, FlexHolder} from "../../../../common";
import {ImgUploadItem} from "../../../index";
import {useDispatch, useSelector} from "react-redux";
import {txrEditActions, txrEditSelectors} from "@nxt-ui/cp-redux";
import {ETxrApplicationType} from "@nxt-ui/cp/types";

// ITxrEditAdvanced

export const Advanced: FC = () => {
    const dispatch = useDispatch();
    const values = useSelector(txrEditSelectors.advanced.values);
    const applicationType = useSelector(txrEditSelectors.main.applicationType);
    const {dirty, slateImage, slateImageUrl} = useSelector(txrEditSelectors.advanced.imageUrl);
    const changeAddTimecodeHandler = useCallback(() => {
        dispatch(txrEditActions.setAddTimecode());
    }, [dispatch]);

    const changeEnablePsfEncodingHandler = useCallback(() => {
        dispatch(txrEditActions.setEnablePsfEncoding());
    }, [dispatch]);

    const changeRunMonitorHandler = useCallback(() => {
        dispatch(txrEditActions.setRunMonitor());
    }, [dispatch]);

    const changeRestartOnErrorHandler = useCallback(() => {
        dispatch(txrEditActions.setRestartOnError());
    }, [dispatch]);

    const changeEnableLoopbackHandler = useCallback(() => {
        dispatch(txrEditActions.setEnableLoopback());
    }, [dispatch]);

    const changeEnablePreviewImagesHandler = useCallback(() => {
        dispatch(txrEditActions.setEnablePreviewImages());
    }, [dispatch]);

    const changeIsEndpointHandler = useCallback(() => {
        dispatch(txrEditActions.setIsEndpoint());
    }, [dispatch]);

    const changeEnableSlateIfNoSignalHandler = useCallback(() => {
        dispatch(txrEditActions.setEnableSlateIfNoSignal());
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
                dispatch(txrEditActions.setSlateImage(data));
            }
        };
        imageInput.click();
    }, [dispatch]);

    const allowedForTXRAvds2 = useMemo(() => {
        if (applicationType === ETxrApplicationType.Sdi2Web) {
            return false;
        } else {
            return true;
        }
    }, [applicationType]);

    const allowedForTXR = useMemo(() => {
        if (applicationType === ETxrApplicationType.TXR) {
            return true;
        } else {
            return false;
        }
    }, [applicationType]);

    const image = useMemo(() => {
        if (dirty) {
            return slateImage;
        } else {
            return slateImageUrl;
        }
    }, [dirty, slateImage, slateImageUrl]);

    return (
        <>
            <Columns className="switch-holder" gap={24} col={2}>
                {allowedForTXRAvds2 ? (
                    <CheckboxComponent
                        checked={values.addTimecode}
                        checkId="checkTimecode"
                        className="switch label-start"
                        labelText="Add Timecode"
                        onClick={changeAddTimecodeHandler}
                    />
                ) : null}
                {allowedForTXR ? (
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
                {allowedForTXR ? (
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
                {allowedForTXRAvds2 ? (
                    <CheckboxComponent
                        checked={values.enableSlateIfNoSignal}
                        checkId="checkEnableState"
                        className="switch label-start"
                        labelText="Enable Slate If No Signal"
                        onClick={changeEnableSlateIfNoSignalHandler}
                    />
                ) : null}
            </Columns>
            {allowedForTXRAvds2 ? (
                <div className="img-upload-holder">
                    <FlexHolder className="image-upload">
                        <InputText
                            InputProps={{
                                endAdornment: <span className="adornment-text">IMG</span>,
                            }}
                            label="Slate Image"
                            disabled
                        />
                        <Button data-type="btn-gray" onClick={changeSlateImageHandler}>
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
