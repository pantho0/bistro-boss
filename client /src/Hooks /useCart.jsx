import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import axios from "axios";


const useCart = () => {
    const axiosSecure = useAxiosSecure()

    const {data: cart=[]} = useQuery({
        queryKey: ['cart'],
        queryFn: async()=>{
            const {data} = await axiosSecure.get('/carts')
            console.log(data);
            return data;
        }

    })
    return [cart];
};

export default useCart;