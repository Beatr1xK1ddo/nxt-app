import styled from "@emotion/styled";

export const NotificationsHolder = styled.section`
    div[role="tabpanel"],
    .notification-tabs {
        margin: 0 0 1.25rem;
    }
    .MuiTabs-root {
        margin: 0 0 1rem;
        min-height: auto;
    }
    div[role="region"] div[role="tabpanel"] {
        margin: 0;
    }
    .MuiAccordionDetails-root {
        padding: 1rem 0 !important;
    }
    .notification-elements {
        margin: 0 -0.5rem;
        align-items: flex-start;
        > * {
            margin: 0 0.5rem;
        }
        > svg {
            margin-top: 0.5rem;
            min-width: 1.5rem;
        }
        @media (max-width: 48rem) {
            margin: 0 -0.25rem;
            > * {
                margin: 0 0.25rem;
            }
        }
    }
    .notification-output {
        .text-add {
            font-size: calc(var(--fz) - 0.25rem);
            em {
                font-style: normal;
                font-size: calc(var(--fz) + 0.125rem);
            }
        }
        .MuiFormControl-root {
            width: 33%;
        }
    }
    .notification-output-last {
        margin-top: 1.8rem;
        margin-bottom: 0.625rem;
        .MuiFormControl-root {
            width: 50%;
        }
    }
    .manual-sel-content {
        margin: 0;
        .MuiTreeItem-label {
            font-size: 0.875rem;
        }
        .MuiTreeItem-iconContainer {
            width: 24px;
            margin-right: 2px;
        }
        .MuiTreeItem-content {
            padding: 0;
        }
        > ul {
            > li {
                padding: 0.5rem 0.5rem;
                box-sizing: border-box;
                // height: 2.5rem;
                display: flex;
                align-items: center;
                border-bottom: 0.0625rem solid var(--grey-light);
                font-size: 0.875rem;
                &:last-of-type {
                    border: none;
                }
                > svg {
                    margin: 0 0.3125rem 0 0;
                }
            }
        }
    }
    h1 {
        margin: 0 0 1.125rem;
    }
    h2 {
        text-transform: uppercase;
        color: var(--blacked);
        margin: 0 0 26px;
        font-family: var(--osc-bold);
        font-size: var(--fz);
        @media (max-width: 75rem) {
            margin: 0 0 19px;
        }
    }
    label[for="check-all"] {
        font-weight: 700;
        text-transform: uppercase;
        color: var(--blacked);
    }
    .time-picker-holder {
        .MuiTextField-root {
            margin: 0 1rem 0 0;
            width: 12.8125rem;
        }
    }
    .MuiTabs-scroller {
        .MuiButtonBase-root {
            padding: 0.1875rem 0.5625rem !important;
            min-height: auto;
        }
    }

    @media (max-width: 48rem) {
        .manual-sel-content {
            gap: 1.5625rem;
        }
        .notification-output-last {
            margin-top: 0.9375rem;
        }
        .time-picker-holder {
            padding-top: 0.9375rem;
        }
        div[aria-labelledby="radio-days"] {
            span[font-size="medium"] {
                width: 1.75rem;
                height: 1.75rem;
            }
            .MuiFormControlLabel-root {
                margin-right: 0.375rem;
                .MuiTypography-root {
                    font-size: calc(var(--fz) - 0.3125rem);
                }
            }
        }
    }
`;
