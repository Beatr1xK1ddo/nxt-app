import {styled} from "@mui/material/styles";
import MUIBreadcrumbs, {BreadcrumbsProps} from "@mui/material/Breadcrumbs";
import {FC} from "react";

export const Breadcrumbs: FC<BreadcrumbsProps> = styled(MUIBreadcrumbs)`
    margin: 0 0 0.5rem;
    .MuiBreadcrumbs-li {
        display: inline-block;
        vertical-align: middle;
        font-size: calc(var(--fz) - 0.0625rem);
        line-height: calc(var(--fz) + 0.25rem);
        margin: 0 0 0.5rem;
        a {
            color: var(--grey-black);
            display: inline-block;
            vertical-align: middle;
            background: var(--pale-str);
            padding: 0.3125rem 0.5rem;
            border-radius: 0.875rem;
            box-sizing: border-box;
            text-decoration: none;
            &:hover {
                text-decoration: none;
                background: var(--grey-light);
            }
        }
        p {
            padding: 0.3125rem 0.5rem;
            margin: 0;
        }
    }
    .MuiBreadcrumbs-separator {
        margin-bottom: 0.5rem;
    }
`;
