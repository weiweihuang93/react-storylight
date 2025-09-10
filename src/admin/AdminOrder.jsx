import axios from "axios";
import { BASE_URL, API_PATH } from "../data/config";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { addToast } from "../redux/toastSlice";

export default function AdminOrder() {
  const [allOrders, setAllOrders] = useState([]);
  const [pagination, setPagination] = useState({});

  const [selectedOrder, setSelectedOrder] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  // 篩選 不支援分頁
  const [allOrdersWithoutPagination, setAllOrdersWithoutPagination] = useState(
    []
  );
  const [selectedIsPaid, setSelectedIsPaid] = useState("");
  const [selectedIsDelivery, setSelectedIsDelivery] = useState("");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  // 取得所有訂單
  // 實現篩選訂單
  const getAllOrdersWithoutPagination = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/orders`
      );

      // 補上預設值
      const ordersWithDefaults = res.data.orders.map((order) => ({
        ...order,
        is_delivery: order.is_delivery || "待確認",
        note: order.note || "",
      }));

      setAllOrdersWithoutPagination(ordersWithDefaults);
    } catch (err) {
      dispatch(addToast(err.response.data));
    }
  };

  // 篩選
  const filteredOrders = useMemo(() => {
    return allOrdersWithoutPagination.filter((order) => {
      const matchPaid =
        selectedIsPaid === ""
          ? true
          : order.is_paid === (selectedIsPaid === "true");

      const matchDelivery =
        selectedIsDelivery === ""
          ? true
          : order.is_delivery === selectedIsDelivery;

      const matchSearch =
        search.trim() === ""
          ? true
          : order.user.name.toLowerCase().includes(search.trim().toLowerCase());

      return matchPaid && matchDelivery && matchSearch;
    });
  }, [selectedIsPaid, selectedIsDelivery, search, allOrdersWithoutPagination]);

  // 取得所有訂單 + 分頁
  const getAllOrders = async (page = 1) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/orders`,
        {
          params: { page },
        }
      );

      // 補上預設值
      const ordersWithDefaults = res.data.orders.map((order) => ({
        ...order,
        is_delivery: order.is_delivery || "待確認",
        note: order.note || "",
      }));

      setAllOrders(ordersWithDefaults);
      setPagination(res.data.pagination);
    } catch (err) {
      dispatch(addToast(err.response.data));
    }
  };

  // 取得分頁訂單
  const handlePageChange = (e, page) => {
    e.preventDefault();
    getAllOrders(page);
  };

  useEffect(() => {
    getAllOrders();
    getAllOrdersWithoutPagination();
  }, []);

  // Modal
  const openModal = (order) => {
    setSelectedOrder({
      ...order,
    });
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  // 更新訂單 API須帶入is_paid
  const handleUpdateOrder = async () => {
    try {
      const { is_paid, is_delivery, note } = selectedOrder;
      const res = await axios.put(
        `${BASE_URL}/v2/api/${API_PATH}/admin/order/${selectedOrder.id}`,
        {
          data: {
            is_paid,
            is_delivery,
            note,
          },
        }
      );
      dispatch(addToast(res.data));
      closeModal();
      getAllOrders();
    } catch (err) {
      dispatch(addToast(err.response.data));
    }
  };

  // 刪除訂單
  const deleteOrder = async (order_id) => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/v2/api/${API_PATH}/admin/order/${order_id}`
      );
      dispatch(addToast(res.data));
      await getAllOrders();
      await getAllOrdersWithoutPagination();
    } catch (err) {
      dispatch(addToast(err.response.data));
    }
  };

  return (
    <>
      <section className="section-seller py-3">
        <div className="container">
          <div className="dashboard-card mb-5">
            <h2 className="fs-4 mb-3">儀錶板</h2>
            <ul className="card-list">
              <li>
                <p className="fs-5 text-accent-300 fw-bold">
                  {allOrders.length}
                </p>
                <p>訂單數量</p>
              </li>
              <li>
                <p className="fs-5 text-accent-300 fw-bold">
                  {allOrders.filter((o) => o.is_delivery === "待確認").length}
                </p>
                <p>待確認數量</p>
              </li>
              <li>
                <p className="fs-5 text-accent-300 fw-bold">
                  {allOrders.filter((o) => o.is_delivery === "已確認").length}
                </p>
                <p>已確認數量</p>
              </li>
              <li>
                <p className="fs-5 text-accent-300 fw-bold">
                  {allOrders.filter((o) => o.is_delivery === "已出貨").length}
                </p>
                <p>已出貨數量</p>
              </li>
            </ul>
          </div>
          <div className="dashboard-card">
            <h2 className="fs-4 mb-3">訂單管理</h2>
            <div className="row g-3">
              <div className="col-12">
                <div className="form-search d-flex w-100">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="search"
                    className="form-control"
                    placeholder="請輸入聯絡人"
                  />
                  <button className="btn">
                    <span className="material-symbols-outlined">search</span>
                  </button>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <select
                  value={selectedIsPaid}
                  onChange={(e) => setSelectedIsPaid(e.target.value)}
                  className="form-select"
                >
                  <option value="">交易狀態</option>
                  <option value="false">未付款</option>
                  <option value="true">已付款</option>
                </select>
              </div>
              <div className="col-12 col-md-6">
                <select
                  value={selectedIsDelivery}
                  onChange={(e) => setSelectedIsDelivery(e.target.value)}
                  className="form-select"
                >
                  <option value="">出貨狀態</option>
                  <option value="待確認">待確認</option>
                  <option value="已確認">已確認</option>
                  <option value="已出貨">已出貨</option>
                </select>
              </div>
              {/* 商品資料渲染 */}
              <div className="col-12">
                {/* 標題 */}
                <div className="admin-list-header py-3">
                  <span className="admin-flex-1-0">訂單日期</span>
                  <span className="admin-flex-1-0">訂單備註</span>
                  <span className="admin-flex-1-0 d-none d-md-block">
                    訂單金額
                  </span>
                  <span className="admin-flex-1-0 d-none d-md-block">
                    交易狀態
                  </span>
                  <span className="admin-flex-1-0">出貨狀態</span>
                  <span className="admin-action">操作</span>
                </div>
                {/* 內容 */}
                <div className="product-body">
                  {(selectedIsPaid !== "" ||
                  selectedIsDelivery !== "" ||
                  search !== ""
                    ? filteredOrders
                    : allOrders
                  ).map((order) => (
                    <div className="admin-list-item py-3" key={order.id}>
                      <span className="admin-flex-1-0">
                        {new Date(order.create_at * 1000).toLocaleDateString(
                          "zh-TW"
                        )}
                      </span>
                      <span
                        className={`admin-flex-1-0 ${order.message ? "text-danger" : ""}`}
                      >
                        {order.message ? "有" : "無"}
                      </span>
                      <span className="admin-flex-1-0 d-none d-md-block">
                        {order.total}
                      </span>
                      <span className="admin-flex-1-0 d-none d-md-block">
                        {order.is_paid ? "已付款" : "未付款"}
                      </span>
                      <span
                        className={`${order.is_delivery === "待確認" ? "text-danger" : "text-success"} admin-flex-1-0 fw-bold`}
                      >
                        {order.is_delivery}
                      </span>
                      <span className="admin-action">
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            onClick={() => openModal(order)}
                            className="btn btn-sm btn-outline-primary"
                          >
                            編輯
                          </button>
                          <button
                            onClick={() => deleteOrder(order.id)}
                            className="btn btn-sm btn-outline-danger"
                          >
                            刪除
                          </button>
                        </div>
                      </span>
                    </div>
                  ))}
                </div>

                {/* 分頁 */}
                {!selectedIsPaid && !selectedIsDelivery && allOrders && (
                  <nav className="pagination-container" aria-label="分頁導航">
                    <ul className="pagination">
                      {/* 上一頁按鈕 */}
                      <li
                        className={`page-item ${pagination.has_pre ? "" : "disabled"}`}
                      >
                        <a
                          onClick={(e) =>
                            handlePageChange(e, pagination.current_page - 1)
                          }
                          className="page-link"
                          href="#"
                        >
                          上一頁
                        </a>
                      </li>
                      {/* 頁碼 */}
                      {Array.from({ length: pagination.total_pages }).map(
                        (_, index) => (
                          <li
                            key={index}
                            className={`page-item ${pagination.current_page === index + 1 ? "active" : ""}`}
                          >
                            <a
                              onClick={(e) => handlePageChange(e, index + 1)}
                              className="page-link"
                              href="#"
                            >
                              {index + 1}
                            </a>
                          </li>
                        )
                      )}
                      {/* 下一頁按鈕 */}
                      <li
                        className={`page-item ${pagination.has_next ? "" : "disabled"}`}
                      >
                        <a
                          onClick={(e) =>
                            handlePageChange(e, pagination.current_page + 1)
                          }
                          className="page-link"
                          href="#"
                        >
                          下一頁
                        </a>
                      </li>
                    </ul>
                  </nav>
                )}
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
                    <h5 className="modal-title">編輯訂單</h5>
                    <button
                      onClick={() => closeModal()}
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                    ></button>
                  </div>

                  <div className="modal-body p-4">
                    {/* 訂單資訊 */}
                    <div className="p-3">
                      <h6 className="mb-2">訂單明細</h6>
                      <div className="p-3 border rounded">
                        <div className="d-flex mb-2">
                          <div className="min-w100 fw-bold me-2">
                            訂單編號：
                          </div>
                          <div className="flex-grow-1">{selectedOrder.id}</div>
                        </div>
                        <div className="d-flex mb-2">
                          <div className="min-w100 fw-bold me-2">
                            訂單日期：
                          </div>
                          <div className="flex-grow-1">
                            {new Date(
                              selectedOrder.create_at * 1000
                            ).toLocaleString("zh-TW", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })}
                          </div>
                        </div>
                        <div className="d-flex mb-2">
                          <div className="min-w100 fw-bold me-2">
                            付款日期：
                          </div>
                          <div className="flex-grow-1">
                            {new Date(
                              selectedOrder.paid_date * 1000
                            ).toLocaleString("zh-TW", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })}
                          </div>
                        </div>
                        <div className="d-flex mb-2">
                          <div className="min-w100 fw-bold me-2">總金額：</div>
                          <div className="flex-grow-1">
                            NT$ {selectedOrder.total}
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="min-w100 fw-bold me-2">
                            付款狀態：
                          </div>
                          <div className="flex-grow-1">
                            <span className="text-success fw-bold">
                              {selectedOrder.is_paid ? "已付款" : "未付款"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 客戶資訊 */}
                    <div className="p-3">
                      <h6 className="mb-2">買家資訊</h6>
                      <div className="p-3 border rounded">
                        <div className="d-flex mb-2">
                          <div className="min-w100 fw-bold me-2">姓名：</div>
                          <div className="flex-grow-1">
                            {selectedOrder.user.name}
                          </div>
                        </div>
                        <div className="d-flex mb-2">
                          <div className="min-w100 fw-bold me-2">Email：</div>
                          <div className="flex-grow-1">
                            {selectedOrder.user.email}
                          </div>
                        </div>
                        <div className="d-flex mb-2">
                          <div className="min-w100 fw-bold me-2">電話：</div>
                          <div className="flex-grow-1">
                            {selectedOrder.user.tel}
                          </div>
                        </div>
                        <div className="d-flex mb-2">
                          <div className="min-w100 fw-bold me-2">地址：</div>
                          <div className="flex-grow-1">
                            {selectedOrder.user.address}
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="min-w100 fw-bold me-2">留言：</div>
                          <div className="flex-grow-1 text-danger">
                            {selectedOrder.message}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 訂單內容 */}
                    <div className="p-3">
                      <h6 className="mb-2">訂單內容</h6>
                      <div className="p-3 border rounded">
                        {Object.values(selectedOrder.products).map(
                          (product) => (
                            <div className="d-flex mb-2" key={product.id}>
                              <div className="min-w100 me-2">
                                {product.product.maintitle}
                              </div>
                              <div className="flex-grow-1 text-end">
                                x {product.qty}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* 更新訂單狀態 */}
                    <div className="p-3">
                      <h6 className="mb-2">訂單狀態</h6>
                      <select
                        value={selectedOrder.is_delivery}
                        onChange={(e) =>
                          setSelectedOrder({
                            ...selectedOrder,
                            is_delivery: e.target.value,
                          })
                        }
                        className="form-select"
                      >
                        <option value="" disabled>
                          選擇狀態
                        </option>
                        <option value="待確認">待確認</option>
                        <option value="已確認">已確認</option>
                        <option value="已出貨">已出貨</option>
                      </select>
                    </div>

                    {/* 店家訂單備註 */}
                    <div className="p-3">
                      <h6 className="mb-2">店家訂單備註</h6>
                      <textarea
                        className="form-control"
                        value={selectedOrder.note || ""}
                        onChange={(e) =>
                          setSelectedOrder({
                            ...selectedOrder,
                            note: e.target.value,
                          })
                        }
                        rows={3} // 高度
                        placeholder="請輸入備註"
                      ></textarea>
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
                        onClick={() => handleUpdateOrder()}
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
          )}
        </div>
      </section>
    </>
  );
}
