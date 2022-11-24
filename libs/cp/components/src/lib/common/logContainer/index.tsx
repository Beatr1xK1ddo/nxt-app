import {ChangeEventHandler, FC} from "react";
import {Button, InputText} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import styled from "@emotion/styled";
import "./index.css";

const LogBox = styled.div`
    padding: 0 5px 0 0;
    margin: 0 0 25px;

    .log-search-form {
        position: sticky;
        top: 0;
        padding: 8px 0 10px;
        transform: translate3d(0, 0, 0);
        z-index: 2;
        background: var(--bluer);
        // margin: 0 0 12px;
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
            padding-right: 36px;
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
                <>
                    <div className="log-search-form">
                        <InputText onChange={onChange} label="Search" fullWidth value={value} />
                        <Button data-type="btn-icon">
                            <Icon name="search" />
                        </Button>
                    </div>
                    <div className="logs-auto-update" onClick={onSubscribe}>
                        {`Auto update: ${subscribed ? "on" : "off"}`}
                    </div>
                </>
            )}
            <div className="log-list">{children}</div>
        </LogBox>
    );
};
