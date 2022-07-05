import {useCallback, useEffect, useMemo} from "react";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import Link from "@mui/material/Link";

import {
    FlexHolder,
    FormContainer,
    TxrEditForm,
    NodeName,
    Columns,
    StatePanel,
    StatePanelTxr,
} from "@nxt-ui/cp/components";
import {Breadcrumbs, Button, Dropdown, InputText} from "@nxt-ui/components";
import {useDispatch, useSelector} from "react-redux";
import {txrEditActions, txrEditSelectors} from "@nxt-ui/cp-redux";
import {EDataProcessingStatus} from "@nxt-ui/cp/types";
import {Typography} from "@mui/material";

export function TxrEditScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id: idFromUrl} = useParams<"id">();
    const editMode = useMemo(() => Boolean(idFromUrl), [idFromUrl]);
    const nodeId = useSelector(txrEditSelectors.main.node);
    const status = useSelector(txrEditSelectors.selectStatus);
    const validStatus = useSelector(txrEditSelectors.selectValidStatus);
    const name = useSelector(txrEditSelectors.main.name);
    const txrId = useSelector(txrEditSelectors.main.id);

    useEffect(() => {
        //fetch txr by id
        if (idFromUrl && status === EDataProcessingStatus.fetchRequired && !isNaN(parseInt(idFromUrl))) {
            dispatch(txrEditActions.fetchTxr(Number.parseInt(idFromUrl)));
        }
        if (!idFromUrl && txrId) {
            navigate(`/txr/${txrId}`);
        }
    }, [status, validStatus, dispatch, idFromUrl, txrId, navigate]);

    useEffect(() => {
        return () => {
            dispatch(txrEditActions.resetTxr());
        };
    }, [dispatch]);

    const breadcrumbs = useMemo(() => {
        const breadcrumbs = [
            <Link key={1} component={RouterLink} to="/txrs">
                SDI to IP Encoders
            </Link>,
        ];
        if (editMode && nodeId) {
            breadcrumbs.push(
                <Link key={2} component={RouterLink} to={`/node/${nodeId}`}>
                    <NodeName nodeId={nodeId} />
                </Link>
            );
        }
        if (editMode && name) {
            breadcrumbs.push(<Typography key={3}>{name}</Typography>);
        }
        return breadcrumbs;
    }, [editMode, name, nodeId]);

    const handleAddNew = useCallback(() => {
        dispatch(txrEditActions.resetTxr());
        navigate(`/txr/`);
    }, [navigate, dispatch]);

    return (
        <>
            <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
            <FlexHolder className="heading-section" justify="flex-start">
                <h1>{editMode ? "Edit TXR" : "Create TXR"}</h1>
                <Button
                    data-type="btn-border"
                    icon="plusBig"
                    iconbefore
                    style={{color: "var(--ok)"}}
                    onClick={handleAddNew}>
                    Add new
                </Button>
            </FlexHolder>
            <Columns col={4}>
                <InputText label="NAME" fullWidth />
                <Dropdown label="APP TYPE" />
                <Dropdown label="COMPANY" />
                <Dropdown label="FILL IN FROM TEMPLATE" />
            </Columns>
            <FormContainer>
                <StatePanelTxr />
                <TxrEditForm />
            </FormContainer>
        </>
    );
}
