import axiosClient from "@/base/service/axiosClient";
import { apiEndpoints } from ".";
interface AuthObject { 
	username: string,
	password: string
}

export const AuthApi = {
	
	login : async (payload:AuthObject): Promise<any> => {
		const response = await axiosClient.post<any>(apiEndpoints.Login,payload);
		return response.data;
	},

}
