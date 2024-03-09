import axiosClient from "@/base/service/axiosClient";
import { CarObject } from "@/types/@car-store/carObject";
import { PagingResponse } from "@/types/@car-store/common/pagingResponse";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { apiEndpoints } from ".";
import { CustomerObject } from "@/types/@car-store/customerObject";
interface CustomerGetParams {
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

export const CustomerApi = {
		getAll :async (params : CustomerGetParams) : Promise<PagingResponse<CustomerObject>> => {
			const response = axiosClient.get<PagingResponse<CustomerObject>>(apiEndpoints.Customer, {
				params: {
					"PagingQuery.PageNumber" : (params?.paging?.pageIndex??0) + 1,
					"PagingQuery.PageSize" : params?.paging?.pageSize??10,
					"KeySearch" : params.keyword,
				}
			})
			return (await response).data
		},
		getDetail: async (id: string | number ) : Promise <CustomerObject> => {
			const response = await axiosClient.get<CustomerObject>(apiEndpoints.Customer+"/"+id, {
		});
		return response.data;
		},
		create : async (payload:CustomerObject): Promise<boolean> => {
			const response = await axiosClient.post<boolean>(apiEndpoints.Customer,payload);
			return response.data;
		},
		delete : async (id: string | number ) : Promise <boolean> => {
			try{

				await axiosClient.delete<void>(apiEndpoints.Customer+"/"+id, {
				});
				return true
			}
			catch(e){
				console.error(e);
				return false;
			}
		},
		update : async (payload:CustomerObject): Promise<any> => {
			const response = await axiosClient.put<any>(apiEndpoints.Customer+"/"+payload.customerId,payload);
			return response.data;
		},
}
