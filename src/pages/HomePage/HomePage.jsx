import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-slider-container">
      <Swiper
        direction="vertical"
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        speed={1500}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="home-swiper"
      >
        <SwiperSlide>
          <div className="slide" style={{ backgroundImage: 'url(/images/montenegro1.png)' }}>
            <div className="text-box">
              <h1>Meet2Explore MNE</h1>
              <p>Find travel partners and explore Montenegro</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide" style={{ backgroundImage: 'url(/images/montenegro2.png)' }}>
            <div className="text-box">
              <h1>Discover Hidden Places</h1>
              <p>Mountains, lakes and coastline</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide" style={{ backgroundImage: 'url(/images/montenegro3.png)' }}>
            <div className="text-box">
              <h1>Plan Your Trips</h1>
              <p>Create or join group adventures</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide" style={{ backgroundImage: 'url(/images/montenegro4.png)' }}>
            <div className="text-box">
              <h1>Meet New People</h1>
              <p>Travel safer and never alone</p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide" style={{ backgroundImage: 'url(/images/montenegro5.png)' }}>
            <div className="text-box">
              <h1>Welcome to Meet2Explore</h1>
              <p>Your travel buddy platform</p>
            </div>
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  );
};

export default HomePage;