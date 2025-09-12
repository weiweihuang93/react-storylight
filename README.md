# Storylight 拾光

是一個獨立的二手書線上平台，整合了 **書籍瀏覽、購物車、會員中心與後台管理** 功能，提供完整的線上購物流程體驗。

在這裡，每本書都附有清楚的書況標示與完整說明，經過檢查與清潔後再度上架，讓讀者能放心挑選。

我們相信書籍不只是物品，更承載著知識、故事與記憶，等待下一位讀者繼續珍惜，陪伴你度過美好的閱讀時光。

---

## 畫面示意圖

### 首頁

![首頁](./public/home.png)

### 購物車

![購物車](./public/cart.png)

### 會員中心

![會員中心](./public/member.png)

### 後台管理

![後台管理](./public/admin.png)

---

## 專案功能

### 前台功能

- **首頁**
  - 導覽列：提供全站導航（首頁錨點 / 購物車 / 會員中心）。
  - 橫幅 Banner：呈現平台理念，附有全站書籍搜尋功能。
  - 最新消息：公告活動、促銷或書展資訊。
  - 書籍分類：依分類展示館藏，協助快速找到目標書籍。
  - 館藏推薦 / 最新上架，曝光熱門館藏與新進書籍。
  - 關於我們：介紹書籍檢查與清潔流程。
  - 徵求表單入口：「找不到想要的書？」。
  - 常見問題（Q&A），快速解答會員、書籍、訂購與配送相關疑問。

- **書籍分類頁、列表頁**
  - 提供分類篩選。
  - 書況標籤（A/B/C/D 分級）、圖片、書籍詳情描述。
  - 支援收藏（使用 LocalStorage）與加入購物車。

- **購物車**
  - 瀏覽已加入的書籍。
  - 移除商品。
  - 套用優惠券。
  - 進入結帳流程 → 模擬付款 → 完成訂單。

- **會員中心**
  - 註冊 / 登入帳號（模擬）。
  - 我的收藏（收藏清單）。
  - 許願徵求（模擬徵求列表）。
  - 訂單紀錄（查詢歷史訂單）。

### 後台功能 (Admin)

- 登入 / 登出
- 訂單管理
- 書籍管理
- 優惠券管理

---

## 技術棧

- **前端框架**: React 18 + Vite
- **路由**: React Router v7
- **狀態管理**: Redux Toolkit（Toast 狀態管理）+ React Context（模擬登入狀態）
- **表單驗證**: react-hook-form
- **UI / 樣式**: SCSS、Bootstrap（含變數管理）、Material Symbols / Icons
- **其他**: Axios（API 請求）、Google Books API（書籍相關資訊）

---

## 共用組件

- **ToastComponent**：全站提示訊息（Redux slice 控制）
- **ScreenLoading**：畫面切換時的載入動畫
- **SkeletonLoading**：商品卡片等資料讀取前的骨架畫面
- **ReactLoading**：按鈕或局部元件的 loading spinner

---

## 專案結構

```plaintext
storylight/
│
├─ src/
│   ├─ assets/                     # 靜態資源統一管理
│   │   ├─ images/                 # 圖片，例如 logo、icon、banner
│   │   ├─ stylesheets/            # SCSS 樣式
│   │   │   ├─ base/               # 基礎樣式
│   │   │   ├─ helpers/            # 工具變數、mixin、functions (colors, spacing)
│   │   │   ├─ pages/              # 頁面專屬樣式
│   │   │   └─ skeleton/           # skeleton loading 樣式
│   │   │   all.scss               # 全域樣式入口
│   │
│   ├─ components/                 # 可重複使用的 UI 元件
│   │   ├─ common/                 # 全站共用元件
│   │   └─ skeleton/               # Skeleton loading 元件
│   │
│   ├─ context/                    # React Context
│   │   └─ AppContext.jsx
│   │
│   ├─ data/                       # 資料檔案
│   │   ├─ categories.js           # 書籍分類
│   │   ├─ config.js               # API 路徑 / BASE_URL, API_PATH
│   │   └─ images.js               # 圖片路徑常數
│   │
│   ├─ features/                   # 各頁面
│   │   ├─ admin/                  # 後台頁面
│   │   └─ front/                  # 前台頁面
│   │   └─ front_cart/             # 前台購物車頁面
│   │   └─ member/                 # 會員中心頁面
│   │
│   ├─ redux/                      # Redux slice（各功能狀態管理）
│   │   └─ toastSlice.js
│   │
│   ├─ routes/                     # 路由表
│   │   └─ index.jsx
│   │
│   └─ store/                      # Redux store 入口與設定（整合所有 slice）
│   │   └─ store.js
│
├─ main.jsx                        # React 入口
├─ vite.config.js                  # Vite 配置
├─ package.json                    # 依賴套件與腳本
├─ package-lock.json               # 依賴鎖定版本
└─ README.md                       # 專案說明文件
```

---

## 路由 (Routes)

### 前台

- `/` → 首頁
- `/:categoryName` → 書籍分類頁
- `/:categoryName/:productId` → 書籍詳情頁
- `/signin` → 註冊
- `/login` → 登入
- `/member` → 會員中心
  - `/member/favorites` → 我的收藏
  - `/member/wish` → 許願徵求
  - `/member/order` → 訂單紀錄
- `/cart` → 購物車
  - `/cart/order` → 訂單資訊
  - `/cart/payment` → 付款頁
  - `/cart/complete` → 完成訂單

### 後台 (Admin)

- `/admin/login` → 後台登入
- `/admin/product` → 商品管理
- `/admin/order` → 訂單管理
- `/admin/coupon` → 優惠券管理

### 其他

- → 404 Not Found

---

## 安裝與執行 (Installation)

```bash
# 取得專案
git clone <repo-url>
cd project-name

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 打包專案
npm run build
```

---

## 環境變數設定

請在專案根目錄建立 .env 檔案，並依需求填入以下參數：

```env
VITE_BASE_URL=''
VITE_API_PATH=''
VITE_GOOGLE_BOOKS_API_KEY=''
```

⚠️ 請勿將 .env 檔案上傳至 GitHub，避免洩漏敏感資訊。
