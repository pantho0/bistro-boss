import useCart from "../../../Hooks /useCart";



const Cart = () => {
    const [cart] = useCart()
    const totalPrice = cart.reduce((total, item) => total+item?.price, 0)
    console.log(totalPrice);
    return (
        <>
        <div className="flex justify-evenly items-center text-3xl font-medium">
            <p>Total Orders : {cart.length}</p>
            <p>Total Price : {totalPrice}</p>
            <button className="btn btn-info bg-orange-400 border-none">Pay</button>
        </div>
        <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
                cart.map(item=><tr key={item._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={item?.image} alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {item?.name}
                      <br/>
                    </td>
                    <td>{item?.price}</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>)
            }
            
          </tbody>
        </table>
      </div>
        </>
    );
};

export default Cart;