import {FC} from "react";
import {InputText, Dropdown, Button} from "@nxt-ui/components";
import {Columns, FlexHolder, BorderBox} from "../../../containers";
import {Icon} from "@nxt-ui/icons";
import "./audio-encoder.css";

export const AudioEncoder: FC = () => {
    return (
        <BorderBox gap={24} className="audio-encoder-settings">
            <Columns gap={24} col={3} className="audio-encoder-inputs">
                <Dropdown addClass="input-small" label="Audio Codec" />
                <Dropdown addClass="input-small" label="Bitrate" />
                <Dropdown addClass="input-small" label="SDI Pair" />
                <Dropdown addClass="input-small" label="AC3 Dialogue Level" />
                <Dropdown addClass="input-small" label="Channels" />
                <FlexHolder className="btn-block">
                    <InputText className="input-small" label="Language" />
                    <Button data-type="btn-icon">
                        <Icon name="plus" />
                    </Button>
                </FlexHolder>
            </Columns>
            <Columns gap={24} col={3}>
                <div className="text-holder">Codec1</div>
                <div className="text-holder">128 Mbps</div>
                <div className="text-holder">12</div>
                <div className="text-holder">max -31dB</div>
                <div className="text-holder">4</div>
                <FlexHolder className="edit-holder">
                    <div className="text-holder">Spanish</div>
                    <Button data-type="btn-icon">
                        <Icon name="edit" />
                    </Button>
                    <Button data-type="btn-icon">
                        <Icon name="trash" style={{color: "var(--danger)"}} />
                    </Button>
                </FlexHolder>
            </Columns>
            <Columns gap={24} col={3}>
                <div className="text-holder">Codec1</div>
                <div className="text-holder">128 Mbps</div>
                <div className="text-holder">12</div>
                <div className="text-holder">max -31dB</div>
                <div className="text-holder">4</div>
                <FlexHolder className="edit-holder">
                    <div className="text-holder">Spanish</div>
                    <Button data-type="btn-icon">
                        <Icon name="edit" />
                    </Button>
                    <Button data-type="btn-icon">
                        <Icon name="trash" style={{color: "var(--danger)"}} />
                    </Button>
                </FlexHolder>
            </Columns>
        </BorderBox>
    );
};
