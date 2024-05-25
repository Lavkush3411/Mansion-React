import { ReactElement, Suspense, lazy } from "react";
import "./index.scss";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Loader from "./admin_src/components/loader/Loader";
import AdminHomePage from "./admin_src/pages/adminhomepage/AdminHomePage";
import {
  All,
  Cargo,
  Hoodie,
  Shirts,
  Sweatpant,
  Tshirts,
} from "./admin_src/components/table/ProductsTable";
import NewProduct from "./admin_src/pages/products/NewProduct";
import ManageProduct from "./admin_src/pages/products/ManageProduct";
const MansionHomePage = lazy(
  () => import("./mansion_src/mansion_pages/mansionhomepage/MansionHomePage")
);
const MansionLogInPage = lazy(
  () => import("./mansion_src/mansion_pages/mansionlogin/MansionLogInPage")
);
const MansionSignUPPage = lazy(
  () =>
    import("./mansion_src/mansion_pages/mansionsignuppage/MansionSignUPPage")
);
const ProductListMansion = lazy(
  () =>
    import("./mansion_src/mansion_pages/productlistmansion/ProductListMansion")
);
const ProductItem = lazy(
  () => import("./mansion_src/mansion_components/productitem/ProductItem")
);
import ProtectedRoute from "./ProtectedRoute";
// import IndexPage from "./mansion_src/mansion_pages/indexpage/IndexPage";
import PasswordReset from "./mansion_src/mansion_components/passwordreset/PasswordReset";
import MansionSearchPage from "./mansion_src/mansion_pages/searchpage/MansionSearchPage";
// const Forgot = lazy(
//   () => import("./mansion_src/mansion_pages/forgotpage/Forgot")
// );
// const Pie = lazy(() => import("./components/charts/Charts"));
// const Bar = lazy(() => import("./pages/charts/bar/Bar"));
// const Line = lazy(() => import("./pages/charts/line/Line"));
import { loader as allProductloader } from "./mansion_src/mansion_pages/mansionhomepage/MansionHomePage";
import axios from "axios";
const env = import.meta.env;
import queryClient from "./queryClient";
const Dashboard = lazy(() => import("./admin_src/pages/dashboard/Dashboard"));
const Products = lazy(() => import("./admin_src/pages/products/Products"));
const Transactions = lazy(
  () => import("./admin_src/pages/Transactions/Transactions")
);
const Users = lazy(() => import("./admin_src/pages/users/Users"));

function createLazyRoute(element: ReactElement) {
  return <Suspense fallback={<Loader />}>{element}</Suspense>;
}
async function fetchData() {
  const res = await axios.get(env.VITE_BASE_URL + "get/all");
  return res.data;
}

function renderData() {
  queryClient.prefetchQuery({ queryKey: ["all"], queryFn: fetchData });
  return null;
}

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/home" />, loader: renderData },

  {
    path: "/home",
    element: createLazyRoute(<MansionHomePage />),
    loader: renderData,

    children: [
      { path: "login", element: createLazyRoute(<MansionLogInPage />) },
      {
        path: "forgot",
        element: createLazyRoute(<PasswordReset />),
      },
      { path: "signup", element: createLazyRoute(<MansionSignUPPage />) },
      {
        path: "",
        element: <Navigate to={"all"} />,
        loader: renderData,
      },
      {
        path: ":productName",
        element: createLazyRoute(<ProductListMansion />),
        loader: (path) => allProductloader(path),
      },
      {
        path: "search",
        element: createLazyRoute(<MansionSearchPage />),
      },
      {
        path: "product/:card",
        element: createLazyRoute(<ProductItem />),
      },
    ],
  },
  {
    path: "/loading",
    element: createLazyRoute(<Loader />),
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminHomePage />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: createLazyRoute(<Dashboard />) },
      { path: "/admin/dashboard", element: createLazyRoute(<Dashboard />) },
      {
        path: "/admin/products",
        element: createLazyRoute(<Products />),
        children: [
          { path: "", element: <Navigate to="cargos-list" /> },
          {
            path: "/admin/products/cargos-list",
            element: createLazyRoute(<Cargo />),
          },
          {
            path: "/admin/products/sweatpants-list",
            element: createLazyRoute(<Sweatpant />),
          },
          {
            path: "/admin/products/tshirts-list",
            element: createLazyRoute(<Tshirts />),
          },
          {
            path: "/admin/products/shirts-list",
            element: createLazyRoute(<Shirts />),
          },
          {
            path: "/admin/products/all-list",
            element: createLazyRoute(<All />),
          },
          {
            path: "/admin/products/hoodies-list",
            element: createLazyRoute(<Hoodie />),
          },
          {
            path: "/admin/products/new",
            element: createLazyRoute(<NewProduct />),
          },
          {
            path: "/admin/products/manage/:table_row",
            element: createLazyRoute(<ManageProduct />),
          },
        ],
      },
      ///* Product route ends here*/
      {
        path: "/admin/transactions",
        element: createLazyRoute(<Transactions />),
      },
      { path: "/admin/users", element: createLazyRoute(<Users />) },
      { path: "/admin/bar-chart", element: createLazyRoute(<div>bar</div>) },
      { path: "/admin/pie-chart", element: createLazyRoute(<div>Pie</div>) },
      {
        path: "/admin/line-chart",
        element: createLazyRoute(<div>line</div>),
      },
    ],
  },
  { path: "*", element: <div>Page does not exist</div> },
]);

export default router;
