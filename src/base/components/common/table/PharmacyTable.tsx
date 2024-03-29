import { ColumnDef, PaginationState, Row, SortingState } from "@tanstack/react-table";
import ScrollX from "@ui/ScrollX";
import BaseTableV8 from "@ui/common/table/BaseTableV8";
import TablePagination from "@ui/common/table/TablePagination";
import {
  Dispatch,
  ReactElement,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  useEffect,
  useState,
} from "react";

interface Props<T> {
  data: T[];
  totalRows: number;
  renderRowSubComponent?: (row: Row<T>) => ReactElement;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  onPaginationChange?: (pagination: PaginationState) => void;
  onSearchKeywordChange?: (keyword: string) => void;
  onSortByChange?: (sortBy: SortingState) => void;
  // TODO: fix this type later
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRowSelectedChange?: (rows: any[]) => void;
  addButton?: {
    isShown: boolean;
    addButtonHandler: (e: ReactMouseEvent<Element, MouseEvent>) => void;
    buttonContentLangKey: string;
  };
  filter?: {
    isShow: boolean;
    isExpandFilterMenu: boolean;
    setIsExpandFilterMenu: Dispatch<boolean>;
  };
  columnVisibility?: {
    [key: string]: boolean;
  };
  actionComponents?: ReactNode,
	className?: string,
	tableHeader?: ReactNode | JSX.Element,
	isStriped?: boolean;
	isLoading?: boolean;
}
// export type PaginationState = {
//   pageIndex: number;
//   pageSize: number;
// };
// export type SortBy = {
//   colName: string;
//   isDesc: boolean;
// };
function PharmacyTable<T>(props: Props<T>) {
  const {
    data,
    totalRows = 0,
    columns,
    renderRowSubComponent,
    onPaginationChange,
    onRowSelectedChange,
    onSearchKeywordChange,
    onSortByChange,
    columnVisibility,
    addButton = {
      isShown: false,
      buttonContentLangKey: "",
      addButtonHandler: () => console.log,
    },
    filter,
    actionComponents,
		className,
		tableHeader,
		isStriped = true,
		isLoading
  } = props;
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sortBy, setSortBy] = useState<SortingState>();
  const [keyword, setKeyword] = useState<string>();
  const [rowSelected, setRowSelected] = useState();
  const goToPage = (page: number) => {
    setPagination({ ...pagination, pageIndex: page });
  };
  const changePageSize = (size: number) => {
    setPagination({ ...pagination, pageSize: size });
  };
  //========Expose pagination change
  useEffect(() => {
    onPaginationChange?.(pagination);
  }, [pagination]);
  useEffect(() => {
    onRowSelectedChange?.(rowSelected??[]);
  }, [rowSelected]);
  useEffect(() => {
    onSortByChange?.(sortBy??[]);
  }, [sortBy]);
  useEffect(() => {
    onSearchKeywordChange?.(keyword??"");
  }, [keyword]);
  return (
    <ScrollX className={className}>
     {tableHeader}
      <BaseTableV8<T>
        columnVisibility={columnVisibility}
        footer={{ hasFooter: false }}
        columns={columns}
        isMultiSelection={true}
        rowSelected={rowSelected}
        primaryKey="id"
        onSortBy={(colName, isDesc) => {
          setSortBy([{id: colName, desc: isDesc}]);
        }}
        renderRowSubComponent={renderRowSubComponent}
        onRowSelect={(row) => {
          setRowSelected(row);
        }}
        data={data}
      />
      <TablePagination
        gotoPage={goToPage}
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        totalItems={totalRows}
        setPageSize={changePageSize}
      />
    </ScrollX>
  );
}

export default PharmacyTable;
