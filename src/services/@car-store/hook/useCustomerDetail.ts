import React from 'react'
import { useQuery } from 'react-query'
import { CustomerApi } from '../customer.api'

type Props = {
	id : number | string
}

const useCustomerDetail = ({id}: Props) => {
	const getProductUnitDetailFunction = async () => {
    const response = await CustomerApi.getDetail(id);
    return response;
  };

  const query = useQuery(
    ["customerDetail", id],
    getProductUnitDetailFunction,
    {
			enabled: !!id
		}
  );

	return (
		query
	)
}

export default useCustomerDetail
