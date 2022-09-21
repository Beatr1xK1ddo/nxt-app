import {useCallback, useEffect, useMemo} from "react";
import {Link as RouterLink, useLocation, useNavigate, useParams} from "react-router-dom";
import Link from "@mui/material/Link";

import {ConfirmModal, FlexHolder, FormContainer, IpbeEditForm, NodeName, StatePanel} from "@nxt-ui/cp/components";
import {Breadcrumbs, Button} from "@nxt-ui/components";
import {useDispatch, useSelector} from "react-redux";
import {ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {Typography} from "@mui/material";
import {EDataProcessingStatus} from "@nxt-ui/cp/types";

export function IpbeEditScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const {id: idFromUrl} = useParams<"id">();
    const editMode = useMemo(() => Boolean(idFromUrl), [idFromUrl]);
    const nodeId = useSelector(ipbeEditSelectors.main.node);
    const status = useSelector(ipbeEditSelectors.selectStatus);
    const name = useSelector(ipbeEditSelectors.main.name);
    const ipbeId = useSelector(ipbeEditSelectors.main.id);

    useEffect(() => {
        if (idFromUrl && !isNaN(parseInt(idFromUrl))) {
            dispatch(ipbeEditActions.fetchIpbe(Number.parseInt(idFromUrl)));
        }
    }, [idFromUrl, dispatch]);

    useEffect(() => {
        if (!idFromUrl && ipbeId && status === EDataProcessingStatus.navigateRequired) {
            dispatch(ipbeEditActions.setStatus(EDataProcessingStatus.idle));
            navigate(`/ipbe/${ipbeId}`);
        }
    }, [navigate, idFromUrl, ipbeId, status, dispatch]);

    useEffect(() => {
        const intIdFromUrl = parseInt(idFromUrl || "");
        if (intIdFromUrl && ipbeId && ipbeId !== intIdFromUrl) {
            navigate(`/ipbe/${ipbeId}`);
        }
    }, [ipbeId, idFromUrl, navigate]);

    useEffect(() => {
        return () => {
            dispatch(ipbeEditActions.resetIpbe());
        };
    }, [dispatch, location.pathname]);

    const breadcrumbs = useMemo(() => {
        const breadcrumbs = [
            <Link key={1} component={RouterLink} to="/ipbes">
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
        dispatch(ipbeEditActions.resetIpbe());
        navigate(`/ipbe/`);
    }, [navigate, dispatch]);

    return (
        <>
            <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
            <FlexHolder className="heading-section" justify="flex-start">
                <h1>{editMode ? "Edit IPBE" : "Create IPBE"}</h1>
                <Button
                    data-type="btn-border"
                    icon="plusBig"
                    iconbefore
                    style={{color: "var(--ok)"}}
                    onClick={handleAddNew}
                >
                    Add new
                </Button>
            </FlexHolder>
            <FormContainer>
                <StatePanel />
                <IpbeEditForm />
            </FormContainer>
            <ConfirmModal
                title={"Leaving Page"}
                text={"Are you sure you want to navigate away from this page?"}
                when={true}
            />
        </>
    );
}
