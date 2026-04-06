# 貢獻指南

感謝您有興趣為我們的專案做出貢獻！我們歡迎所有人的貢獻。參與此專案即表示您同意遵守我們的 [行為準則](CODE_OF_CONDUCT.md)。

## 開始使用

1.  **Fork 此儲存庫** 到您的 GitHub 帳號。
2.  **Clone 專案** 到您的本地機器。
3.  **安裝依賴套件**:
    ```bash
    bun install
    ```


## 開發模式與分支策略

本專案採用 **Rolling 開發模式**。

*   **`main`**: 主要分支，隨時保持可部署狀態 (Rolling Release)。所有的 Pull Request 都應該合併回此分支。
*   **`feature/*`**: 用於開發新功能的分支 (例如: `feature/new-login-page`)。
*   **`fix/*`**: 用於修復錯誤的分支 (例如: `fix/login-bug`)。

## 開發流程

1.  為您的功能或錯誤修復創建一個新的分支：
    ```bash
    git checkout -b feat/your-feature-name
    ```
    或
    ```bash
    git checkout -b fix/your-bug-fix
    ```

2.  進行您的更改。

3.  **Linting (代碼檢查) 與測試**:
    我們使用 `husky` 來確保代碼品質。在您提交 (commit) 之前，`lint-staged` 會自動執行以檢查您的代碼風格。
    
    您也可以手動執行 lint 檢查：
    ```bash
    bun run lint
    ```

## Commit 訊息規範

我們使用 **Conventional Commits** 來確保我們的 commit 訊息標準化。這會通過 `husky` hooks 和 `commitlint` 強制執行。

**⚠️ 重要：所有的 Commit 訊息必須使用英文撰寫。**

### 格式
每個 commit 訊息包括 **標頭 (header)**、**內文 (body)** 和 **頁腳 (footer)**。標頭具有特殊格式，包含 **類型 (type)**、**範圍 (scope)** 和 **主旨 (subject)**：

```
<type>(<scope>): <subject>
<空行>
<body>
<空行>
<footer>
```

### 類型 (Type)
必須是以下之一：

*   **feat**: 新功能
*   **fix**: 錯誤修復
*   **docs**: 僅文檔更改
*   **style**: 不影響代碼含義的更改（空白、格式、缺少分號等）
*   **refactor**: 既不是修復錯誤也不是添加功能的代碼更改
*   **perf**: 提高性能的代碼更改
*   **test**: 添加缺失的測試或更正現有的測試
*   **build**: 影響構建系統或外部依賴項的更改
*   **ci**: 對我們的 CI 配置文件和腳本的更改
*   **chore**: 其他不修改 src 或測試文件的更改
*   **revert**: 還原先前的 commit

### 範例
```
feat(auth): add login functionality
```

如果您的 commit 訊息不符合此格式，commit 將被 `husky` 拒絕。

## Pull Request 流程

1.  確保您的代碼可以構建並通過所有檢查。
2.  如果有介面更改，請更新 `README.md`。
3.  提交 Pull Request 到 `main` 分支。
4.  請遵循 Pull Request 模板中的檢查清單。

## 回報問題

如果您發現錯誤或有建議，請先檢查現有的 Issues。如果沒有找到相關問題，請隨時使用提供的模板開啟新 Issue。
