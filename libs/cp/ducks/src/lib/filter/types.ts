export type IFilterState = {
    "ipbe_filter[company]"?: string;
    "ipbe_filter[name]"?: string;
    "ipbe_filter[timecode]"?: string;
    "ipbe_filter[node]"?: string;
    "ipbe_filter[status]"?: string;
    "ipbe_filter[itemsPerPage]": string;
    page: string;
};

export enum IFilters {
    name = "ipbe_filter[name]",
    company = "ipbe_filter[company]",
    timecode = "ipbe_filter[timecode]",
    node = "ipbe_filter[node]",
    status = "ipbe_filter[status]",
    itemsPerPage = "ipbe_filter[itemsPerPage]",
    page = "page",
}

export enum EItemsPerPage {
    all = "all",
    fifty = "50",
    hundred = "100",
    threHundred = "300",
}
