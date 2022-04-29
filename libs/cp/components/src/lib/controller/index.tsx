import {FC, useCallback} from "react";
import "./controller.css";
import {Dropdown, Button} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {changeCardView, getCardViewMode} from "@nxt-ui/cp/ducks";
import {ECardView} from "@nxt-ui/cp/types";
import {IControllerProps} from "./types";

export const Controller: FC<IControllerProps> = (props) => {
    const {start, end, total} = props;
    const dispatch = useDispatch();

    const {mode} = useSelector(getCardViewMode);

    const changeView = useCallback(
        (mode: ECardView) => () => {
            dispatch(changeCardView(mode));
        },
        []
    );

    return (
        <div className="controller-wrap">
            <div className="controller-action">
                <Button icon="plus" iconBefore>
                    Add new
                </Button>
                <Dropdown label="CHOOSE ACTION" inputWidth={210} />
            </div>
            <div>
                <p>{`Showing ${start} to ${
                    !total ? "Loading..." : total < end ? total : end
                } from ${total ?? "Loading..."}. View as:`}</p>
                <div className="controller-right-icons">
                    <div
                        className={`block-icon ${mode === ECardView.table ? "active" : ""}`}
                        onClick={changeView(ECardView.table)}>
                        <Icon name="burger" />
                    </div>
                    <div
                        className={`block-icon ${mode === ECardView.card ? "active" : ""}`}
                        onClick={changeView(ECardView.card)}>
                        <Icon name="card" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Controller;
