import {FC, useMemo} from "react";
import {InputText, Dropdown, Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {FlexHolder} from "../../../../containers";
import {EApplicationType} from "@nxt-ui/cp/api";
import {IApplicationType} from "./types";

const ttlValues = Array.from(Array(65).keys());

export const ApplicationType: FC<IApplicationType> = (props) => {
    const renderElement = useMemo(() => {
        if (props.type === EApplicationType.IPBE) {
            return props?.ipbeDestinations?.map((item) => (
                <li className="destination">
                    <InputText label="Output IP" value={item.outputIp} />
                    <InputText label="Output Port" value={item.outputPort} />
                    <Dropdown label="TTL" values={ttlValues} value={item.ttl} />
                    <Button>
                        <Icon name="plus" />
                    </Button>
                </li>
            ));
        }

        return (
            <>
                <div className="app-type-block">
                    <InputText label="Video Output IP" value={props.videoOutputIp} />
                    <InputText label="Video Output PORT" value={props.videoOutputPort} />
                </div>
                <div className="app-type-block">
                    <InputText label="Audio Output IP" value={props.audioOutputIp} />
                    <InputText label="Audio Output PORT" value={props.audioOutputPort} />
                </div>
            </>
        );
    }, [props]);

    return (
        <>
            <div className="input-holder">
                <Dropdown
                    label="APPLICATION TYPE"
                    value={props.type}
                    values={Object.values(EApplicationType)}
                />
            </div>
            <FlexHolder className="h-32">{renderElement}</FlexHolder>
        </>
    );
};
