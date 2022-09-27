import {Button, TooltipComponent} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {FC} from "react";

type ComponentProps = {onClick?(): void};

export const EditApplication: FC<ComponentProps> = ({onClick}) => {
    return (
        <TooltipComponent className="card-text" arrow={true} title={<div>Edit</div>}>
            <div>
                <Button data-type="btn-icon" onClick={onClick}>
                    <Icon name="edit" />
                </Button>
            </div>
        </TooltipComponent>
    );
};
