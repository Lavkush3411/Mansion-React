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
import { useRef } from "react";

import { hideUnavailibility } from "../../../redux/unavailibilitypopupSlice";

function UnavailibilityPopup() {
  const { isOpen, msg }: { isOpen: boolean; msg: String[] } = useSelector(
    (store: RootState) => store.unavailibility
  );
  const dispatch = useDispatch();
  const cancelRef = useRef(null);
  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={() => dispatch(hideUnavailibility())}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Product Not available
          </AlertDialogHeader>

          <AlertDialogBody>
            {msg.map((m) => (
              <div key={m.charAt(0)}>{m}</div>
            ))}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={() => dispatch(hideUnavailibility())}
            >
              Ok
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default UnavailibilityPopup;
