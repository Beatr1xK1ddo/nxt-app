import styled from "@emotion/styled";
import Modal, {ModalProps} from "@mui/material/Modal";
import {FC} from "react";

export const ModalComponent: FC<ModalProps> = styled(Modal)`
    .MuiBackdrop-root {
        background: rgba(0, 0, 0, 0.25);
    }
`;
