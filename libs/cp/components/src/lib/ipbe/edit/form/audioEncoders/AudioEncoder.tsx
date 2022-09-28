import {ChangeEventHandler, FC, useCallback, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {SelectChangeEvent} from "@mui/material/Select/Select";

import {InputText, Dropdown, Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {EIpbeApplicationType, EIpbeAudioCodec, EIpbeAudioEncoderChannels, IIpbeAudioEncoder} from "@nxt-ui/cp/types";
import {Columns, FlexHolder} from "@nxt-ui/cp/components";
import {ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {SelectSDIAudioPair} from "./SelectSDIAudioPair";
import {SelectAC3DialogueLevel} from "./SelectAC3DialogueLevel";

import "./index.css";
import {SelectVideoBitrate} from "./SelectVideoBitrate";

type ComponentProps = {
    index: number;
    item: IIpbeAudioEncoder;
};

export const AudioEncoder: FC<ComponentProps> = ({index, item}) => {
    const dispatch = useDispatch();
    const applicationType = useSelector(ipbeEditSelectors.main.applicationType);
    const changeCodecHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as EIpbeAudioCodec;
            dispatch(ipbeEditActions.setCodec({index, value}));
            dispatch(ipbeEditActions.setDirty(index));
        },
        [dispatch, index]
    );

    const changeBitrateHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as number;
            dispatch(ipbeEditActions.setBitrate({index, value}));
        },
        [dispatch, index]
    );

    const changeSdiPairHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value;
            if (value === "default") {
                dispatch(ipbeEditActions.setSdiPair({index, value: 0}));
            }
            if (typeof value === "number") {
                dispatch(ipbeEditActions.setSdiPair({index, value}));
            }
        },
        [dispatch, index]
    );

    const changeAc3DialogueLevelHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as number;
            dispatch(ipbeEditActions.setAc3DialogueLevel({index, value}));
        },
        [dispatch, index]
    );

    const changeChannelHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as EIpbeAudioEncoderChannels;
            dispatch(ipbeEditActions.setChannel({index, value}));
        },
        [dispatch, index]
    );

    const changeLanguageHandler = useCallback(
        (e) => {
            const value = e.target.value as string;
            dispatch(ipbeEditActions.setLanguage({index, value}));
        },
        [dispatch, index]
    ) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const addAudioEncoder = useCallback(() => {
        dispatch(ipbeEditActions.addNewAudioEncoder());
    }, [dispatch]);

    const deleteAudioEncoderHandler = useCallback(() => {
        dispatch(ipbeEditActions.deleteAudioEncoder(index));
    }, [dispatch, index]);

    const audioCodecValues = useMemo(() => {
        const result = ["mp2", "aac", "ac3"];
        if (applicationType !== "IPBE") {
            result.push("opus");
        }
        return result;
    }, [applicationType]);

    return (
        <Columns gap={24} col={3} className="audio-encoder-inputs">
            <Dropdown
                labelClass="label-small"
                size="small"
                label="AUDIO CODEC"
                value={item.codec || ""}
                values={audioCodecValues}
                onChange={changeCodecHandler}
            />
            <SelectVideoBitrate
                labelClass="label-small"
                size="small"
                label="BITRATE"
                onChange={changeBitrateHandler}
                value={item.bitrate}
            />
            <SelectSDIAudioPair
                labelClass="label-small"
                size="small"
                label="SDI PAIR"
                value={item.sdiPair}
                onChange={changeSdiPairHandler}
            />
            <SelectAC3DialogueLevel
                labelClass="label-small"
                size="small"
                label="AC3 DIALOGUE LEVEL"
                disabled={item.codec !== EIpbeAudioCodec.ac3}
                value={item.ac3DialogueLevel}
                onChange={changeAc3DialogueLevelHandler}
            />
            <Dropdown
                size="small"
                labelClass="label-small"
                label="CHANNELS"
                values={Object.keys(EIpbeAudioEncoderChannels)}
                value={item.channels || ""}
                onChange={changeChannelHandler}
            />
            <FlexHolder className="btn-block">
                <InputText size="small" label="LANGUAGE" value={item.language || ""} onChange={changeLanguageHandler} />
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
