import {FC, ChangeEventHandler, useState, useCallback} from "react";
import {Dropdown, InputText, Button} from "@nxt-ui/components";
import {Columns} from "@nxt-ui/cp/components";
import {useSelector, useDispatch} from "react-redux";
import {txrEditSelectors, txrEditActions} from "@nxt-ui/cp-redux";
import {SelectChangeEvent} from "@mui/material/Select/Select";
import {SelectCompany, FlexHolder} from "@nxt-ui/cp/components";
import {ETXRAppType} from "@nxt-ui/cp/types";
import {useNavigate} from "react-router-dom";
import {useTxrTemplates} from "@nxt-ui/cp/hooks";
import "./index.css";

type FormHeaders = {editMode: boolean};

export const FormHeader: FC<FormHeaders> = ({editMode}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const values = useSelector(txrEditSelectors.main.values);
    const errors = useSelector(txrEditSelectors.main.errors);
    const templates = useSelector(txrEditSelectors.templates);
    useTxrTemplates();
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

    const changeNameHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback(
        (e) => {
            dispatch(txrEditActions.setName(e.currentTarget.value as string));
        },
        [dispatch, txrEditActions]
    );
    const changeAppTypeHandler = useCallback((e: SelectChangeEvent<unknown>) => {
        dispatch(txrEditActions.setAppType(e.target.value as ETXRAppType));
    }, []);
    const changeCompanyHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            dispatch(txrEditActions.setCompany(e.target.value as number));
        },
        [dispatch]
    );
    const setTemplateHandler = useCallback(
        (e: SelectChangeEvent<unknown>) => {
            const value = e.target.value as string;
            setSelectedTemplate(value);
            dispatch(txrEditActions.setTxrFromTemplate(templates[value]));
        },
        [dispatch, txrEditActions, setSelectedTemplate, templates]
    );

    const handleAddNew = useCallback(() => {
        dispatch(txrEditActions.resetTxr());
        navigate(`/txr/`);
    }, [navigate, dispatch, txrEditActions]);

    return (
        <>
            <FlexHolder className="heading-section" justify="flex-start">
                <h1>{editMode ? "Edit Transfer" : "Create Transfer"}</h1>
                {editMode && (
                    <Button
                        data-type="btn-border"
                        icon="plusBig"
                        iconbefore
                        style={{color: "var(--ok)"}}
                        onClick={handleAddNew}>
                        Add new
                    </Button>
                )}
            </FlexHolder>
            <Columns col={4}>
                <InputText
                    label="NAME"
                    fullWidth
                    value={values.name}
                    onChange={changeNameHandler}
                    error={errors.name.error}
                    helperText={errors.name.helperText}
                />
                <Dropdown
                    label="APP TYPE"
                    value={values.appType}
                    values={Object.values(ETXRAppType)}
                    onChange={changeAppTypeHandler}
                    error={errors.appType.error}
                    helperText={errors.appType.helperText}
                />
                <SelectCompany
                    error={errors.company.error}
                    helperText={errors.company.helperText}
                    value={values.company}
                    label="COMPANY"
                    onChange={changeCompanyHandler}
                />
                <Dropdown
                    label="FILL IN FROM TEMPLATE"
                    value={selectedTemplate}
                    values={Object.keys(templates)}
                    onChange={setTemplateHandler}
                />
            </Columns>
        </>
    );
};
