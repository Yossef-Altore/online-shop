import "./SecondMenu.scss";

const SecondMenu = (props) => {
  const choseSecondaryMenu = (event) => {
    props.chosenSecondaryMenuHandler(event.target.innerText);
  };
  return (
    <div className="secondMenu">
      <ul>
        {props.menu.map((item, index) => {
          return (
            <li key={index}>
              <p onClick={choseSecondaryMenu}>{item}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default SecondMenu;
