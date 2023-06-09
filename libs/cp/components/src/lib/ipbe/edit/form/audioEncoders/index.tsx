import {FC} from "react";
import {useSelector} from "react-redux";

import {BorderBox} from "@nxt-ui/cp/components";
import {ipbeEditSelectors} from "@nxt-ui/cp-redux";

import {AudioEncoder} from "./AudioEncoder";

import "./index.css";
import {useChangeFormListener} from "@nxt-ui/cp/hooks";

export const AudioEncoders: FC = () => {
    const audioEncoders = useSelector(ipbeEditSelectors.audioEncoder.values);
    useChangeFormListener(audioEncoders);

    return (
        <BorderBox gap={24} className="audio-encoder-settings">
            {audioEncoders.map((item, index) => (
                <AudioEncoder key={index} item={item} index={index} />
            ))}
        </BorderBox>
    );
};
