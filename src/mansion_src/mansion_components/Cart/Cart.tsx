import { ReactNode, useContext, useEffect, useState } from "react";
import "./cart.scss";
import CartItem from "./CartItem";
import { CheckOutContext } from "../../../CheckOutContextProvider";
import CheckOutPage from "../../mansion_pages/checkoutpage/CheckOutPage";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../../redux/checkOutProductsSlice";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { RootState } from "../../../redux/store";
import { close } from "../../../redux/sidebarSlice";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useProductAvailibilityCheck from "../../hooks/useProductAvailibilityCheck";
import { CartItemType } from "../../types/cart";
import { availiblityCheck } from "../../mansion_pages/utils/AvailibilityCheckBeforeCheckout";
import { showUnavailibility } from "../../../redux/unavailibilitypopupSlice";

function Cart() {
  const { cartList, removedData } = useProductAvailibilityCheck();
  const { checkoutState, setCheckoutState } = useContext(CheckOutContext);
  const disptach = useDispatch();
  const isOpen = useSelector((store: RootState) => store.sidebar.isOpen);
  const subtotal = cartList.reduce((total, product) => {
    return total + Number(product.productPrice) * Number(product.qty);
  }, 0);
  const [authenticated] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (removedData.length) {
      alert("Some of your cartItems are removed as we no longer sell those");
    }
  }, []);

  async function onCheckout(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    if (!authenticated) {
      navigate("/login");
      disptach(add(cartList));
      disptach(close());
    } else {
      const res = await availiblityCheck(cartList);
      if (res.availibility) {
        setCheckoutState(true);
        disptach(add(cartList));
        disptach(close());
      } else {
        disptach(showUnavailibility(res.msg));
      }
    }
  }
  const [innerWidth] = useState(window.innerWidth);

  return (
    <div>
      <Drawer
        variant={"cart"}
        isOpen={isOpen}
        placement="right"
        onClose={() => disptach(close())}
      >
        <DrawerOverlay />
        <DrawerContent
          padding={innerWidth <= 700 ? "0px 0px 50px 0px" : "0px 0px 0px 0px"}
        >
          <DrawerCloseButton />
          <DrawerHeader>
            {cartList.length > 0 && <div className="cart-title">YOUR CART</div>}
          </DrawerHeader>

          <DrawerBody>
            {cartList.length ? (
              <div className="cart-list">
                {cartList.map((cartItem: CartItemType) => {
                  return (
                    <CartItem
                      key={cartItem._id + cartItem.size}
                      cartItem={cartItem}
                    />
                  );
                })}{" "}
              </div>
            ) : (
              <div className="empty-cart">
                <h2 className="empty-cart-title">Your Cart Is Empty</h2>
              </div>
            )}
          </DrawerBody>

          <DrawerFooter width={"100%"}>
            {cartList.length ? (
              <BottomSection subtotal={subtotal}>
                <Button type="button" onClick={(e: any) => onCheckout(e)}>
                  Checkout
                </Button>
              </BottomSection>
            ) : null}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {checkoutState && <CheckOutPage />}
    </div>
  );
}

function BottomSection({
  subtotal,
  children,
}: {
  subtotal: number;
  children: ReactNode;
}) {
  return (
    <div className="bottom-section">
      <h1 className="subtotal">SUBTOTAL : {subtotal}</h1>
      {children}
    </div>
  );
}

export default Cart;
