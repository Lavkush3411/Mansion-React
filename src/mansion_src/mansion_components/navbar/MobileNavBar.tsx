import { useDispatch, useSelector } from "react-redux";
import "./mobilenavbar.scss";

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
import { closeMenu } from "../../../redux/mobileNavbarSlice";
import { ButtonContext } from "../../../ContextProvider";
import { useContext } from "react";
import StyledLink from "./StyledLink";

function MobileNavBar() {
  const isOpen = useSelector((store: RootState) => store.mobileNavbar.isOpen);
  const dispatch = useDispatch();
  const { state } = useContext(ButtonContext);
  return (
    <div className="mobile-navbar">
      <Drawer
        variant={"mobilenavbar"}
        isOpen={isOpen}
        placement="bottom"
        onClose={() => dispatch(closeMenu())}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {<h1 className="card-title">OUR PRODUCTS</h1>}
          </DrawerHeader>

          <DrawerBody>
            <div className="body-items">
              {state.productItems.map((product: { name: string }) => (
                <StyledLink key={product.name} name={product.name} />
              ))}
            </div>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default MobileNavBar;
