import { UseMutationOptions, useMutation, useQueryClient } from 'react-query';
import { CarApi } from '../car.api';


const useDeleteCar = (options?: Omit<UseMutationOptions, 'mutationFn'>) => {
	const queryClient = useQueryClient();
	return useMutation(CarApi.delete,{... options as any,
		onSuccess: () => {
			queryClient.invalidateQueries("cars");
		},
	})
}

export default useDeleteCar
