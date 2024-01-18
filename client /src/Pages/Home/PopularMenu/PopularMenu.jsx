import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItems from "../../Shared/MenuItems/MenuItems";
import useMenu from "../../../Hooks /useMenu";


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
        <button className="btn btn-outline border-0 border-b-2 border-b-gray-300">View All</button>
        </div>
        </section>
        
    );
};

export default PopularMenu;