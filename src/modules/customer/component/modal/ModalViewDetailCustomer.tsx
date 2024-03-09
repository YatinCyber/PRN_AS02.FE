import { CustomerObject } from "@/types/@car-store/customerObject";
import { FocusModal, Heading, Table } from "@medusajs/ui";
import moment from "moment";
import React from "react";

type Props = {
  customer?: CustomerObject;
  setOpen?: (open:boolean) => void;
  open?: boolean;
};

const ModalViewDetailCustomer = ({ customer, open, setOpen }: Props) => {
  return (
    <FocusModal open={open} onOpenChange={setOpen}>
      <FocusModal.Content className="z-[10010]">
        <FocusModal.Header></FocusModal.Header>
        <FocusModal.Body className="flex flex-col items-center py-16">
          <div className="w-full flex flex-col justify-center p-16">
            <Heading className="text-center">Customer information</Heading>
            <Table className="my-2">
              <Table.Body>
                <Table.Row>
                  <Table.Cell className="!pl-0 font-semibold">
                    Customer Id
                  </Table.Cell>
                  <Table.Cell>{customer?.customerId}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="!pl-0 font-semibold">
                    Customer Name
                  </Table.Cell>
                  <Table.Cell>{customer?.customerName}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="!pl-0 font-semibold">
                    Telephone
                  </Table.Cell>
                  <Table.Cell>{customer?.telephone}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="!pl-0 font-semibold">Email</Table.Cell>
                  <Table.Cell>{customer?.email}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="!pl-0 font-semibold">
                    Customer birthday
                  </Table.Cell>
                  <Table.Cell>
                    {moment(customer?.customerBirthday).format("DD/MM/YYYY")}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </FocusModal.Body>
      </FocusModal.Content>
    </FocusModal>
  );
};

export default ModalViewDetailCustomer;
