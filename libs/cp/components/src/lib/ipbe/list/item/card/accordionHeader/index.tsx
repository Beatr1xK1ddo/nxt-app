import {FC} from "react";
import "./index.css";
import {ICardAccordionTitleProps} from "../types";

const IpbeCardAccordionHeader: FC<ICardAccordionTitleProps> = (props) => {
    const {title, paragraph} = props;

    return (
        <div className="card-accordion-title-wrap">
            <h3 className="card-accordion-title">{title}</h3>
            <p className="card-accordion-paragraph">{paragraph}</p>
        </div>
    );
};

export default IpbeCardAccordionHeader;
