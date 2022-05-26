import {ChangeEventHandler, FC, useCallback} from "react";

import {InputText} from "@nxt-ui/components";

import {Columns} from "../../../../common";
import {useDispatch, useSelector} from "react-redux";
import {ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";

export const RtpMuxer: FC = () => {
    const dispatch = useDispatch();
    const {values} = useSelector(ipbeEditSelectors.selectIpbeEditRtpMuxer);
    const changeVideoPtHandler = useCallback(
        (e) => {
            dispatch(ipbeEditActions.changeVideoPt(e.target.value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeAudioPtHandler = useCallback(
        (e) => {
            dispatch(ipbeEditActions.changeAudioPt(e.target.value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;
    return (
        <Columns gap={24} col={2}>
            <InputText label="VideoPT" value={values.videoPid} onChange={changeVideoPtHandler} />
            <InputText label="AudioPT" value={values.audioPid} onChange={changeAudioPtHandler} />
        </Columns>
    );
};
