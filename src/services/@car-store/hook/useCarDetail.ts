import React from 'react'
import { useQuery } from 'react-query'
import { CustomerApi } from '../customer.api'
import { CarApi } from '../car.api'

type Props = {
	id : number | string
}

const useCarDetail = ({id}: Props) => {
	const getProductUnitDetailFunction = async () => {
    const response = await CarApi.getDetail(id);
    return response;
  };

  const query = useQuery(
    ["carDetail", id],
    getProductUnitDetailFunction,
    {
			enabled: !!id
		}
  );

	return (
		query
	)
}

export default useCarDetail
