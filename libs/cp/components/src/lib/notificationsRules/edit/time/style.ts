import styled from "@emotion/styled";

export const DaysList = styled.div`
    flex-direction: row;
    flex-wrap: nowrap;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .time-holder {
        margin-top: 0.2rem;
    }
    > div {
        position: relative;
        margin: 0 1rem 0 0;
        .MuiCheckbox-root {
            border-radius: 50%;
            width: 3rem;
            height: 3rem;
            border: 0.0625rem solid var(--pale-str);
            font-size: calc(var(--fz) - 0.125rem);
            margin: 0;
            &.Mui-checked {
                background: var(--b-gblue);
            }
            svg {
                display: none;
            }
            & + label {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: calc(var(--fz) - 0.125rem);
            }
        }

        .Mui-checked {
            span[font-size="medium"] {
                background: var(--b-gblue);
            }
        }
    }
    @media (max-width: 62rem) {
        > div {
            .MuiCheckbox-root {
                width: 2.2rem;
                height: 2.2rem;
                & + label {
                    font-size: calc(var(--fz) - 0.25rem);
                }
            }
        }
    }
    @media (max-width: 54rem) {
        > div:not(.time-holder) {
            margin-right: 0.3rem;
            .MuiCheckbox-root {
                width: 1.75rem;
                height: 1.75rem;
                & + label {
                    font-size: calc(var(--fz) - 0.3125rem);
                }
            }
        }
        .time-holder {
            width: 7rem;
            margin: 0.2rem 0.5rem 0;
        }
        .MuiTextField-root {
            width: 100% !important;
        }
    }
`;
