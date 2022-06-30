import {useCallback, useEffect, useMemo} from "react";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import Link from "@mui/material/Link";

import {FlexHolder, FormContainer, IpbeEditForm, NodeName, StatePanel} from "@nxt-ui/cp/components";
import {Breadcrumbs, Button} from "@nxt-ui/components";
import {useDispatch, useSelector} from "react-redux";
import {ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {EDataProcessingStatus} from "@nxt-ui/cp/types";
import {Typography} from "@mui/material";

export function IpbeEditScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id: idFromUrl} = useParams<"id">();
    const editMode = useMemo(() => Boolean(idFromUrl), [idFromUrl]);
    const nodeId = useSelector(ipbeEditSelectors.main.node);
    const status = useSelector(ipbeEditSelectors.selectStatus);
    const validStatus = useSelector(ipbeEditSelectors.selectValidStatus);
    const name = useSelector(ipbeEditSelectors.main.name);
    const ipbeId = useSelector(ipbeEditSelectors.main.id);

    useEffect(() => {
        //fetch ipbe by id
        if (idFromUrl && status === EDataProcessingStatus.fetchRequired && !isNaN(parseInt(idFromUrl))) {
            dispatch(ipbeEditActions.fetchIpbe(Number.parseInt(idFromUrl)));
        }
        if (!idFromUrl && ipbeId) {
            navigate(`/ipbe/${ipbeId}`);
        }
    }, [status, validStatus, dispatch, idFromUrl, ipbeId, navigate]);

    useEffect(() => {
        return () => {
            dispatch(ipbeEditActions.resetIpbe());
        };
    }, [dispatch]);

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
                    onClick={handleAddNew}>
                    Add new
                </Button>
            </FlexHolder>
            <FormContainer>
                <StatePanel />
                <IpbeEditForm />
            </FormContainer>
        </>
    );
}
