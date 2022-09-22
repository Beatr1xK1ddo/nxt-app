import {useEffect, useMemo, useRef, useState} from "react";
import {Link as RouterLink, useLocation, useNavigate, useParams} from "react-router-dom";
import Link from "@mui/material/Link";

import {FormContainer, TxrEditForm, StatePanelTxr, FormHeader, ConfirmModal} from "@nxt-ui/cp/components";
import {Breadcrumbs} from "@nxt-ui/components";
import {useDispatch, useSelector} from "react-redux";
import {txrEditActions, txrEditSelectors} from "@nxt-ui/cp-redux";
import {EDataProcessingStatus} from "@nxt-ui/cp/types";
import {Typography} from "@mui/material";
import {useEditMode} from "@nxt-ui/cp/hooks";

export function TxrEditScreen() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const status = useSelector(txrEditSelectors.selectStatus);
    const txrId = useSelector(txrEditSelectors.main.id);
    const {id: idFromUrl} = useParams<"id">();
    const editMode = useEditMode();
    const name = useSelector(txrEditSelectors.main.name);

    useEffect(() => {
        if (idFromUrl && !isNaN(parseInt(idFromUrl))) {
            dispatch(txrEditActions.fetchTxr(Number.parseInt(idFromUrl)));
        }
    }, [dispatch, idFromUrl]);

    useEffect(() => {
        if (!idFromUrl && txrId && status === EDataProcessingStatus.navigateRequired) {
            navigate(`/txr/${txrId}`);
        }
    }, [dispatch, idFromUrl, txrId, navigate, status]);

    useEffect(() => {
        const idUrl = parseInt(idFromUrl ?? "");
        if (!isNaN(idUrl) && txrId && idUrl !== txrId) {
            navigate(`/txr/${txrId}`);
        }
    }, [idFromUrl, txrId, navigate]);

    useEffect(() => {
        return () => {
            dispatch(txrEditActions.resetTxr());
        };
    }, [dispatch, location.pathname]);

    const breadcrumbs = useMemo(() => {
        const breadcrumbs = [
            <Link key={1} component={RouterLink} to="/txrs">
                Transfers
            </Link>,
        ];
        if (editMode && name) {
            breadcrumbs.push(<Typography key={3}>{name}</Typography>);
        }
        return breadcrumbs;
    }, [editMode, name]);
    const formRef = useRef();
    const [hasChanged, setHasChanged] = useState(false);

    useEffect(() => {
        formRef.current &&
            //@ts-ignore
            formRef.current.addEventListener("input", function () {
                setHasChanged(true);
            });
        return () => {
            //@ts-ignore
            formRef.current && formRef.current.removeEventListener("input");
            setHasChanged(false);
        };
    }, []);

    return (
        <>
            <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
            {/*@ts-ignore*/}
            <div ref={formRef}>
                <FormHeader editMode={editMode} />
                <FormContainer>
                    <StatePanelTxr />
                    <TxrEditForm />
                </FormContainer>
            </div>

            <ConfirmModal
                title={"Leaving Page"}
                text={"Are you sure you want to navigate away from this page?"}
                when={hasChanged}
            />
        </>
    );
}
