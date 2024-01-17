import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "../../../assets/menu/banner3.jpg";
import PopularMenu from "../../Home/PopularMenu/PopularMenu";

const Menu = () => {
  return (
    <div>
      <Helmet>
        <title>BISTRO BOSS || MENU</title>
      </Helmet>
      <Cover img={menuImg} />
      <PopularMenu />
      <Cover img={menuImg} />
      <PopularMenu />
      <Cover img={menuImg} />
      <PopularMenu />
      <Cover img={menuImg} />
      <PopularMenu />
      <Cover img={menuImg} />
      <PopularMenu />
    </div>
  );
};

export default Menu;
