//@ts-ignore
export const getIpbeListSelectors = (state, selectors, sliceName?) => {
    const select = sliceName ? state[sliceName] : state;
    return {
        selectIpbeListFilter: () => selectors.selectIpbeListFilter(select),
        selectIpbeListPagination: () => selectors.selectIpbeListPagination(select),
        selectIpbeListViewMode: () => selectors.selectIpbeListViewMode(select),
        selectIpbeListItems: () => selectors.selectIpbeListItems(select),
        selectIpbeListStatus: () => selectors.selectIpbeListStatus(select),
        selectIpbeListAction: () => selectors.selectIpbeListAction(select),
        selectIpbeListSelected: () => selectors.selectIpbeListSelected(select),
    };
};
