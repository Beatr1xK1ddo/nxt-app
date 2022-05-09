// type updateSearchParamsHandler = (key: string, value: any, forceFalseValues?: boolean) => URLSearchParams;

export function searchParamsHandler(urlSearchParams: string) {
    const searchParams = new URLSearchParams(urlSearchParams);
    function updateSearchParams(key: string, value: any, forceFalseValues?: boolean): URLSearchParams {
        if (value || forceFalseValues) {
            searchParams.set(key, value.toString());
        } else {
            searchParams.delete(key);
        }
        return searchParams;
    }
    return {
        searchParams,
        updateSearchParams,
    };
}
