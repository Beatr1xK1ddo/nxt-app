import {FC} from "react";
import {InputText, Dropdown} from "@nxt-ui/components";
import {Columns, FlexHolder} from "../../../containers";
import {SignalBox} from "../../../index";

export const MpegTsMuxer: FC = () => {
    const cardIdxSel = ["1", "2"];

    return (
        <>
            <Columns gap={24} col={2}>
                <Dropdown label="MUXER" />
                <InputText label="Muxrate" />
                <InputText label="SERVICE NAME" />
                <InputText label="Service Provider" />
                <InputText label="Program number" />
                <InputText label="Video Pid" />
            </Columns>
            <InputText label="Audio Pid (separate with comma)" />
            <Columns gap={24} col={4}>
                <InputText label="PMT Pid" />
                <InputText label="PMT Period" />
                <InputText label="RCP Pid" />
                <InputText label="RCp Period" />
            </Columns>
            <Columns gap={24} col={2}>
                <InputText label="TS ID" />
                <InputText label="SCTE (pid=N)" />
            </Columns>
            <FlexHolder className="card-idx-holder">
                <Dropdown label="CARD IDX" values={cardIdxSel} value="2" />
                <SignalBox />
            </FlexHolder>
        </>
    );
};
