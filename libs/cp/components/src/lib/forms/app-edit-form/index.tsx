import * as React from 'react';
import { Main } from './main/index';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import "./app-edit.css";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`main-form-tabpanel-${index}`}
            // aria-labelledby={`main-form-tab-${index}`}
            {...other}
        >
            {value === index && <>{children}</>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `main-form-tab-${index}`,
        // 'aria-controls': `main-form-tabpanel-${index}`,
    };
}

const tabs = [
    'main',
    'video encoder',
    'audio encoder',
    'mpeg-ts muxer',
    'rtp muxer',
    'advanced',
];

export function AppEditForm() {
    const [value, setValue] = React.useState(0);

    const tabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className="form-container">
            <div className="tabs">
                <Tabs value={value} onChange={tabChange} aria-label="tabs">
                    <Tab label="Item One" {...a11yProps(2)} />
                    <Tab label="Item Two" {...a11yProps(3)} />
                    <Tab label="Item Three" {...a11yProps(4)} />
                </Tabs>
            </div>
            <div className="main-tab-holder">
                <TabPanel value={value} index={0}>
                    <Main />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
            </div>
        </div>
    );
}
