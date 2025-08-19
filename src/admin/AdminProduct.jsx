import axios from "axios";
import { Modal } from "bootstrap";
import { useEffect, useRef, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const GOOGLE_BOOKS_API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

const categories = [
  { label: "親子", api: "親子童書", icon: "nature_people" },
  { label: "商業", api: "商業理財", icon: "query_stats" },
  { label: "藝術", api: "藝術領域", icon: "palette" },
  { label: "社會", api: "人文史地", icon: "people" },
  { label: "心理", api: "心理勵志", icon: "favorite" },
  { label: "自然", api: "自然科學", icon: "wb_sunny" },
  { label: "生活", api: "生活休閒", icon: "sports_martial_arts" },
  { label: "宗教", api: "宗教命理", icon: "temple_buddhist" },
  { label: "哲學", api: "哲學思想", icon: "psychology" },
  { label: "文學", api: "文學小說", icon: "history_edu" },
  { label: "學習", api: "工具學習", icon: "book_3" },
];

const defaultModalState = {
  imageUrl: "",
  imagesUrl: [""],
  is_enabled: 0,
  title: "",
  maintitle: "",
  isbn: "",
  category: "",
  unit: "單位",
  origin_price: "",
  price: "",
  qty: "",
  condition: "",
  conditionDescription: "",
  author: "",
  publisher: "",
  publishdate: "",
  language: "繁體中文",
  description: "",
  mainDescription: "",
};

export default function AdminProduct() {
  const [allProducts, setAllProducts] = useState([]);

  const productModalRef = useRef(null);
  const [modalMode, setModalMode] = useState("");
  const [tempProduct, setTempProduct] = useState(defaultModalState);

  // 取得所有商品
  const getAllProducts = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/products/all`
      );
      setAllProducts(Object.values(res.data.products).reverse());
    } catch (err) {}
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Modal
  const openModal = (mode, product) => {
    setModalMode(mode);

    switch (mode) {
      case "create":
        setTempProduct({ ...defaultModalState });
        break;
      case "edit":
        setTempProduct({
          ...defaultModalState,
          ...product,
        });
        break;
      default:
        break;
    }
    const modalInstance = Modal.getInstance(productModalRef.current);
    modalInstance.show();
  };

  const closeModal = () => {
    const modalInstance = Modal.getInstance(productModalRef.current);
    modalInstance.hide();
  };

  useEffect(() => {
    new Modal(productModalRef.current, {
      backdrop: false,
    });
  }, []);

  const handleModalInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTempProduct({
      ...tempProduct,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdateProduct = async () => {
    const apiCall = modalMode === "create" ? createProduct : editProduct;
    try {
      await apiCall();
      await getAllProducts();
    } catch (err) {}
  };

  // 更新商品
  const editProduct = async () => {
    try {
      const res = await axios.put(
        `${BASE_URL}/v2/api/${API_PATH}/admin/product/${tempProduct.id}`,
        {
          data: cleanProductData(tempProduct),
        }
      );
      closeModal();
    } catch (err) {}
  };

  // 新增商品
  const createProduct = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/v2/api/${API_PATH}/admin/product`,
        {
          data: cleanProductData(tempProduct),
        }
      );
      closeModal();
    } catch (err) {}
  };

  // 手動清理、API需另外設定
  const cleanProductData = (product) => ({
    ...product,
    title: product.title?.trim() || "",
    maintitle: product.maintitle?.trim() || "",
    conditionDescription: product.conditionDescription?.trim() || "",
    author: product.author?.trim() || "",
    publisher: product.publisher?.trim() || "",
    publishdate: product.publishdate?.trim() || "",
    language: product.language?.trim() || "",
    isbn: product.isbn?.trim() || "",
    origin_price: Number(product.origin_price),
    price: Number(product.price),
    qty: Number(product.qty),
    is_enabled: product.is_enabled ? 1 : 0,
  });

  // 刪除商品
  const deleteProduct = async (product_id) => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/v2/api/${API_PATH}/admin/product/${product_id}`
      );
      getAllProducts();
    } catch (err) {}
  };

  // 圖片上傳
  const handleFileChange = async (e) => {
    const formData = new FormData();
    const fileInput = e.target;
    const file = e.target.files[0];

    formData.append("file-to-upload", file);

    try {
      const res = await axios.post(
        `${BASE_URL}/v2/api/${API_PATH}/admin/upload`,
        formData
      );
      const uploadImageUrl = res.data.imageUrl;
      setTempProduct({
        ...tempProduct,
        imageUrl: uploadImageUrl,
      });
      fileInput.value = "";
    } catch (err) {}
  };

  const handleImageChange = (e, index) => {
    const { value } = e.target;
    const newImages = [...tempProduct.imagesUrl];
    newImages[index] = value;

    setTempProduct({
      ...tempProduct,
      imagesUrl: newImages,
    });
  };

  const handleAddImage = () => {
    const newImages = [...tempProduct.imagesUrl, ""];
    setTempProduct({
      ...tempProduct,
      imagesUrl: newImages,
    });
  };

  const handleRemoveImage = () => {
    const newImages = [...tempProduct.imagesUrl];
    newImages.pop();
    setTempProduct({
      ...tempProduct,
      imagesUrl: newImages,
    });
  };

  // Google
  const handleFromISBN = async () => {
    const isbn = tempProduct.isbn;
    if (!isbn) {
      alert("請先輸入ISBN");
      return;
    }
    try {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${GOOGLE_BOOKS_API_KEY}`
      );

      // 先判斷是否有回傳書籍
      if (res.data.totalItems < 1) {
        alert("查無資料，請確認 ISBN 是否正確");
        return;
      }

      const apiBook = res.data.items?.[0];
      const volumeInfo = apiBook.volumeInfo;

      const apiBookTitle = encodeURIComponent(apiBook.volumeInfo.title || "");
      const apiBookId = apiBook.id;
      const googleBookUrl = `https://www.google.com.tw/books/edition/${apiBookTitle}/${apiBookId}?hl=zh-TW&gbpv=0`;

      setTempProduct((prev) => {
        const title = volumeInfo.title?.trim() || prev.title;
        const subtitle = volumeInfo.subtitle?.trim() || "";
        return {
          ...prev,
          imageUrl:
            volumeInfo.imageLinks?.thumbnail?.replace("http://", "https://") ||
            prev.imageUrl,
          imagesUrl: [""],
          title: subtitle ? `${title}：${subtitle}` : title,
          maintitle: title,
          mainDescription: volumeInfo.description
            ? volumeInfo.description.slice(0, 180).trim() + "..."
            : prev.description,
          author: volumeInfo.authors?.[0].trim() || prev.author,
          publisher: volumeInfo.publisher?.trim() || prev.publisher,
          publishdate:
            volumeInfo.publishedDate?.replace(/-/g, "/") || prev.publishdate,
          googleBookUrl,
        };
      });
    } catch (err) {}
  };

  return (
    <>
      <section className="section-seller py-3 vh-100">
        <div className="container">
          <div className="dashboard-card mb-5">
            <h2 className="fs-4 mb-3">儀錶板</h2>
            <ul className="card-list">
              <li>
                <p className="fs-5 text-accent-300 fw-bold">100本</p>
                <p>上架數量</p>
              </li>
              <li>
                <p className="fs-5 text-accent-300 fw-bold">10</p>
                <p>售完數量</p>
              </li>
              <li>
                <p className="fs-5 text-accent-300 fw-bold">100本</p>
                <p>啟用數量</p>
              </li>
              <li>
                <p className="fs-5 text-accent-300 fw-bold">100本</p>
                <p>未啟用數量</p>
              </li>
            </ul>
          </div>
          <div className="dashboard-card">
            <h2 className="fs-4 mb-3">商品管理</h2>
            <div className="row g-3">
              <div className="col-12 col-md-5">
                <div className="form-search d-flex w-100">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="請輸入書名"
                  />
                  <button className="btn">
                    <span className="material-symbols-outlined">search</span>
                  </button>
                </div>
              </div>
              <div className="col-12 col-md-5">
                <select className="form-select">
                  <option disabled>請選擇分類</option>
                  <option>全部商品</option>
                  {categories.map((category) => (
                    <option key={category.api}>{category.api}</option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-2">
                <button
                  onClick={() => openModal("create")}
                  className="btn btn-accent-100 w-100 text-white"
                >
                  新增商品
                </button>
              </div>
              {/* 商品資料渲染 */}
              <div className="col-12">
                {/* 標題 */}
                <div className="product-header py-3">
                  <span className="product-name">產品名稱</span>
                  <span className="product-price d-none d-md-flex">
                    <button>▼</button>
                    售價
                    <button>▲</button>
                  </span>
                  <span className="product-qty d-none d-md-block">數量</span>
                  <span className="product-status d-none d-md-block">狀態</span>
                  <span className="product-action">操作</span>
                </div>
                {/* 內容 */}
                <div className="product-body">
                  {allProducts &&
                    allProducts.map((product) => (
                      <div className="product-item py-3" key={product.id}>
                        <span className="product-name">
                          {product.maintitle}
                          <small className="tag-category ms-2">
                            {product.category}
                          </small>
                        </span>
                        <span className="product-price d-none d-md-block">
                          {product.price}
                        </span>
                        <span className="product-qty d-none d-md-block">
                          {product.qty}
                        </span>
                        <span
                          className={`product-status d-none d-md-block ${
                            product.is_enabled
                              ? "text-success fw-bold"
                              : "text-danger fw-bold"
                          }`}
                        >
                          {product.is_enabled ? "已啟用" : "未啟用"}
                        </span>
                        <span className="product-action">
                          <div className="d-flex gap-2">
                            <button
                              onClick={() => openModal("edit", product)}
                              className="btn btn-sm btn-outline-primary "
                            >
                              編輯
                            </button>
                            <button
                              onClick={() => deleteProduct(product.id)}
                              className="btn btn-sm btn-outline-danger"
                            >
                              刪除
                            </button>
                          </div>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* modal */}
          <div
            id="productModal"
            ref={productModalRef}
            className="modal"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered modal-xl">
              <div className="modal-content border-0 shadow">
                <div className="modal-header border-bottom">
                  <h5 className="modal-title">
                    {modalMode === "create" ? "新增產品" : "編輯產品"}
                  </h5>
                  <button
                    onClick={() => closeModal()}
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="modal-body p-4">
                  <div className="row g-4">
                    <div className="col-lg-4">
                      {/* 圖片上傳 */}
                      <div className="mb-5">
                        <label htmlFor="fileInput" className="form-label">
                          圖片上傳
                        </label>
                        <input
                          onChange={handleFileChange}
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          className="form-control"
                          id="fileInput"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="primary-image" className="form-label">
                          主圖
                        </label>
                        <div className="input-group">
                          <input
                            value={tempProduct.imageUrl}
                            onChange={handleModalInputChange}
                            name="imageUrl"
                            type="text"
                            id="primary-image"
                            className="form-control"
                            placeholder="請輸入圖片連結"
                          />
                        </div>
                        <img
                          src={tempProduct.imageUrl}
                          alt={tempProduct.title}
                          className="img-fluid"
                        />
                      </div>

                      {/* 副圖 */}
                      <div className="border border-2 border-dashed rounded-3 p-3">
                        {tempProduct.imagesUrl?.map((image, index) => (
                          <div key={index}>
                            <label
                              htmlFor={`images-${index + 1}`}
                              className="form-label"
                            >
                              副圖 {index + 1}
                            </label>
                            <input
                              value={image}
                              onChange={(e) => handleImageChange(e, index)}
                              id={`images-${index + 1}`}
                              type="text"
                              className="form-control"
                              placeholder={`圖片網址-${index + 1}`}
                            />
                            {image && (
                              <img
                                src={image}
                                alt={`副圖 ${index + 1}`}
                                className="img-fluid mb-2"
                              />
                            )}
                          </div>
                        ))}

                        <div className="btn-group w-100">
                          {tempProduct.imagesUrl.length < 5 &&
                            tempProduct.imagesUrl.length[
                              tempProduct.imagesUrl.length - 1
                            ] !== "" && (
                              <button
                                onClick={handleAddImage}
                                className="btn btn-outline-primary btn-sm w-100"
                              >
                                新增圖片
                              </button>
                            )}
                          {tempProduct.imagesUrl.length > 1 && (
                            <button
                              onClick={handleRemoveImage}
                              className="btn btn-outline-danger btn-sm w-100"
                            >
                              取消圖片
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-8">
                      <div className="row g-4">
                        <div className="col-6">
                          <label htmlFor="title" className="form-label">
                            標題
                          </label>
                          <input
                            value={tempProduct.title}
                            onChange={handleModalInputChange}
                            name="title"
                            id="title"
                            type="text"
                            className="form-control"
                            placeholder="請輸入標題"
                          />
                        </div>
                        <div className="col-6">
                          <label htmlFor="maintitle" className="form-label">
                            簡短標題
                          </label>
                          <input
                            value={tempProduct.maintitle}
                            onChange={handleModalInputChange}
                            name="maintitle"
                            id="maintitle"
                            type="text"
                            className="form-control"
                            placeholder="請輸入簡短標題"
                          />
                        </div>
                        <div className="col-12">
                          <label htmlFor="isbn" className="form-label">
                            ISBN
                          </label>
                          <div className="input-group">
                            <input
                              value={tempProduct.isbn}
                              onChange={handleModalInputChange}
                              name="isbn"
                              id="isbn"
                              type="text"
                              className="form-control"
                              placeholder="請輸入ISBN"
                            />
                            <button
                              onClick={handleFromISBN}
                              className="btn btn-secondary"
                              type="button"
                            >
                              搜尋
                            </button>
                          </div>

                          {/* 加在這裡，搜尋成功才顯示 */}
                          {tempProduct.googleBookUrl && (
                            <div className="mt-2">
                              <a
                                href={tempProduct.googleBookUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-link p-0"
                              >
                                🔗 查看此書在 Google 圖書
                              </a>
                            </div>
                          )}
                          {/* <input
                          value={tempProduct.isbn}
                          onChange={handleModalInputChange}
                          name="isbn"
                          id="isbn"
                          type="number"
                          className="form-control"
                          placeholder="請輸入ISBN"
                        /> */}
                        </div>
                        <div className="col-12">
                          <label htmlFor="category" className="form-label">
                            分類
                          </label>
                          <select
                            value={tempProduct.category}
                            onChange={handleModalInputChange}
                            name="category"
                            id="category"
                            type="text"
                            className="form-control"
                          >
                            <option value="" disabled>
                              請選擇分類
                            </option>
                            {categories.map((category) => (
                              <option key={category.api} value={category.api}>
                                {category.api}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-6">
                          <label htmlFor="origin_price" className="form-label">
                            原價
                          </label>
                          <input
                            value={tempProduct.origin_price}
                            onChange={handleModalInputChange}
                            name="origin_price"
                            id="origin_price"
                            type="number"
                            className="form-control"
                            placeholder="請輸入原價"
                            min="0"
                          />
                        </div>
                        <div className="col-6">
                          <label htmlFor="price" className="form-label">
                            售價
                          </label>
                          <input
                            value={tempProduct.price}
                            onChange={handleModalInputChange}
                            name="price"
                            id="price"
                            type="number"
                            className="form-control"
                            placeholder="請輸入售價"
                            min="0"
                          />
                        </div>
                        <div className="col-6">
                          <label htmlFor="qty" className="form-label">
                            數量
                          </label>
                          <input
                            value={tempProduct.qty}
                            onChange={handleModalInputChange}
                            name="qty"
                            id="qty"
                            type="number"
                            className="form-control"
                            placeholder="請輸入數量"
                            min="0"
                          />
                        </div>
                        <div className="col-6">
                          <label htmlFor="condition" className="form-label">
                            書況標籤
                          </label>
                          <select
                            value={tempProduct.condition}
                            onChange={handleModalInputChange}
                            name="condition"
                            id="condition"
                            className="form-select"
                          >
                            <option value="">請選擇書況</option>
                            <option value="A">A（極少翻閱，接近新書）</option>
                            <option value="B">B（輕微使用痕跡）</option>
                            <option value="C">C（可能含筆記、劃線）</option>
                            <option value="D">
                              D（可能嚴重泛黃、書斑、磨損）
                            </option>
                          </select>
                        </div>
                        <div className="col-12">
                          <label
                            htmlFor="conditionDescription"
                            className="form-label"
                          >
                            書況說明
                          </label>
                          <textarea
                            value={tempProduct.conditionDescription}
                            onChange={handleModalInputChange}
                            name="conditionDescription"
                            id="conditionDescription"
                            type="text"
                            className="form-control"
                            placeholder="請輸入書況說明"
                          ></textarea>
                        </div>
                        <div className="col-6">
                          <label htmlFor="author" className="form-label">
                            作者
                          </label>
                          <input
                            value={tempProduct.author}
                            onChange={handleModalInputChange}
                            name="author"
                            id="author"
                            type="text"
                            className="form-control"
                            placeholder="請輸入作者"
                          />
                        </div>
                        <div className="col-6">
                          <label htmlFor="publisher" className="form-label">
                            出版社
                          </label>
                          <input
                            value={tempProduct.publisher}
                            onChange={handleModalInputChange}
                            name="publisher"
                            id="publisher"
                            type="text"
                            className="form-control"
                            placeholder="請輸入出版社"
                          />
                        </div>
                        <div className="col-6">
                          <label htmlFor="publishdate" className="form-label">
                            出版日期{" "}
                            <span className="ms-2 text-danger">
                              （西元年/月/日）
                            </span>
                          </label>
                          <input
                            value={tempProduct.publishdate}
                            onChange={handleModalInputChange}
                            name="publishdate"
                            id="publishdate"
                            type="text"
                            className="form-control"
                            placeholder="請輸入出版日期"
                          />
                        </div>
                        <div className="col-6">
                          <label htmlFor="language" className="form-label">
                            語言
                          </label>
                          <input
                            value={tempProduct.language}
                            onChange={handleModalInputChange}
                            name="language"
                            id="language"
                            type="text"
                            className="form-control"
                            placeholder="請輸入語言"
                          />
                        </div>

                        <div className="col-12">
                          <label htmlFor="description" className="form-label">
                            完整簡介
                          </label>
                          <textarea
                            value={tempProduct.description}
                            onChange={handleModalInputChange}
                            name="description"
                            id="description"
                            className="form-control"
                            rows={4}
                            placeholder="請輸入完整簡介"
                          ></textarea>
                        </div>
                        <div className="col-12">
                          <label
                            htmlFor="mainDescription"
                            className="form-label"
                          >
                            簡短簡介
                            <span className="ms-2 text-danger">
                              （字數限制180字）
                            </span>
                          </label>
                          <textarea
                            value={tempProduct.mainDescription}
                            onChange={handleModalInputChange}
                            name="mainDescription"
                            id="mainDescription"
                            className="form-control"
                            rows={4}
                            placeholder="請輸入簡短簡介"
                            maxLength={180}
                          ></textarea>
                        </div>
                      </div>
                      <div className="form-check mt-4">
                        <input
                          checked={tempProduct.is_enabled}
                          onChange={handleModalInputChange}
                          name="is_enabled"
                          type="checkbox"
                          className="form-check-input"
                          id="isEnabled"
                        />
                        <label className="form-check-label" htmlFor="isEnabled">
                          是否啟用
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-top bg-light">
                  <button
                    onClick={() => closeModal()}
                    type="button"
                    className="btn btn-secondary"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleUpdateProduct}
                    type="button"
                    className="btn btn-primary"
                  >
                    確認
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
