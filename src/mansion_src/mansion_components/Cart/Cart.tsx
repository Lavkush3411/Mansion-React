import { ReactNode, useContext } from "react";
import "./cart.scss";
import { CartContext } from "../../../CartContextProvider";
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

interface CartItemType {
  _id: string;
  productName: string;
  image: string[];
  productPrice: number;
  qty: number;
  size: string;
}
function Cart() {
  const {
    cartList,
    setShowCart,
  }: { cartList: CartItemType[]; setShowCart: React.Dispatch<any> } =
    useContext(CartContext);
  const { checkoutState, setCheckoutState } = useContext(CheckOutContext);
  const disptach = useDispatch();
  const isOpen = useSelector((store: RootState) => store.sidebar.isOpen);
  const subtotal = cartList.reduce((total, product) => {
    return total + Number(product.productPrice) * Number(product.qty);
  }, 0);
  async function onCheckout(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    disptach(add(cartList));
    setShowCart(true);
    setCheckoutState(true);
  }

  return (
    <>
      <Drawer
        variant={"cart"}
        isOpen={isOpen}
        placement="right"
        onClose={() => disptach(close())}
      >
        <DrawerOverlay />
        <DrawerContent>
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
              <h2 className="empty-cart-title">Your Cart Is Empty</h2>
            )}
          </DrawerBody>

          <DrawerFooter width={"100%"}>
            <BottomSection subtotal={subtotal}>
              <Button type="button" onClick={(e: any) => onCheckout(e)}>
                Checkout
              </Button>
            </BottomSection>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {checkoutState && <CheckOutPage />}
    </>
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
