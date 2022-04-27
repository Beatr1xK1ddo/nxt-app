import { FC } from 'react';
import { TabPanelProps } from './types';

export const TabPanel: FC<TabPanelProps> = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            // aria-labelledby={`main-form-tab-${index}`}
            {...other}
        >
            {value === index && <>{children}</>}
        </div>
    );
};
