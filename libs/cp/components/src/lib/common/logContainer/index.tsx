import {FC} from "react";

import {Button, InputText} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import styled from "@emotion/styled";

const LogBox = styled.div`
    overflow: auto;
    max-height: 400px;
    padding: 8px 5px 0 0;
    margin: 0 0 25px;
    .log-search-form {
        position: sticky;
        top: 0;
        transform: translate3d(0, 0, 0);
        z-index: 2;
        background: var(--bluer);
        margin: 0 0 12px;
        button[data-type="btn-icon"] {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            color: var(--blacked);
        }
        .MuiInputLabel-formControl.MuiFormLabel-filled,
        .MuiInputLabel-formControl.Mui-focused {
            background: var(--bluer);
        }
    }
    .log-list {
        font: var(--font);
        font-size: calc(var(--fz) - 2px);
        > div {
            padding: 8px 0;
            border-bottom: 1px solid var(--grey-light);
        }
        strong {
            font-weight: 600;
        }
        .log-time {
            font-style: normal;
            font-size: calc(var(--fz) - 4px);
            text-transform: uppercase;
            display: block;
            font-weight: 300;
        }
    }
`;

interface ILogBoxProps {
    className?: string;
    children?: React.ReactChild | React.ReactNode;
}
export const LogContainer: FC<ILogBoxProps> = ({children, className}) => {
    return (
        <LogBox className={className ? `${className} log-box` : "log-box"}>
            <form className="log-search-form" action="#">
                <InputText label="Search" fullWidth />
                <Button data-type="btn-icon">
                    <Icon name="search" />
                </Button>
            </form>
            <div className="log-list">{children}</div>
        </LogBox>
    );
};
