import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItems from "../../Shared/MenuItems/MenuItems";


const PopularMenu = () => {
    const [menu, setMenu] = useState([])
    useEffect(()=>{
        fetch('menu.json')
        .then(res => res.json())
        .then(data =>{
            const popularItem = data.filter(item => item.category === 'popular')
            setMenu(popularItem)
        })
    },[])

    return (
        <section className="mb-20">
            <SectionTitle heading={'From Our Menu'} subHeading={'check it out'} />
            <div className="grid md:grid-cols-2 gap-10">
            {
                menu.map(item => <MenuItems key={item._id} item={item}/>)
            }
        </div>
        </section>
        
    );
};

export default PopularMenu;