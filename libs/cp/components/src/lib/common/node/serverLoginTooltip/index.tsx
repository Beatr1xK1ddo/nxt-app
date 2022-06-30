import {FC, useCallback} from "react";

type ComponentProps = {
    hostname?: string;
    digitCode?: string;
};

export const ServerLoginTooltip: FC<ComponentProps> = ({hostname, digitCode}) => {
    const handleCopySsh = useCallback(() => {
        const type = "text/plain";
        const blob = new Blob(["ssh://glebn@s2.nextologies.com"], {type});
        const data = new ClipboardItem({[type]: blob});
        return navigator.clipboard.write([data]);
    }, []);

    return (
        <div>
            <p className="heading">{hostname || ""}</p>
            <dl>
                <dt>Code:</dt>
                <dd>{digitCode || ""}</dd>
            </dl>
            <p>
                <a href="/">ssh://glebn@s2.nextologies.com</a>
            </p>
            <div onClick={handleCopySsh} style={{cursor: "pointer"}}>
                Copy ssh
            </div>
        </div>
    );
};
