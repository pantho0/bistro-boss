import Cover from "../../Shared/Cover/Cover";
import orderCoverImg from "../../../assets/shop/banner2.jpg";
import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../../Hooks/useMenu";
import FoodItem from "../../../Components/FoodCard/FoodItem";
import { useParams } from "react-router-dom";

const Order = () => {
  const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']
  const {category} = useParams()
  const initialIndex = categories.indexOf(category)
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [menu] = useMenu();
  
  const drinks = menu.filter((item) => item.category === "drinks");
  const desserts = menu.filter((item) => item.category === "dessert");
  const pizzas = menu.filter((item) => item.category === "pizza");
  const salads = menu.filter((item) => item.category === "salad");
  const soups = menu.filter((item) => item.category === "soup");
  return (
    <div>
      <Cover img={orderCoverImg} title={"Order Your Food"} />
      <Tabs selectedIndex={tabIndex} onSelect={(initialIndex) => setTabIndex(initialIndex)}>
        <TabList>
          <Tab>SALAD</Tab>
          <Tab>PIZZA</Tab>
          <Tab>SOUPS</Tab>
          <Tab>DESSERTS</Tab>
          <Tab>DRINKS</Tab>
        </TabList>
        <TabPanel>
            <FoodItem items={salads}/>
        </TabPanel>
        <TabPanel>
            <FoodItem items={pizzas}/>
        </TabPanel>
        <TabPanel>
            <FoodItem items={soups}/>
        </TabPanel>
        <TabPanel>
            <FoodItem items={desserts}/>
        </TabPanel>
        <TabPanel>
            <FoodItem items={drinks}/>
        </TabPanel>


        
      </Tabs>
    </div>
  );
};

export default Order;
