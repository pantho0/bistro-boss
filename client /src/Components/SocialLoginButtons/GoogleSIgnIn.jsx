import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks /useAuth";
import { useNavigate } from "react-router-dom";

const GoogleSIgnIn = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate()
  const handleGoogleSignIn = () => {
    googleLogin().then((res) => {
      if(res){
        navigate('/')
      }

    });
  };
  return (
    <div className="w-full">
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
