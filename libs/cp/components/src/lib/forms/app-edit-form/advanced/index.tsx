import {FC} from "react";
import {InputText, Dropdown, Button} from "@nxt-ui/components";
import {Columns, FlexHolder, BorderBox} from "../../../containers";
import {Icon} from "@nxt-ui/icons";
import {ImgUploadItem} from "../../../index";
import img from "./img.png";
const imgLoadedArr = [
    {id: 1, image: img, title: "art-unreal-creativity-file.jpg", size: "68.3 KB"},
    {id: 2, image: img, title: "img01", size: "60 KB"},
    {id: 3, image: img, title: "img02", size: "61 KB"},
];
const dropSel = ["yes", "no"];
export const Advanced: FC = () => {
    return (
        <>
            <Columns gap={24} col={2}>
                <Dropdown label="Add Timecode" values={dropSel} />
                <Dropdown label="Enable PSF Encoding" values={dropSel} />
                <Dropdown label="Run monitor" values={dropSel} />
                <Dropdown label="Restart On Error" values={dropSel} />
                <Dropdown label="Enable Loopback" values={dropSel} />
                <Dropdown label="Enable Preview Images" values={dropSel} />
            </Columns>
            <Dropdown label="Enable Slate If No Signal" values={dropSel} />
            <div>
                {imgLoadedArr.map((post) => (
                    <ImgUploadItem
                        key={post.id}
                        image={post.image}
                        title={post.title}
                        size={post.size}
                    />
                ))}
            </div>
        </>
    );
};
