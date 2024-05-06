import { useEffect, useState } from "react";
import Loader from "../../../admin_src/components/loader/Loader";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Checkout from "../../mansion_components/checkout/Checkout";

function CheckOutPage() {
  const [authorised, setAuthorised] = useState<boolean | null>(null);

  useEffect(() => {
    useAuth("user/verify")
      .then((res) => {
        setAuthorised(res as boolean);
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
  ) : (
    <Navigate to={"/home/login"} />
  );
}

export default CheckOutPage;
