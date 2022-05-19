import {ChangeEventHandler, FC, useCallback} from "react";

import {InputText} from "@nxt-ui/components";

import {Columns} from "../../../../common";
import {IRtpMuxerProps} from "../types";
import {changeAudioPt, changeVideoPt} from "../reducers";

export const RtpMuxer: FC<IRtpMuxerProps> = (props) => {
    const {dispatch} = props;

    const changeVideoPtHandler = useCallback(
        (e) => {
            dispatch?.(changeVideoPt(e.target.value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeAudioPtHandler = useCallback(
        (e) => {
            dispatch?.(changeAudioPt(e.target.value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;
    return (
        <Columns gap={24} col={2}>
            <InputText label="VideoPT" value={props.videoPt} onChange={changeVideoPtHandler} />
            <InputText label="AudioPT" value={props.audioPt} onChange={changeAudioPtHandler} />
        </Columns>
    );
};
