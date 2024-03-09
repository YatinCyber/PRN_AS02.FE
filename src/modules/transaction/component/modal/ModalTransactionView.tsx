import { RentingTransObject } from '@/types/@car-store/rentingTransObject';
import { FocusModal, Heading, Table, Text } from '@medusajs/ui'
import moment from 'moment';
import React from 'react'

type Props = {
	trans?: RentingTransObject;
  setOpen?: (open:boolean) => void;
  open?: boolean;
}

const ModalTransactionView = ({
	trans, open, setOpen 
}: Props) => {
	return (
		<FocusModal open={open} onOpenChange={setOpen}>
		<FocusModal.Content className="z-[10010]">
			<FocusModal.Header></FocusModal.Header>
			<FocusModal.Body className="flex flex-col items-center py-16">
				<div className="w-full flex flex-col justify-center p-16 gap-6">
					<Heading className="text-center">Transaction information</Heading>
					<div>
						<Text>Customer Name : {trans?.customerName}</Text>
						<Text>Renting Date : {moment(trans?.rentingDate).format("DD/MM/YYYY")}</Text>
						<Text>Total price : {trans?.totalPrice}</Text>
					</div>
					<Table className="my-2">
						<Table.Header>
							<Table.HeaderCell className=''>No.</Table.HeaderCell>
							<Table.HeaderCell>Car name</Table.HeaderCell>
							<Table.HeaderCell>Start Date</Table.HeaderCell>
							<Table.HeaderCell>End Date</Table.HeaderCell>
							<Table.HeaderCell>Price</Table.HeaderCell>
						</Table.Header>
						<Table.Body>
							{trans?.rentingDetails?.map((t,i)=> (
							<Table.Row>
								<Table.Cell>
									{i + 1}
								</Table.Cell>
								<Table.Cell>
									{t.carName}
								</Table.Cell>
								<Table.Cell>
									{moment(t.startDate).format("DD/MM/YYYY")}
								</Table.Cell>
								<Table.Cell>
									{moment(t.endDate).format("DD/MM/YYYY")}
								</Table.Cell>
								<Table.Cell>
									{t.price}
								</Table.Cell>

							</Table.Row>
							))}
						</Table.Body>
					</Table>
				</div>
			</FocusModal.Body>
		</FocusModal.Content>
	</FocusModal>
	)
}

export default ModalTransactionView
