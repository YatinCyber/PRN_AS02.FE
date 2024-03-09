import { UseMutationOptions, useMutation, useQueryClient } from 'react-query';
import { CarApi } from '../car.api';

const useCreateCar = (options?: Omit<UseMutationOptions, 'mutationFn'>) => {
	const queryClient = useQueryClient();
	return useMutation(CarApi.create,{... options as any, 
		onSuccess: () => {
			queryClient.invalidateQueries("cars");
		},
	})
}

export default useCreateCar
