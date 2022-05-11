import {ChangeEventHandler, FC, useCallback, useEffect, useState} from "react";
import {InputText, Dropdown, Button} from "@nxt-ui/components";
import {Columns, FlexHolder, BorderBox} from "../../../containers";
import {Icon} from "@nxt-ui/icons";
import "./audio-encoder.css";
import {
    ac3DialogueLevelValues,
    EChannels,
    ECodec,
    EErrorType,
    sdiAudioPair,
} from "@nxt-ui/cp/types";
import {IAudioEncoderProps} from "../types";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {addNewAudioEncoder, deleteAudioEncoder, IFormError} from "../reducers";

type IAudioEncoderFormErrors = {
    bitrate: IFormError;
    sdiPair: IFormError;
    codec: IFormError;
    channel: IFormError;
    ac3DialogueLevel: IFormError;
};

export const AudioEncoder: FC<IAudioEncoderProps> = (props) => {
    const [codec, setCodec] = useState<ECodec>();
    const [bitrate, setBitrate] = useState<number>();
    const [language, setLanguage] = useState<string>();
    const [sdiPair, setSdiPair] = useState<number>();
    const [channel, setChannel] = useState<keyof typeof EChannels>();
    const [ac3DialogueLevel, setAc3DialogueLevel] = useState<number>();
    const [errors, setErrors] = useState<IAudioEncoderFormErrors>({
        bitrate: {error: false},
        sdiPair: {error: false},
        channel: {error: false},
        codec: {error: false},
        ac3DialogueLevel: {error: false},
    });
    const {ipbeAudioEncoders, dispatch} = props;

    const changeAudioEncoder = useCallback(
        (e: SelectChangeEvent<unknown>) => setCodec(e.target.value as ECodec),
        []
    );

    const changeBitrate = useCallback(
        (e: SelectChangeEvent<unknown>) => setBitrate(e.target.value as number),
        []
    );

    const changeSdiPair = useCallback(
        (e: SelectChangeEvent<unknown>) => setSdiPair(e.target.value as number),
        []
    );

    const changeAc3DialogueLevel = useCallback(
        (e: SelectChangeEvent<unknown>) => setAc3DialogueLevel(e.target.value as number),
        []
    );

    const changeChannel = useCallback(
        (e: SelectChangeEvent<unknown>) => setChannel(e.target.value as keyof typeof EChannels),
        []
    );

    const registerAudioEncoder = useCallback(() => {
        let error = false;
        const requiredValues = [{ac3DialogueLevel}, {sdiPair}, {bitrate}, {codec}];

        requiredValues.forEach((item) => {
            const key = Object.keys(item)[0] as keyof Pick<
                IAudioEncoderFormErrors,
                "ac3DialogueLevel" | "sdiPair" | "bitrate" | "codec"
            >;
            if (!item[key]) {
                setErrors((prev) => {
                    const state = {...prev};
                    state[key].error = true;
                    state[key].helperText = EErrorType.required;
                    return state;
                });
            }
        });

        Object.keys(errors).forEach((key) => {
            if (errors[key as keyof IAudioEncoderFormErrors].error) {
                error = true;
                return;
            }
        });

        if (!error) {
            dispatch?.(
                addNewAudioEncoder({
                    codec: codec!,
                    channels: channel,
                    sdiPair: sdiPair!,
                    bitrate: bitrate!,
                    ac3DialogueLevel: ac3DialogueLevel!,
                    language,
                })
            );
        }
    }, [sdiPair, bitrate, codec, errors, ac3DialogueLevel, dispatch, channel, language]);

    const changeLanguage = useCallback((e) => {
        setLanguage(e.target.value);
    }, []) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const deleteAudioEncoderHandler = useCallback(
        (id: number) => () => {
            dispatch?.(deleteAudioEncoder(id));
        },
        [dispatch]
    );

    useEffect(() => {
        console.log("ac3DialogueLevel", ac3DialogueLevel);
    }, [ac3DialogueLevel]);

    return (
        <BorderBox gap={24} className="audio-encoder-settings">
            <Columns gap={24} col={3} className="audio-encoder-inputs">
                <Dropdown
                    addClass="input-small"
                    label="Audio Codec"
                    value={codec || ""}
                    values={Object.values(ECodec)}
                    onChange={changeAudioEncoder}
                    error={errors.codec.error}
                    helperText={errors.codec.helperText}
                />
                <Dropdown
                    addClass="input-small"
                    label="Bitrate"
                    values={[128, 192, 256, 384]}
                    onChange={changeBitrate}
                    value={bitrate || ""}
                    error={errors.bitrate.error}
                    helperText={errors.bitrate.helperText}
                />
                <Dropdown
                    addClass="input-small"
                    label="SDI Pair"
                    values={sdiAudioPair}
                    value={sdiPair || ""}
                    onChange={changeSdiPair}
                    error={errors.sdiPair.error}
                    helperText={errors.sdiPair.helperText}
                />
                <Dropdown
                    addClass="input-small"
                    label="AC3 Dialogue Level"
                    values={ac3DialogueLevelValues}
                    value={ac3DialogueLevel || ""}
                    error={errors.ac3DialogueLevel.error}
                    helperText={errors.ac3DialogueLevel.helperText}
                    onChange={changeAc3DialogueLevel}
                />
                <Dropdown
                    addClass="input-small"
                    label="Channels"
                    values={Object.keys(EChannels)}
                    value={channel || ""}
                    onChange={changeChannel}
                    error={errors.channel.error}
                    helperText={errors.channel.helperText}
                />
                <FlexHolder className="btn-block">
                    <InputText
                        className="input-small"
                        label="Language"
                        value={language || ""}
                        onChange={changeLanguage}
                    />
                    <Button data-type="btn-icon" onClick={registerAudioEncoder}>
                        <Icon name="plus" />
                    </Button>
                </FlexHolder>
            </Columns>
            {ipbeAudioEncoders?.map((item, i) => (
                <Columns gap={24} col={3}>
                    <div className="text-holder">{item.codec}</div>
                    <div className="text-holder">{`${item.bitrate} Mbps`}</div>
                    <div className="text-holder">{item.sdiPair}</div>
                    <div className="text-holder">{`max ${item.ac3DialogueLevel}dB`}</div>
                    <div className="text-holder">{item.channels}</div>
                    <FlexHolder className="edit-holder">
                        <div className="text-holder">{item.language}</div>
                        <Button data-type="btn-icon">
                            <Icon name="edit" />
                        </Button>
                        <Button data-type="btn-icon" onClick={deleteAudioEncoderHandler(i)}>
                            <Icon name="trash" style={{color: "var(--danger)"}} />
                        </Button>
                    </FlexHolder>
                </Columns>
            ))}
        </BorderBox>
    );
};
