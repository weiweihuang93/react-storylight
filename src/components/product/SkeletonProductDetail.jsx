export default function SkeletonProductDetail() {
  return (
    <div className="row g-3">
      {/* 左邊圖片區 Skeleton */}
      <div className="col-lg-6 col-12">
        <div className="d-flex flex-column">
          <div className="skeleton skeleton-main"></div>
          <div className="skeleton-thumbs">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="skeleton skeleton-thumb-img"></div>
            ))}
          </div>
        </div>
      </div>

      {/* 商品描述 Skeleton */}
      <div className="col-lg-6 col-12">
        <div className="card-info h-100 py-0 d-flex flex-column">
          {/* 標題 */}
          <div className="skeleton skeleton-text title"></div>

          {/* 內容 */}
          <div className="card-content">
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
          </div>

          {/* 商品細節 */}
          <ul className="product-list mb-4">
            {Array.from({ length: 6 }).map((__, i) => (
              <li key={i} className="skeleton skeleton-text"></li>
            ))}
          </ul>

          {/* 購買操作區 */}
          <div className="card-shop mb-2">
            <div className="skeleton-quantity">
              <div className="skeleton skeleton-btn"></div>
              <div className="skeleton skeleton-number"></div>
              <div className="skeleton skeleton-btn"></div>
            </div>

            {/* 價格區 */}
            <div className="skeleton-price-column">
              <div className="skeleton skeleton-price"></div>
              <div className="skeleton skeleton-price"></div>
            </div>
          </div>
          {/* 操作按鈕 */}
          <div className="card-operation mt-auto">
            <div className="skeleton skeleton-btn"></div>
            <div className="skeleton skeleton-btn"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
