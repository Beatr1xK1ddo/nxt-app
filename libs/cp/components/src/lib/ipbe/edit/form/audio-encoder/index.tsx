import {ChangeEventHandler, FC, useCallback} from "react";
import {InputText, Dropdown, Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import "./audio-encoder.css";
import {ac3DialogueLevelValues, EIpbeAudioCodec, EIpbeAudioEncoderChannels, sdiAudioPair} from "@nxt-ui/cp/types";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {BorderBox, Columns, FlexHolder} from "@nxt-ui/cp/components";
import {useDispatch, useSelector} from "react-redux";
import {ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";

export const AudioEncoder: FC = () => {
    const dispatch = useDispatch();
    const audioEncoders = useSelector(ipbeEditSelectors.selectAudioEncodersValues);
    const changeCodecHandler = useCallback(
        (index: number) => (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as EIpbeAudioCodec;
            dispatch(ipbeEditActions.changeCodec({index, value}));
        },
        [dispatch]
    );

    const changeBitrateHandler = useCallback(
        (id: number) => (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as number;
            dispatch(ipbeEditActions.changeBitrate({index: id, value}));
        },
        [dispatch]
    );

    const changeSdiPairHandler = useCallback(
        (id: number) => (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as number;
            dispatch(ipbeEditActions.changeSdiPair({index: id, value}));
        },
        [dispatch]
    );

    const changeAc3DialogueLevelHandler = useCallback(
        (id: number) => (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as number;
            dispatch(ipbeEditActions.changeAc3DialogueLevel({index: id, value}));
        },
        [dispatch]
    );

    const changeChannelHandler = useCallback(
        (id: number) => (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as EIpbeAudioEncoderChannels;
            dispatch(ipbeEditActions.changeChannel({index: id, value}));
        },
        [dispatch]
    );

    const changeLanguageHandler = useCallback(
        (id: number) => (e) => {
            const value = e.target.value as string;
            dispatch(ipbeEditActions.changeLanguage({index: id, value}));
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
            {audioEncoders?.map((item, i) => (
                <Columns gap={24} col={3} className="audio-encoder-inputs">
                    <Dropdown
                        labelClass="label-small"
                        size="small"
                        label="Audio Codec"
                        value={item.codec || ""}
                        values={Object.values(EIpbeAudioCodec)}
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
                        value={item.sdiPair?.toString() || ""}
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
                        values={Object.keys(EIpbeAudioEncoderChannels)}
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
