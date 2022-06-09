import {BorderBox} from "@nxt-ui/cp/components";
import {useSelector} from "react-redux";
import {ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {FC} from "react";
import "./audio-encoder.css";
import {SoloAudioEncoder} from "./AudioEncoder";

export const AudioEncoder: FC = () => {
    const audioEncoders = useSelector(ipbeEditSelectors.selectAudioEncodersValues);

    return (
        <BorderBox gap={24} className="audio-encoder-settings">
            {audioEncoders?.map((item, index) => (
                <SoloAudioEncoder item={item} index={index} />
            ))}
        </BorderBox>
    );
};
