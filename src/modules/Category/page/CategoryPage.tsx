import useCarsData from "@/services/@car-store/hook/useCarsData";

import { Plus } from "@medusajs/icons";
import { Button, DropdownMenu, Input, Prompt } from "@medusajs/ui";
import PharmacyTable from "@ui/common/table/PharmacyTable";
import { ReactNode, useState } from "react";
import useCategoryTable from "../hook/useCategoryTable";
import ModalViewDetailCar from "../component/modal/ModalViewDetailCar";
import useDeleteCar from "@/services/@car-store/hook/useDeleteCar";
import ModalManipulateCar from "../component/modal/ModalManipulateCar";
import { CategoryResponse } from "@/types/@flower/categoryResponse";
import useCategoriesData from "@/services/@flower/hook/useCategoriesData";

const CategoryPage = () => {
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
	const [modalView, setModalView] = useState<{open:boolean, category?: CategoryResponse}>({
		open :false,
	})
	const [modalMani, setModalMani] = useState<{open:boolean, category?: CategoryResponse, mode: "edit" | "new"}>({
		open :false,
		mode: "new"
	})
  const [openDrawer, setOpenDrawer] = useState<{
    open: boolean;
    purpose?: string;
  }>({
    open: false,
  });
	const {mutateAsync: deleteCar} = useDeleteCar()
  const [openCreate, setOpenCreate] = useState(false);
  const handleCloseModalCreate = () => {
    setOpenCreate(false);
  };
  const handleOpenModalCreate = () => {
    setOpenCreate(true);
  };
	const handleClosePrompt = () => {
    setPromptState({
      open: false,
    });
  };
  const { columns } = useCategoryTable({
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
							await deleteCar(id);
							handleClosePrompt();
						},
						variant: "danger",
					},
				],
			});
		},
		handleEditClick: (category) => {
			setModalMani({
				open: true,
				mode: "edit",
				category : category
			})
		},
		handleViewClick: (category) => {
			setModalView({
				open: true,
				category:  category
			})
		},
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
  } = useCategoriesData();

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
              <Button className="rounded-b-none py-2 border-none focus:!shadow-none" 
							>
                Add new car<Plus />
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
                Add Car
              </DropdownMenu.Item>

            </DropdownMenu.Content>
          </DropdownMenu>
        </div>
        <PharmacyTable<CategoryResponse>
          className="rounded-md bg-white relative rounded-tr-none shadow-md"
          tableHeader={
            <div className="w-[300px] bg-white px-2 py-4">
              <Input
                type="search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
								placeholder="Searching car..."
              />
            </div>
          }
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
			{/* <ModalViewDetailCar open={modalView.open} car={modalView.category} setOpen={(open)=>{
				setModalView({
					...modalView, 
					open
				})
			}}/>
			
			<ModalManipulateCar 
			mode={modalMani.mode}
			setOpen={(open)=>{
				setModalMani({
					...modalMani,
					category: null as any,
					mode: "new",
					open
				})
			}} car={modalMani.category} open={modalMani.open}/>
   */}
    </div>
  );
};

export default CategoryPage;
