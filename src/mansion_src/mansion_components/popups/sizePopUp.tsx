import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useContext, useRef, useState } from "react";
import { CartContext } from "../../../CartContextProvider";
import { closeSizeSelectPopUp } from "../../../redux/sizeSelectorPopUpSlice";
import { open } from "../../../redux/sidebarSlice";
import "./sizepopup.scss";

function SizePopUp() {
  const isOpen = useSelector(
    (store: RootState) => store.sizeSelectPopUp.isOpen
  );
  const productItem = useSelector(
    (store: RootState) => store.sizeSelectPopUp.productItem
  );
  const dispatch = useDispatch();
  const cancelRef = useRef(null);
  const { cartDispatch } = useContext(CartContext);
  const [size, setSize] = useState<string>("");
  const cartItem = {
    productName: productItem?.productName,
    _id: productItem?._id,
    image: productItem?.image,
    productPrice: productItem?.productPrice,
    size: size,
  };

  function onAddToCart(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (size !== "") {
      cartDispatch({ type: "add", payload: cartItem });
      dispatch(closeSizeSelectPopUp());
      dispatch(open());
      console.log("added to cart");
    } else {
      alert("select Size first");
    }
  }

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={() => dispatch(closeSizeSelectPopUp())}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Available Size
          </AlertDialogHeader>

          <AlertDialogBody>
            {productItem &&
              productItem.stock.map((stockItem: any) => {
                return (
                  <Button
                    style={{ margin: "5px" }}
                    _hover={{ backgroundColor: "black", color: "white" }}
                    className={`size-btn ${
                      size === stockItem.size ? "active" : ""
                    }`}
                    onClick={() => setSize(stockItem.size)}
                  >
                    {stockItem.size}
                  </Button>
                );
              })}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={() => {
                {
                  dispatch(closeSizeSelectPopUp());
                  setSize("");
                }
              }}
            >
              Cancel
            </Button>
            <Button
              backgroundColor="transparent"
              color="black"
              border={"2px solid black"}
              _hover={{
                backgroundColor: "black",
                color: "white",
                border: "2px solid black",
              }}
              onClick={(e) => {
                dispatch(closeSizeSelectPopUp());
                onAddToCart(e);
                setSize("");
              }}
              ml={3}
            >
              Add to cart
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default SizePopUp;
