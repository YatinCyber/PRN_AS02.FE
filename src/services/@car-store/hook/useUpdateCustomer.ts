import React from 'react'
import { UseMutationOptions, useMutation, useQueryClient } from 'react-query';
import { CustomerApi } from '../customer.api';



const useUpdateCustomer = (options?: Omit<UseMutationOptions, 'mutationFn'>) => {
	const queryClient = useQueryClient();
	return useMutation(CustomerApi.update,{... options as any, 
		onSuccess: () => {
			queryClient.invalidateQueries("customers");
		},
	})
}

export default useUpdateCustomer
