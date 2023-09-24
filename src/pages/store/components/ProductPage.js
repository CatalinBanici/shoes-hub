import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  FreeMode,
  Navigation,
  Thumbs,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./SwiperStyles.css";

export default function ProductPage() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const product = useSelector((state) => state.products.singleProduct);
  const images = product[0].gallery.images.map((image) => {
    return image;
  });
  console.log(images);
  console.log("product", product);
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-row">
      <div className=" m-10 w-[45%]">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          pagination={{ clickable: true }}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs, Pagination]}
          className="mySwiper2"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img className="w-full" src={image} alt="shoes images" />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={false}
          spaceBetween={10}
          slidesPerView={4}
          scrollbar={{ draggable: true }}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs, Scrollbar]}
          className="mySwiper"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt="shoes images" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="m-10 w-[55%]">
        <h1>{product[0].name}</h1>
      </div>
    </div>
  );
}
