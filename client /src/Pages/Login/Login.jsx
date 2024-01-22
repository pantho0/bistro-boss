import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, validateCaptcha, LoadCanvasTemplateNoReload } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link,useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import GoogleSIgnIn from '../../Components/SocialLoginButtons/GoogleSIgnIn';

const Login = () => {
    const {signIn} = useContext(AuthContext)
    const location = useLocation();
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/";

    
    const [disabled, setDisabled] = useState(true)
    useEffect(()=>{
      loadCaptchaEnginge(6)
    },[])



    const handleValidate = (e) =>{
      const user_captcha_value = e.target.value;
      if (validateCaptcha(user_captcha_value)==true) {
        setDisabled(false)
    }
    else {
        setDisabled(true)
    }
    }

    const handleLogin = e =>{
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
        .then(user=>{
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Login SUccess${user?.email}`,
            showConfirmButton: false,
            timer: 1500
          })
          navigate(from, {replace:true})
        })
        .catch(error=>{
          console.log(error.meassage)
        })
    }
  return (
    <>
    <Helmet>
        <title>BISTRO BOSS || Login</title>
      </Helmet>
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"   
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
              <LoadCanvasTemplateNoReload/>
              </label>
              <div>
              </div>
              <input
                type="text"
                name="captcha"
                onBlur={handleValidate} 
                placeholder="Type the captcha above"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <input disabled={disabled} className="btn btn-primary" type="submit" value="Login" />
            </div>
            <p className='text-center'><small>Don&apos;t Have an account <Link to={'/signup'} className='text-orange-600 cursor-pointer font-bold'>Sign Up Here</Link></small></p>
          </form>
          <div className="divider">OR</div>
              <GoogleSIgnIn/>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
