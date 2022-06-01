import {FormContainer, IpbeEditForm, StatePanel, FlexHolder} from "@nxt-ui/cp/components";
import {Button, BreadcrumbsComponent} from "@nxt-ui/components";
import Link from "@mui/material/Link";
import {useDispatch, useSelector} from "react-redux";
import {ipbeEditActions, ipbeEditSelectors} from "@nxt-ui/cp-redux";
import {useEffect} from "react";
import {EDataProcessingStatus} from "@nxt-ui/cp/types";

export function IpbeEditScreen() {
    const dispatch = useDispatch();
    const status = useSelector(ipbeEditSelectors.selectStatus);

    useEffect(() => {
        if (status === EDataProcessingStatus.fetchRequired) {
            dispatch(ipbeEditActions.fetchIpbe(391));
        }
    }, [dispatch, status]);

    return (
        <>
            <BreadcrumbsComponent separator="/" aria-label="breadcrumb">
                <Link color="inherit" href="/">
                    SDI to IP Encoders
                </Link>
                ,
                <Link color="inherit" href="/">
                    comcast-02-u14
                </Link>
                ,<p>ThisTV_SD</p>,
            </BreadcrumbsComponent>
            <FlexHolder className="heading-section" justify="flex-start">
                <h1>Edit 1+1 application</h1>
                <Button data-type="btn-border" icon="plusBig" iconbefore style={{color: "var(--ok)"}}>
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
