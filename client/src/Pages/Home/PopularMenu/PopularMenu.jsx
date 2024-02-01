import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import MenuItems from "../../Shared/MenuItems/MenuItems";

import { Link } from "react-router-dom";


const PopularMenu = () => {
    const [menu] = useMenu();
    const popularItem = menu.filter(item=>item.category === 'popular') 

    return (
        <section className="mb-20">
            <SectionTitle heading={'From Our Menu'} subHeading={'check it out'} />
            <div className="grid md:grid-cols-2 gap-10">
            {
                popularItem.map(item => <MenuItems key={item._id} item={item}/>)
            }
        </div>
        <div className="flex justify-center mt-4">
        <Link to={'/menu'}>
        <button className="btn btn-outline border-0 border-b-2 border-b-gray-300">View All</button>
        </Link>
        </div>
        </section>
        
    );
};

export default PopularMenu;