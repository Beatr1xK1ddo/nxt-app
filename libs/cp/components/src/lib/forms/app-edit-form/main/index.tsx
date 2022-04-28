import { ChangeEventHandler, FC, useCallback, useMemo } from 'react';
import { InputText, Dropdown, Button } from '@nxt-ui/components';
import { Icon } from '@nxt-ui/icons';
import { ColumnTwo, FlexHolder } from '../../../containers';
import { CompanyDropdown, NodeDropdown } from '../../../dropdowns';
import { SelectChangeEvent } from '@mui/material/Select/Select';
import { EEncoderVersion, EOutputType, EVideoConnection } from '@nxt-ui/cp/types';
import { IFormProps } from '../types';
import { changeCompany, changeName, changeNode } from '../reducers';

export const Main: FC<IFormProps> = (props) => {
    const { dispatch } = props;

    const changeCompanyHandler = useCallback((e: SelectChangeEvent<unknown>) => {
        dispatch?.(changeCompany(e.target.value as number));
    }, [dispatch]);

    const changeNodeHandler = useCallback((e: SelectChangeEvent<unknown>) => {
        dispatch?.(changeNode(e.target.value as number));
    }, [dispatch]);

    const changeNameHandler = useCallback((e) => {
        dispatch?.(changeName(e.currentTarget.value as string));
    },
    [dispatch]) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    const sendPutRequest = useCallback((e) => {
        dispatch?.(changeName(e.currentTarget.value as string));
    },
    [dispatch]) as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

    

    const encoderVersion = useMemo(() => {
        if (props.encoder_version) {
            return EEncoderVersion[props.encoder_version];
        }
        return;
    }, [props.encoder_version]);
    
    return (
        <>
            <div className="input-holder">
                <InputText 
                    label="Application name" 
                    value={props.name} 
                    fullWidth 
                    onChange={changeNameHandler} 
                />
            </div>
            <div className="input-holder">
                <CompanyDropdown
                    label="COMPANY"
                    value={props.company_id}
                    onChange={changeCompanyHandler}
                />
            </div>
            <div className="input-holder">
                <NodeDropdown
                    label="NODE"
                    value={props.node_id}
                    onChange={changeNodeHandler}
                />
            </div>
            <div className="input-holder">
                <Dropdown
                    label="VIDEO CONNECTION"
                    value={props.video_connection}
                    values={Object.values(EVideoConnection)}
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
                    {props?.ipbe_destinations?.map(item => (
                        <>
                            <InputText label="Output IP"  value={item.output_ip} />
                            <InputText label="Output Port" value={item.output_port} />
                            <Dropdown label="TTL" value={item.ttl} />
                            <Button>
                                <Icon name="plus" />
                            </Button>
                        </>
                    ))}
                </FlexHolder>
            </div>
            <ColumnTwo gap={24}>
                <Dropdown
                    label="ENCODER VERSION"
                    value={encoderVersion}
                    values={Object.values(EEncoderVersion)}
                />
                <Dropdown
                    label="LATENCY"
                    // value={params[]}
                    // values={Object.values()}
                />
                <Dropdown
                    label="INPUT FORMAT"
                    // value={params[]}
                    // values={Object.values()}
                />
                <Dropdown
                    label="OUTPUT TYPE"
                    value={props.output_type}
                    values={Object.values(EOutputType)}
                />
            </ColumnTwo>
            <FlexHolder justify="flex-start" className="btn-footer-holder">
                <Button icon="arrow" iconAfter>
                    Save &nbsp; |
                </Button>
                <Button icon="copy" iconBefore>
                    Clone
                </Button>
            </FlexHolder>
        </>
    );
};
