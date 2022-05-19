import {FC} from "react";
import {InputText, Button, CheckboxComponent} from "@nxt-ui/components";
import {ImgUploadItem, Columns, FlexHolder} from "../../../../index";
import img from "./img.png";
const imgLoadedArr = [
    {id: 1, image: img, title: "art-unreal-creativity-file.jpg", size: "68.3 KB"},
    {id: 2, image: img, title: "img01", size: "60 KB"},
    {id: 3, image: img, title: "img02", size: "61 KB"},
];

export const Advanced: FC = () => {
    return (
        <>
            <Columns className="switch-holder" gap={24} col={2}>
                <CheckboxComponent checkId="checkTimecode" className="switch label-start" labelText="Add Timecode" />
                <CheckboxComponent
                    checkId="checkEncoding"
                    className="switch label-start"
                    labelText="Enable PSF Encoding"
                />
                <CheckboxComponent checkId="checkMonitor" className="switch label-start" labelText="Run monitor" />
                <CheckboxComponent
                    checkId="checkRestartErr"
                    className="switch label-start"
                    labelText="Restart On Error"
                />
                <CheckboxComponent checkId="checkLoopback" className="switch label-start" labelText="Enable Loopback" />
                <CheckboxComponent
                    checkId="checkImgPreview"
                    className="switch label-start"
                    labelText="Enable Preview Images"
                />
                <CheckboxComponent
                    checkId="checkEnableState"
                    className="switch label-start"
                    labelText="Enable Slate If No Signal"
                />
            </Columns>
            <div className="img-upload-holder">
                <FlexHolder className="image-upload">
                    <InputText
                        InputProps={{
                            endAdornment: <span className="adornment-text">IMG</span>,
                        }}
                        label="Slate Image"
                    />
                    <Button data-type="btn-gray">Browse Files</Button>
                </FlexHolder>
                <p>Accepted File Types : Accepted File Types : .jp[e]g, .png, .gif</p>
                {imgLoadedArr.map((post) => (
                    <ImgUploadItem key={post.id} image={post.image} title={post.title} size={post.size} />
                ))}
            </div>
        </>
    );
};
