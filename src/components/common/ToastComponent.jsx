import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToast } from "../../redux/toastSlice";

export default function ToastComponent() {
  const messages = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  const [visibleToasts, setVisibleToasts] = useState({});

  useEffect(() => {
    const newToasts = {};
    messages.forEach((msg) => {
      newToasts[msg.id] = true; // 新進來的先顯示
      setTimeout(() => {
        // 2 秒後隱藏
        setVisibleToasts((prev) => ({ ...prev, [msg.id]: false }));
        // 動畫結束後移除 Redux
        setTimeout(() => {
          dispatch(removeToast(msg.id));
        }, 300);
      }, 2000);
    });

    setVisibleToasts((prev) => ({ ...prev, ...newToasts }));
  }, [messages, dispatch]);

  return (
    <section
      className={`section-toast position-fixed end-0 p-3 ${messages.length === 0 ? "d-none" : ""}`}
      style={{ top: "115px", zIndex: 2000 }}
    >
      {messages.map((message) => (
        <div
          key={message.id}
          className={`toast show mb-3 fade ${visibleToasts[message.id] ? "show" : "hide"}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div
            className={`toast-header text-white ${
              message.status === "success" ? "bg-success" : "bg-danger"
            }`}
          >
            <strong className="me-auto">
              {message.status === "success" ? "成功" : "失敗"}
            </strong>
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                setVisibleToasts((prev) => ({ ...prev, [message.id]: false }));
                setTimeout(() => {
                  dispatch(removeToast(message.id));
                }, 300);
              }}
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">
            <pre>{message.message}</pre>
          </div>
        </div>
      ))}
    </section>
  );
}
