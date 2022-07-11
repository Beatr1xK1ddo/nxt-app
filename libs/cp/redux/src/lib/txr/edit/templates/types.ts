import {ITxrEditMain} from "../main/types";

export interface ITxrTemplatesData {
    id: string;
    name: string;
    app: string;
    data: string;
}

export interface ITxrTemplates {
    [key: string]: ITxrEditMain;
}
