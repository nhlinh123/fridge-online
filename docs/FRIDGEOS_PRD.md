# 🥦 FridgeOS — Product Requirements & Design Document

> *Tủ lạnh thông minh trong túi bạn. Không lãng phí. Không đau đầu.*

## 1. Vision & Core Philosophy

**FridgeOS** là một PWA (Progressive Web App) giúp người dùng quản lý nguyên liệu trong tủ lạnh và gợi ý món ăn dựa trên những gì họ đang có — thay vì hỏi “hôm nay ăn gì?”, app trả lời câu hỏi đó bằng chính những thứ người dùng đã có.

### Nguyên tắc cốt lõi

| Nguyên tắc | Mô tả |
|---|---|
| **Offline-first** | IndexedDB làm primary store, sync khi có mạng |
| **Abstraction-first** | Mọi thao tác DB qua Repository layer, swap DB bất kỳ lúc nào |
| **Ingredient-centric** | Tủ lạnh là trung tâm, recipe là hệ quả |
| **Fuzzy & Forgiving** | Người dùng nhập “cà chua” hay “ca chua” đều hiểu |
| **Zero-friction Input** | Thêm nguyên liệu trong < 5 giây |

## 2. Feature Set

### 2.1 Core Features (MVP)

#### 🥕 Fridge Manager — Quản lý tủ lạnh

- Thêm nguyên liệu theo hai chế độ:
  - **Relative (tương đối):** chỉ tên — `"còn ít cà chua"`, `"còn trứng"`
  - **Absolute (tuyệt đối):** tên + số lượng + đơn vị
    - Số lượng: `3`, `0.5`
    - Đơn vị: `kg`, `g`, `ml`, `L`, `cái`, `quả`, `bó`, `hộp`, `gói`, `muỗng`, `lon`
- Chỉnh sửa nhanh số lượng bằng `+/-` stepper
- Tag nguyên liệu: `🥩 thịt`, `🥦 rau`, `🧀 dairy`, `🥫 đóng hộp`, `🌶️ gia vị`, `🍳 khô`
- Hiển thị “sắp hết” khi nguyên liệu dưới ngưỡng
- Expiry date tùy chọn → cảnh báo hết hạn

#### 📖 Recipe Manager — Quản lý công thức

- Người dùng tự tạo recipe:
  - Tên món, mô tả ngắn
  - Danh sách nguyên liệu (link tới ingredient hoặc nhập tự do)
  - Số khẩu phần, thời gian nấu
  - Tags: `🍜 cơm`, `🥗 salad`, `🍲 canh`, `🔥 nhanh`, `👨‍👩‍👧 gia đình`
  - Các bước thực hiện (steps)
  - Ảnh món ăn (upload local)
- Import/Export recipe dạng JSON

#### 🔍 Smart Suggest — Gợi ý món ăn

- Match recipe dựa trên nguyên liệu đang có:
  - **Perfect match:** có đủ 100% nguyên liệu
  - **Near match:** thiếu 1–2 nguyên liệu (hiện “chỉ thiếu X”)
  - **Partial match:** có > 50% nguyên liệu
- Sắp xếp theo score (% match) giảm dần
- Filter theo tag, thời gian nấu, khẩu phần
- “Thiếu gì?” → hiển thị danh sách nguyên liệu cần mua thêm

### 2.2 Extended Features (v1.1+)

#### 🛒 Shopping List — Danh sách mua sắm

- Tự động generate shopping list từ “near match” recipes
- Gom nhóm theo danh mục siêu thị
- Check off khi mua xong → tự động thêm vào tủ lạnh
- Chia sẻ shopping list qua link hoặc copy text

#### 📊 Usage Analytics — Phân tích sử dụng

- Nguyên liệu nào hay dùng nhất
- Nguyên liệu nào hay bị bỏ quên (không dùng > 7 ngày)
- Tần suất nấu theo tuần/tháng
- Thống kê tiết kiệm (ước tính % thức ăn không lãng phí)

#### ⏰ Expiry Tracker — Theo dõi hạn sử dụng

- Dashboard “sắp hết hạn” theo thứ tự ưu tiên
- Push notification (PWA) nhắc hết hạn
- Suggest recipe ưu tiên dùng nguyên liệu sắp hết

#### 🌐 Meal Planner — Lên kế hoạch bữa ăn

- Kéo thả recipe vào lịch tuần
- Tự động tính toán nguyên liệu cần cho cả tuần
- Export PDF/ảnh thực đơn tuần

#### 🤝 Collection Sharing

- Export/Import recipe collection dạng JSON
- QR code share recipe đơn lẻ
- Có thể cài đặt “community pack” recipes (preset JSONs)

#### 🎙️ Quick Add — Nhập nhanh

- Voice input: nói “thêm 3 quả trứng” → parse và thêm
- Barcode scan (camera): quét sản phẩm → tự điền tên + đơn vị
- Paste text: dán text mua sắm, app tự parse

#### 🌙 Dietary Profiles

- Cài đặt chế độ ăn: `Chay`, `Keto`, `Ít muối`, `Dị ứng`
- Filter recipe và cảnh báo nguyên liệu không phù hợp

## 3. Architecture & Design Patterns

### 3.1 Tổng quan kiến trúc

```text
┌─────────────────────────────────────────────────────┐
│                    UI Layer (React/Vue PWA)        │
│   Components → Pages → Layouts → Design System     │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│               Application Layer                     │
│   UseCases / Services / State Management (Zustand) │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│            Repository Layer (Abstract)              │
│   IIngredientRepository / IRecipeRepository         │
│   IFridgeRepository / IShoppingListRepository       │
└──────────────────────┬──────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
┌───────▼──────┐ ┌─────▼──────┐ ┌────▼────────┐
│  IndexedDB   │ │ LocalStorage│ │ REST API    │
│  Adapter     │ │ Adapter     │ │ Adapter     │
└──────────────┘ └─────────────┘ └─────────────┘
```

### 3.2 Repository Pattern (TypeScript)

```typescript
export type Unit =
  | "kg" | "g" | "mg"
  | "L" | "ml"
  | "cái" | "quả" | "bó" | "hộp" | "gói" | "lon" | "muỗng"
  | "relative";

export type IngredientTag =
  | "meat" | "vegetable" | "fruit" | "dairy"
  | "grain" | "spice" | "canned" | "frozen" | "drink";

export interface Ingredient {
  id: string;
  name: string;
  nameNormalized: string;
  quantity?: number;
  unit: Unit;
  tags: IngredientTag[];
  addedAt: Date;
  expiresAt?: Date;
  location?: "fridge" | "freezer" | "pantry";
  notes?: string;
}
```

(Chi tiết interfaces và adapters giữ nguyên theo bản thiết kế gốc.)

### 3.3 Matching Engine

- `score = matched_required / total_required * 100`
- Phân loại:
  - `perfect` nếu score = 100
  - `near` nếu thiếu ≤ 2 nguyên liệu
  - `partial` nếu còn lại
- Lọc kết quả score < 30 để tránh đề xuất kém chất lượng.

### 3.4 State Management (Zustand)

- Lưu `ingredients`, `recipes`, `matchResults`, `activeFilters`
- Sau mỗi thay đổi nguyên liệu, trigger `computeMatches()`
- Persist local state qua `zustand/middleware`.

## 4. Data Schema (IndexedDB)

| Store | Key | Indexes |
|---|---|---|
| `ingredients` | `id` (uuid) | `nameNormalized`, `tags`, `expiresAt` |
| `recipes` | `id` (uuid) | `name`, `tags`, `updatedAt` |
| `shopping_list` | `id` (uuid) | `status`, `createdAt` |
| `meal_plan` | `id` (uuid) | `date` |
| `settings` | `key` | — |

## 5. PWA Configuration

- `manifest.json` với `display: standalone`, màu chủ đạo xanh lá.
- Workbox strategy:
  - App shell: Cache First
  - API: Network First (fallback cache)
  - Images: Cache First + expiry 7 ngày
  - Ảnh recipe user: IndexedDB blob store

## 6. Design System

### 6.1 Visual Identity

**Concept:** *Organic Tech* — tự nhiên nhưng có cấu trúc.

### 6.2 Color Tokens

- Primary: Forest Green (`--color-primary-500: #38883F`)
- Accent: Honey Gold (`--color-accent-500: #F5A623`)
- Warm Neutral cho surface và typography
- Semantic colors: danger/warning/success/info.

### 6.3 Typography

- Heading: **Fraunces**
- Body: **DM Sans**
- Numeric/unit: **DM Mono**

### 6.4 Spacing & Layout

- 4px spacing scale
- Radius từ 4px đến pill
- Shadows nhẹ cho card/elevation.

### 6.5 Component Library

- `IngredientChip`
- `MatchCard`
- `QuickAdd Bottom Sheet`

## 7. App Navigation & Pages

- Bottom nav mobile: `🧊 Tủ lạnh`, `🍳 Recipes`, `🔍 Gợi ý`, `☰ Menu`
- Core routes:
  - `/fridge`, `/recipes`, `/suggest`, `/shopping`, `/planner`, `/settings`

## 8. UX Patterns & Interactions

- Gesture hỗ trợ swipe/long-press/pull-to-refresh
- Micro-interactions cho add/delete/match score
- Empty states rõ ràng cho fridge/recipe/suggest.

## 9. Accessibility

- `aria-label` cho interactive elements
- Contrast tối thiểu AA (4.5:1)
- Touch target ≥ 44×44
- Hỗ trợ reduced motion.

## 10. Tech Stack Đề xuất

- React 18 + Vite
- Zustand
- Dexie.js
- React Router v6
- Framer Motion
- CSS Modules + CSS Variables
- vite-plugin-pwa + Workbox
- React Hook Form
- Fuse.js
- Vitest + Testing Library

## 11. Phased Roadmap

### Phase 1 — MVP (4–6 tuần)

- Project setup
- Design system base
- Repository abstractions + IndexedDB
- CRUD Ingredients/Recipes
- Matching engine + Suggest page
- Offline support

### Phase 2 — v1.1 (3–4 tuần)

- Shopping list
- Expiry tracker + push notifications
- Import/export JSON
- Meal planner basic
- Dark mode

### Phase 3 — v1.2 (4–6 tuần)

- Voice quick add
- Analytics dashboard
- Dietary profiles
- QR sharing + barcode scanner

## 12. File Structure (Đề xuất)

```text
fridgeos/
├── public/
├── src/
│   ├── domain/
│   ├── infrastructure/
│   ├── application/
│   ├── ui/
│   └── shared/
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

*FridgeOS — Không lãng phí. Không đau đầu. Ăn ngon mỗi ngày.*
