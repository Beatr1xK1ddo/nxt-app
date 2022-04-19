import { FC, useMemo } from 'react';
import { AppEditForm } from './app-edit-form';
import styles from './forms.module.scss';
import { EFormType, IFormProps } from './types';

export const Form: FC<IFormProps> = (props) => {
    const { type } = props;

    const activeTabComponent = useMemo(() => {
        switch (type) {
            case EFormType.editForm:
                return <AppEditForm />;
            default:
                return null;
        }
    }, [type]);

    return activeTabComponent;
};
