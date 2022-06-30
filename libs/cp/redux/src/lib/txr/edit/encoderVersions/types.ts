export type IApplicationEncoderVersions = {
    values: Array<string>;
    keys: Array<string>;
};

export interface IEncoderVersion {
    avds2: IApplicationEncoderVersions | null;
    txr: IApplicationEncoderVersions | null;
    sdi2web: IApplicationEncoderVersions | null;
}
