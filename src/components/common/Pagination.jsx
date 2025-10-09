export default function Pagination({ pagination, onPageChange }) {
  if (!pagination) return null;

  const { current_page, total_pages, has_pre, has_next } = pagination;

  return (
    <nav className="pagination-container" aria-label="分頁導航">
      <ul className="pagination">
        {/* 上一頁 */}
        <li className={`page-item ${has_pre ? "" : "disabled"}`}>
          <a
            onClick={(e) => {
              e.preventDefault();
              if (has_pre) onPageChange(current_page - 1);
            }}
            className="page-link"
            href="#"
          >
            上一頁
          </a>
        </li>

        {/* 頁碼 */}
        {Array.from({ length: total_pages }).map((_, index) => (
          <li
            key={index}
            className={`page-item ${current_page === index + 1 ? "active" : ""}`}
          >
            <a
              onClick={(e) => {
                e.preventDefault();
                onPageChange(index + 1);
              }}
              className="page-link"
              href="#"
            >
              {index + 1}
            </a>
          </li>
        ))}

        {/* 下一頁 */}
        <li className={`page-item ${has_next ? "" : "disabled"}`}>
          <a
            onClick={(e) => {
              e.preventDefault();
              if (has_next) onPageChange(current_page + 1);
            }}
            className="page-link"
            href="#"
          >
            下一頁
          </a>
        </li>
      </ul>
    </nav>
  );
}
