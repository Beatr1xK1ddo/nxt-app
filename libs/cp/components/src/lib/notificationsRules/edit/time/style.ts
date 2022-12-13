import styled from "@emotion/styled";

export const DaysList = styled.div`
    flex-direction: row;
    flex-wrap: nowrap;
    display: flex;
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
        }
        label {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: calc(var(--fz) - 0.125rem);
        }
        .Mui-checked {
            span[font-size="medium"] {
                background: var(--b-gblue);
            }
        }
    }
    @media (max-width: 48rem) {
        > div {
            margin-right: 0.375rem;
            .MuiCheckbox-root {
                width: 1.75rem;
                height: 1.75rem;
            }
            label {
                font-size: calc(var(--fz) - 0.3125rem);
            }
        }
    }
`;