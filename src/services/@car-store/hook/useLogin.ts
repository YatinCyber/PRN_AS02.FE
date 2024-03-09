import React from 'react'
import { UseMutationOptions, useMutation, useQueryClient } from 'react-query';
import { AuthApi } from '../auth.api';
import { useNavigate } from 'react-router-dom';



const useLogin = (options?: Omit<UseMutationOptions, 'mutationFn'>) => {
	const queryClient = useQueryClient();
	const LOCAlSTORAGE_TOKEN_KEY = "access_token";
  const setToken = (token: string) => {
    localStorage.setItem(LOCAlSTORAGE_TOKEN_KEY, JSON.stringify(token));
  };
	const nav = useNavigate()
	return useMutation(AuthApi.login,{... options as any, 
		onSuccess: (data: any) => {
			console.log({
				loginData: data
			})
			if(data?.data?.accessToken) {
				setToken(data?.data?.accessToken)
				nav("/category")
			}
		},
	})
}

export default useLogin

