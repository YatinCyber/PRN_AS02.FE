import useTransactionData from "@/services/@car-store/hook/useTransactionData";
import { RentingTransObject } from "@/types/@car-store/rentingTransObject";
import PharmacyTable from "@ui/common/table/PharmacyTable";
import { useState } from "react";
import ModalTransactionView from "../component/modal/ModalTransactionView";
import useTransactionTable from "../hook/useTransactionTable";

const AdminTransactionPage = () => {
  const [openDrawer, setOpenDrawer] = useState<{
    open: boolean;
    purpose?: string;
  }>({
    open: false,
  });
  const [modalView, setModalView] = useState<{
    open: boolean;
    trans?: RentingTransObject;
  }>({
    open: false,
  });
  const [openCreate, setOpenCreate] = useState(false);
  const handleCloseModalCreate = () => {
    setOpenCreate(false);
  };
  const handleOpenModalCreate = () => {
    setOpenCreate(true);
  };

  const { columns } = useTransactionTable({
		handleViewClick : (trans) => {
			setModalView({
				open : true,
				trans
			})
		}
	});
  const {
    data: carsData,
    setSortState,
    setPagination,
    setKeyword,
    totalRows,
    keyword,
    isLoading,
    setFilter,
  } = useTransactionData();

  return (
    <div className="flex gap-4 w-full">
      <div className="px-6 py-8 grow shrink basis-auto">
        {/* FILTER */}
        {/* <ProductListFilter handleOpenFilterDrawer={openFilterDrawer} /> */}
        {/* TABLE */}
        {/* <MainCard className="mt-4 rounded-md"> */}

        <PharmacyTable<RentingTransObject>
          className="rounded-md bg-white relative rounded-tr-none shadow-md"
          columns={columns}
          data={carsData ?? []}
          totalRows={totalRows}
          onPaginationChange={(pagination) => {
            setPagination(pagination);
          }}
          isLoading={isLoading}
          // onRowSelectedChange={(rows) => setSelectionRows(rows)}
          onSearchKeywordChange={(q) => setKeyword(q)}
          onSortByChange={(sort) => setSortState(sort)}
        />
        {/* </MainCard> */}
      </div>
      <ModalTransactionView
        open={modalView.open}
        trans={modalView.trans}
        setOpen={(open) => {
          setModalView({
            open,
          });
        }}
      />
      {/* <ProductCreateModal handleClose={handleCloseModalCreate}  open={openCreate}/> */}
    </div>
  );
};

export default AdminTransactionPage;
