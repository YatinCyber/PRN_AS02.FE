import React from 'react'
import { UseMutationOptions, useMutation, useQueryClient } from 'react-query'
import { CustomerApi } from '../customer.api'


const useDeleteCustomer = (options?: Omit<UseMutationOptions, 'mutationFn'>) => {
	const queryClient = useQueryClient();
	return useMutation(CustomerApi.delete,{... options as any,
		onSuccess: () => {
			queryClient.invalidateQueries("customers");
		},
	})
}

export default useDeleteCustomer
