import {ChangeEventHandler, FC, useCallback, useMemo} from "react";

import {InputText} from "@nxt-ui/components";

import {Columns} from "../../../../common";
import {useDispatch, useSelector} from "react-redux";
import {ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {EIpbeOutputType} from "@nxt-ui/cp/types";

export const RtpMuxer: FC = () => {
    const dispatch = useDispatch();
    const values = useSelector(ipbeEditSelectors.selectRtpMuxerValues);
    const outputType = useSelector(ipbeEditSelectors.selectMainOutputType);

    const changeVideoPtHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            dispatch(ipbeEditActions.changeVideoPt(value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeAudioPtHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            dispatch(ipbeEditActions.changeAudioPt(value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const disabled = useMemo(() => {
        if (outputType === EIpbeOutputType.rtp) {
            return false;
        }
        return true;
    }, [outputType]);

    return (
        <Columns gap={24} col={2}>
            <InputText
                disabled={disabled}
                label="VideoPT"
                value={values.videoPt || ""}
                onChange={changeVideoPtHandler}
            />
            <InputText
                disabled={disabled}
                label="AudioPT"
                value={values.audioPt || ""}
                onChange={changeAudioPtHandler}
            />
        </Columns>
    );
};
