import {ECardView} from "@nxt-ui/cp/types";
import {makeDuckActionFactory} from "./../../utils";
const createAction = makeDuckActionFactory("card-view");

export const changeCardView = createAction<ECardView, "CHANGE_CARD_VIEW">("CHANGE_CARD_VIEW");
