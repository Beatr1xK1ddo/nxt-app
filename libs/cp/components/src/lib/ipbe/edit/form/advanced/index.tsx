import {FC, useCallback} from "react";
import {InputText, Button, CheckboxComponent} from "@nxt-ui/components";
import {loadImage} from "@nxt-ui/cp/utils";
import {Columns, FlexHolder} from "../../../../common";
import {ImgUploadItem} from "../../../index";
import {useDispatch, useSelector} from "react-redux";
import {ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";

// IIpbeEditAdvanced

export const Advanced: FC = () => {
    const dispatch = useDispatch();
    const {values} = useSelector(ipbeEditSelectors.selectIpbeEditAdvanced);
    const changeAddTimecodeHandler = useCallback(() => {
        dispatch(ipbeEditActions.changeAddTimecode());
    }, [dispatch]);

    const changeEnablePsfEncodingHandler = useCallback(() => {
        dispatch(ipbeEditActions.changeEnablePsfEncoding());
    }, [dispatch]);

    const changeRunMonitorHandler = useCallback(() => {
        dispatch(ipbeEditActions.changeRunMonitor());
    }, [dispatch]);

    const changeRestartOnErrorHandler = useCallback(() => {
        dispatch(ipbeEditActions.changeRestartOnError());
    }, [dispatch]);

    const changeEnableLoopbackHandler = useCallback(() => {
        dispatch(ipbeEditActions.changeEnableLoopback());
    }, [dispatch]);

    const changeEnablePreviewImagesHandler = useCallback(() => {
        dispatch(ipbeEditActions.changeEnablePreviewImages());
    }, [dispatch]);

    const changeEnableSlateIfNoSignalHandler = useCallback(() => {
        dispatch(ipbeEditActions.changeEnableSlateIfNoSignal());
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
                dispatch(ipbeEditActions.changeSlateImage(data));
            }
        };
        imageInput.click();
    }, [dispatch]);

    return (
        <>
            <Columns className="switch-holder" gap={24} col={2}>
                <CheckboxComponent
                    checked={values.addTimecode}
                    checkId="checkTimecode"
                    className="switch label-start"
                    labelText="Add Timecode"
                    onClick={changeAddTimecodeHandler}
                />
                <CheckboxComponent
                    checked={values.enablePsfEncoding}
                    checkId="checkEncoding"
                    className="switch label-start"
                    labelText="Enable PSF Encoding"
                    onClick={changeEnablePsfEncodingHandler}
                />
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
                <CheckboxComponent
                    checked={values.enableLoopback}
                    checkId="checkLoopback"
                    className="switch label-start"
                    labelText="Enable Loopback"
                    onClick={changeEnableLoopbackHandler}
                />
                <CheckboxComponent
                    checked={values.enablePreviewImages}
                    checkId="checkImgPreview"
                    className="switch label-start"
                    labelText="Enable Preview Images"
                    onClick={changeEnablePreviewImagesHandler}
                />
                <CheckboxComponent
                    checked={values.enableSlateIfNoSignal}
                    checkId="checkEnableState"
                    className="switch label-start"
                    labelText="Enable Slate If No Signal"
                    onClick={changeEnableSlateIfNoSignalHandler}
                />
            </Columns>
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
                {values.slateImage && <ImgUploadItem image={values.slateImage} />}
            </div>
        </>
    );
};
