import axios from "axios";
import { BASE_URL, API_PATH } from "../data/config";
import { useEffect, useMemo, useState } from "react";

const defaultModalState = {
  title: "",
  description: "",
  is_enabled: false,
  percent: null,
  due_date: null,
  code: "",
};

export default function Coupon() {
  const [allCoupons, setAllCoupons] = useState([]);

  const [tempCoupon, setTempCoupon] = useState(defaultModalState);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("");

  const [search, setSearch] = useState("");

  // 取得所有優惠券
  const getAllCoupons = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/coupons`
      );
      setAllCoupons(res.data.coupons);
    } catch (err) {}
  };

  useEffect(() => {
    getAllCoupons();
  }, []);

  // 刪除
  const deleteCoupon = async (coupon_id) => {
    try {
      await axios.delete(
        `${BASE_URL}/v2/api/${API_PATH}/admin/coupon/${coupon_id}`
      );
      await getAllCoupons();
    } catch (err) {}
  };

  // 新增
  const createCoupon = async () => {
    try {
      await axios.post(`${BASE_URL}/v2/api/${API_PATH}/admin/coupon`, {
        data: cleanCouponData(tempCoupon),
      });
      closeModal();
    } catch (err) {}
  };

  // 更新
  const editCoupon = async () => {
    try {
      await axios.put(
        `${BASE_URL}/v2/api/${API_PATH}/admin/coupon/${tempCoupon.id}`,
        {
          data: cleanCouponData(tempCoupon),
        }
      );
      closeModal();
    } catch (err) {}
  };

  const handleUpdateCoupon = async () => {
    const apiCall = modalMode === "create" ? createCoupon : editCoupon;
    try {
      await apiCall();
      await getAllCoupons();
    } catch (err) {}
  };

  // Modal
  const openModal = (mode, coupon) => {
    setModalMode(mode);

    switch (mode) {
      case "create":
        setTempCoupon({ ...defaultModalState });
        break;
      case "edit":
        setTempCoupon({
          ...defaultModalState,
          ...coupon,
        });
        break;
      default:
        break;
    }

    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  // 手動清理、API需另外設定
  const cleanCouponData = (coupon) => ({
    ...coupon,
    title: coupon.title?.trim() || "",
    description: coupon.description?.trim() || "",
    is_enabled: coupon.is_enabled ? 1 : 0,
    percent: Number(coupon.percent),
    due_date: coupon.due_date || Math.floor(Date.now() / 1000),
    code: coupon.code?.trim() || "",
  });

  // helper：秒數 -> yyyy-mm-dd（給 input 用）
  const toDateInputValue = (sec) => {
    if (sec === null || sec === undefined) return "";
    const d = new Date(sec * 1000);
    if (Number.isNaN(d.getTime())) return "";
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  // 更穩健的 input handler（只在完整 yyyy-mm-dd 時解析）
  const handleModalInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // checkbox 直接用 checked
    if (type === "checkbox") {
      setTempCoupon((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    // date 處理：只有完整格式才解析成秒數
    if (name === "due_date") {
      if (value === "") {
        // 使用者清空
        setTempCoupon((prev) => ({ ...prev, due_date: null }));
        return;
      }

      // 只接受完整 yyyy-mm-dd 格式（避免中間輸入造成 Invalid Date）
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        // 還在輸入中，暫時不更新 state（或你也可以選擇不 return，而是 set raw string）
        return;
      }

      const ms = Date.parse(value); // 轉成毫秒
      if (Number.isNaN(ms)) {
        setTempCoupon((prev) => ({ ...prev, due_date: null }));
        return;
      }

      setTempCoupon((prev) => ({ ...prev, due_date: Math.floor(ms / 1000) }));
      return;
    }

    // 其他 text
    setTempCoupon((prev) => ({ ...prev, [name]: value }));
  };

  // 搜尋
  const filteredSearchCoupons = useMemo(() => {
    if (!search.trim()) return allCoupons;

    const lowerKeyword = search.trim().toLowerCase();
    return allCoupons.filter(
      (coupon) =>
        coupon.title?.toLowerCase().includes(lowerKeyword) ||
        coupon.code?.toLowerCase().includes(lowerKeyword)
    );
  }, [allCoupons, search]);

  return (
    <>
      <section className="section-seller py-3">
        <div className="container">
          <div className="dashboard-card mb-5">
            <h2 className="fs-4 mb-3">儀錶板</h2>
            <ul className="card-list">
              <li>
                <p className="fs-5 text-accent-300 fw-bold">
                  {allCoupons.length}
                </p>
                <p>總數量</p>
              </li>
              <li>
                <p className="fs-5 text-accent-300 fw-bold">
                  {allCoupons.filter((p) => p.is_enabled === 1).length}
                </p>
                <p>啟用數量</p>
              </li>
              <li>
                <p className="fs-5 text-accent-300 fw-bold">
                  {allCoupons.filter((p) => p.is_enabled === 0).length}
                </p>
                <p>未啟用數量</p>
              </li>
            </ul>
          </div>
          <div className="dashboard-card">
            <h2 className="fs-4 mb-3">優惠券管理</h2>
            <div className="row g-3">
              <div className="col-12 col-md-8">
                <div className="form-search d-flex w-100">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="search"
                    className="form-control"
                    placeholder="請輸入優惠券名稱或代碼"
                  />
                  <button className="btn">
                    <span className="material-symbols-outlined">search</span>
                  </button>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <button
                  onClick={() => openModal("create")}
                  className="btn btn-accent-100 w-100 text-white"
                >
                  新增商品
                </button>
              </div>
              {/* 資料渲染 */}
              <div className="col-12">
                {/* 標題 */}
                <div className="admin-list-header py-3">
                  <span className="admin-flex-1-0">優惠券名稱</span>
                  <span className="admin-flex-1-0">優惠券代碼</span>
                  <span className="admin-flex-1-0 d-none d-md-block">
                    到期日
                  </span>
                  <span className="admin-flex-1-0">狀態</span>
                  <span className="admin-action">操作</span>
                </div>
                {/* 內容 */}
                <div className="product-body">
                  {filteredSearchCoupons.map((coupon) => (
                    <div className="admin-list-item py-3" key={coupon.id}>
                      <span className="admin-flex-1-0">{coupon.title}</span>
                      <span className="admin-flex-1-0">{coupon.code}</span>
                      <span className="admin-flex-1-0 d-none d-md-block">
                        {new Date(coupon.due_date * 1000).toLocaleString(
                          "zh-TW"
                        )}
                      </span>
                      <span className="admin-flex-1-0">
                        {coupon.is_enabled ? "已啟用" : "未啟用"}
                      </span>
                      <span className="admin-action">
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            onClick={() => openModal("edit", coupon)}
                            className="btn btn-sm btn-outline-primary"
                          >
                            編輯
                          </button>
                          <button
                            onClick={() => deleteCoupon(coupon.id)}
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
          {modalVisible && (
            <div
              className="modal show"
              style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content border-0 shadow">
                  <div className="modal-header border-bottom">
                    <h5 className="modal-title">
                      {modalMode === "create" ? "新增優惠券" : "編輯優惠券"}
                    </h5>
                    <button
                      onClick={() => closeModal()}
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                    ></button>
                  </div>

                  <div className="modal-body p-4">
                    <div className="mb-3">
                      <label className="form-label">名稱</label>
                      <input
                        value={tempCoupon.title}
                        onChange={handleModalInputChange}
                        name="title"
                        id="title"
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">描述</label>
                      <input
                        value={tempCoupon.description}
                        onChange={handleModalInputChange}
                        name="description"
                        id="description"
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">代碼</label>
                      <input
                        value={tempCoupon.code}
                        onChange={handleModalInputChange}
                        name="code"
                        id="code"
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">折扣百分比</label>
                      <input
                        value={tempCoupon.percent}
                        onChange={handleModalInputChange}
                        name="percent"
                        id="percent"
                        type="number"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">到期日</label>
                      <input
                        value={toDateInputValue(tempCoupon.due_date)}
                        onChange={handleModalInputChange}
                        name="due_date"
                        id="dueDate"
                        type="date"
                        className="form-control"
                      />
                    </div>
                    <div className="form-check mt-4">
                      <input
                        checked={tempCoupon.is_enabled}
                        onChange={handleModalInputChange}
                        name="is_enabled"
                        type="checkbox"
                        className="form-check-input"
                      />
                      <label className="form-check-label" htmlFor="isEnabled">
                        是否啟用
                      </label>
                    </div>
                  </div>

                  {/* footer */}
                  <div className="modal-footer border-top bg-light">
                    <button
                      onClick={() => closeModal()}
                      type="button"
                      className="btn btn-secondary"
                    >
                      取消
                    </button>
                    <button
                      onClick={() => handleUpdateCoupon()}
                      type="button"
                      className="btn btn-primary"
                    >
                      確認
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
