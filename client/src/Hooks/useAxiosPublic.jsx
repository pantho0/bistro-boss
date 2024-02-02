import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://backend-wwy74gk0y-pantho-mashrekys-projects.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;