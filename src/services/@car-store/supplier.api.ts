import axiosClient from "@/base/service/axiosClient";
import { CarObject } from "@/types/@car-store/carObject";
import { PagingResponse } from "@/types/@car-store/common/pagingResponse";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { apiEndpoints } from ".";
import { CustomerObject } from "@/types/@car-store/customerObject";
import { ManufacturerObject } from "@/types/@car-store/manufacturerObject";
import { SupplierObject } from "@/types/@car-store/supplierObject";
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

export const SupplierApi = {
		getAll :async (params : GetParams) : Promise<PagingResponse<SupplierObject>> => {
			const response = axiosClient.get<PagingResponse<SupplierObject>>(apiEndpoints.Supplier, {
				params: {
					"PagingQuery.PageNumber" : params?.paging?.pageIndex??0 + 1,
					"PagingQuery.PageSize" : params?.paging?.pageSize??10,
					"KeySearch" : params.keyword,
				}
			})
			return (await response).data
		}
}
