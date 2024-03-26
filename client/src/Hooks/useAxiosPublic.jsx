import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://backend-eight-mu.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;