import React, {useCallback, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Button, MenuComponent, MenuItemStyled} from "@nxt-ui/components";
import {Icon} from "@nxt-ui/icons";
import {commonActions, commonSelectors, txrEditActions, txrEditSelectors} from "@nxt-ui/cp-redux";
import {FlexHolder, TabElement, TabHolder, ConfirmModal} from "@nxt-ui/cp/components";

import {Main} from "./main";

import clsx from "clsx";

import "./index.css";
import {useCompaniesList, useEditMode, useNodeMetadata, useNodesList} from "@nxt-ui/cp/hooks";
import {EAppType, EAppGeneralStatusChange, Optional} from "@nxt-ui/cp/types";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`main-form-tabpanel-${index}`} {...other}>
            {value === index && children}
        </div>
    );
}

// TODO Kate: refactor component
export function TxrEditForm() {
    const dispatch = useDispatch();

    useNodesList(EAppType.TXR, true);
    useCompaniesList();
    useNodeMetadata();
    const editMode = useEditMode();

    const name = useSelector(txrEditSelectors.main.name);
    const mainError = useSelector(txrEditSelectors.main.error);
    const txrId = useSelector(txrEditSelectors.main.id);

    const saveMenuButtonRef = useRef<Optional<HTMLDivElement>>(null);
    const [tab, setTab] = React.useState<number>(0);
    const [saveMenuOpen, setSaveMenuOpen] = useState<boolean>(false);

    const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    }, []);

    const handleSave = useCallback(
        (restart?: boolean) => () => {
            setSaveMenuOpen(false);
            const {
                main: {id: selectId, errors: selectErrors},
                selectValidStatus,
                selectState: selectEditState,
            } = txrEditSelectors;
            dispatch(txrEditActions.validateTxr());
            dispatch(
                txrEditActions.updateTxr({
                    name,
                    selectId,
                    selectValidStatus,
                    selectEditState,
                    selectErrors,
                    restart,
                })
            );
        },
        [dispatch, name]
    );

    const handleSaveAndRestart = useCallback(() => {
        handleSave(true)();
    }, [handleSave]);

    const handleStartRestart = useCallback(() => {
        if (typeof txrId === "number") {
            dispatch(
                commonActions.applicationActions.changeStatuses({
                    statuses: {id: txrId, statusChange: EAppGeneralStatusChange.start},
                    appType: EAppType.TXR,
                })
            );
        }
    }, [txrId, dispatch]);

    const handleStop = useCallback(() => {
        if (typeof txrId === "number") {
            dispatch(
                commonActions.applicationActions.changeStatuses({
                    statuses: {id: txrId, statusChange: EAppGeneralStatusChange.stop},
                    appType: EAppType.TXR,
                })
            );
        }
    }, [txrId, dispatch]);

    const tabs = useMemo(() => {
        return [
            {
                id: 0,
                heading: "MAIN",
                content: <Main />,
                isError: mainError,
            },
        ];
    }, [mainError]);

    const handleSaveMenuOpen = useCallback(() => {
        setSaveMenuOpen(true);
    }, []);

    const handleSaveMenuClose = useCallback(() => {
        setSaveMenuOpen(false);
    }, []);

    const appFormStatusChanged = useSelector(commonSelectors.apps.appFormStatus);

    const handleClone = useCallback(() => {
        if (txrId) {
            dispatch(
                commonActions.applicationActions.cloneApplications({
                    ids: [txrId],
                    appType: EAppType.TXR,
                    appName: name,
                })
            );
        }
    }, [txrId, dispatch, name]);

    return (
        <div className="form-container">
            <Button data-name="btn-info" data-type="btn-icon">
                <Icon name="info" />
            </Button>
            <TabHolder value={tab} onChange={handleTabChange} aria-label="tabs">
                {tabs.map((item) => (
                    <TabElement key={item.id} isError={item.isError} label={item.heading} id={`tab-${item.id}`} />
                ))}
            </TabHolder>
            <div className="main-tab-holder">
                {tabs.map((item) => (
                    <TabPanel key={item.id} value={tab} index={item.id}>
                        {item.content}
                    </TabPanel>
                ))}
                <FlexHolder justify="flex-start" className="btn-footer-holder">
                    <div className={clsx("two-btn-box", saveMenuOpen && "save-menu-open")}>
                        <Button onClick={handleSave(false)}>Save</Button>
                        <Button data-type="btn-icon" onClick={handleSaveMenuOpen} btnRef={saveMenuButtonRef}>
                            <Icon name="arrow" />
                        </Button>
                        <MenuComponent
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            anchorEl={saveMenuButtonRef.current}
                            open={saveMenuOpen}
                            onClose={handleSaveMenuClose}>
                            <MenuItemStyled onClick={handleSaveAndRestart}>Save &amp; Start/Restart</MenuItemStyled>
                            <MenuItemStyled onClick={handleStartRestart}>Start/Restart</MenuItemStyled>
                            <MenuItemStyled onClick={handleStop}>Stop</MenuItemStyled>
                        </MenuComponent>
                    </div>
                    {editMode && (
                        <Button
                            data-type="btn-border"
                            style={{color: "var(--grey-dark)"}}
                            icon="copy"
                            iconbefore
                            onClick={handleClone}>
                            Clone
                        </Button>
                    )}
                </FlexHolder>
            </div>
            <ConfirmModal
                title={"Leaving Page"}
                text={"Are you sure you want to navigate away from this page?"}
                when={appFormStatusChanged}
            />
        </div>
    );
}
