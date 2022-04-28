import { FC } from 'react';
import { styled } from '@mui/material/styles';
import Tabs, { TabsProps } from '@mui/material/Tabs';

export const TabsComponent: FC<TabsProps> = styled(Tabs)`
    min-height: 32px;
    .MuiTabs-indicator {
        display: none;
    }
`;
