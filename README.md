# QSDemo - 問卷系統前端專案

## 專案概述

QSDemo 是一個基於 Angular 19 的問卷系統前端應用程式，提供完整的問卷管理、填寫和統計功能。系統支援管理者模式和使用者模式，包含問卷列表、填寫、預覽、結果統計以及使用者註冊等功能。

## 線上展示

🌐 **GitHub Pages**: [https://AtayalLin.github.io/qsdemo/](https://AtayalLin.github.io/qsdemo/)

## 主要功能

### 1. 問卷列表頁面 (`/surveys`)
- **功能描述**: 顯示所有問卷的列表，支援搜尋和過濾
- **管理者模式**:
  - 查看所有問卷狀態（已發佈、已儲存尚未發佈、草稿）
  - 發佈問卷
  - 刪除問卷
  - 預覽問卷
- **使用者模式**:
  - 查看已發佈的問卷
  - 開始填寫問卷
- **搜尋功能**: 支援按標題關鍵字、類型、狀態進行過濾

### 2. 問卷填寫頁面 (`/surveys/:id/question`)
- **功能描述**: 使用者填寫問卷的介面
- **支援題型**:
  - 單選題 (single)
  - 多選題 (multiple)
  - 文字題 (text)
- **資料驗證**: 確保必填題目已完成

### 3. 問卷預覽頁面 (`/surveys/:id/preview`)
- **功能描述**: 預覽問卷內容和填寫結果
- **功能**: 顯示所有問題和使用者選擇的答案

### 4. 問卷結果統計頁面 (`/surveys/:id/result`)
- **功能描述**: 顯示問卷的統計結果
- **圖表功能**: 使用 Chart.js 繪製統計圖表
- **統計資料**: 參與人數、問題統計等

### 5. 註冊頁面 (`/register`)
- **功能描述**: 使用者註冊帳號密碼
- **表單欄位**:
  - 帳號 (account): 用於登入的唯一識別碼
  - 姓名 (name): 使用者顯示名稱
  - 密碼 (password): 登入密碼
  - 確認密碼 (confirmPassword): 驗證密碼輸入正確性
- **驗證功能**:
  - 密碼一致性檢查
  - 帳號重複檢查 (防止重複註冊)
- **資料儲存**: 註冊資訊儲存至瀏覽器 LocalStorage
- **註冊成功後**: 自動跳轉至登入頁面

### 6. 管理者登入功能
- **功能描述**: 系統管理員登入驗證
- **登入方式**: 在問卷列表頁面點擊「管理者登入」按鈕
- **驗證邏輯**:
  - 比對帳號密碼與 LocalStorage 中儲存的使用者資料
  - 驗證成功後進入管理者模式
- **登入狀態**: 支援登入狀態持久化 (重啟瀏覽器後仍保持登入)
- **權限說明**: 管理者模式可進行問卷發佈、刪除等管理操作

## 技術架構

### 前端框架
- **Angular 19**: 主要前端框架
- **TypeScript**: 程式語言
- **SCSS**: 樣式表

### 主要依賴
- `@angular/router`: 路由管理
- `@angular/forms`: 表單處理
- `chart.js`: 圖表繪製
- `rxjs`: 反應式程式設計

### 專案結構
```
src/app/
├── app.component.*          # 根組件
├── app.config.ts           # 應用配置
├── app.routes.ts           # 路由配置
├── survey.service.ts       # 問卷服務 (資料管理)
└── page/                   # 頁面組件
    ├── survey-list/        # 問卷列表
    ├── survey-question/    # 問卷填寫
    ├── survey-preview/     # 問卷預覽
    ├── survey-result/      # 問卷結果
    └── survey-register/    # 註冊頁面
```

## 資料結構

### Survey 介面
```typescript
interface Survey {
  id: number;
  title: string;
  type: string;
  startDate: string;
  endDate: string;
  participants: number;
  publishStatus: '已發佈' | '已儲存尚未發佈' | '草稿';
  questions?: Question[];
}
```

### Question 介面
```typescript
interface Question {
  id: number;
  title: string;
  type: 'single' | 'multiple' | 'text';
  options?: string[];
  cssClass?: string;
}
```

## 目前狀態與限制

### 資料來源
- **目前實作**: 使用前端假資料 (Mock Data)
- **資料儲存**: 所有資料均儲存在 `survey.service.ts` 中
- **限制**: 資料不會持久化，重啟應用程式後資料會重置

### 未來規劃
- **後端整合**: 預計串接後端 API 進行資料庫操作
- **API 端點** (參考實作):
  - `GET /api/surveys`: 獲取問卷列表
  - `GET /api/surveys/:id`: 獲取問卷詳情
  - `POST /api/responses`: 提交問卷答案
  - `GET /api/surveys/:id/stats`: 獲取統計資料

### 功能限制
- 目前僅有前端功能，無後端資料庫支援
- 使用者資料和問卷答案不會實際儲存
- 統計資料為模擬計算結果
- **帳號密碼管理**: 使用瀏覽器 LocalStorage 儲存，資料僅在本機有效，清空瀏覽器資料後將遺失

## 開發環境設定

### 環境需求
- Node.js (建議使用 LTS 版本)
- npm 或 yarn
- Angular CLI 19

### 安裝步驟
1. **複製專案**
   ```bash
   git clone <repository-url>
   cd qsdemo
   ```

2. **安裝依賴**
   ```bash
   npm install
   ```

3. **啟動開發伺服器**
   ```bash
   npm start
   # 或
   ng serve
   ```

4. **開啟瀏覽器**
   前往 `http://localhost:4200`

### 可用指令
- `npm start`: 啟動開發伺服器
- `npm run build`: 建置生產版本
- `npm test`: 執行單元測試
- `ng generate component <name>`: 生成新組件

## 使用說明

### 註冊帳號密碼流程
1. **進入註冊頁面**
   - 從問卷列表頁面點擊註冊連結，或直接訪問 `/register`
   
2. **填寫註冊資訊**
   - 帳號：輸入唯一的登入帳號
   - 姓名：輸入您的顯示名稱
   - 密碼：設定登入密碼
   - 確認密碼：再次輸入相同密碼

3. **系統驗證**
   - 自動檢查密碼一致性
   - 驗證帳號是否已被註冊
   - 通過驗證後儲存至瀏覽器本地儲存

4. **註冊完成**
   - 顯示成功訊息
   - 自動跳轉至登入頁面

### 管理者登入流程
1. **開啟登入介面**
   - 在問卷列表頁面點擊「管理者登入」按鈕
   - 或註冊成功後系統自動跳轉

2. **輸入登入資訊**
   - 帳號：輸入註冊時設定的帳號
   - 密碼：輸入對應的密碼

3. **驗證登入**
   - 系統比對帳號密碼與本地儲存資料
   - 驗證成功後進入管理者模式
   - 登入狀態會被記住 (支援瀏覽器重啟後保持登入)

4. **管理者權限**
   - 查看所有問卷狀態 (包括未發佈的)
   - 發佈問卷
   - 刪除問卷
   - 預覽問卷內容

### 使用者模式操作流程
1. **瀏覽問卷**
   - 在問卷列表中查看已發佈的問卷
   - 支援按標題、類型、狀態進行搜尋過濾

2. **填寫問卷**
   - 點擊「開始填寫」進入問卷頁面
   - 依序回答所有問題 (單選、多選、文字題)
   - 系統會驗證必填題目是否完成

3. **預覽與提交**
   - 填寫完成後可預覽所有答案
   - 確認無誤後提交問卷
   - 提交後可查看統計結果

## 開發注意事項

- 所有組件均使用 Standalone Components 架構
- 服務使用 RxJS Observable 進行資料流管理
- 樣式使用 SCSS，支援自訂主題色彩
- 路由配置支援參數化路徑和重定向
- **帳號密碼功能**: 前端模擬驗證，使用 LocalStorage 儲存使用者資料，生產環境應替換為安全的後端驗證機制

## 貢獻指南

1. Fork 此專案
2. 建立功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 授權

此專案僅供學習和展示用途。
