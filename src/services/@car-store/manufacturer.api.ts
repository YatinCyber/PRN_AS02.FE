import axiosClient from "@/base/service/axiosClient";
import { CarObject } from "@/types/@car-store/carObject";
import { PagingResponse } from "@/types/@car-store/common/pagingResponse";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { apiEndpoints } from ".";
import { CustomerObject } from "@/types/@car-store/customerObject";
import { ManufacturerObject } from "@/types/@car-store/manufacturerObject";
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

export const ManufacturerApi = {
		getAll :async (params : GetParams) : Promise<PagingResponse<ManufacturerObject>> => {
			const response = axiosClient.get<PagingResponse<ManufacturerObject>>(apiEndpoints.Manufacturer, {
				params: {
					"PagingQuery.PageNumber" : params?.paging?.pageIndex??0 + 1,
					"PagingQuery.PageSize" : params?.paging?.pageSize??10,
					"KeySearch" : params.keyword,
				}
			})
			return (await response).data
		}
}
