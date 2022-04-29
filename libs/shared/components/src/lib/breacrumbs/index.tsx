import {styled} from "@mui/material/styles";
import Breadcrumbs, {BreadcrumbsProps} from "@mui/material/Breadcrumbs";
import {FC} from "react";

export const BreadcrumbsComponent: FC<BreadcrumbsProps> = styled(Breadcrumbs)`
    margin: 0 0 8px;
    .MuiBreadcrumbs-li {
        display: inline-block;
        vertical-align: middle;
        font-size: calc(var(--fz) - 1px);
        line-height: calc(var(--fz) + 4px);
        margin: 0 0 8px;
        a {
            color: var(--grey-black);
            display: inline-block;
            vertical-align: middle;
            background: var(--pale-str);
            padding: 5px 8px;
            border-radius: 14px;
            box-sizing: border-box;
            text-decoration: none;
            &:hover {
                text-decoration: none;
                background: var(--grey-light);
            }
        }
        p {
            padding: 5px 8px;
            margin: 0;
        }
    }
    .MuiBreadcrumbs-separator {
        margin-bottom: 8px;
    }
`;
