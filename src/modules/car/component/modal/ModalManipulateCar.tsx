/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import {
  Button,
  DatePicker,
  FocusModal,
  Heading,
  Input,
  Table,
} from "@medusajs/ui";
import { CustomerObject } from "@/types/@car-store/customerObject";
import { useForm } from "react-hook-form";
import useCreateCutomer from "@/services/@car-store/hook/useCreateCutomer";
import { CarObject } from "@/types/@car-store/carObject";
import useCreateCar from "@/services/@car-store/hook/useCreateCar";
import { Autocomplete, TextField } from "@mui/material";
import useManufacturersData from "@/services/@car-store/hook/useManufacturersData";
import useSuppliersData from "@/services/@car-store/hook/useSuppliersData";
import useUpdateCar from "@/services/@car-store/hook/useUpdateCar";
type Props = {
  car?: CarObject;
  setOpen?: (open: boolean) => void;
  open?: boolean;
  mode: "edit" | "new";
};

const ModalManipulateCar = ({ car, open, setOpen, mode }: Props) => {
  const { mutateAsync: createCar, isLoading: isLoading1 } = useCreateCar({});
  const { mutateAsync: updateCar, isLoading: isLoading2 } = useUpdateCar({});
  const {
    data: manus,
    keyword: manuKeyword,
    setKeyword: setManuKeyword,
  } = useManufacturersData();
  const {
    data: suppliers,
    keyword: supplierKeyword,
    setKeyword: setSupplierKeyword,
  } = useSuppliersData();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
		getValues
  } = useForm<CarObject>({
    //@ts-ignore
    ...(mode == "edit"
      ? {
          values: {
            ...car,
          },
        }
      : {}),
  });
  return (
    <FocusModal open={open} onOpenChange={setOpen}>
      <FocusModal.Content className="z-[10010]">
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(async (data) => {
            console.log({ data, mode });
            if (mode === "new") {
              console.log("here");

              await createCar(data as any);
              setOpen?.(false);
            } else {
							await updateCar(data)
              setOpen?.(false);
							// console.log(data)
              // handleUpdate?.(data as any);
            }
          })}>
          <FocusModal.Header>
            <Button type="submit" disabled={isLoading1 || isLoading2}>Save {
							
							isLoading1 || isLoading2 && <CircleDottedLine className='animate-spin'/>
							
						} </Button>
          </FocusModal.Header>
          <FocusModal.Body className="flex flex-col items-center py-16 gap-4">
            <Heading>
              {mode === "edit"
                ? "Update car information"
                : "Create new car"}
            </Heading>
            <div className="w-[300px]">
              <Input
                type="text"
                placeholder="Name"
                {...register("carName")}></Input>
            </div>
            <div className="w-[300px]">
              <Input
                type="number"
                placeholder="Price Per Day"
                {...register("carRentingPricePerDay")}></Input>
            </div>
            <div className="w-[300px]">
              <Input
                type="text"
                placeholder="Fuel Type"
                {...register("fuelType")}></Input>
            </div>
            <div className="w-[300px]">
              <Input
                type="number"
                placeholder="Seating Capacity"
                {...register("seatingCapacity")}></Input>
            </div>
            <div className="w-[300px]">
              <Input
                type="number"
                placeholder="No of Doors"
                {...register("numberOfDoors")}></Input>
            </div>
            <div className="w-[300px]">
              <Input
                type="number"
                placeholder="Year"
                {...register("year")}></Input>
            </div>
            <div className="w-[300px]">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                filterOptions={(x) => x?.filter((x) => x)}
                options={manus?.map((d) => ({
                  ...d,
                  label: d?.manufacturerName,
                }))}
                sx={{ width: 300 }}
                onChange={(e, selectedcategory) => {
                  // setSelected(selectedcategory)
									setValue("manufacturerId", selectedcategory?.manufacturerId??0)
                }}
								defaultValue={manus?.map((d) => ({
                  ...d,
                  label: d?.manufacturerName,
                }))?.find(m => m.manufacturerId == getValues("manufacturerId"))}
                renderInput={(params) => (
                  <TextField
                    value={manuKeyword}
                    onChange={(e) => setManuKeyword(e.target.value)}
                    {...params}
                    placeholder="Manufacturer"
                  />
                )}
              />
            </div>
            <div className="w-[300px]">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                filterOptions={(x) => x?.filter((x) => x)}
                options={suppliers?.map((d) => ({
                  ...d,
                  label: d?.supplierName,
                }))}
                sx={{ width: 300 }}
                onChange={(e, selectedSup) => {
                  // setSelected(selectedcategory)
									setValue("supplierId", selectedSup?.supplierId??0)
                }}
                renderInput={(params) => (
                  <TextField
                    value={supplierKeyword}
                    onChange={(e) => setSupplierKeyword(e.target.value)}
                    {...params}
                    placeholder="Suppliers"
                  />
                )}
              />
            </div>
          </FocusModal.Body>
        </form>
      </FocusModal.Content>
    </FocusModal>
  );
};

export default ModalManipulateCar;
