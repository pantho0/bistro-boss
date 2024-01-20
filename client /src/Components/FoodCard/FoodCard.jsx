import Swal from "sweetalert2";
import useAuth from "../../Hooks /useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks /useAxiosSecure";


const FoodCard = ({item}) => {
    const {name, image, recipe, price, _id} = item; 
    const {user} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const axiosSecure = useAxiosSecure()
    
    const handleAddCart = (foods) =>{
      if(user && user?.email){
        //todo : send food items to db 
   
            if(user && user.email){
              const cartItem ={
                menuId : _id,
                email: user.email,
                name,
                image,
                price
              }
              axiosSecure.post('/carts', cartItem)
              .then(res=>{
                if(res.data.insertedId){
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${name} added to the cart`,
                    showConfirmButton: false,
                    timer: 2500
                  });
                }
              })
            }

      }else{
        Swal.fire({
          title: "You're not logged in ",
          text: "You've to login first",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Login Now"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login', {state:{from:location}})
          }
        });
      }
    }
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
          <button onClick={()=>handleAddCart(item)} className="btn btn-outline border-0 border-b-2 border-b-orange-600">Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
