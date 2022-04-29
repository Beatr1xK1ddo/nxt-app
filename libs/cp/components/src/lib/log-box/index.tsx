import { FC, ReactNode } from 'react';
import { LogList } from '../index';
import { Button, InputText } from '@nxt-ui/components';
import { Icon } from '@nxt-ui/icons';
import './log-box.css';

interface LogBoxProps {
  children?: ReactNode;
}
export const LogBox: FC<LogBoxProps> = (props) => {
  const { children, ...other } = props;
    return (
        <div className="log-box">
            <form className="log-search-form" action="#">
                <InputText label="Search" fullWidth />
                <Button data-type="btn-icon">
                    <Icon name="search" />
                </Button>
            </form>
            <LogList className="log-list-scrolled">
                {children}
            </LogList>
        </div>
    );
}
