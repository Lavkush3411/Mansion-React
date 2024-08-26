import Loader from "../../../admin_src/components/loader/Loader";
import store, { RootState } from "../../../redux/store";
import { OrderType } from "../../../redux/transactionListState";
import OrderedItem from "../../mansion_components/orderedItem/OrderedItem";
import { fetchOrders } from "../utils/fetchData";
import "./orderspage.scss";
import { useLoaderData, useNavigation } from "react-router-dom";

function ordersLoader() {
  const { user } = store.getState() as RootState;
  return fetchOrders(user?.email || null);
}

function OrdersPage() {
  const orders = useLoaderData() as OrderType[];
  const { state } = useNavigation();
  if (state === "loading") return <Loader />;
  return (
    <div className="orders-page">
      {orders &&
        orders.length > 0 &&
        orders.map((orderItem) => (
          <OrderedItem key={orderItem._id} orderItem={orderItem} />
        ))}
    </div>
  );
}

export default OrdersPage;
export { ordersLoader };
