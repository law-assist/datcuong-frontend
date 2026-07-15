# LVTN VBPL Frontend

Giao diện người dùng cho hệ thống tra cứu Văn bản Pháp luật (VBPL) Việt Nam — được xây dựng như đồ án tốt nghiệp.

---

## Mục lục

- [Tổng quan dự án](#tổng-quan-dự-án)
- [Tech Stack](#tech-stack)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Hướng dẫn chạy local](#hướng-dẫn-chạy-local)
- [Biến môi trường](#biến-môi-trường)
- [Các trang và tính năng chính](#các-trang-và-tính-năng-chính)
- [Ghi chú bổ sung](#ghi-chú-bổ-sung)

---

## Tổng quan dự án

Ứng dụng web cung cấp giao diện tra cứu và liên kết văn bản pháp luật Việt Nam, với ba nhóm người dùng: **người dùng thường**, **luật sư**, và **quản trị viên**.

**Chức năng chính:**

- **Tra cứu văn bản:** Tìm kiếm full-text theo từ khóa, lĩnh vực, loại văn bản, cơ quan ban hành, năm ban hành — có phân trang và bộ lọc nâng cao.
- **Đọc văn bản pháp luật:** Hiển thị toàn bộ nội dung văn bản theo cấu trúc phân cấp (phần → chương → mục → điều → khoản → điểm), hỗ trợ highlight và xem tham chiếu chéo giữa các văn bản.
- **Xuất PDF:** Tải văn bản ra file PDF với font Roboto nhúng sẵn (via jsPDF + html2canvas).
- **Hỏi đáp luật sư:** Người dùng gửi câu hỏi pháp lý; luật sư xem và phản hồi trực tiếp trên hệ thống.
- **Thông báo real-time:** Nhận thông báo tức thì qua Server-Sent Events (SSE).
- **Xác thực:** Đăng ký / đăng nhập / tự động làm mới token qua next-auth.

**Kiến trúc tổng quan:**

```
Trình duyệt
    │
    ├── Next.js App Router (SSR + CSR)
    │       ├── Route Groups: (auth) / (main) → (public) / (user) / (lawyer) / (admin)
    │       ├── next-auth: xác thực + quản lý session JWT
    │       └── Server Actions: gọi Backend API (Node/NestJS)
    │
    └── Backend API (NestJS) ──► MongoDB
```

---

## Tech Stack

### Runtime & Framework

| Công nghệ | Phiên bản | Mục đích |
|---|---|---|
| Next.js | ^14.2.14 | Framework React (App Router, SSR + CSR) |
| React | ^18 | UI library |
| TypeScript | ^5 | Ngôn ngữ lập trình |

### Xác thực

| Công nghệ | Phiên bản | Mục đích |
|---|---|---|
| next-auth | ^4.24.7 | Session management, JWT, CredentialsProvider |

### UI & Styling

| Công nghệ | Phiên bản | Mục đích |
|---|---|---|
| Ant Design | ^5.21.2 | Component library (Button, Input, Table, Modal, Tabs...) |
| @ant-design/nextjs-registry | ^1.0.1 | Tích hợp Ant Design với Next.js SSR |
| Tailwind CSS | ^3.4.1 | Utility-first CSS |
| SCSS Modules | — | Component-scoped styles |
| Roboto | local TTFs | Font chính |

### Data Fetching

| Công nghệ | Phiên bản | Mục đích |
|---|---|---|
| SWR | ^2.2.5 | Client-side data fetching với caching |
| Axios | ^1.7.7 | HTTP client (tự động gắn Bearer token) |

### Form & Validation

| Công nghệ | Phiên bản | Mục đích |
|---|---|---|
| react-hook-form | ^7.53.0 | Quản lý form |
| @hookform/resolvers | ^3.9.0 | Kết nối với Zod |
| Zod | ^3.23.8 | Schema validation |

### Xuất PDF

| Công nghệ | Phiên bản | Mục đích |
|---|---|---|
| jsPDF | ^2.5.2 | Tạo file PDF |
| html2canvas-pro | ^1.5.8 | Chụp HTML thành canvas |

### Tiện ích

| Công nghệ | Phiên bản | Mục đích |
|---|---|---|
| dayjs | ^1.11.13 | Xử lý ngày tháng |
| clsx + tailwind-merge | — | Merge Tailwind class có điều kiện |
| js-cookie | ^3.0.5 | Đọc cookie phía client |
| jQuery | ^3.7.1 | DOM manipulation cho highlight tham chiếu |

### DevOps & Deployment

| Công nghệ | Mục đích |
|---|---|
| Docker (Node.js Alpine) | Containerization, expose port 29000 |
| Docker Hub | Container registry (`kanghcmut/lvtn-frontend-app`) |

---

## Cấu trúc dự án

```
datcuong-frontend/
├── public/
│   ├── fonts/          # Font Roboto TTF (các weight: Thin → Black)
│   ├── icon/           # SVG icons (facebook, google, linkedin, youtube)
│   └── images/         # Ảnh nền, banner (authBg, home, map, flag, ...)
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout: AntdRegistry + AuthProvider
│   │   ├── page.tsx                # Redirect "/" → "/home"
│   │   ├── globals.css             # Tailwind base + font Roboto + scrollbar
│   │   ├── loading.tsx             # Full-screen loading spinner
│   │   ├── error.tsx               # Error boundary (500)
│   │   │
│   │   ├── (auth)/                 # Route group: các trang chưa đăng nhập
│   │   │   ├── layout.tsx          # Auth layout (chỉ có Footer)
│   │   │   ├── login/
│   │   │   │   ├── page.tsx        # SSR: redirect nếu đã đăng nhập
│   │   │   │   └── LoginForm.tsx   # Form đăng nhập (react-hook-form + next-auth)
│   │   │   ├── sign-up/
│   │   │   │   ├── page.tsx
│   │   │   │   └── SignUpForm.tsx  # Form đăng ký (Zod validation)
│   │   │   └── verify-user/
│   │   │       └── page.tsx        # Redirect ngay đến /home
│   │   │
│   │   ├── (main)/                 # Route group: tất cả trang đã đăng nhập
│   │   │   ├── PrivateRoute.tsx    # SSR guard: redirect → /login nếu không có session
│   │   │   ├── layout.tsx          # Wrapper: Header + Footer
│   │   │   │
│   │   │   ├── (public)/           # Trang dành cho mọi user đã đăng nhập
│   │   │   │   ├── home/
│   │   │   │   │   └── page.tsx    # Trang chủ: SearchList + ảnh điều hướng
│   │   │   │   ├── search/
│   │   │   │   │   ├── page.tsx    # Tìm kiếm văn bản
│   │   │   │   │   └── components/
│   │   │   │   │       ├── Search.tsx         # Danh sách kết quả (SWR + phân trang)
│   │   │   │   │       ├── SearchFilter.tsx   # Bộ lọc nâng cao
│   │   │   │   │       ├── SearchItem.tsx     # Một dòng kết quả
│   │   │   │   │       └── SearchBreadcrumb.tsx
│   │   │   │   └── vanban/[...id]/
│   │   │   │       ├── page.tsx    # Xem văn bản (4 tabs)
│   │   │   │       └── components/
│   │   │   │           ├── ContentPage.tsx    # Nội dung văn bản
│   │   │   │           ├── DiagramPage.tsx    # Thông tin metadata
│   │   │   │           ├── DownloadPage.tsx   # Xuất PDF
│   │   │   │           ├── LawContent.tsx     # Dispatcher phân cấp
│   │   │   │           ├── LawHeader.tsx      # Tiêu đề văn bản
│   │   │   │           ├── LawDescription.tsx # Căn cứ ban hành
│   │   │   │           ├── LawExtend.tsx      # Phụ lục, biểu mẫu
│   │   │   │           ├── LawFooter.tsx      # Chữ ký, nơi ban hành
│   │   │   │           └── main/              # Các node phân cấp
│   │   │   │               ├── Phan.tsx       # Phần
│   │   │   │               ├── Chuong.tsx     # Chương
│   │   │   │               ├── Muc.tsx        # Mục
│   │   │   │               ├── TieuMuc.tsx    # Tiểu mục
│   │   │   │               ├── Dieu.tsx       # Điều
│   │   │   │               ├── Khoan.tsx      # Khoản
│   │   │   │               ├── Diem.tsx       # Điểm
│   │   │   │               ├── Content.tsx    # Đoạn văn bản (lá)
│   │   │   │               ├── ContentRef.tsx         # Highlight tham chiếu
│   │   │   │               ├── ContentRefModal.tsx    # Modal split-pane tham chiếu
│   │   │   │               ├── ContentRefList.tsx     # Danh sách tham chiếu
│   │   │   │               └── ContentRefItem.tsx     # Một mục tham chiếu
│   │   │   │
│   │   │   ├── (user)/             # Người dùng thường
│   │   │   │   ├── ask/
│   │   │   │   │   ├── page.tsx    # Danh sách câu hỏi + form gửi câu hỏi
│   │   │   │   │   ├── [...id]/page.tsx  # Chi tiết câu hỏi + phản hồi
│   │   │   │   │   └── components/
│   │   │   │   │       ├── AskForm.tsx   # Form gửi câu hỏi tư vấn
│   │   │   │   │       ├── AskList.tsx   # Danh sách câu hỏi (phân trang)
│   │   │   │   │       └── AskItem.tsx   # Một dòng câu hỏi
│   │   │   │   └── profile/
│   │   │   │       ├── page.tsx          # Trang profile
│   │   │   │       ├── ProfileForm.tsx   # Form chỉnh sửa thông tin
│   │   │   │       └── EditFieldModal.tsx # Modal chọn lĩnh vực (luật sư)
│   │   │   │
│   │   │   ├── (lawyer)/           # Luật sư
│   │   │   │   ├── PrivateRoute.tsx  # Guard: chỉ role "lawyer"
│   │   │   │   └── response/
│   │   │   │       ├── page.tsx       # Danh sách câu hỏi cần phản hồi
│   │   │   │       └── [...id]/
│   │   │   │           ├── page.tsx   # Chi tiết câu hỏi + thread phản hồi
│   │   │   │           └── components/
│   │   │   │               ├── ResponseFrom.tsx  # Form gửi phản hồi
│   │   │   │               └── ResponseItem.tsx  # Một tin phản hồi
│   │   │   │
│   │   │   └── (admin)/            # Quản trị viên
│   │   │       ├── PrivateRoute.tsx  # Guard: chỉ role "admin"
│   │   │       └── admin/
│   │   │           ├── page.tsx      # Dashboard: 3 tabs quản lý
│   │   │           └── components/
│   │   │               ├── UserManagement.tsx    # (stub)
│   │   │               ├── LawManagement.tsx     # (stub)
│   │   │               └── RequestManagement.tsx # (stub)
│   │   │
│   │   └── api/
│   │       ├── auth/[...nextauth]/
│   │       │   ├── authOptions.ts   # NextAuth config: CredentialsProvider + JWT callbacks
│   │       │   └── route.ts         # NextAuth handler
│   │       ├── auth/refresh-token/
│   │       │   └── route.ts         # GET: làm mới access token + set cookies
│   │       ├── askLawyer.api.ts     # Server actions: sendRequest, sendResponse
│   │       ├── auth/auth.api.ts     # Server actions: handleRefreshToken
│   │       └── client.ts            # Client-side: removeTokens (js-cookie)
│   │
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthProvider.tsx     # SessionProvider wrapper
│   │   ├── error/
│   │   │   └── TextError.tsx        # Inline error message
│   │   └── layout/
│   │       ├── Header.tsx           # Logo + SearchBar + Avatar + Nav
│   │       ├── HeaderDropdown.tsx   # Dropdown: profile, admin, đăng xuất
│   │       ├── HeaderNav.tsx        # Nav links theo role
│   │       ├── SearchBar.tsx        # Input tìm kiếm → /search?q=...
│   │       └── Footer.tsx           # Social links + copyright
│   │
│   ├── constants/
│   │   └── constant.ts              # FIELD_MAPPING, CATEGORY_MAPPING, DEPARTMENT_MAPPING,
│   │                                #   CLASSIFICATION_MAPPING, REQUEST_STATUS_MAPPING
│   ├── hooks/
│   │   ├── useNotifications.tsx         # Fetch + real-time notifications
│   │   ├── useServerSentEvents.tsx      # EventSource subscriber
│   │   └── useUnreadNotificationCount.tsx # Badge count + SSE increment
│   │
│   ├── libs/
│   │   ├── axios.ts                 # Axios instance: Bearer token + 401 signOut
│   │   ├── set-cookie.ts            # Server action setCookie
│   │   └── utils.ts                 # cn, fetcher, formatDateToString, timeAgo, ...
│   │
│   ├── types/
│   │   ├── user.type.d.ts           # User global type
│   │   ├── notification.type.d.ts   # NotificationType global type
│   │   ├── response.d.ts            # BaseResponse global type
│   │   └── page.type.ts             # PageProps type
│   │
│   ├── utils/
│   │   ├── index.ts                 # generatePDF (html2canvas + jsPDF)
│   │   ├── dayjs.util.ts            # dayjs với UTC plugin
│   │   └── validate.ts              # validatePhone
│   │
│   └── zod-schemas/
│       ├── login-schema.ts          # Validation schema đăng nhập
│       └── signup-schema.ts         # Validation schema đăng ký
│
├── Dockerfile
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── postcss.config.mjs
```

---

## Hướng dẫn chạy local

### Điều kiện tiên quyết

- **Node.js** v18 trở lên
- **npm** v9 trở lên
- Backend API đang chạy (xem `datcuong-backend`)

### 1. Clone repository

```bash
git clone <repository-url>
cd datcuong-frontend
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Tạo file `.env.local`

Tạo file `.env.local` ở thư mục gốc (xem chi tiết ở phần [Biến môi trường](#biến-môi-trường)):

```env
NEXT_PUBLIC_API_HOST=http://localhost:5000
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### 4. Chạy ứng dụng

**Development (hot-reload):**

```bash
npm run dev
```

Ứng dụng sẽ khởi động tại `http://localhost:3000`.

**Production build:**

```bash
npm run build
npm run start
```

### 5. Chạy tests

```bash
# Chưa có test scripts được cấu hình trong package.json
```

### 6. Linting

```bash
npm run lint
```

---

## Biến môi trường

| Biến | Mô tả | Bắt buộc | Ví dụ |
|---|---|---|---|
| `NEXT_PUBLIC_API_HOST` | Base URL của backend API (dùng phía client) | ✅ | `http://localhost:5000` |
| `BACKEND_API_HOST` | Base URL dùng cho server actions trong production | ❌ | `http://backend:5000` |
| `NEXT_SERVER_API_HOST` | Base URL dùng trong server actions (ưu tiên cao nhất) | ❌ | `http://backend-service:5000` |
| `API_HOST` | Fallback base URL cuối cùng | ❌ | `http://localhost:5000` |
| `NEXTAUTH_SECRET` | Khóa bí mật để mã hóa JWT của next-auth | ✅ | `your_very_secret_32char_string` |
| `NEXTAUTH_URL` | URL của ứng dụng Next.js (bắt buộc cho next-auth) | ✅ | `http://localhost:3000` |

> **Thứ tự ưu tiên base URL trong server actions:** `NEXT_SERVER_API_HOST` > `BACKEND_API_HOST` > `NEXT_PUBLIC_API_HOST` > `API_HOST`

> **Lưu ý:** Biến bắt đầu bằng `NEXT_PUBLIC_` mới được expose ra phía client (trình duyệt). Các biến còn lại chỉ dùng trong server-side code.

---

## Các trang và tính năng chính

### Luồng xác thực

1. Người dùng nhập email/password tại `/login`.
2. `next-auth` gọi `CredentialsProvider` → POST đến `/auth/login` trên backend.
3. Backend trả về `user` + `{ accessToken, refreshToken }`.
4. Tokens được lưu vào HTTP cookie (`access_token` hết hạn sau 1 giờ, `refresh_token` sau 24 giờ).
5. `axiosInstance` tự động đính kèm `Authorization: Bearer <access_token>` cho mọi request.
6. Khi nhận 401, axios gọi `signOut()` tự động.
7. Token hết hạn được làm mới tự động qua `GET /api/auth/refresh-token`.

### Trang tra cứu văn bản (`/search`)

- **SearchFilter:** bộ lọc nâng cao gồm từ khóa, lĩnh vực (27 loại), loại văn bản (11 loại), cơ quan ban hành, năm. Tất cả giá trị lấy từ `FIELD_MAPPING`, `CATEGORY_MAPPING`, `DEPARTMENT_MAPPING` trong `constants/constant.ts`.
- **Search:** SWR fetch `GET /law/search`, hiển thị danh sách phân trang.
- Tìm kiếm được kích hoạt qua URL query params — chia sẻ URL giữ lại bộ lọc.

### Trang xem văn bản (`/vanban/[id]`)

Hiển thị 4 tab:

| Tab | Mô tả |
|---|---|
| **Nội dung** | Toàn bộ nội dung văn bản theo cấu trúc phân cấp, hỗ trợ tham chiếu chéo |
| **Lược đồ** | Thông tin metadata (số hiệu, ngày ban hành, cơ quan, lĩnh vực...) |
| **Tải văn bản** | Xuất file PDF bằng jsPDF + html2canvas |
| **Văn bản liên quan** | Placeholder (chưa triển khai) |

**Tính năng tham chiếu chéo:**

Các đoạn văn bản có liên kết tham chiếu đến văn bản khác được highlight màu vàng. Khi click:
- Modal split-pane mở ra: bên trái là nội dung văn bản hiện tại (highlight đoạn liên quan bằng jQuery), bên phải là đoạn nội dung được tham chiếu từ văn bản khác (fetch qua `GET /law/search-ref`).
- Nhãn phân loại tham chiếu (`CLASSIFICATION_MAPPING`): Căn cứ, Sửa đổi bổ sung, Tham khảo, Thay đổi từ/cụm từ, Bãi bỏ, Quy định chi tiết, Hướng dẫn.

### Trang hỏi đáp (`/ask`)

- **AskForm:** form gửi câu hỏi tư vấn pháp lý (tiêu đề, nội dung, lĩnh vực, đính kèm file).
- **AskList:** danh sách phân trang các câu hỏi đã gửi, hiển thị trạng thái bằng màu sắc.
- `/ask/[id]`: chi tiết câu hỏi + toàn bộ thread phản hồi từ luật sư.

### Trang luật sư (`/response`)

- Danh sách phân trang tất cả câu hỏi từ người dùng.
- `/response/[id]`: xem chi tiết và gửi phản hồi qua `ResponseFrom`.

### Trang quản trị (`/admin`)

Dashboard với 3 tab (hiện tại là stub, chưa triển khai đầy đủ):
- Quản lý người dùng
- Quản lý văn bản
- Quản lý yêu cầu tư vấn

### Trang profile (`/profile`)

- Xem và chỉnh sửa thông tin cá nhân (họ tên, email, số điện thoại, ngày sinh, địa chỉ).
- Luật sư có thêm modal chọn lĩnh vực pháp lý hành nghề (`EditFieldModal`).

---

## Ghi chú bổ sung

### Triển khai (Deployment)

**Chạy bằng Docker:**

```bash
docker build -t lvtn-vbpl-frontend .
docker run -p 3000:29000 \
  -e NEXT_PUBLIC_API_HOST="http://backend:5000" \
  -e NEXTAUTH_SECRET="your_secret" \
  -e NEXTAUTH_URL="http://localhost:3000" \
  lvtn-vbpl-frontend
```

**Dùng Docker Compose (cùng với backend):**

```bash
sudo docker pull kanghcmut/lvtn-frontend-app:latest
sudo docker pull kanghcmut/lvtn-backend-app:latest
sudo docker compose up
```

- Frontend port: `3000`
- Backend port: `5000`
- Dùng HTTP (không phải HTTPS)

---

### Phân quyền theo role

Các route được bảo vệ bằng `PrivateRoute` component (chạy phía server):

| Role | Quyền truy cập |
|---|---|
| Tất cả (đã đăng nhập) | `/home`, `/search`, `/vanban/[id]`, `/profile`, `/ask` |
| `lawyer` | Thêm `/response` — xem và phản hồi câu hỏi |
| `admin` | Thêm `/admin` — dashboard quản trị |

Nếu không có session → redirect về `/login`.
Sai role → redirect về trang phù hợp với role hiện tại.

Header điều hướng (`HeaderNav`) cũng thay đổi theo role: người dùng thường thấy "Hỏi đáp", luật sư thấy "Phản hồi".

---

### Hệ thống thông báo real-time

- `useServerSentEvents`: subscribe `EventSource` đến `GET /notification/events?userId=<id>`.
- `useUnreadNotificationCount`: đếm số thông báo chưa đọc, tự động tăng khi nhận SSE event.
- `useNotifications`: fetch danh sách thông báo phân trang, merge với thông báo real-time.
- Hiện tại các hook này đã được viết nhưng chưa hiển thị trực tiếp trên Header UI.

---

### Xuất PDF

`utils/index.ts` → `generatePDF(element)`:

1. `html2canvas-pro` chụp element HTML thành canvas.
2. `jsPDF` tạo PDF với font Roboto được nhúng sẵn dưới dạng base64 (`Roboto-Regular-normal.js`, ~vài MB).
3. Trả về file PDF để tải xuống.

Khi render để export PDF, prop `isRef=false` được truyền vào các component văn bản để tắt UI tham chiếu tương tác.

---

### Conventions phát triển

- **Route Groups** Next.js: `(auth)`, `(main)/(public)`, `(main)/(user)`, `(main)/(lawyer)`, `(main)/(admin)` — không tạo URL segment, chỉ phân nhóm layout.
- **Server Actions** (`"use server"`): các hàm gọi backend từ server-side (không qua client fetch), đặt trong file `*.api.ts`.
- **SWR + fetcher**: mọi client-side fetch dùng SWR với `fetcher = (url) => axiosInstance.get(url).then(res => res.data.data)`.
- **`cn()` utility**: kết hợp `clsx` + `tailwind-merge` để merge Tailwind class có điều kiện — dùng thay cho template string thông thường.
- **Màu brand chính:** `#07357A` (deep navy blue).

---

### Các hạn chế đã biết

- **Admin panel chưa hoàn thiện:** 3 tab `UserManagement`, `LawManagement`, `RequestManagement` đều là stub một dòng.
- **Tab "Văn bản liên quan":** render placeholder `<p>Content for Tab 3</p>`, chưa triển khai.
- **File upload trong AskForm:** POST đến `mockapi.io` để test, chưa tích hợp với backend thực tế.
- **Firebase config** (`src/configs/firebase.config.ts`): toàn bộ bị comment out; upload avatar đang route qua backend endpoint thay vì Firebase trực tiếp.
- **`verify-user` page:** chỉ redirect ngay về `/home`, chưa có logic xác minh email.
- **Duplicate assets:** `public/icon/` và `public/icons/` chứa các file SVG giống nhau; `src/fonts/` và `public/fonts/` đều chứa font TTF.
