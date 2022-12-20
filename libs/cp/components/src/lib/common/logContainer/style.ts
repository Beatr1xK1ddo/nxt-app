import styled from "@emotion/styled";

export const LogBox = styled.div`
    padding: 0 0.3125rem 0 0;
    margin: 0 0 1.5625rem;
    .log-search-form {
        position: sticky;
        top: 0;
        padding: 0.5rem 0 0.625rem;
        transform: translate3d(0, 0, 0);
        z-index: 2;
        background: var(--bluer);
        button[data-type="btn-icon"] {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            color: var(--blacked);
        }
        .MuiInputLabel-formControl.MuiFormLabel-filled,
        .MuiInputLabel-formControl.Mui-focused {
            background: var(--bluer);
        }
        .MuiInputBase-input {
            padding-right: 2.25rem;
        }
    }
    .log-list {
        font: var(--font);
        font-size: calc(var(--fz) - 0.125rem);
        > div {
            padding: 0.5rem 0;
            border-bottom: 0.0625rem solid var(--grey-light);
        }
        strong {
            font-weight: 600;
        }
        .log-time {
            font-style: normal;
            font-size: calc(var(--fz) - 0.25rem);
            text-transform: uppercase;
            display: block;
            font-weight: 300;
        }
    }
    .logs-auto-update {
        width: 100%;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        color: var(--action);
        position: sticky;
        background: var(--white);
        top: 3.1rem;
        z-index: 4;
        left: 0;
        height: 1.4rem;
        font-size: calc(var(--fz) - 0.15rem);
        line-height: 1.4rem;
        background: var(--white);
        white-space: nowrap;
        overflow: hidden:
        text-oveflow: ellipsis;
    }
`;
