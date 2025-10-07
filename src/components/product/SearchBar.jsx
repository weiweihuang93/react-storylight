import { useState } from "react";
import SearchModal from "./SearchModal";

export default function SearchBar({ productsData }) {
  // 搜尋商品
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [visible, setVisible] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    // 先篩選 使用商品名稱 (title) 或描述 (description) 進行比對
    const filteredAndSorted = productsData
      .filter(
        (product) =>
          product.title.toLowerCase().includes(keyword.toLowerCase()) ||
          product.description.toLowerCase().includes(keyword.toLowerCase())
      )
      // 再排序
      .sort((a, b) => a.price - b.price);

    setResults(filteredAndSorted);
    setVisible(true);
  };

  return (
    <>
      <form className="d-flex align-items-center" onSubmit={handleSearch}>
        <input
          className="form-control mx-w-search"
          type="search"
          placeholder="請輸入關鍵字"
          aria-label="Search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit" className="btn btn-accent-300 btn-arrow border-0">
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </form>

      {/* <!-- 搜尋結果 Modal --> */}

      <SearchModal
        visible={visible}
        keyword={keyword}
        results={results}
        onClose={() => setVisible(false)}
      />
    </>
  );
}
