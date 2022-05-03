import {FC} from "react";
import {InputText, Dropdown, Button} from "@nxt-ui/components";
import {Columns, FlexHolder} from "../../../containers";
import {Icon} from "@nxt-ui/icons";

export const AudioEncoder: FC = () => {
    return (
        <>
            <Columns gap={24} col={3}>
                <Dropdown label="Audio Codec" />
                <Dropdown label="Bitrate" />
                <Dropdown label="SDI Pair" />
                <Dropdown label="AC3 Dialogue Level" />
                <Dropdown label="Channels" />
                <FlexHolder className="btn-block">
                    <InputText label="Language" />
                    <Button data-type="btn-icon" data-btn="plus">
                        <Icon name="plusBig" />
                    </Button>
                </FlexHolder>
            </Columns>
        </>
    );
};
