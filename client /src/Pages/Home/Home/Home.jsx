import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import FeaturedItem from "../FeaturedItem/FeaturedItem";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonial from "../Testimonial/Testimonial";


const Home = () => {
    return (
        <div>
            <Banner/>
            <Category/>
            <PopularMenu/>
            <FeaturedItem/>
            <Testimonial/>
        </div>
    );
};

export default Home;