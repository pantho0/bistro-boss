import FoodCard from "./FoodCard";


const FoodItem = ({items}) => {
    return (
        <div className="grid md:grid-cols-3 gap-4 mt-16 mb-16">
            {
                items.map(item=><FoodCard key={item._id} item={item}/>)
            }
            </div>
    );
};

export default FoodItem;