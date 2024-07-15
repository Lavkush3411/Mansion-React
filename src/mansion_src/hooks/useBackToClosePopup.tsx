import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { closeMenu } from "../../redux/mobileNavbarSlice";
import { close } from "../../redux/sidebarSlice";
import { closePopUp } from "../../redux/deleteCartPopUpSlice";
import { closeSizeSelectPopUp } from "../../redux/sizeSelectorPopUpSlice";
import { closeUserDrawer } from "../../redux/userDrawerSlice";
import { useNavigate } from "react-router-dom";

export const useBackToClosePopup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mobNav, sideBar, user, sizeSelector, popup } = useSelector(
    (store: RootState) => ({
      mobNav: store.mobileNavbar.isOpen,
      sideBar: store.sidebar.isOpen,
      user: store.userDrawer.isOpen,
      sizeSelector: store.sizeSelectPopUp.isOpen,
      popup: store.popUp.isOpen,
    }),
    shallowEqual
  );

  useEffect(() => {
    function backButtonFunc() {
      if (mobNav || sideBar || user || sizeSelector || popup) {
        dispatch(close());
        dispatch(closeMenu());
        dispatch(closePopUp());
        dispatch(closeSizeSelectPopUp());
        dispatch(closeUserDrawer());
        navigate(1);
      }
    }

    window.addEventListener("popstate", backButtonFunc);

    return () => {
      window.removeEventListener("popstate", backButtonFunc);
    };
  }, [mobNav, sideBar, user, sizeSelector, popup]);
};
