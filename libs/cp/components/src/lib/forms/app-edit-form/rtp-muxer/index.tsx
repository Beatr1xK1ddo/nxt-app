import {FC} from "react";
import {InputText} from "@nxt-ui/components";
import {Columns} from "../../../containers";

export const RtpMuxer: FC = () => {
    return (
        <>
            <Columns gap={24} col={2}>
                <InputText label="VideoPT" />
                <InputText label="AudioPT" />
            </Columns>
        </>
    );
};
