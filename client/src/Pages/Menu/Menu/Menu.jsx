import { Helmet } from "react-helmet-async";
import menuImg from "../../../assets/menu/banner3.jpg";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg";
import MenuCategory from "../MenuCategory/MenuCategory";
import useMenu from "../../../Hooks/useMenu";


const Menu = () => {
  const [menu] = useMenu();
    const offered = menu.filter(item=>item.category === 'offered') 
    const desserts = menu.filter(item=>item.category === 'dessert') 
    const pizzas = menu.filter(item=>item.category === 'pizza') 
    const salads = menu.filter(item=>item.category === 'salad') 
    const soups = menu.filter(item=>item.category === 'soup') 
  return (
    <div>
      <Helmet>
        <title>BISTRO BOSS || MENU</title>
      </Helmet>
      <MenuCategory items={offered} subHeading={"Don't Miss"} heading={"Today's Offer"} img={menuImg} title={"salad"}/>
      <MenuCategory items={desserts} img={dessertImg} title={"dessert"}/>
      <MenuCategory items={pizzas} img={pizzaImg} title={"pizza"}/>
      <MenuCategory items={salads} img={saladImg} title={"salad"}/>
      <MenuCategory items={soups} img={soupImg} title={"soup"}/>
   
    </div>
  );
};

export default Menu;
