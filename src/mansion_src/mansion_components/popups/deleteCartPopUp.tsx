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
import { closePopUp } from "../../../redux/deleteCartPopUpSlice";
import { useContext, useRef } from "react";
import { CartContext } from "../../../CartContextProvider";

function DeleteCartPopUp() {
  const isOpen = useSelector((store: RootState) => store.popUp.isOpen);
  const cartItem = useSelector((store: RootState) => store.popUp.deletionItem);
  const dispatch = useDispatch();
  const cancelRef = useRef(null);
  const { cartDispatch } = useContext(CartContext);
  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={() => dispatch(closePopUp())}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Product
          </AlertDialogHeader>

          <AlertDialogBody>
            Do you really want to remove from the cart ??
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => dispatch(closePopUp())}>
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
              onClick={() => {
                dispatch(closePopUp());
                cartDispatch({ type: "delete", payload: cartItem });
              }}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default DeleteCartPopUp;
