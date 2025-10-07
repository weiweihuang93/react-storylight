import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import SkeletonProduct from "@/components/product/SkeletonProduct";
import ProductCard from "@/components/product/ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function ProductSwiper({ title, productsData, loading }) {
  const { addToCart, cartData, loadingId, favorites, toggleFavorite } =
    useContext(AppContext);

  return (
    <section className="section-product">
      <div className="container py-6">
        <div className="section-title mb-6">
          <h2 className="fs-lg-2 fs-3 title-decoration">{title}</h2>
        </div>

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
            : productsData.map((product) => {
                const isProductInCart = cartData.carts.some(
                  (cartItem) => cartItem.product_id === product.id
                );

                return (
                  <SwiperSlide key={product.id}>
                    <ProductCard
                      product={product}
                      isProductInCart={isProductInCart}
                      addToCart={addToCart}
                      isFavorite={!!favorites[product.id]}
                      toggleFavorite={toggleFavorite}
                      loadingId={loadingId}
                    />
                  </SwiperSlide>
                );
              })}
        </Swiper>
      </div>
    </section>
  );
}
