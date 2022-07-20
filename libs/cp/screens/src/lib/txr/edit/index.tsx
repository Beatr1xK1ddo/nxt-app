import {useEffect, useMemo} from "react";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import Link from "@mui/material/Link";

import {FormContainer, TxrEditForm, StatePanelTxr, FormHeader} from "@nxt-ui/cp/components";
import {Breadcrumbs} from "@nxt-ui/components";
import {useDispatch, useSelector} from "react-redux";
import {txrEditActions, txrEditSelectors} from "@nxt-ui/cp-redux";
import {EDataProcessingStatus} from "@nxt-ui/cp/types";
import {Typography} from "@mui/material";
import {useEditMode} from "@nxt-ui/cp/hooks";

export function TxrEditScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const status = useSelector(txrEditSelectors.selectStatus);
    const txrId = useSelector(txrEditSelectors.main.id);
    const {id: idFromUrl} = useParams<"id">();
    const editMode = useEditMode();
    const name = useSelector(txrEditSelectors.main.name);

    useEffect(() => {
        if (idFromUrl && status === EDataProcessingStatus.fetchRequired && !isNaN(parseInt(idFromUrl))) {
            dispatch(txrEditActions.fetchTxr(Number.parseInt(idFromUrl)));
        }
        if (!idFromUrl && txrId) {
            navigate(`/txr/${txrId}`);
        }
    }, [status, idFromUrl, txrId, dispatch, navigate]);

    useEffect(() => {
        return () => {
            dispatch(txrEditActions.resetTxr());
        };
    }, [dispatch, txrEditActions]);

    const breadcrumbs = useMemo(() => {
        const breadcrumbs = [
            <Link key={1} component={RouterLink} to="/txrs">
                SDI to IP Encoders
            </Link>,
        ];
        if (editMode && name) {
            breadcrumbs.push(<Typography key={3}>{name}</Typography>);
        }
        return breadcrumbs;
    }, [editMode, name, RouterLink]);

    return (
        <>
            <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
            <FormHeader editMode={editMode} />
            <FormContainer>
                <StatePanelTxr />
                <TxrEditForm />
            </FormContainer>
        </>
    );
}
