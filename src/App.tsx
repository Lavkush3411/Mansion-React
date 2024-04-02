import { ReactElement, Suspense, lazy, useContext } from "react";
import "./index.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Loader from "./admin_src/components/loader/Loader";
import AdminHomePage from "./admin_src/pages/adminhomepage/AdminHomePage";
import {
  Cargo,
  Hoodie,
  Shirts,
  Sweatpant,
  Tshirts,
} from "./admin_src/components/table/ProductsTable";
import NewProduct from "./admin_src/pages/products/NewProduct";
import ManageProduct from "./admin_src/pages/products/ManageProduct";
import MansionHomePage from "./mansion_src/mansion_pages/mansionhomepage/MansionHomePage";
import MansionLogInPage from "./mansion_src/mansion_pages/mansionlogin/MansionLogInPage";
import MansionSignUPPage from "./mansion_src/mansion_pages/mansionsignuppage/MansionSignUPPage";
import { LoaderContext } from "./ContextProvider";
import CargosList from "./mansion_src/mansion_pages/Cargos/CargosList";
// const Pie = lazy(() => import("./components/charts/Charts"));
// const Bar = lazy(() => import("./pages/charts/bar/Bar"));
// const Line = lazy(() => import("./pages/charts/line/Line"));
const Dashboard = lazy(() => import("./admin_src/pages/dashboard/Dashboard"));
const Products = lazy(() => import("./admin_src/pages/products/Products"));
const Transactions = lazy(
  () => import("./admin_src/pages/Transactions/Transactions")
);
const Users = lazy(() => import("./admin_src/pages/users/Users"));

function createLazyRoute(element: ReactElement) {
  return <Suspense fallback={<Loader />}>{element}</Suspense>;
}

function App() {
  const { loaderState } = useContext(LoaderContext);

  return (
    <Router>
      <Routes>
        {/* homepage routes */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={createLazyRoute(<MansionHomePage />)}>
          <Route
            index
            element={
              <div style={{ textAlign: "center" }}>
                spinner or some animation on load
              </div>
            }
          />
          <Route path="cargos" element={createLazyRoute(<CargosList />)} />
          <Route path="hoodies" element={createLazyRoute(<CargosList />)} />
        </Route>
        <Route path="/login" element={createLazyRoute(<MansionLogInPage />)} />
        <Route path="/loading" element={<Loader />} />
        <Route
          path="/signup"
          element={createLazyRoute(<MansionSignUPPage />)}
        />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminHomePage />}>
          <Route index element={createLazyRoute(<Dashboard />)} />
          <Route
            path="/admin/dashboard"
            element={createLazyRoute(<Dashboard />)}
          />
          {/* Products Page route starts from here */}
          <Route path="/admin/products" element={createLazyRoute(<Products />)}>
            {/* Each Products lists are shown using below path */}
            <Route index element={<Navigate to="cargos-list" />} />
            <Route
              path="/admin/products/cargos-list"
              element={
                loaderState.showLoaderInProductsPlace ? (
                  <Loader />
                ) : (
                  createLazyRoute(<Cargo />)
                )
              }
            />
            <Route
              path="/admin/products/sweatpants-list"
              element={
                loaderState.showLoaderInProductsPlace ? (
                  <Loader />
                ) : (
                  createLazyRoute(<Sweatpant />)
                )
              }
            />
            <Route
              path="/admin/products/tshirts-list"
              element={
                loaderState.showLoaderInProductsPlace ? (
                  <Loader />
                ) : (
                  createLazyRoute(<Tshirts />)
                )
              }
            />
            <Route
              path="/admin/products/shirts-list"
              element={
                loaderState.showLoaderInProductsPlace ? (
                  <Loader />
                ) : (
                  createLazyRoute(<Shirts />)
                )
              }
            />
            <Route
              path="/admin/products/hoodies-list"
              element={
                loaderState.showLoaderInProductsPlace ? (
                  <Loader />
                ) : (
                  createLazyRoute(<Hoodie />)
                )
              }
            />
            {/* routes for adding new products */}

            <Route
              path="/admin/products/new"
              element={createLazyRoute(<NewProduct />)}
            />

            {/* Route for managing any productitem  */}
            <Route
              path="/admin/products/manage/:table_row"
              element={createLazyRoute(<ManageProduct />)}
            />
          </Route>
          {/* Product route ends here*/}
          <Route
            path="/admin/transactions"
            element={createLazyRoute(<Transactions />)}
          />
          <Route path="/admin/users" element={createLazyRoute(<Users />)} />
          <Route
            path="/admin/bar-chart"
            element={createLazyRoute(<div>bar</div>)}
          />
          <Route
            path="/admin/pie-chart"
            element={createLazyRoute(<div>Pie</div>)}
          />
          <Route
            path="/admin/line-chart"
            element={createLazyRoute(<div>line</div>)}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
