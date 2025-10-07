import { NavLink } from "react-router";

export default function SearchModal({ visible, keyword, results, onClose }) {
  if (!visible) return null;
  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content rounded-3 shadow">
          {/* header */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">搜尋結果</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          {/* body */}
          <div className="modal-body">
            <p className="text-muted mb-4">
              關鍵字：「
              <span className="fw-semibold text-dark">{keyword}</span>
              」共找到 <span className="fw-semibold">
                {results?.length}
              </span>{" "}
              筆結果
            </p>

            {results?.length > 0 ? (
              <div className="list-group">
                {results.map((product) => (
                  <NavLink
                    key={product.id}
                    to={`/${product.category}/${product.id}`}
                    className="text-decoration-none text-dark"
                    onClick={onClose} // 點擊後關閉
                  >
                    <div className="list-group-item d-flex align-items-center">
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="me-3 rounded"
                        style={{
                          width: "60px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <h6 className="mb-1 fw-semibold">{product.title}</h6>
                        <small className="text-muted">
                          NT$ {product.price}
                        </small>
                      </div>
                    </div>
                  </NavLink>
                ))}
              </div>
            ) : (
              <p className="text-danger">沒有找到相關商品</p>
            )}
          </div>

          {/* footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              關閉
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
