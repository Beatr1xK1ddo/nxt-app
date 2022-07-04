import {ChangeEventHandler, FC, useCallback, useMemo} from "react";

import {InputText} from "@nxt-ui/components";

import {Columns} from "../../../../common";
import {useDispatch, useSelector} from "react-redux";
import {txrEditActions, txrEditSelectors} from "@nxt-ui/cp-redux";
import {ETxrOutputType} from "@nxt-ui/cp/types";

export const RtpMuxer: FC = () => {
    const dispatch = useDispatch();
    const values = useSelector(txrEditSelectors.rtpMuxer.values);
    const outputType = useSelector(txrEditSelectors.main.outputType);

    const changeVideoPtHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            dispatch(txrEditActions.setVideoPt(value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const changeAudioPtHandler = useCallback(
        (e) => {
            const value = parseInt(e.target.value);
            dispatch(txrEditActions.setAudioPt(value));
        },
        [dispatch]
    ) as ChangeEventHandler<HTMLInputElement>;

    const disabled = useMemo(() => {
        if (outputType === ETxrOutputType.rtp) {
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
