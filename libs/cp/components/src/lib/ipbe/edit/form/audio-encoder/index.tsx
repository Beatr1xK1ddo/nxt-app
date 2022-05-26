import {ChangeEventHandler, FC, useCallback} from "react";
import {InputText, Dropdown, Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import "./audio-encoder.css";
import {ac3DialogueLevelValues, EIpbeAudioCodec, sdiAudioPair} from "@nxt-ui/cp/types";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {BorderBox, Columns, FlexHolder} from "@nxt-ui/cp/components";
import {useDispatch} from "react-redux";
import {ipbeEditActions} from "@nxt-ui/cp-redux";

export const AudioEncoder: FC = () => {
    const dispatch = useDispatch();
    const changeCodecHandler = useCallback(
        (id: number) => (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as EIpbeAudioCodec;
            dispatch(ipbeEditActions.changeCodec({id, value}));
        },
        [dispatch]
    );

    const changeBitrateHandler = useCallback(
        (id: number) => (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as number;
            dispatch(ipbeEditActions.changeBitrate({id, value}));
        },
        [dispatch]
    );

    const changeSdiPairHandler = useCallback(
        (id: number) => (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as number;
            dispatch(ipbeEditActions.changeSdiPair({id, value}));
        },
        [dispatch]
    );

    const changeAc3DialogueLevelHandler = useCallback(
        (id: number) => (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as number;
            dispatch(ipbeEditActions.changeAc3DialogueLevel({id, value}));
        },
        [dispatch]
    );

    const changeChannelHandler = useCallback(
        (id: number) => (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as keyof typeof EChannels;
            dispatch(ipbeEditActions.changeChannel({id, value}));
        },
        [dispatch]
    );

    const changeLanguageHandler = useCallback(
        (id: number) => (e) => {
            const value = e.target.value as string;
            dispatch(ipbeEditActions.changeLanguage({id, value}));
        },
        [dispatch]
    ) as (id: number) => ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const registerAudioEncoder = useCallback(() => {
        dispatch(ipbeEditActions.addNewAudioChannel());
    }, [dispatch]);

    const deleteAudioEncoderHandler = useCallback(
        (id: number) => () => {
            dispatch(ipbeEditActions.deleteAudioEncoder(id));
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
