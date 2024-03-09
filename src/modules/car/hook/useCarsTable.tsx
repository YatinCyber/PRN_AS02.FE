import { IndeterminateCheckbox } from "@/base/components/third-party/ReactTable";
import { CarObject } from "@/types/@car-store/carObject";

import { Eye } from "@medusajs/icons";
import { Badge, Text } from "@medusajs/ui";
import { CloseOutlined, Delete, EditTwoTone } from "@mui/icons-material";
import { Stack, Tooltip, Typography, useTheme } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import IconButton from "@ui/@extended/IconButton";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
interface Props {
	handleDeleteClick : (customerId: string | number)=> void;
	handleEditClick : (customer: CarObject) => void;
	handleViewClick : (customer: CarObject) => void;

}

const useCarsTable = ({handleDeleteClick,handleEditClick, handleViewClick}:Props) => {
	const theme = useTheme();
  const columnHelper = createColumnHelper<CarObject>();
  // const [orderDetail, setOrderDetail] = useState(null);
  const nav = useNavigate();
  const columns = useMemo(
    () => {
      const cols = [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        columnHelper.accessor<any, any>("selection", {
          header: ({
            table: {
              getIsAllRowsSelected,
              getIsSomeRowsSelected,
              getToggleAllRowsSelectedHandler,
            },
          }) => (
            <IndeterminateCheckbox
              {...{
                checked: getIsAllRowsSelected(),
                indeterminate: getIsSomeRowsSelected(),
                onChange: getToggleAllRowsSelectedHandler(),
              }}
            />
          ),
          cell: ({ row }) => (
            <IndeterminateCheckbox
              indeterminate={false}
              checked={row.getIsSelected()}
            />
          ),
          enableSorting: false,
          size: 50,
        }),
				columnHelper.accessor("carId", {
          header: "ID",
          cell: ({ row }) => {
            return (
						<div className="w-[70px]">

              <Typography
                color="CaptionText"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
								className="w-fit"
								>
                {"C"+row.original.carId.toString().padStart(5, "0")}
              </Typography>
							</div>
            );
          },
          meta: {
            align: "left",
          },
        }),
        columnHelper.accessor("carName", {
          header: "Name",
          cell: ({ row }) => {
            return (
              <Stack direction="row" className="w-[150px]" spacing={1.5} alignItems="center">
               
                <Typography variant="subtitle1">
                  {row.original.carName ?? "N/A"}
                </Typography>
                {/* <Stack spacing={0}>
                    <Typography variant="caption" color="textSecondary">
                      {row.original.owner?.email}
                    </Typography>
                  </Stack> */}
              </Stack>
            );
          },
          enableSorting: false,
          meta: {
            align: "left",
          },
			
        }),
        
        columnHelper.accessor("carRentingPricePerDay", {
          header: "Renting Price",
          cell: ({ row }) => {
            return (
              <Typography
                color="CaptionText"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}>
                {row.original?.carRentingPricePerDay ?? "N/A"}
              </Typography>
            );
          },
          meta: {
            align: "left",
          },
        }),
        columnHelper.accessor("fuelType", {
          header: "Fuel Type",
          enableSorting: false,
          cell: ({ renderValue, row }) => (
						<div className="w-[100px]">
						<Text>{row?.original?.fuelType}</Text>
					</div>
          ),
          meta: {
            align: "left",
          },
        }),
        columnHelper.accessor("manufacturer", {
          header: "Manufacturer",
          cell: ({ renderValue }) => (
						<div className="w-fit">

            <Typography fontWeight="500" textAlign={"left"}>
              {renderValue()?.manufacturerName}
            </Typography>
						</div >
          ),
          meta: {
            align: "left",
          },
        }),
        columnHelper.accessor("numberOfDoors", {
          header: "Number of Doors",
          cell: ({ renderValue }) => (
						<div className="w-fit">
            <Typography fontWeight="500" textAlign={"left"}>
              {renderValue()}
            </Typography>
						</div >
          ),
        }),
        columnHelper.accessor("seatingCapacity", {
          header: "Seating Capacity",
          cell: ({ renderValue }) => (
						<div className="w-fit">
            <Typography fontWeight="500" textAlign={"left"}>
              {renderValue()}
            </Typography>
						</div >
          ),
        }),
        
        columnHelper.accessor("supplier", {
          header: "Supplier",
          cell: ({ renderValue }) => (
						<div className="w-[100px]">
            <Typography fontWeight="500" textAlign={"left"}>
              {renderValue()?.supplierName}
            </Typography>
						</div >
          ),
        }),
        columnHelper.accessor("year", {
          header: "Supplier",
          cell: ({ renderValue }) => (
						<div className="w-[100px]">
            <Typography fontWeight="500" textAlign={"left"}>
              {renderValue()}
            </Typography>
						</div >
          ),
        }),
        columnHelper.accessor("carStatus", {
          header: "Status",
          cell: ({ renderValue }) =>{
						switch(renderValue()){
							case 0 : 
								return <Badge color="red">Inactive</Badge>
							default : return <Badge color="green">Active</Badge>
						}
					}
        }),
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        columnHelper.accessor<any, any>("action", {
          header: "Actions",
          enableSorting: false,
          cell: ({ row }) => {
            const collapseIcon = row.getIsExpanded() ? (
              <CloseOutlined
                style={{ color: theme.palette.error.main }}
              />
            ) : (
              <Eye
               
                color={theme.palette.secondary.main}
              />
            );
            return (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={0}>
                <Tooltip title="View">
                  <IconButton
                    color="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      // row.toggleExpanded();
                      // nav(`/product/detail/${row.original.skuCode}`);
											handleViewClick?.(row.original)
                    }}>
                    <Eye
               
							 color={theme.palette.secondary.main}
						 />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(row.original);
                    }}>
                    <EditTwoTone/>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(row.original.carId);
                    }}>
                    <Delete color={theme.palette.error.main as any} />
                  </IconButton>
                </Tooltip>
              </Stack>
            );
          },
        }),
      ];
      return cols;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );
  return {
    columns,
  };
}

export default useCarsTable
