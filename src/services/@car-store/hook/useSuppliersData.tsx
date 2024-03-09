import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { SupplierApi } from '../supplier.api';
import { PaginationState, SortingState } from '@tanstack/react-table';



const useSuppliersData = () => {
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
      const response = await SupplierApi.getAll({
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
  const queryKey = ["suppliers", pagination, sortState, keyword];

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

export default useSuppliersData
