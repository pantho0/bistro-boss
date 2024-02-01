import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import catImg1 from "../../../assets/home/slide1.jpg";
import catImg2 from "../../../assets/home/slide2.jpg";
import catImg3 from "../../../assets/home/slide3.jpg";
import catImg4 from "../../../assets/home/slide4.jpg";
import catImg5 from "../../../assets/home/slide5.jpg";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const Category = () => {
  return (
   <section>
    <SectionTitle subHeading={'From 11:00am to 10:00pm'} heading={'ORDER ONLINE'} />
     <Swiper
      slidesPerView={4}
      spaceBetween={30}
      centeredSlides={true}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper mt-8 mb-8"
    >
      <SwiperSlide>
        <img src={catImg1} alt="" />
        <h5 className="text-3xl text-center font-bold text-black -mt-24 uppercase">Salads</h5>
      </SwiperSlide>
      <SwiperSlide>
        <img src={catImg2} alt="" />
        <h5 className="text-3xl text-center font-bold text-black -mt-24 uppercase">Pizza</h5>
      </SwiperSlide>
      <SwiperSlide>
        <img src={catImg3} alt="" />
        <h5 className="text-3xl text-center font-bold text-black -mt-24 uppercase">soup</h5>
      </SwiperSlide>
      <SwiperSlide>
        <img src={catImg4} alt="" />
        <h5 className="text-3xl text-center font-bold text-black -mt-24 uppercase">dessert </h5>
      </SwiperSlide>
      <SwiperSlide>
        <img src={catImg5} alt="" />
        <h5 className="text-3xl text-center font-bold text-black -mt-24 uppercase">Salad</h5>
      </SwiperSlide>
    </Swiper>
   </section>
  );
};

export default Category;
