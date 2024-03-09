import { IndeterminateCheckbox } from "@/base/components/third-party/ReactTable";
import { CarObject } from "@/types/@car-store/carObject";
import { CustomerObject } from "@/types/@car-store/customerObject";

import { Eye } from "@medusajs/icons";
import { Badge, Text } from "@medusajs/ui";
import { CloseOutlined, Delete } from "@mui/icons-material";
import { Stack, Tooltip, Typography, useTheme } from "@mui/material";
import { createColumnHelper } from "@tanstack/react-table";
import IconButton from "@ui/@extended/IconButton";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment"
import { EditTwoTone } from "@ant-design/icons";
interface Props {
	handleDeleteClick : (customerId: string | number)=> void;
	handleEditClick : (customer: CustomerObject) => void;
	handleViewClick : (customer: CustomerObject) => void;

}
const useCustomerTable = ({handleDeleteClick,handleEditClick, handleViewClick}:Props) => {
	const theme = useTheme();
  const columnHelper = createColumnHelper<CustomerObject>();
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
				columnHelper.accessor("customerId", {
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
                {"C"+row.original?.customerId?.toString().padStart(5, "0")}
              </Typography>
							</div>
            );
          },
          meta: {
            align: "left",
          },
        }),
        columnHelper.accessor("customerName", {
          header: "Name",
          cell: ({ row }) => {
            return (
              <Stack direction="row" className="w-[150px]" spacing={1.5} alignItems="center">
               
                <Typography variant="subtitle1">
                  {row.original.customerName ?? "N/A"}
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
        
        columnHelper.accessor("customerBirthday", {
          header: "Date of birth",
          cell: ({ row }) => {
            return (
              <Typography
                color="CaptionText"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}>
                {moment(row.original?.customerBirthday).format("DD/MM/YYYY") ?? "N/A"}
              </Typography>
            );
          },
          meta: {
            align: "left",
          },
        }),
        columnHelper.accessor("email", {
          header: "Email",
          enableSorting: false,
          cell: ({ renderValue, row }) => (
						<div className="w-fit">
						<Text>{row?.original?.email}</Text>
					</div>
          ),
          meta: {
            align: "left",
          },
        }),
        columnHelper.accessor("telephone", {
          header: "Telephone",
          cell: ({ renderValue }) => (
						<div className="w-[250px]">

            <Typography fontWeight="500" textAlign={"left"}>
              {renderValue()}
            </Typography>
						</div >
          ),
          meta: {
            align: "left",
          },
					maxSize: 250
        }),
        columnHelper.accessor("customerStatus", {
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
                      handleEditClick?.(row.original);
                    }}>
                    <EditTwoTone rev={{}}/>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick?.(row.original.customerId!);
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

export default useCustomerTable
