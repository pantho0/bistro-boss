

const MenuItems = ({item}) => {
    const {name, image, recipe, price} = item; 
    return (
        <div className="flex space-x-10 ">
            <img style={{borderRadius:'0px 200px 200px 200px'}} className="w-[100px]" src={image} alt="" />
           <div className="">
           <h6><strong>{name}</strong></h6>
            <p>{recipe}</p>
            
           </div>
           <p className="text-yellow-600 font-bold italic">{price}</p>
        </div>
    );
};

export default MenuItems;