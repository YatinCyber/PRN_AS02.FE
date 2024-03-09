import axiosClient from "@/base/service/axiosClient";
import { CarObject } from "@/types/@car-store/carObject";
import { PagingResponse } from "@/types/@car-store/common/pagingResponse";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { apiEndpoints } from ".";
import { CategoryResponse } from "@/types/@flower/categoryResponse";
import { PagingApiResponse } from "@/types/@car-store/common/apiResponse";
interface CarGetParams {
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

export const CategoryApi = {
		getAll :async (params : CarGetParams) : Promise<PagingApiResponse<PagingResponse<CategoryResponse>>> => {
			const response = axiosClient.get<PagingApiResponse<PagingResponse<CategoryResponse>>>(apiEndpoints.Category, {
				params: {
					"PagingQuery.PageNumber" : (params?.paging?.pageIndex??0) + 1,
					"PagingQuery.PageSize" : params?.paging?.pageSize??10,
					"KeySearch" : params.keyword,
					...(params?.["group"] ? {"CategoryId": params?.["group"]} : {} )
				}
			})
			return (await response).data
		},
		getDetail: async (id: string | number ) : Promise <CategoryResponse> => {
			const response = await axiosClient.get<CategoryResponse>(apiEndpoints.Category+"/"+id, {
		});
		return response.data;
		},
		create : async (payload:CategoryResponse): Promise<boolean> => {
			const response = await axiosClient.post<boolean>(apiEndpoints.Category,payload);
			return response.data;
		},
		delete : async (id: string | number ) : Promise <boolean> => {
			try{

				await axiosClient.delete<void>(apiEndpoints.Category+"/"+id, {
				});
				return true
			}
			catch(e){
				console.error(e);
				return false;
			}
		},
		update :  async (payload:CategoryResponse): Promise<any> => {
			const response = await axiosClient.put<any>(apiEndpoints.Category+"/"+payload.categoryId,payload);
			return response.data;
		},
}
