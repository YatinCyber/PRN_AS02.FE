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
import useUpdateCustomer from "@/services/@car-store/hook/useUpdateCustomer";
import { CircleDottedLine } from "@medusajs/icons";
type Props = {
  customer?: CustomerObject;
  setOpen?: (open: boolean) => void;
  open?: boolean;
  mode: "edit" | "new";
};

const ModalManipulateCustomer = ({ customer, open, setOpen, mode }: Props) => {
  const { mutateAsync: createCustomer, isLoading :isLoading1 } = useCreateCutomer({});
  const { mutateAsync: updateCustomer, isLoading:isLoading2 } = useUpdateCustomer({});
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<CustomerObject>({
    //@ts-ignore
    ...(mode == "edit"
      ? {
          values: {
            ...customer,
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

              await createCustomer(data as any);
              setOpen?.(false);
            } else {
              // handleUpdate?.(data as any);
              await updateCustomer(data);
              setOpen?.(false);
            }
          })}>
          <FocusModal.Header>
            <Button type="submit" disabled={isLoading1 || isLoading2}>
              Save{" "}
              {isLoading1 ||
                (isLoading2 && <CircleDottedLine className="animate-spin" />)}
            </Button>
          </FocusModal.Header>
          <FocusModal.Body className="flex flex-col items-center py-16 gap-4">
            <Heading>
              {mode === "edit"
                ? "Update customer information"
                : "Create new customer"}
            </Heading>
            <div className="w-[300px]">
              <Input
                type="text"
                placeholder="Name"
                {...register("customerName")}></Input>
            </div>
            <div className="w-[300px]">
              <Input
                type="tel"
                placeholder="Phone"
                {...register("telephone")}></Input>
            </div>
            <div className="w-[300px]">
              <Input
                type="email"
                placeholder="Email"
                {...register("email")}></Input>
            </div>
            <div className="w-[300px]">
              <DatePicker
                className="z-[20000]!"
                defaultValue={
                  mode === "edit"
                    ? new Date(customer?.customerBirthday as string)
                    : new Date()
                }
                onChange={(val) => setValue("customerBirthday", val as Date)}
              />
            </div>
            <div className="w-[300px]">
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}></Input>
            </div>
          </FocusModal.Body>
        </form>
      </FocusModal.Content>
    </FocusModal>
  );
};

export default ModalManipulateCustomer;
