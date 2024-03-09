import { CarObject } from "@/types/@car-store/carObject";
import { CustomerObject } from "@/types/@car-store/customerObject";
import { FocusModal, Heading, Table } from "@medusajs/ui";
import moment from "moment";
import React from "react";

type Props = {
  car?:CarObject;
  setOpen?: (open:boolean) => void;
  open?: boolean;
};

const ModalViewDetailCar = ({ car, open, setOpen }: Props) => {
  return (
    <FocusModal open={open} onOpenChange={setOpen}>
      <FocusModal.Content className="z-[10010]">
        <FocusModal.Header></FocusModal.Header>
        <FocusModal.Body className="flex flex-col items-center py-16">
          <div className="w-full flex flex-col justify-center p-16">
            <Heading className="text-center">Car information</Heading>
            <Table className="my-2">
              <Table.Body>
                <Table.Row>
                  <Table.Cell className="!pl-0 font-semibold">
                    Car Id
                  </Table.Cell>
                  <Table.Cell>{car?.carId}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="!pl-0 font-semibold">
                     Name
                  </Table.Cell>
                  <Table.Cell>{car?.carName}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="!pl-0 font-semibold">
                    Fuel Type
                  </Table.Cell>
                  <Table.Cell>{car?.fuelType}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="!pl-0 font-semibold">Number Of Doors</Table.Cell>
                  <Table.Cell>{car?.numberOfDoors}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="!pl-0 font-semibold">
									Seating Capacity
                  </Table.Cell>
                  <Table.Cell>
                    {car?.seatingCapacity}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="!pl-0 font-semibold">
									Year
                  </Table.Cell>
                  <Table.Cell>
                    {moment(car?.year).format("DD/MM/YYYY")}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="!pl-0 font-semibold">
									Manufacturer
                  </Table.Cell>
                  <Table.Cell>
                    {car?.manufacturer?.manufacturerName}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="!pl-0 font-semibold">
									Year
                  </Table.Cell>
                  <Table.Cell>
									{car?.supplier?.supplierName}
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

export default ModalViewDetailCar;
