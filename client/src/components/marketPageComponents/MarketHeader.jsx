import "./MarketHeader.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import SecondMenu from "./SecondMenu";
import {
  supermarketMenu,
  kenyonAllForHomeMenu,
  pharmMenu,
  greenMenu,
} from "../../helpers/secondMenuHelper";
const MarketHeader = (props) => {
  // useNavigate
  const navigate = useNavigate();
  //for redux actions
  const dispatch = useDispatch();
  // logout
  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(authActions.logout());
    navigate("/");
  };

  const [secondaryMenu, setSecondaryMenu] = useState(supermarketMenu);
  const [chosenMainMenu, setChosenMainMenu] = useState("סופרמרקט");
  const [chosenSecondaryMenu, setChosenSecondaryMenu] = useState("מבצעים");
  const showSupermarketMenu = () => {
    setSecondaryMenu(supermarketMenu);
    setChosenMainMenu("סופרמרקט");
    setChosenSecondaryMenu("מבצעים");
  };
  const handleChosenSecondaryMenu = (value) => {
    setChosenSecondaryMenu(value);
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
  useEffect(() => {
    props.handleMenu({ chosenMainMenu, chosenSecondaryMenu });
  }, [chosenMainMenu, chosenSecondaryMenu]);
  return (
    <header className="mainHeaderInMarketPage">
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
          <Link to="/">
            <button>בית</button>
          </Link>

          <button onClick={logoutHandler}>התנתק</button>
        </div>
      </div>
      <SecondMenu
        menu={secondaryMenu}
        chosenSecondaryMenuHandler={handleChosenSecondaryMenu}
      />
    </header>
  );
};
export default MarketHeader;
