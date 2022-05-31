import type {ReactNode, ReactChild} from "react";
export interface IPort {
    id: number;
    content: ReactChild | ReactNode;
    portAlert: string;
}
