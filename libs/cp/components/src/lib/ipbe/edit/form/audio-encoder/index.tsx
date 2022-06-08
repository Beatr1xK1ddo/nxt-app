import {ChangeEventHandler, FC, useCallback, useEffect, useMemo} from "react";
import {InputText, Dropdown, Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import "./audio-encoder.css";
import {EIpbeApplicationType, EIpbeAudioCodec, EIpbeAudioEncoderChannels} from "@nxt-ui/cp/types";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {BorderBox, Columns, FlexHolder} from "@nxt-ui/cp/components";
import {useDispatch, useSelector} from "react-redux";
import {ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {SelectSDIAudioPair} from "./SelectSDIAudioPair";
import {SelectAC3DialogueLevel} from "./SelectAC3DialogueLevel";
import {bitrateValues} from "@nxt-ui/cp/constants";

export const AudioEncoder: FC = () => {
    const dispatch = useDispatch();
    const audioEncoders = useSelector(ipbeEditSelectors.selectAudioEncodersValues);
    const applicationType = useSelector(ipbeEditSelectors.selectAdvancedApplicationType);
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
            const value = e.target.value;
            if (value === "default") {
                dispatch(ipbeEditActions.changeSdiPair({index: id, value: 0}));
            }
            if (typeof value === "number") {
                dispatch(ipbeEditActions.changeSdiPair({index: id, value}));
            }
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

    const addAudioEncoder = useCallback(() => {
        dispatch(ipbeEditActions.addNewAudioEncoder());
    }, [dispatch]);

    const deleteAudioEncoderHandler = useCallback(
        (id: number) => () => {
            dispatch(ipbeEditActions.deleteAudioEncoder(id));
        },
        [dispatch]
    );

    const audioCodecValues = useMemo(() => {
        const result = ["mp2", "aac", "ac3"];
        if (applicationType !== EIpbeApplicationType.IPBE) {
            result.push("opus");
        }
        return result;
    }, [applicationType]);

    useEffect(() => {
        // todo: makee it works without rerender on each applicationType change
        if (applicationType === EIpbeApplicationType.IPBE) {
            audioEncoders.forEach((encoder, index) => {
                if (encoder.codec === EIpbeAudioCodec.opus) {
                    dispatch(ipbeEditActions.changeCodec({index, value: EIpbeAudioCodec.mp2}));
                }
            });
        }
    }, [applicationType, dispatch, audioEncoders]);

    return (
        <BorderBox gap={24} className="audio-encoder-settings">
            {audioEncoders?.map((item, i) => (
                <Columns key={i} gap={24} col={3} className="audio-encoder-inputs">
                    <Dropdown
                        labelClass="label-small"
                        size="small"
                        label="Audio Codec"
                        value={item.codec || ""}
                        values={audioCodecValues}
                        onChange={changeCodecHandler(i)}
                    />
                    <Dropdown
                        labelClass="label-small"
                        size="small"
                        label="Bitrate"
                        values={bitrateValues}
                        onChange={changeBitrateHandler(i)}
                        value={item.bitrate || ""}
                    />
                    <SelectSDIAudioPair
                        labelClass="label-small"
                        size="small"
                        label="SDI Pair"
                        value={item.sdiPair}
                        onChange={changeSdiPairHandler(i)}
                    />
                    <SelectAC3DialogueLevel
                        labelClass="label-small"
                        size="small"
                        label="AC3 Dialogue Level"
                        disabled={item.codec !== EIpbeAudioCodec.ac3}
                        value={item.ac3DialogueLevel}
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
                            <Button data-type="btn-icon" onClick={addAudioEncoder}>
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
