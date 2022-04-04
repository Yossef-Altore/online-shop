import "./HeaderWithMenu.scss";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  supermarketMenu,
  kenyonAllForHomeMenu,
  pharmMenu,
  greenMenu,
} from "../helpers/secondMenuHelper";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
const Header = (props) => {
  //for redux actions
  const dispatch = useDispatch();
  // logout
  const logoutHandler = (event) => {
    if (event.target.innerText === "התנתק") {
      localStorage.removeItem("token");
      dispatch(authActions.logout());
    } else {
      return;
    }
  };
  const [secondaryMenu, setSecondaryMenu] = useState(supermarketMenu);
  const [chosenMainMenu, setChosenMainMenu] = useState("סופרמרקט");
  const [chosenSecondaryMenu, setChosenSecondaryMenu] = useState("מבצעים");
  const mainWrapperRef = useRef(null);
  const showSupermarketMenu = () => {
    setSecondaryMenu(supermarketMenu);
    setChosenMainMenu("סופרמרקט");
    setChosenSecondaryMenu("מבצעים");
  };
  const choseSecondaryMenu = (event) => {
    setChosenSecondaryMenu(event.target.innerText);
  };
  const showKenyonMenu = () => {
    setChosenSecondaryMenu("מבצעים");
    setSecondaryMenu(kenyonAllForHomeMenu);
    setChosenMainMenu("קניון");
  };
  const showPharmMenu = () => {
    setChosenSecondaryMenu("מבצעים");
    setSecondaryMenu(pharmMenu);
    setChosenMainMenu("פארם");
  };
  const showGreenMenu = () => {
    setChosenSecondaryMenu("מבצעים");
    setSecondaryMenu(greenMenu);
    setChosenMainMenu("גרין");
  };
  const showMenuHandlerUsefulForMobileSize = () => {
    mainWrapperRef.current.style.display = "flex";
    mainWrapperRef.current.style.animation = "leftToRight 1s 0s forwards";
  };
  const hideMenuHandlerUsefulForMobileSize = () => {
    mainWrapperRef.current.style.animation = "rightToLeft 1s 0s forwards";
  };
  useEffect(() => {
    props.handleMenu({ chosenMainMenu, chosenSecondaryMenu });
  }, [chosenMainMenu, chosenSecondaryMenu]);
  return (
    <header className="mainHeader">
      <span
        className="hamburgerSignForMobileSize"
        onClick={showMenuHandlerUsefulForMobileSize}
      >
        ZOLSAL &#x2630;
      </span>
      <div className="mainWrapper" ref={mainWrapperRef}>
        <span
          className="closeMenuForMobileSize"
          onClick={hideMenuHandlerUsefulForMobileSize}
        >
          X
        </span>
        <div className="logoAndMainLinks">
          <Link to="/">
            <img src="images/mainLogo1.png" alt="main logo" />
          </Link>
          <p onClick={showSupermarketMenu}>סופרמרקט</p>
          <p onClick={showKenyonMenu}>הקניון הכל לבית</p>
          <p onClick={showPharmMenu}>פארם וקוסמטיקה Be</p>
          <p onClick={showGreenMenu}>Green בריאות וטבע</p>
        </div>
        <div className="helperLinks">
          <div>
            {/* first link */}
            <Link to={props.firstLinkPath}>
              <button>{props.firstLinkText}</button>
            </Link>
            {/*  second link */}
            <Link to={props.secondLinkPath}>
              <button onClick={logoutHandler}>{props.secondLinkText}</button>
            </Link>
          </div>
        </div>
        <div className="secondMenu">
          <ul>
            {secondaryMenu.map((item, index) => {
              return (
                <li key={index}>
                  <p onClick={choseSecondaryMenu}>{item}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
};
export default Header;
