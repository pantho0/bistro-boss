import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImage from "../../../assets/home/featured.jpg"
import './Featured.css'


const FeaturedItem = () => {
    return (
        <div className="my-20 featured-item py-10 bg-fixed text-white   ">
            <SectionTitle subHeading={'Check It Out'} heading={'Featured Items'}/>
            <div className="md:flex gap-16 justify-center items-center px-40">
                <img className="w-2/4" src={featuredImage} alt="Featured Food of Bistro Boss" />
                <div>
                    <p>11 July, 1995</p>
                    <h6>Where Can I Get Some?</h6>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae optio, aspernatur voluptate neque nemo saepe quia possimus, explicabo quaerat hic asperiores. Temporibus excepturi vitae quia dignissimos accusamus culpa mollitia ratione aspernatur ad quasi. Deleniti optio omnis nesciunt ratione dolorum, nemo, ipsa nostrum illum esse, facere id a corporis. Accusamus, incidunt.</p>
                    <button className="btn btn-outline border-0 border-b-2 border-b-gray-100">Read More</button>
                </div>
            </div>
        </div>
    );
};

export default FeaturedItem;