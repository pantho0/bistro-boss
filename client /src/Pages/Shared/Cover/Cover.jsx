import { Parallax } from 'react-parallax';


const Cover = ({img}) => {
  return (

    <Parallax
        blur={{ min: -45, max: 45 }}
        bgImage={img}
        bgImageAlt="the dog"
        strength={-200}
    >
         <div
      className="hero h-[400px]"
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Our Menu</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
      </div>
    </div>
    </Parallax>

   
  );
};

export default Cover;
