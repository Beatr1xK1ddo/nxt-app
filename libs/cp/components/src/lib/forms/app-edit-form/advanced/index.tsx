import {FC, useCallback} from "react";
import {InputText, Button, CheckboxComponent} from "@nxt-ui/components";
import {Columns, FlexHolder} from "../../../containers";
import {ImgUploadItem} from "../../../index";
import {IAdvancedProps} from "../types";
import {
    changeAddTimecode,
    changeEnableLoopback,
    changeEnablePreviewImages,
    changeEnablePsfEncoding,
    changeEnableSlateIfNoSignal,
    changeRestartOnError,
    changeRunMonitor,
    changeSlateImage,
} from "../reducers";
import {loadImage} from "@nxt-ui/cp/utils";

export const Advanced: FC<IAdvancedProps> = (props) => {
    const {
        addTimecode,
        runMonitor,
        enableLoopback,
        enableSlateIfNoSignal,
        enablePsfEncoding,
        restartOnError,
        slateImage,
        enablePreviewImages,
        dispatch,
    } = props;

    const changeAddTimecodeHandler = useCallback(() => {
        dispatch?.(changeAddTimecode());
    }, [dispatch]);

    const changeEnablePsfEncodingHandler = useCallback(() => {
        dispatch?.(changeEnablePsfEncoding());
    }, [dispatch]);

    const changeRunMonitorHandler = useCallback(() => {
        dispatch?.(changeRunMonitor());
    }, [dispatch]);

    const changeRestartOnErrorHandler = useCallback(() => {
        dispatch?.(changeRestartOnError());
    }, [dispatch]);

    const changeEnableLoopbackHandler = useCallback(() => {
        dispatch?.(changeEnableLoopback());
    }, [dispatch]);

    const changeEnablePreviewImagesHandler = useCallback(() => {
        dispatch?.(changeEnablePreviewImages());
    }, [dispatch]);

    const changeEnableSlateIfNoSignalHandler = useCallback(() => {
        dispatch?.(changeEnableSlateIfNoSignal());
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
                dispatch?.(changeSlateImage(data));
            }
        };
        imageInput.click();
    }, [dispatch]);

    return (
        <>
            <Columns className="switch-holder" gap={24} col={2}>
                <CheckboxComponent
                    checked={addTimecode}
                    checkId="checkTimecode"
                    className="switch label-start"
                    labelText="Add Timecode"
                    onClick={changeAddTimecodeHandler}
                />
                <CheckboxComponent
                    checked={enablePsfEncoding}
                    checkId="checkEncoding"
                    className="switch label-start"
                    labelText="Enable PSF Encoding"
                    onClick={changeEnablePsfEncodingHandler}
                />
                <CheckboxComponent
                    checked={runMonitor}
                    checkId="checkMonitor"
                    className="switch label-start"
                    labelText="Run monitor"
                    onClick={changeRunMonitorHandler}
                />
                <CheckboxComponent
                    checked={restartOnError}
                    checkId="checkRestartErr"
                    className="switch label-start"
                    labelText="Restart On Error"
                    onClick={changeRestartOnErrorHandler}
                />
                <CheckboxComponent
                    checked={enableLoopback}
                    checkId="checkLoopback"
                    className="switch label-start"
                    labelText="Enable Loopback"
                    onClick={changeEnableLoopbackHandler}
                />
                <CheckboxComponent
                    checked={enablePreviewImages}
                    checkId="checkImgPreview"
                    className="switch label-start"
                    labelText="Enable Preview Images"
                    onClick={changeEnablePreviewImagesHandler}
                />
                <CheckboxComponent
                    checked={enableSlateIfNoSignal}
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
                {slateImage && <ImgUploadItem image={slateImage} dispatch={dispatch} />}
            </div>
        </>
    );
};
