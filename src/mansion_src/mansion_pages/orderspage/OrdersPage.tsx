import Loader from "../../../admin_src/components/loader/Loader";
import store, { RootState } from "../../../redux/store";
import OrderedItem from "../../mansion_components/orderedItem/OrderedItem";
import { fetchOrders } from "../utils/fetchData";
import "./orderspage.scss";
import { useLoaderData, useNavigation } from "react-router-dom";

interface productType {
  image: string;
  productId: string;
  productName: string;
  productPrice: number;
  size: string;
  qty: number;
}

interface orderType {
  _id: string;
  userId: string;
  products: productType[];
  totalAmount: number;
  orderStatus: string;
  updatedAt: string;
}

function ordersLoader() {
  const { user } = store.getState() as RootState;
  return fetchOrders(user?.email || null);
}

function OrdersPage() {
  const orders = useLoaderData() as orderType[];
  const { state } = useNavigation();
  if (state === "loading") return <Loader />;
  return (
    <div className="orders-page">
      {orders.map((orderItem) => (
        <OrderedItem key={orderItem._id} orderItem={orderItem} />
      ))}
    </div>
  );
}

export default OrdersPage;
export { ordersLoader };
