import { RouteObject, createBrowserRouter } from "react-router-dom";
import LandingLayout from "../base/components/layout/LandingLayout";
import appRoutes from "@/base/app/route";
import MainLayout from "@/base/mantis/layout/MainLayout";
import MainPharmacyLayout from "@/base/layout/MainPharmacyLayout";
import AdminCarPage from "@/modules/car/page/AdminCarPage";
import AdminCustomePage from "@/modules/customer/page/AdminCustomePage";
import AdminTransactionPage from "@/modules/transaction/page/AdminTransactionPage";
import StorePage from "@/modules/store/page/StorePage";
import LoginPage from "@/base/mantis/auth/LoginPage";
import CategoryPage from "@/modules/Category/page/CategoryPage";

const routes: RouteObject[] = [
  {
    path: "/old",
    element: <MainLayout />,
    children: [
      // appRoutes,
      {
        path: "contact",
        element: <h1>Click below to contact</h1>,
      },
    ],
  },
	{
		path: "/store",
		element : <StorePage />
	},
	{
		path: "/login",
		element: <LoginPage/>
	},
  {
    path: "/",
    element: <MainPharmacyLayout />,
    children: [
      {
        path: "/category",
        element: <CategoryPage></CategoryPage>,
      },
      {
        path: "/customer",
        element: <AdminCustomePage></AdminCustomePage>,
      },
      {
        path: "/transaction",
        element: <AdminTransactionPage></AdminTransactionPage>,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
