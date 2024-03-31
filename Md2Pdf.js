   const fs = require('fs');
   const path = require('path');
   const markdownpdf = require("markdown-pdf");
   
   // 設定原始 Markdown 檔案所在的資料夾
   const srcDirectory = path.join(__dirname, 'src');
   // 設定轉換後 PDF 檔案要存放的目錄
   const destDirectory = path.join(__dirname, 'pdf');
   
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