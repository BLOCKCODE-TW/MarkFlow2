# MarkFlow2 馬福2

要將一個資料夾中的 Markdown 檔案轉換成 PDF 並存放到另一個目錄，我們可以使用 Node.js 搭配 `markdown-pdf` 套件來達成這個需求。首先，你需要確保你的系統上已經安裝了 Node.js。

以下是一個範例程式，說明如何實現這個功能：

1. **安裝必要的套件**：在你的 Node.js 專案中，首先需要安裝 `markdown-pdf` 這個套件。你也可能需要 `fs` 和 `path` 模組來處理檔案和路徑，不過這兩個模組是 Node.js 的核心模組，無需另行安裝。

   打開終端機，運行以下命令來安裝 `markdown-pdf`：
   ```sh
   npm install markdown-pdf
   ```

2. **撰寫轉換程式**：接下來，建立一個 JavaScript 檔案，比如叫做 `mdToPdf.js`，並撰寫以下程式碼：

   ```javascript
   const fs = require('fs');
   const path = require('path');
   const markdownpdf = require("markdown-pdf");
   
   // 設定原始 Markdown 檔案所在的資料夾
   const srcDirectory = path.join(__dirname, 'src');
   // 設定轉換後 PDF 檔案要存放的目錄
   const destDirectory = path.join(__dirname, 'dest');
   
   // 確保輸出目錄存在
   if (!fs.existsSync(destDirectory)){
     fs.mkdirSync(destDirectory, { recursive: true });
   }
   
   // 讀取原始資料夾中的所有 Markdown 檔案
   fs.readdir(srcDirectory, (err, files) => {
     if (err) {
       console.error("無法讀取資料夾: ", err);
       return;
     }
   
     files.forEach(file => {
       if (path.extname(file).toLowerCase() === '.md') {
         // 設定輸入和輸出的檔案路徑
         const srcFilePath = path.join(srcDirectory, file);
         const destFilePath = path.join(destDirectory, file.replace('.md', '.pdf'));
   
         // 轉換成 PDF
         markdownpdf().from(srcFilePath).to(destFilePath, () => {
           console.log(file + ' 轉換完成');
         });
       }
     });
   });
   ```

3. **運行程式**：將你的 Markdown 檔案放入 `src` 資料夾（你需要自己創建這個資料夾），然後在終端機中運行以下命令來執行你的轉換程式：

   ```sh
   node mdToPdf.js
   ```

這個程式會掃描 `src` 目錄中的所有 Markdown 檔案，將它們轉換成 PDF 格式，並將轉換後的 PDF 檔案存放到 `dest` 目錄中。你可以根據需要修改 `srcDirectory` 和 `destDirectory` 變數來指定不同的輸入輸出路徑。