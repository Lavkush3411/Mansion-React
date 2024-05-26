import { ReactElement, Suspense, lazy } from "react";
import "./index.scss";
import { Navigate, createBrowserRouter } from "react-router-dom";
import Loader from "./admin_src/components/loader/Loader";
const AdminHomePage = lazy(
  () => import("./admin_src/pages/adminhomepage/AdminHomePage")
);
// Lazy load the components
const All = lazy(() =>
  import("./admin_src/components/table/ProductsTable").then((module) => ({
    default: module.All,
  }))
);
const Cargo = lazy(() =>
  import("./admin_src/components/table/ProductsTable").then((module) => ({
    default: module.Cargo,
  }))
);
const Hoodie = lazy(() =>
  import("./admin_src/components/table/ProductsTable").then((module) => ({
    default: module.Hoodie,
  }))
);
const Shirts = lazy(() =>
  import("./admin_src/components/table/ProductsTable").then((module) => ({
    default: module.Shirts,
  }))
);
const Sweatpant = lazy(() =>
  import("./admin_src/components/table/ProductsTable").then((module) => ({
    default: module.Sweatpant,
  }))
);
const Tshirts = lazy(() =>
  import("./admin_src/components/table/ProductsTable").then((module) => ({
    default: module.Tshirts,
  }))
);

const NewProduct = lazy(() => import("./admin_src/pages/products/NewProduct"));
const ManageProduct = lazy(
  () => import("./admin_src/pages/products/ManageProduct")
);

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
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const PasswordReset = lazy(
  () => import("./mansion_src/mansion_components/passwordreset/PasswordReset")
);

const MansionSearchPage = lazy(
  () => import("./mansion_src/mansion_pages/searchpage/MansionSearchPage")
);

// const Pie = lazy(() => import("./components/charts/Charts"));
// const Bar = lazy(() => import("./pages/charts/bar/Bar"));
// const Line = lazy(() => import("./pages/charts/line/Line"));
import { loader as productLoader } from "./mansion_src/mansion_pages/mansionhomepage/MansionHomePage";
import { loader as allProductsLoader } from "./mansion_src/mansion_components/productitem/ProductItem";
const Dashboard = lazy(() => import("./admin_src/pages/dashboard/Dashboard"));
const Products = lazy(() => import("./admin_src/pages/products/Products"));
const Transactions = lazy(
  () => import("./admin_src/pages/Transactions/Transactions")
);
const Users = lazy(() => import("./admin_src/pages/users/Users"));

//additional functions

function createLazyRoute(element: ReactElement) {
  return <Suspense fallback={<Loader />}>{element}</Suspense>;
}

// routes implementation
const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/home" />, },

  {
    path: "/home",
    element: createLazyRoute(<MansionHomePage />),

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
      },
      {
        path: ":productName",
        element: createLazyRoute(<ProductListMansion />),
        loader: (path) => productLoader(path),
      },
      {
        path: "search",
        element: createLazyRoute(<MansionSearchPage />),
      },
      {
        path: "product/:id",
        element: createLazyRoute(<ProductItem />),
        loader: () => allProductsLoader(),
        errorElement: <div>Product does not exist</div>,
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
