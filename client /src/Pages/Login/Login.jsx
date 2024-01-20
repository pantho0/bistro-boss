import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, validateCaptcha, LoadCanvasTemplateNoReload } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Login = () => {
    const {user, loading} = useContext(AuthContext)
    
    const [disabled, setDisabled] = useState(true)
    useEffect(()=>{
      loadCaptchaEnginge(6)
    },[])
    const captchaTXT = useRef(null)


    const handleValidate = () =>{
      const user_captcha_value = captchaTXT.current.value;
      console.log(user_captcha_value);
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
        console.log(email, password);
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
                ref={captchaTXT}
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
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
