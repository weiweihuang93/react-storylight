export default function SkeletonProduct() {
  return (
    <>
      <div className="product-card card-transY skeleton-card">
        {/* 圖片區 */}
        <div className="card-img-wrapper">
          <div className="skeleton skeleton-img"></div>
        </div>

        {/* 資訊區 */}
        <div className="card-info">
          <div className="skeleton skeleton-text title mb-2"></div>
          <ul className="product-list">
            {Array.from({ length: 5 }).map((__, i) => (
              <li key={i} className="skeleton skeleton-text"></li>
            ))}
          </ul>
          <div className="skeleton skeleton-price"></div>
        </div>

        {/* 操作按鈕 */}
        <div className="card-operation">
          <div className="skeleton skeleton-btn"></div>
          <div className="skeleton skeleton-btn"></div>
        </div>
      </div>
    </>
  );
}
