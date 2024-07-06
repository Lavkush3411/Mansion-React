import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { closeUserDrawer } from "../../../redux/userDrawerSlice";
import { NavLink } from "react-router-dom";
import Button from "../../mansion_components/button/Button";
import "./usersection.scss";
import { useContext, useState } from "react";
import { UserContext } from "../../../UserContextProvider";
import NotLoggedInUser from "../../mansion_components/user/NotLoggedInUser";
import LoggedInUser from "../../mansion_components/user/LoggedInUser";

function UserSection() {
  const isOpen = useSelector((state: RootState) => state.userDrawer.isOpen);
  const dispatch = useDispatch();
  const { loggedinuser } = useContext(UserContext);
  const authenticated = useSelector(
    (store: RootState) => store.authentication.authenticated
  );
  const [innerWidth] = useState(window.innerWidth);
  return (
    <Drawer
      variant={"cart"}
      isOpen={isOpen}
      placement="right"
      onClose={() => dispatch(closeUserDrawer())}
    >
      <DrawerOverlay />
      <DrawerContent padding={innerWidth <= 700 ? "0px 0px 50px 0px" : "0px "}>
        <DrawerCloseButton />
        <DrawerHeader>
          Hey, {authenticated && loggedinuser && loggedinuser.name}
        </DrawerHeader>

        <DrawerBody>
          {authenticated ? <LoggedInUser /> : <NotLoggedInUser />}
        </DrawerBody>

        <DrawerFooter width={"100%"}>
          <NavLink
            to={"get/tshirts"}
            onClick={() => dispatch(closeUserDrawer())}
          >
            <Button>FIND SOME TSHIRTS</Button>
          </NavLink>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default UserSection;
