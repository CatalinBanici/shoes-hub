// DATA
import data from "../../../data/data.json";

// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  A11y,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Carousel() {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        scrollbar={{ draggable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSlideChange={() => null}
        onSwiper={(swiper) => null}
      >
        {data.carousel.map((element) => (
          <SwiperSlide key={element.id}>
            <img
              className="h-screen w-screen object-cover"
              src={element.image}
              alt={element.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
