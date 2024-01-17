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
        <div className="flex justify-center mt-4">
        <button className="btn btn-outline border-0 border-b-2 border-b-gray-300">View All</button>
        </div>
        </section>
        
    );
};

export default PopularMenu;