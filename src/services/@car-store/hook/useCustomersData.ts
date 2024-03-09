import React from 'react'

import { PaginationState, SortingState } from '@tanstack/react-table';
import { useState } from 'react'
import { CarApi } from '../car.api';
import { useQuery } from 'react-query';
import { CustomerApi } from '../customer.api';

const useCustomersData = () => {
	const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sortState, setSortState] = useState<SortingState>([]);
  const [keyword, setKeyword] = useState<string>();
  const [totalRows, setTotalRows] = useState<number>(0);
	const [filter, setFilter] = useState({});
  const fetchProductDataFunction = async () => {
    try {
      const response = await CustomerApi.getAll({
        paging: pagination, // Pass the pagination state
        sort: sortState, // Pass the sort state
        keyword, // Pass the keyword
      });
      console.log(response);

      setTotalRows(response?.totalCount ?? 0);
      // Return the data from the response
      return response?.data??[];
			// return []
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  // TODO: use debounce technique to prevent many calls at a short time
  const queryKey = ["customers", pagination, sortState, keyword];

  const query = useQuery(
    queryKey,
    fetchProductDataFunction,
    {
      onError: (err) => console.log("error at hook", err),
    }
  );



	return ({
		...query,
		setSortState,
    setKeyword,
    setPagination,
		setFilter,
		keyword,
		totalRows,
	}
	)
}

export default useCustomersData