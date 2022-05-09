import type {FC} from "react";
import {IpbeActionsStrip, IpbeFilter, IpbeItems} from "@nxt-ui/cp/components";

export const IpbeScreen: FC = () => (
    <>
        <IpbeFilter />
        <IpbeActionsStrip />
        <IpbeItems />
    </>
);
