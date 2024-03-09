export interface GetListBaseRequest {
    keySearch: string | null;
    pagingQuery: PagingQuery;
    orderBy: string | null;
}