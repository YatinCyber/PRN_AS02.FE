// assets
import { NavItemType } from "@/types/menu";
import {
  DashboardOutlined,
  CustomerServiceOutlined,
  AreaChartOutlined,
  TableOutlined,
  ForkOutlined,
  SnippetsOutlined,
  ShopOutlined,
	HomeOutlined,
	InboxOutlined
} from "@ant-design/icons";
import { Map, Payment } from "@mui/icons-material";

import {
	BuildingStorefront,
	ShoppingBag,
	BuildingsMini,
	Newspaper,
	CogSixTooth
} from "@medusajs/icons"

// icons
const icons = {
  DashboardOutlined,
  CustomerServiceOutlined,
  AreaChartOutlined,
  TableOutlined,
  ForkOutlined,
  SnippetsOutlined,
  ShopOutlined,
  Map,
  Payment,
	BuildingStorefront,
	ShoppingBag,
	BuildingsMini,
	Newspaper,
	CogSixTooth,
	InboxOutlined
};
export const admin: NavItemType = {
  id: "admin",
  title: "",
  type: "group",
  children: [
    {
      id: "home",
      title: "home",
      type: "item",
      url: "/",
      icon: icons.BuildingStorefront,
      breadcrumbs: false,
    },
    {
      id: "customer",
      title: "customer",
      type: "item",
      icon: icons.ShoppingBag,
      url: "/customer",
      breadcrumbs: true,
      
    },
    {
      id: "category",
      title: "category",
      type: "item",
      icon: icons.Newspaper,
      url: "/category",
    },
    {
      id: "transaction",
      title: "transaction",
      type: "item",
      icon: icons.CogSixTooth,
      url: "/transaction"
    },
  ],
};
