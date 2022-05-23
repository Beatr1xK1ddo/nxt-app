import {ChangeEventHandler, FC, useCallback, useState} from "react";
import {InputText, Dropdown, Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import "./audio-encoder.css";
import {ac3DialogueLevelValues, EChannels, ECodec, EErrorType, sdiAudioPair} from "@nxt-ui/cp/types";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {BorderBox, Columns, FlexHolder} from "@nxt-ui/cp/components";
import {IAudioEncoderProps} from "../types";
import {
    addNewAudioChannel,
    addNewAudioEncoder,
    changeAc3DialogueLevel,
    changeBitrate,
    changeChannel,
    changeCodec,
    changeLanguage,
    changeSdiPair,
    deleteAudioEncoder,
    IFormError,
} from "../reducers";

type IAudioEncoderFormErrors = {
    bitrate: IFormError;
    sdiPair: IFormError;
    codec: IFormError;
    ac3DialogueLevel: IFormError;
};

type IAudioEncoderFormState = {
    codec?: ECodec;
    bitrate?: number;
    language?: string;
    sdiPair?: number;
    ac3DialogueLevel?: number;
    channel?: keyof typeof EChannels;
};

export const AudioEncoder: FC<IAudioEncoderProps> = (props) => {
    const [audioState, setAudioState] = useState<IAudioEncoderFormState>({
        codec: undefined,
        bitrate: undefined,
        language: undefined,
        sdiPair: undefined,
        ac3DialogueLevel: undefined,
        channel: undefined,
    });
    const [errors, setErrors] = useState<IAudioEncoderFormErrors>({
        bitrate: {error: false},
        sdiPair: {error: false},
        codec: {error: false},
        ac3DialogueLevel: {error: false},
    });
    const {ipbeAudioEncoders, dispatch} = props;

    const changeCodecHandler = useCallback(
        (id: number) => (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as ECodec;
            dispatch(changeCodec({id, value}));
        },
        [dispatch]
    );

    const changeBitrateHandler = useCallback(
        (id: number) => (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as number;
            dispatch(changeBitrate({id, value}));
        },
        [dispatch]
    );

    const changeSdiPairHandler = useCallback(
        (id: number) => (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as number;
            dispatch(changeSdiPair({id, value}));
        },
        [dispatch]
    );

    const changeAc3DialogueLevelHandler = useCallback(
        (id: number) => (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as number;
            dispatch(changeAc3DialogueLevel({id, value}));
        },
        [dispatch]
    );

    const changeChannelHandler = useCallback(
        (id: number) => (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as keyof typeof EChannels;
            dispatch(changeChannel({id, value}));
        },
        [dispatch]
    );

    const changeLanguageHandler = useCallback(
        (id: number) => (e) => {
            const value = e.target.value as string;
            dispatch(changeLanguage({id, value}));
        },
        [dispatch]
    ) as (id: number) => ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const registerAudioEncoder = useCallback(() => {
        dispatch(addNewAudioChannel());
    }, [dispatch]);

    const deleteAudioEncoderHandler = useCallback(
        (id: number) => () => {
            dispatch?.(deleteAudioEncoder(id));
        },
        [dispatch]
    );

    return (
        <BorderBox gap={24} className="audio-encoder-settings">
            {ipbeAudioEncoders?.map((item, i) => (
                <Columns gap={24} col={3} className="audio-encoder-inputs">
                    <Dropdown
                        labelClass="label-small"
                        size="small"
                        label="Audio Codec"
                        value={item.codec || ""}
                        values={Object.values(ECodec)}
                        onChange={changeCodecHandler(i)}
                    />
                    <Dropdown
                        labelClass="label-small"
                        size="small"
                        label="Bitrate"
                        values={[128, 192, 256, 384]}
                        onChange={changeBitrateHandler(i)}
                        value={item.bitrate || ""}
                    />
                    <Dropdown
                        labelClass="label-small"
                        size="small"
                        label="SDI Pair"
                        values={sdiAudioPair}
                        value={item.sdiPair.toString() || ""}
                        onChange={changeSdiPairHandler(i)}
                    />
                    <Dropdown
                        labelClass="label-small"
                        size="small"
                        label="AC3 Dialogue Level"
                        values={ac3DialogueLevelValues}
                        value={item.ac3DialogueLevel.toString() || ""}
                        onChange={changeAc3DialogueLevelHandler(i)}
                    />
                    <Dropdown
                        size="small"
                        labelClass="label-small"
                        label="Channels"
                        values={Object.keys(EChannels)}
                        value={item.channels || ""}
                        onChange={changeChannelHandler(i)}
                    />
                    <FlexHolder className="btn-block">
                        <InputText
                            size="small"
                            label="Language"
                            value={item.language || ""}
                            onChange={changeLanguageHandler(i)}
                        />
                        {i === 0 ? (
                            <Button data-type="btn-icon" onClick={registerAudioEncoder}>
                                <Icon name="plus" />
                            </Button>
                        ) : (
                            <Button data-type="btn-icon" onClick={deleteAudioEncoderHandler(i)}>
                                <Icon name="trash" />
                            </Button>
                        )}
                    </FlexHolder>
                </Columns>
            ))}
        </BorderBox>
    );
};
