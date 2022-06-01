import {FormContainer, IpbeEditForm, StatePanel, FlexHolder} from "@nxt-ui/cp/components";
import {Button, BreadcrumbsComponent} from "@nxt-ui/components";
import Link from "@mui/material/Link";

export function IpbeCreateScreen() {
    const breadcrumbs = [
        <Link key="1" color="inherit" href="/">
            SDI to IP Encoders
        </Link>,
        <Link key="2" color="inherit" href="/">
            comcast-02-u14
        </Link>,
        <p>ThisTV_SD</p>,
    ];
    return (
        <>
            <BreadcrumbsComponent separator="/" aria-label="breadcrumb">
                {breadcrumbs}
            </BreadcrumbsComponent>
            <FlexHolder className="heading-section" justify="flex-start">
                <h1>Edit 1+1 application</h1>
                <Button data-type="btn-border" icon="plusBig" iconBefore style={{color: "var(--ok)"}}>
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
