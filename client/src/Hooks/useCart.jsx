import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";



const useCart = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const {refetch, data: cart=[]} = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async()=>{
            const {data} = await axiosSecure.get(`/carts?email=${user.email}`)
            return data;
        }

    })
    return [cart, refetch];
};

export default useCart;