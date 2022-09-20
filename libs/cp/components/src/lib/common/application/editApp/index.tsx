import {Button, TooltipComponent} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {FC} from "react";

type ComponentProps = {onClick?(): void};

export const EditApplication: FC<ComponentProps> = ({onClick}) => {
    return (
        <TooltipComponent
            className="white-tooltip"
            arrow={true}
            title={
                <div>
                    <p className="heading">Edit</p>
                </div>
            }>
            <div>
                <Button data-type="btn-icon" onClick={onClick}>
                    <Icon name="edit" />
                </Button>
            </div>
        </TooltipComponent>
    );
};
