import {FC} from "react";
import {InputText, Dropdown} from "@nxt-ui/components";
import {Columns} from "../../../containers";

export const VideoEncoder: FC = () => {
    return (
        <>
            <Columns gap={24} col={2}>
                <Dropdown label="Video Encoder" />
                <Dropdown label="Preset" />
                <Dropdown label="Profile" />
                <Dropdown label="Level" />
            </Columns>
            <Columns gap={24} col={3}>
                <InputText label="Vbitrate" />
                <InputText label="Vbv Maxrate" />
                <InputText label="Vbv Bufsize" />
                <Dropdown label="Aspect Ratio" />
                <InputText label="Keyint" />
                <Dropdown label="Bframes" />
                <Dropdown label="Max Refs" />
                <Dropdown label="Lookahead" />
                <Dropdown label="Open Gop" />
            </Columns>
            <Columns gap={24} col={2}>
                <Dropdown label="B-Frame Adaptive" />
                <Dropdown label="Scenecut Threshold" />
            </Columns>
            <Columns gap={24} col={3}>
                <Dropdown label="Interlaced" />
                <Dropdown label="Cbr" />
                <Dropdown label="Intra Refresh" />
            </Columns>

            <Dropdown label="Intra Refresh" />
        </>
    );
};
