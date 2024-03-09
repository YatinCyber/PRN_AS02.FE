import React from 'react'
import { UseMutationOptions, useMutation, useQueryClient } from 'react-query';
import { CarApi } from '../car.api';



const useUpdateCar = (options?: Omit<UseMutationOptions, 'mutationFn'>) => {
	const queryClient = useQueryClient();
	return useMutation(CarApi.update,{... options as any, 
		onSuccess: () => {
			queryClient.invalidateQueries("cars");
		},
	})
}

export default useUpdateCar


