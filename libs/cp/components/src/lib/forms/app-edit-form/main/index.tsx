import { FC } from 'react';
import { InputText, Dropdown, Button } from '@nxt-ui/components';
import { Icon } from '@nxt-ui/icons';
import { ColumnTwo, FlexHolder } from '@nxt-ui/cp/components';

export const Main: FC = () => {
    return (
        <>
            <div className="input-holder">
                <InputText label="Application name" />
            </div>
            <div className="input-holder">
                <Dropdown
                    label="COMPANY"
                    // value={params[]}
                    // values={}
                />
            </div>
            <div className="input-holder">
                <Dropdown
                    label="NODE"
                    // value={params[]}
                    // values={}
                />
            </div>
            <div className="input-holder">
                <Dropdown
                    label="VIDEO CONNECTION"
                    // value={params[]}
                    // values={}
                />
            </div>
            <div className="p-16">
                <div className="input-holder">
                    <Dropdown
                        label="APPLICATION TYPE"
                        // value={params[]}
                        // values={}
                    />
                </div>
                <FlexHolder className="h-32">
                    <InputText label="Output IP" />
                    <InputText label="Output Port" />
                    <Dropdown label="TTL" />
                    <Button>
                        <Icon name="plus" />
                    </Button>
                </FlexHolder>
            </div>
            <ColumnTwo gap={24}>
                <Dropdown
                    label="ENCODER VERSION"
                    // value={params[]}
                    // values={}
                />
                <Dropdown
                    label="LATENCY"
                    // value={params[]}
                    // values={}
                />
                <Dropdown
                    label="INPUT FORMAT"
                    // value={params[]}
                    // values={}
                />
                <Dropdown
                    label="OUTPUT TYPE"
                    // value={params[]}
                    // values={}
                />
            </ColumnTwo>
            <FlexHolder justify="flex-start" className="btn-footer-holder">
                <Button icon="arrow" iconAfter>
                    Save &nbsp; |
                </Button>
                <Button
                    data-type="btn-border"
                    style={{ color: 'var(--grey-dark)' }}
                    icon="copy"
                    iconBefore
                >
                    Clone
                </Button>
            </FlexHolder>
        </>
    );
};
