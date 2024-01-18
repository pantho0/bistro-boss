const FoodCard = ({item}) => {
    const {name, image, recipe, price} = item; 
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src={image}
          alt="Shoes"
        />
      </figure>
      <p className="bg-gray-950 text-white absolute top-3 px-4 right-0 mr-3">${price}</p>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-outline border-0 border-b-2 border-b-orange-600">Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
