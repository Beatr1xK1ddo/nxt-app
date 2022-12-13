import {ChangeEventHandler, FC} from "react";
import {Button, InputText} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import styled from "@emotion/styled";
import "./index.css";

const LogBox = styled.div`
    padding: 0 0.3125rem 0 0;
    margin: 0 0 1.5625rem;

    .log-search-form {
        position: sticky;
        top: 0;
        padding: 0.5rem 0 0.625rem;
        transform: translate3d(0, 0, 0);
        z-index: 2;
        background: var(--bluer);
        // margin: 0 0 0.75rem;
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
        .MuiInputBase-input {
            padding-right: 2.25rem;
        }
    }
    .log-list {
        font: var(--font);
        font-size: calc(var(--fz) - 0.125rem);
        > div {
            padding: 0.5rem 0;
            border-bottom: 0.0625rem solid var(--grey-light);
        }
        strong {
            font-weight: 600;
        }
        .log-time {
            font-style: normal;
            font-size: calc(var(--fz) - 0.25rem);
            text-transform: uppercase;
            display: block;
            font-weight: 300;
        }
    }
`;

interface ILogBoxProps {
    className?: string;
    children?: React.ReactChild | React.ReactNode;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    hiddenSearch?: boolean;
    subscribed?: boolean;
    onSubscribe?(): void;
}
export const LogContainer: FC<ILogBoxProps> = ({
    children,
    className,
    onChange,
    value,
    hiddenSearch,
    subscribed,
    onSubscribe,
}) => {
    return (
        <LogBox className={className ? `${className} log-box` : "log-box"}>
            {!hiddenSearch && (
                <div className="log-search-form">
                    <InputText onChange={onChange} label="Search" fullWidth value={value} />
                    <Button data-type="btn-icon">
                        <Icon name="search" />
                    </Button>
                    <div className="logs-auto-update" onClick={onSubscribe}>
                        {`Auto update: ${subscribed ? "on" : "off"}`}
                    </div>
                </div>
            )}
            <div className="log-list">{children}</div>
        </LogBox>
    );
};
