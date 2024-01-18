import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "../../../assets/menu/banner3.jpg";

const Menu = () => {
  return (
    <div>
      <Helmet>
        <title>BISTRO BOSS || MENU</title>
      </Helmet>
      <Cover img={menuImg} />
    </div>
  );
};

export default Menu;
