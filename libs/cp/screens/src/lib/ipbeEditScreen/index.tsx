import {useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Link from "@mui/material/Link";

import {FormContainer, IpbeEditForm, StatePanel, FlexHolder} from "@nxt-ui/cp/components";
import {Button, BreadcrumbsComponent} from "@nxt-ui/components";
import {useDispatch, useSelector} from "react-redux";
import {commonSelectors, CpRootState, ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {EDataProcessingStatus, EStateTypes, INodesListItem} from "@nxt-ui/cp/types";

export function IpbeEditScreen() {
    const dispatch = useDispatch();

    const {id} = useParams<"id">();

    const status = useSelector(ipbeEditSelectors.selectStatus);

    const nodeId = useSelector(ipbeEditSelectors.selectNode);

    const node = useSelector<CpRootState, undefined | INodesListItem>((state) =>
        commonSelectors.nodes.selectById(state, nodeId)
    );

    const name = useSelector(ipbeEditSelectors.selectName);

    const state = useSelector(ipbeEditSelectors.selectState);

    const ipbeStateId = useSelector(ipbeEditSelectors.selectMainId);

    const [loaded, setLoaded] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");

    const navigate = useNavigate();

    const handleCreateIpbe = useCallback(() => {
        setTitle("");
        dispatch(ipbeEditActions.reset());
        navigate(`/ipbe/`);
    }, [navigate, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(ipbeEditActions.reset());
        };
    }, [dispatch]);

    useEffect(() => {
        if (state === EStateTypes.failed) {
            alert("Request failed !");
        }
        if (state === EStateTypes.success) {
            alert("Request success !");
            setTitle(name);
        }
        if (!loaded && name) {
            setTitle(name);
            setLoaded(true);
        }
    }, [state]);

    useEffect(() => {
        if (id && status === EDataProcessingStatus.fetchRequired && !isNaN(parseInt(id))) {
            dispatch(ipbeEditActions.fetchIpbe(Number.parseInt(id)));
        }
        if (status === EDataProcessingStatus.try) {
            if (id) {
                dispatch(ipbeEditActions.updateIpbe());
            } else {
                dispatch(ipbeEditActions.createIpbe());
            }
        }
        if (status === EDataProcessingStatus.succeeded && typeof ipbeStateId === "number" && !id) {
            navigate(`/ipbe/${ipbeStateId}`);
        }
    }, [status, dispatch, id, ipbeStateId, navigate]);

    return (
        <>
            <BreadcrumbsComponent separator="/" aria-label="breadcrumb">
                <Link color="inherit" href="/">
                    SDI to IP Encoders
                </Link>
                ,
                <Link color="inherit" href="/">
                    {node?.name || "Create"}
                </Link>
                ,{title ? <p>${title}</p> : null}
            </BreadcrumbsComponent>
            <FlexHolder className="heading-section" justify="flex-start">
                <h1>{`${id ? "Edit" : "Create IPBE"} ${title}`}</h1>
                <Button
                    data-type="btn-border"
                    icon="plusBig"
                    iconbefore
                    style={{color: "var(--ok)"}}
                    onClick={handleCreateIpbe}>
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
