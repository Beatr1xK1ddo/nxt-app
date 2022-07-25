import {FC} from "react";
import {CheckboxComponent} from "@nxt-ui/components";

import "./index.css";

export const CheckWeek: FC = () => {
    return (
        <section className="check-week">
            <div className="week-holder">
                <CheckboxComponent className="label-top" checkId="check-mo" labelText="Mo" />
                <CheckboxComponent className="label-top" checkId="check-tu" labelText="Tu" />
                <CheckboxComponent className="label-top" checkId="check-we" labelText="We" />
                <CheckboxComponent className="label-top" checkId="check-th" labelText="Th" />
                <CheckboxComponent className="label-top" checkId="check-fr" labelText="Fr" />
                <CheckboxComponent className="label-top" checkId="check-sa" labelText="Sa" />
                <CheckboxComponent className="label-top" checkId="check-su" labelText="Su" />
            </div>
            <CheckboxComponent checkId="checkAll" labelText="Select all" />
        </section>
    );
};
