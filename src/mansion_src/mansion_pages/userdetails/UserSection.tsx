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
import StyledButton from "../../mansion_components/button/StyledButton";

function UserSection() {
  const isOpen = useSelector((state: RootState) => state.userDrawer.isOpen);
  const dispatch = useDispatch();
  return (
    <Drawer
      variant={"cart"}
      isOpen={isOpen}
      placement="right"
      onClose={() => dispatch(closeUserDrawer())}
    >
      <DrawerOverlay />
      <DrawerContent padding={"0px 0px 50px 0px"}>
        <DrawerCloseButton />
        <DrawerHeader>Hey, User </DrawerHeader>

        <DrawerBody>
          {
            // if not login then show
            <div className="user-login-buttons">
              <NavLink
                to={"/login"}
                onClick={() => dispatch(closeUserDrawer())}
              >
                <Button>Login</Button>
              </NavLink>
              <NavLink
                to={"/signup"}
                onClick={() => dispatch(closeUserDrawer())}
              >
                <StyledButton bgCol="black">SignUp</StyledButton>
              </NavLink>
            </div>
          }
        </DrawerBody>

        <DrawerFooter width={"100%"}>
          <NavLink to={"/tshirts"} onClick={() => dispatch(closeUserDrawer())}>
            <Button>FIND SOME TSHIRTS</Button>
          </NavLink>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default UserSection;
