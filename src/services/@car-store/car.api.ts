import axiosClient from "@/base/service/axiosClient";
import { CarObject } from "@/types/@car-store/carObject";
import { PagingResponse } from "@/types/@car-store/common/pagingResponse";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { apiEndpoints } from ".";
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

export const CarApi = {
		getAll :async (params : CarGetParams) : Promise<PagingResponse<CarObject>> => {
			const response = axiosClient.get<PagingResponse<CarObject>>(apiEndpoints.Car, {
				params: {
					"PagingQuery.PageNumber" : (params?.paging?.pageIndex??0) + 1,
					"PagingQuery.PageSize" : params?.paging?.pageSize??10,
					"KeySearch" : params.keyword,
					...(params?.["group"] ? {"CategoryId": params?.["group"]} : {} )
				}
			})
			return (await response).data
		},
		getDetail: async (id: string | number ) : Promise <CarObject> => {
			const response = await axiosClient.get<CarObject>(apiEndpoints.Car+"/"+id, {
		});
		return response.data;
		},
		create : async (payload:CarObject): Promise<boolean> => {
			const response = await axiosClient.post<boolean>(apiEndpoints.Car,payload);
			return response.data;
		},
		delete : async (id: string | number ) : Promise <boolean> => {
			try{

				await axiosClient.delete<void>(apiEndpoints.Car+"/"+id, {
				});
				return true
			}
			catch(e){
				console.error(e);
				return false;
			}
		},
		update :  async (payload:CarObject): Promise<any> => {
			const response = await axiosClient.put<any>(apiEndpoints.Car+"/"+payload.carId,payload);
			return response.data;
		},
}
