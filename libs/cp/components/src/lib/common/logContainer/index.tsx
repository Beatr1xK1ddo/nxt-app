import {ChangeEventHandler, FC} from "react";
import {Button, InputText} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {LogBox} from "./style";

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
