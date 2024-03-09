import useCustomersData from '@/services/@car-store/hook/useCustomersData';
import { CustomerObject } from '@/types/@car-store/customerObject';
import { Plus } from '@medusajs/icons';
import { Button, DropdownMenu, Input, Prompt } from '@medusajs/ui';
import PharmacyTable from '@ui/common/table/PharmacyTable';
import React, { ReactNode, useState } from 'react'
import useCustomerTable from '../hook/useCustomerTable';
import useCreateCutomer from '@/services/@car-store/hook/useCreateCutomer';
import useDeleteCustomer from '@/services/@car-store/hook/useDeleteCustomer';
import useCustomerDetail from '@/services/@car-store/hook/useCustomerDetail';
import ModalViewDetailCustomer from '../component/modal/ModalViewDetailCustomer';
import ModalManipulateCustomer from '../component/modal/ModalManipulateCustomer';

const AdminCustomePage = () => {

	const [promptState, setPromptState] = useState<{
    open: boolean;
    title?: string | ReactNode;
    description?: string | ReactNode;
    actionButtons?: {
      content: string | ReactNode;
      handler: () => void;
      className?: string;
      variant?: "primary" | "secondary" | "transparent" | "danger";
    }[];
  }>({
    open: false,
  });
	const [id, setId] = useState<string|number>();
	const [modalView, setModalView] = useState<{open:boolean, customer?: CustomerObject}>({
		open :false,
	})
	const [modalMani, setModalMani] = useState<{open:boolean, customer?: CustomerObject, mode: "edit" | "new"}>({
		open :false,
		mode: "new"
	})
	// ==== QUERY HOOK ===== //
	const {mutateAsync: createCustomer} = useCreateCutomer({
		
	});
	const {mutateAsync: deleteCustomer} = useDeleteCustomer();
	const {data} = useCustomerDetail({
			id: id!
	});
		// ==== ========== ===== //

	const handleClosePrompt = () => {
    setPromptState({
      open: false,
    });
  };
	const [openDrawer, setOpenDrawer] = useState<{
    open: boolean;
    purpose?: string;
  }>({
    open: false,
  });

	const [openCreate, setOpenCreate] = useState(false)
	const handleCloseModalCreate = ()=>{
		setOpenCreate(false)
	}
	const handleOpenModalCreate = ()=>{
		setOpenCreate(true)
	}

	const {columns} = useCustomerTable({
		handleDeleteClick: (id) => {
			setPromptState({
				open: true,
				title: "Confirm",
				description: "Are you sure to remove this customer permanently?",
				actionButtons: [
					{
						content: "Cancel",
						handler: () => {
							handleClosePrompt();
						},
						variant: "secondary",
					},
					{
						content: "Delete",
						handler: async() => {
							// Remove\
							await deleteCustomer(id);
							handleClosePrompt();
						},
						variant: "danger",
					},
				],
			});
		},
		handleEditClick: (customer) => {
			setModalMani({
				open: true,
				mode: "edit",
				customer : customer
			})
		},
		handleViewClick: (customer) => {
			setModalView({
				open: true,
				customer:  customer
			})
		},
	});
	const {
		data: carsData, setSortState, setPagination, setKeyword,totalRows, keyword,
		isLoading,setFilter
	} = useCustomersData()

	
  
  return (
    <div className="flex gap-4 w-full">
      <div className="px-6 py-8 grow shrink basis-auto">
        {/* FILTER */}
        {/* <ProductListFilter handleOpenFilterDrawer={openFilterDrawer} /> */}
        {/* TABLE */}
        {/* <MainCard className="mt-4 rounded-md"> */}
        <div className="shrink-0 grow-0 w-full flex justify-end -translate-x-[2px]">
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              {/* <IconButton>
									<EllipsisHorizontal />
								</IconButton> */}
              <Button className="rounded-b-none py-2 border-none focus:!shadow-none" >
                Add new <Plus />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item
                className="gap-x-2 font-medium"
                onClick={()=>{
									setModalMani({
										mode :"new",
										open :true
									})
								}}>
                Add customer
              </DropdownMenu.Item>
            
            </DropdownMenu.Content>
          </DropdownMenu>
        </div>
        <PharmacyTable<CustomerObject>
          className="rounded-md bg-white relative rounded-tr-none shadow-md"
					tableHeader={
            <div className="w-[300px] bg-white px-2 py-4">
              <Input
                type="search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
								placeholder="Searching customer..."
              />
            </div>
          }
          columns={columns}
          data={carsData?? []}
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
			<Prompt open={promptState.open}>
        <Prompt.Content className="z-[1001]">
          <Prompt.Header>
            <Prompt.Title>{promptState?.title}</Prompt.Title>
            <Prompt.Description>{promptState?.description}</Prompt.Description>
          </Prompt.Header>
          <Prompt.Footer>
            {promptState.actionButtons?.map((button, i) => (
              <Button
                key={i}
                variant={button?.variant}
                onClick={button.handler}
                className={button?.className}>
                {button.content}
              </Button>
            ))}
          </Prompt.Footer>
        </Prompt.Content>
      </Prompt>
			<ModalViewDetailCustomer open={modalView.open} customer={modalView.customer} setOpen={(open)=>{
				setModalView({
					...modalView, 
					open
				})
			}}/>
			<ModalManipulateCustomer 
			mode={modalMani.mode}
			setOpen={(open)=>{
				setModalMani({
					...modalMani,
					customer: null as any,
					mode: "new",
					open
				})
			}} customer={modalMani.customer} open={modalMani.open}/>
    </div>
  );
}

export default AdminCustomePage
