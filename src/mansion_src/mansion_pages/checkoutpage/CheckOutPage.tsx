import { useContext, useEffect, useState } from "react";
import Loader from "../../../admin_src/components/loader/Loader";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Checkout from "../../mansion_components/checkout/Checkout";
import { CartContext } from "../../../CartContextProvider";
import { CheckOutContext } from "../../../CheckOutContextProvider";

function CheckOutPage() {
  const [authorised, setAuthorised] = useState<boolean | null>(null);
  const { setShowCart } = useContext(CartContext);
  const { setCheckoutState } = useContext(CheckOutContext);

  const navigate = useNavigate();
  useEffect(() => {
    useAuth("user/verify")
      .then((res) => {
        setAuthorised(res as boolean); //this will hide checkout component
        setCheckoutState(res); //this will hide the current component that makes request to check authorised state
        if (!res) {
          setShowCart(false);
          navigate("/home/login");
        }
      })
      .catch(() => setAuthorised(false));
  }, []);

  // Loader will be shown untill the authorisation check is completed
  // if check results in true Navigate to the requested page
  // if check result is false Navigate to the Login/Unauthorised Page

  return authorised === null ? (
    <Loader bgc="rgb(49, 48, 48, 0.4)" pos="absolute" />
  ) : authorised ? (
    <Checkout /> //shows checkout component
  ) : null;
}

export default CheckOutPage;
