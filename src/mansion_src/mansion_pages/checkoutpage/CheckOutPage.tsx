import Loader from "../../../admin_src/components/loader/Loader";
import useAuth from "../../hooks/useAuth";
import Checkout from "../../mansion_components/checkout/Checkout";

function CheckOutPage() {
  const [authorised] = useAuth();

  return authorised === null ? (
    <Loader bgc="rgb(49, 48, 48, 0.4)" pos="absolute" />
  ) : authorised ? (
    <Checkout /> //shows checkout component
  ) : null;
}

export default CheckOutPage;
