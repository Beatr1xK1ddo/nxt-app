import type {CSSProperties, FC, ReactNode} from "react";

type TabPanelProps = {
    style?: CSSProperties;
    children?: ReactNode;
    index?: string;
    value: string;
};

export const TabPanel: FC<TabPanelProps> = (props) => {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            // aria-labelledby={`main-form-tab-${index}`}
            {...other}>
            {value === index && <div>{children}</div>}
        </div>
    );
};
