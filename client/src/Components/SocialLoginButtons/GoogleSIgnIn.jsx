import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const GoogleSIgnIn = () => {
  const { googleLogin } = useAuth();
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate()
  const handleGoogleSignIn = () => {
    googleLogin().then((res) => {
      console.log(res.user);
      const userInfo = {
        name : res.user.displayName,
        email: res.user.email

      }
      axiosPublic.post('/users', userInfo)
      .then(res => {
        console.log(res.data)
        navigate('/')
      })
    });
  };
  return (
    <div className="w-full p-10">
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-outline btn-secondary w-full"
      >
        <FaGoogle /> SignIn with Google
      </button>
    </div>
  );
};

export default GoogleSIgnIn;
