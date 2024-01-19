import { useContext} from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form"

const Signup = () => {
    const {user, loading} = useContext(AuthContext)
    const {register,handleSubmit,watch,formState: { errors }} = useForm()
    
    const onSubmit = (data) => {
        console.log(data)
    }

    
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Signup now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name Here"
                className="input input-bordered"
                {...register("name", {required:true})}
              />
              {errors.name && <span className='text-red-500 text-center mt-2'>Name field is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", {required:true})}
              />
              {errors.email && <span className='text-red-500 text-center mt-2'>Email field is required</span>}
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
                {...register("password", {required:true, maxLength:5})}
              />
              {errors.password && <span className='text-red-500 text-center mt-2'>Password field is required</span>}
            </div>

            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Signup" />
            </div>
            <p className='text-center'><small>Already have an account <Link to={'/login'} className='text-orange-600 cursor-pointer font-bold'>Login Here</Link></small></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
