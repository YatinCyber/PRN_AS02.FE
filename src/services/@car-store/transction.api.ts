import axiosClient from "@/base/service/axiosClient";
import { PagingResponse } from "@/types/@car-store/common/pagingResponse";
import { RentingTransObject } from "@/types/@car-store/rentingTransObject";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { apiEndpoints } from ".";
interface GetParams {
  paging?: PaginationState;
  sort?: SortingState;
  keyword?: string;
	group?: string;
	provider?: string;
	createdDate?: {
		from?: Date;
		to?:Date
	}
  // filter :
}

export const TransactionApi = {
		getAll :async (params : GetParams) : Promise<PagingResponse<RentingTransObject>> => {
			const response = axiosClient.get<PagingResponse<RentingTransObject>>(apiEndpoints.Transaction, {
				params: {
					"PagingQuery.PageNumber" : (params?.paging?.pageIndex??0) + 1,
					"PagingQuery.PageSize" : params?.paging?.pageSize??10,
					"KeySearch" : params.keyword,
				}
			})
			return (await response).data
		}
}
