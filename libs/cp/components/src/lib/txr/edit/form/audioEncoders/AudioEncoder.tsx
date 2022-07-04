import {ChangeEventHandler, FC, useCallback, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {SelectChangeEvent} from "@mui/material/Select/Select";

import {InputText, Dropdown, Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {ETxrApplicationType, ETxrAudioCodec, ETxrAudioEncoderChannels, ITxrAudioEncoder} from "@nxt-ui/cp/types";
import {Columns, FlexHolder} from "@nxt-ui/cp/components";
import {txrEditActions, txrEditSelectors} from "@nxt-ui/cp-redux";
import {SelectSDIAudioPair} from "./SelectSDIAudioPair";
import {SelectAC3DialogueLevel} from "./SelectAC3DialogueLevel";

import "./index.css";
import {SelectVideoBitrate} from "./SelectVideoBitrate";

type ComponentProps = {
    index: number;
    item: ITxrAudioEncoder;
};

export const AudioEncoder: FC<ComponentProps> = ({index, item}) => {
    const dispatch = useDispatch();
    const applicationType = useSelector(txrEditSelectors.main.applicationType);
    const changeCodecHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as ETxrAudioCodec;
            dispatch(txrEditActions.setCodec({index, value}));
            dispatch(txrEditActions.setDirty(index));
        },
        [dispatch, index]
    );

    const changeBitrateHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as number;
            dispatch(txrEditActions.setBitrate({index, value}));
        },
        [dispatch, index]
    );

    const changeSdiPairHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value;
            if (value === "default") {
                dispatch(txrEditActions.setSdiPair({index, value: 0}));
            }
            if (typeof value === "number") {
                dispatch(txrEditActions.setSdiPair({index, value}));
            }
        },
        [dispatch, index]
    );

    const changeAc3DialogueLevelHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as number;
            dispatch(txrEditActions.setAc3DialogueLevel({index, value}));
        },
        [dispatch, index]
    );

    const changeChannelHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as ETxrAudioEncoderChannels;
            dispatch(txrEditActions.setChannel({index, value}));
        },
        [dispatch, index]
    );

    const changeLanguageHandler = useCallback(
        (e) => {
            const value = e.target.value as string;
            dispatch(txrEditActions.setLanguage({index, value}));
        },
        [dispatch, index]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const addAudioEncoder = useCallback(() => {
        dispatch(txrEditActions.addNewAudioEncoder());
    }, [dispatch]);

    const deleteAudioEncoderHandler = useCallback(() => {
        dispatch(txrEditActions.deleteAudioEncoder(index));
    }, [dispatch, index]);

    const audioCodecValues = useMemo(() => {
        const result = ["mp2", "aac", "ac3"];
        if (applicationType !== ETxrApplicationType.TXR) {
            result.push("opus");
        }
        return result;
    }, [applicationType]);

    return (
        <Columns gap={24} col={3} className="audio-encoder-inputs">
            <Dropdown
                labelClass="label-small"
                size="small"
                label="Audio Codec"
                value={item.codec || ""}
                values={audioCodecValues}
                onChange={changeCodecHandler}
            />
            <SelectVideoBitrate
                labelClass="label-small"
                size="small"
                label="Bitrate"
                onChange={changeBitrateHandler}
                value={item.bitrate}
            />
            <SelectSDIAudioPair
                labelClass="label-small"
                size="small"
                label="SDI Pair"
                value={item.sdiPair}
                onChange={changeSdiPairHandler}
            />
            <SelectAC3DialogueLevel
                labelClass="label-small"
                size="small"
                label="AC3 Dialogue Level"
                disabled={item.codec !== ETxrAudioCodec.ac3}
                value={item.ac3DialogueLevel}
                onChange={changeAc3DialogueLevelHandler}
            />
            <Dropdown
                size="small"
                labelClass="label-small"
                label="Channels"
                values={Object.keys(ETxrAudioEncoderChannels)}
                value={item.channels || ""}
                onChange={changeChannelHandler}
            />
            <FlexHolder className="btn-block">
                <InputText size="small" label="Language" value={item.language || ""} onChange={changeLanguageHandler} />
                {index === 0 ? (
                    <Button data-type="btn-icon" onClick={addAudioEncoder}>
                        <Icon name="plus" />
                    </Button>
                ) : (
                    <Button data-type="btn-icon" onClick={deleteAudioEncoderHandler}>
                        <Icon name="trash" />
                    </Button>
                )}
            </FlexHolder>
        </Columns>
    );
};
