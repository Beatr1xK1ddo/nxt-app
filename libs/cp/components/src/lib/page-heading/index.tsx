import {FC} from "react";
import {PageHeadingProps} from "./types";
import {Button} from "@nxt-ui/components";
import "./page-heading.css";

export const PageHeading: FC<PageHeadingProps> = (props) => {
    const {children, textH1, content,  ...other} = props;

    return (
        <div className="page-heading" {...other}>
            <h1 role="heading">{textH1}</h1>
            {children}
            <Button
                data-type="btn-border"
                icon="plusBig"
                iconBefore
                style={{color: "var(--ok)"}}
                // onClick={props.onClick}
                >
                Add new
            </Button>
        </div>
    );
};
