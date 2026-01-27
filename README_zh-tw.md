# Twinkle AI 官方網站

> **繁體中文** | [English](README.md)

🌐 Twinkle AI 官方網站 - 致力於構建開源正體中文語言模型的研究社群。

這是一個雙語（繁體中文與英文）網站，展示 Twinkle AI 的專案、研究與社群活動。

## 技術架構

- **框架**: [Nuxt 4](https://nuxt.com/) (Vue 3)
- **UI 函式庫**: [Nuxt UI](https://ui.nuxt.com/)
- **部署平台**: [Cloudflare Workers](https://workers.cloudflare.com/)
- **套件管理器**: [Bun](https://bun.sh/)
- **國際化**: @nuxtjs/i18n (預設繁體中文，支援英文)

## 環境需求

- **Node.js** 18+ 或 **Bun** 執行環境
- **Bun** 套件管理器（推薦）- [安裝 Bun](https://bun.sh/)

## 開始使用

### 1. 複製專案

```bash
git clone https://github.com/ai-twinkle/ai-twinkle.github.io.git
cd ai-twinkle.github.io
```

### 2. 安裝相依套件

使用 Bun（推薦）：

```bash
bun install
```

或使用 npm：

```bash
npm install
```

### 3. 啟動開發伺服器

```bash
npm run dev
```

網站將在 `http://localhost:3000` 上運行

## 開發指令

| 指令 | 說明 |
| ------- | ----------- |
| `npm run dev` | 啟動開發伺服器 |
| `npm run build` | 建置正式版本 |
| `npm run generate` | 產生靜態網站 |
| `npm run preview` | 使用 Wrangler 建置並預覽 |
| `npm run deploy` | 部署至 Cloudflare Workers |
| `npm run lint:es:fix` | 自動修正 ESLint 問題 |
| `npm run lint:es:check` | 檢查 ESLint（有警告會失敗）|
| `npm run cf-typegen` | 產生 Cloudflare 型別定義 |

## 專案結構

```text
.
├── app/                    # 前端 Nuxt 應用程式
│   ├── pages/             # 檔案路由
│   ├── components/        # Vue 元件
│   ├── layouts/           # 頁面佈局
│   ├── plugins/           # Nuxt 外掛
│   ├── data/              # TypeScript 型別與資料
│   └── assets/css/        # 全域 CSS
├── server/                # 伺服器端程式碼 (Nitro)
│   ├── api/              # API 端點
│   ├── routes/           # 伺服器路由（重定向）
│   └── utils/            # 伺服器工具函式
├── i18n/locales/         # 翻譯檔案 (zh-TW, en)
├── public/               # 靜態資源
├── nuxt.config.ts        # Nuxt 設定檔
└── wrangler.jsonc        # Cloudflare Workers 設定
```

## 貢獻指南

我們歡迎各種貢獻！請遵循以下準則：

### Git 工作流程

本專案使用 **Conventional Commits**（約定式提交），並透過 commitlint 強制執行：

```bash
# 提交訊息格式
type(scope): description

# 範例
feat(components): add new hero section
fix(i18n): correct translation keys
docs(readme): update setup instructions
```

**常用類型**: `feat`（新功能）、`fix`（修正）、`docs`（文件）、`style`（格式）、`refactor`（重構）、`test`（測試）、`chore`（雜項）

### Git Hooks

- **Pre-commit**（提交前）: 對暫存檔案執行 ESLint
- **Commit-msg**（提交訊息）: 驗證提交訊息格式

### 程式碼風格

- 使用 **ESLint** 搭配 `eslint-config-nymph`
- **JSDoc** 註解（不包含型別標註 - 使用 TypeScript 型別）
- 提交前執行 `npm run lint:es:fix`

## 主要特色

### 國際化 (i18n)

- 預設語系: **zh-TW**（繁體中文）
- 次要語系: **en**（英文）
- URL 策略: `prefix_except_default`
  - 中文: `/`（無前綴）
  - 英文: `/en`

### 圖示系統

本專案使用 `DynamicHeroIcon.vue` 元件，將 PascalCase 格式的 heroicon 名稱轉換為 Nuxt UI 格式：

- 輸入: `BeakerIcon` → 輸出: `i-heroicons-beaker`

### 伺服器路由

- `/github` - 重定向至 GitHub 組織
- `/discord` - 重定向至 Discord 伺服器
- `/huggingface` - 重定向至 HuggingFace 組織
- API 404 錯誤會透過 `useCat()` 工具函式回傳 ASCII 貓咪圖案

## 部署

本網站部署至 **Cloudflare Workers**：

```bash
npm run deploy
```

部署設定於 `wrangler.jsonc` 檔案中管理。

## 授權條款

本專案採用 [LICENSE](LICENSE) 檔案中指定的授權條款。

## 社群連結

- **GitHub**: [github.com/ai-twinkle](https://github.com/ai-twinkle)
- **HuggingFace**: [huggingface.co/twinkle-ai](https://huggingface.co/twinkle-ai)
- **Discord**: 加入我們的社群伺服器

---

由 Twinkle AI 社群用 ❤️ 打造
