import {AnyAction} from "@reduxjs/toolkit";
import {Dispatch} from "react";

export type ImgUploadItemProps = {
    dispatch: Dispatch<AnyAction>;
    image?: string;
    size?: string;
    title?: string;
};
