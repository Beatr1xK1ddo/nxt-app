import {FC} from "react";
import "./index.css";
import {ICardAccordionTitleProps} from "../../../ipbe/list/item/card/types";

export const CardAccordionHeader: FC<ICardAccordionTitleProps> = (props) => {
    const {title, paragraph} = props;

    return (
        <div className="card-accordion-title-wrap">
            <h3 className="card-accordion-title">{title}</h3>
            <p className="card-accordion-paragraph">{paragraph}</p>
        </div>
    );
};
