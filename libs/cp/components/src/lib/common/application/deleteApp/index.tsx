import {Button, TooltipComponent} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {CSSProperties, FC} from "react";

type ComponentProps = {onClick?(): void; style: CSSProperties};

export const DeleteApplication: FC<ComponentProps> = ({onClick, style}) => {
    return (
        <TooltipComponent className="card-text" arrow title={<div>Delete</div>}>
            <div style={style}>
                <Button data-type="btn-icon" onClick={onClick}>
                    <Icon name="delete" style={{color: "var(--danger)"}} />
                </Button>
            </div>
        </TooltipComponent>
    );
};
