import {EDataProcessingStatus} from "@nxt-ui/cp/types";

export type IApplicationEncoderVersions = {
    values: Array<string>;
    keys: Array<string>;
};

export interface IEncoderVersion {
    values: {
        avds2: IApplicationEncoderVersions | null;
        ipbe: IApplicationEncoderVersions | null;
        sdi2web: IApplicationEncoderVersions | null;
    };
    status: EDataProcessingStatus;
}
