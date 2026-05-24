# PRD Gap Analysis (so với `docs/FRIDGEOS_PRD.md`)

Ngày kiểm tra: 2026-05-24

## 1) Kết luận nhanh

Hiện trạng codebase **mới chỉ là scaffold MVP rất sớm**, chưa đạt mức “MVP hoàn chỉnh” như PRD Phase 1.

## 2) Phần đã bám PRD

- Đúng stack nền tảng: React + Vite + TypeScript, Zustand, Dexie, React Router.
- Có phân lớp thư mục chính: `domain`, `application`, `infrastructure`, `ui`.
- Có luồng cơ bản: thêm nguyên liệu, thêm recipe, gợi ý món theo match score.

## 3) Thiếu / lệch so với PRD

### 3.1 Domain model chưa đầy đủ

- `Ingredient` thiếu các trường PRD: `tags`, `expiresAt`, `location`, `notes`.
- `Recipe` thiếu: `description`, `prepTimeMinutes`, `steps`, `imageDataUrl`.
- Chưa có enum/tag type đầy đủ theo PRD (`IngredientTag`, tag taxonomy chi tiết).

### 3.2 Repository pattern chưa hoàn tất

- Mới có interface rời rạc; chưa có generic `IRepository<T>` + `QueryOptions` chuẩn như PRD.
- Chưa có implementation repository đầy đủ cho Dexie (`findByName`, `findByTags`, `findExpiringSoon`, ...).
- Store đang thao tác trực tiếp state, chưa đi qua abstraction repository/factory.

### 3.3 IndexedDB schema chưa đạt

- Dexie store hiện tại chưa có các bảng PRD: `shopping_list`, `meal_plan`, `settings`.
- Index chưa đủ (ví dụ `ingredients.tags`, `ingredients.expiresAt`, `recipes.tags`).
- Chưa có migration strategy versioned ngoài schema v1 tối giản.

### 3.4 Matching engine chưa đủ tính năng PRD

- Chưa trả `matchedIngredients` trong kết quả.
- Fuzzy matching mới dừng ở `includes`; chưa có Levenshtein threshold như mô tả PRD.
- Chưa có filter theo tag / thời gian nấu / khẩu phần tại suggest flow.

### 3.5 UI/UX còn tối giản

- Thiếu quick add absolute mode (quantity + unit) trên form nguyên liệu.
- Thiếu chỉnh sửa nhanh +/- stepper, delete/edit ingredient.
- Recipe form chưa có servings/cook time/tags/steps/image.
- Chưa có “missing list để mua”, chưa có empty state chuẩn theo PRD.

### 3.6 PWA/offline chưa đầy đủ

- Có manifest và plugin scaffold, nhưng chưa thể hiện chiến lược cache chi tiết theo PRD.
- Persistence hiện tại chủ yếu qua Zustand persist; Dexie chưa được dùng làm primary data path.

### 3.7 Testing & quality

- Chưa có test case cho text normalization, matcher, và store actions.
- Chưa có test UI cho flows chính.

## 4) Lỗi logic đã phát hiện và chỉnh trong lần cập nhật này

- Phân loại `near` trước đây có thể gán sai cho trường hợp `score = 0` nếu thiếu <=2 nguyên liệu; đã chỉnh để ưu tiên `partial` khi không match được nguyên liệu nào.
- Kết quả matcher đã bổ sung `matchedIngredients` để bám interface PRD.

## 5) Đề xuất thứ tự hoàn thiện (ưu tiên cao → thấp)

1. Hoàn thiện domain entities + repository abstraction đúng PRD.
2. Dùng Dexie repository làm data source chính cho store (offline-first đúng nghĩa).
3. Nâng cấp Fridge/Recipe forms để hỗ trợ absolute mode + metadata chính.
4. Bổ sung filter suggest (tag/time/servings) và “thiếu gì cần mua”.
5. Thêm test unit cho `TextNormalizer`, `RecipeMatcher`, store.

