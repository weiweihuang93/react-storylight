export default function SkeletonCategoryProduct() {
  return (
    <div className="col-12">
      <div className="product-card card-transY skeleton-card">
        <div className="row g-3">
          {/* 圖片區 */}
          <div className="col-lg-4 col-sm-6 col-6 d-flex flex-column">
            <div className="card-img-wrapper">
              <div className="skeleton skeleton-img"></div>
            </div>
            <div className="card-operation mt-auto">
              <div className="skeleton skeleton-btn"></div>
              <div className="skeleton skeleton-btn"></div>
            </div>
          </div>

          {/* 商品資訊 */}
          <div className="col-lg-4 col-sm-6 col-6">
            <div className="card-info h-100 d-flex flex-column">
              <div className="skeleton skeleton-text title"></div>
              <ul className="product-list">
                {Array.from({ length: 5 }).map((__, i) => (
                  <li key={i} className="skeleton skeleton-text"></li>
                ))}
              </ul>
              <div className="skeleton skeleton-price mt-auto"></div>
            </div>
          </div>

          {/* Content 區 */}
          <div className="col-lg-4 col-sm-12 col-12 border-custom">
            <div className="card-content">
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
