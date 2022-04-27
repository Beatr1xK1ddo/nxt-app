//import * as React from 'react';
import { SyntheticEvent, useState } from 'react';
import { Main } from './main/index';
import { TabPanel, TabComponent, TabsComponent } from '@nxt-ui/components';
import { Button } from '@nxt-ui/components';
import { Icon } from '@nxt-ui/icons';
import './app-edit.css';

const tabs = [
    { id: 0, heading: 'MAIN', content: <Main /> },
    { id: 1, heading: 'VIDEO ENCODER', content: 'tab video' },
    { id: 2, heading: 'AUDIO ENCODER' },
    { id: 3, heading: 'MPEG-TS Muxer', content: 'tab mpeg-ts' },
    { id: 4, heading: 'RTP Muxer', content: 'tab rtp' },
    { id: 5, heading: 'Advanced', content: 'tab advanced' },
];

export function AppEditForm() {
    const [value, setValue] = useState(0);
    const tabChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <div className="form-container">
            <Button data-name="btn-info" data-type="btn-icon">
                <Icon name="info" />
            </Button>
            <TabsComponent value={value} onChange={tabChange} aria-label="tabs">
                {tabs.map((item) => (
                    <TabComponent label={item.heading} id={`tab-${item.id}`} />
                ))}
            </TabsComponent>
            <div className="main-tab-holder">
                {tabs.map((item) => (
                    <TabPanel value={value} index={item.id}>
                        {item.content}
                    </TabPanel>
                ))}
            </div>
        </div>
    );
}
