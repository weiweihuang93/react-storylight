import { useContext, memo } from "react";
import SkeletonProduct from "@/components/product/SkeletonProduct";
import ProductCard from "@/components/product/ProductCard";
import { FavoritesContext } from "@/context/FavoritesContext";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function ProductSwiper({ productsData, loading }) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  return (
    <Swiper
      className="py-3"
      spaceBetween={16}
      slidesPerView={1}
      loop={productsData?.length >= 5}
      breakpoints={{
        768: { slidesPerView: 3 },
        992: { slidesPerView: 4 },
        1200: { slidesPerView: 5 },
      }}
    >
      {loading
        ? Array.from({ length: 5 }).map((_, idx) => (
            <SwiperSlide key={idx}>
              <SkeletonProduct />
            </SwiperSlide>
          ))
        : productsData.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard
                product={product}
                isFavorite={!!favorites[product.id]}
                toggleFavorite={toggleFavorite}
              />
            </SwiperSlide>
          ))}
    </Swiper>
  );
}

// 使用 memo 避免不必要的重新渲染
export default memo(ProductSwiper);
