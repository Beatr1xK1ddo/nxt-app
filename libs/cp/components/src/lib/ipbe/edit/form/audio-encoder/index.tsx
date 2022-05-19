import {ChangeEventHandler, FC, useCallback, useState} from "react";
import {InputText, Dropdown, Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import "./audio-encoder.css";
import {
    ac3DialogueLevelValues,
    EChannels,
    ECodec,
    EErrorType,
    sdiAudioPair,
} from "@nxt-ui/cp/types";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {BorderBox, Columns, FlexHolder} from "@nxt-ui/cp/components";
import {IAudioEncoderProps} from "../types";
import {addNewAudioEncoder, deleteAudioEncoder, IFormError} from "../reducers";

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

    const changeCodec = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as ECodec;
            if (errors.codec && value) {
                setErrors((prev) => ({...prev, codec: {error: false}}));
            }
            setAudioState((prev) => ({...prev, codec: value}));
        },
        [errors]
    );

    const changeBitrate = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as number;
            if (errors.codec && value) {
                setErrors((prev) => ({...prev, bitrate: {error: false}}));
            }
            setAudioState((prev) => ({...prev, bitrate: value}));
        },
        [errors]
    );

    const changeSdiPair = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as number;
            if (errors.codec && value) {
                setErrors((prev) => ({...prev, sdiPair: {error: false}}));
            }
            setAudioState((prev) => ({...prev, sdiPair: value}));
        },
        [errors]
    );

    const changeAc3DialogueLevel = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as number;
            if (errors.codec && value) {
                setErrors((prev) => ({...prev, ac3DialogueLevel: {error: false}}));
            }
            setAudioState((prev) => ({...prev, ac3DialogueLevel: value}));
        },
        [errors]
    );

    const changeChannel = useCallback((e: SelectChangeEvent<unknown>) => {
        const value = e.target.value as keyof typeof EChannels;
        setAudioState((prev) => ({...prev, channel: value}));
    }, []);

    const changeLanguage = useCallback((e) => {
        const value = e.target.value as string;
        setAudioState((prev) => ({...prev, language: value}));
    }, []) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const registerAudioEncoder = useCallback(() => {
        let error = false;
        const requiredValues = Object.keys(errors);

        for (let index = 0; index < requiredValues.length; index++) {
            if (!audioState[requiredValues[index] as keyof IAudioEncoderFormState]) {
                error = true;
                setErrors((prev) => ({
                    ...prev,
                    [requiredValues[index] as keyof IAudioEncoderFormErrors]: {
                        error: true,
                        helperText: EErrorType.required,
                    },
                }));
            }
        }

        if (!error) {
            dispatch?.(
                addNewAudioEncoder({
                    codec: audioState.codec!,
                    channels: audioState.channel!,
                    sdiPair: audioState.sdiPair!,
                    bitrate: audioState.bitrate!,
                    ac3DialogueLevel: audioState.ac3DialogueLevel!,
                    language: audioState.language,
                })
            );

            setAudioState({
                codec: undefined,
                bitrate: undefined,
                language: undefined,
                sdiPair: undefined,
                ac3DialogueLevel: undefined,
                channel: undefined,
            });
        }
    }, [errors, audioState, dispatch]);

    const deleteAudioEncoderHandler = useCallback(
        (id: number) => () => {
            dispatch?.(deleteAudioEncoder(id));
        },
        [dispatch]
    );

    return (
        <BorderBox gap={24} className="audio-encoder-settings">
            <Columns gap={24} col={3} className="audio-encoder-inputs">
                <Dropdown
                    labelClass="label-small"
                    size="small"
                    label="Audio Codec"
                    value={audioState.codec || ""}
                    values={Object.values(ECodec)}
                    onChange={changeCodec}
                    error={errors.codec.error}
                    helperText={errors.codec.helperText}
                />
                <Dropdown
                    labelClass="label-small"
                    size="small"
                    label="Bitrate"
                    values={[128, 192, 256, 384]}
                    onChange={changeBitrate}
                    value={audioState.bitrate || ""}
                    error={errors.bitrate.error}
                    helperText={errors.bitrate.helperText}
                />
                <Dropdown
                    labelClass="label-small"
                    size="small"
                    label="SDI Pair"
                    values={sdiAudioPair}
                    value={audioState.sdiPair || ""}
                    onChange={changeSdiPair}
                    error={errors.sdiPair.error}
                    helperText={errors.sdiPair.helperText}
                />
                <Dropdown
                    labelClass="label-small"
                    size="small"
                    label="AC3 Dialogue Level"
                    values={ac3DialogueLevelValues}
                    value={audioState.ac3DialogueLevel || ""}
                    error={errors.ac3DialogueLevel.error}
                    helperText={errors.ac3DialogueLevel.helperText}
                    onChange={changeAc3DialogueLevel}
                />
                <Dropdown
                    size="small"
                    labelClass="label-small"
                    label="Channels"
                    values={Object.keys(EChannels)}
                    value={audioState.channel || ""}
                    onChange={changeChannel}
                />
                <FlexHolder className="btn-block">
                    <InputText
                        size="small"
                        label="Language"
                        value={audioState.language || ""}
                        onChange={changeLanguage}
                    />
                    <Button data-type="btn-icon" onClick={registerAudioEncoder}>
                        <Icon name="plus" />
                    </Button>
                </FlexHolder>
            </Columns>

            {ipbeAudioEncoders?.map((item, i) => (
                <Columns gap={24} col={3} className="audio-encoder-inputs">
                    <Dropdown
                        labelClass="label-small"
                        size="small"
                        label="Audio Codec"
                        value={item.codec || ""}
                        values={Object.values(ECodec)}
                        onChange={changeCodec}
                    />
                    <Dropdown
                        labelClass="label-small"
                        size="small"
                        label="Bitrate"
                        values={[128, 192, 256, 384]}
                        onChange={changeBitrate}
                        value={item.bitrate || ""}
                    />
                    <Dropdown
                        labelClass="label-small"
                        size="small"
                        label="SDI Pair"
                        values={sdiAudioPair}
                        value={item.sdiPair || ""}
                        onChange={changeSdiPair}
                    />
                    <Dropdown
                        labelClass="label-small"
                        size="small"
                        label="AC3 Dialogue Level"
                        values={ac3DialogueLevelValues}
                        value={item.ac3DialogueLevel || ""}
                        onChange={changeAc3DialogueLevel}
                    />
                    <Dropdown
                        size="small"
                        labelClass="label-small"
                        label="Channels"
                        values={Object.keys(EChannels)}
                        value={item.channels || ""}
                        onChange={changeChannel}
                    />
                    <FlexHolder className="btn-block">
                        <InputText
                            size="small"
                            label="Language"
                            value={item.language || ""}
                            onChange={changeLanguage}
                        />
                    </FlexHolder>
                </Columns>
            ))}
        </BorderBox>
    );
};
