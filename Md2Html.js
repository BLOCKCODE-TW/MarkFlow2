const fs = require('fs');
const path = require('path');
const Showdown = require('showdown');

// 設定源目錄和目標目錄
const srcDir = path.join(__dirname, 'src');
const destDir = path.join(__dirname, 'html');

// 創建一個 converter 實例
const converter = new Showdown.Converter();

// 檢查並創建目標目錄（如果不存在）
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// 讀取源目錄中的所有檔案
fs.readdir(srcDir, (err, files) => {
  if (err) {
    return console.error('無法讀取源目錄：', err);
  }

  files.forEach(file => {
    // 確保檔案是 Markdown 格式
    if (path.extname(file) === '.md') {
      // 讀取 Markdown 檔案內容
      fs.readFile(path.join(srcDir, file), 'utf8', (err, data) => {
        if (err) {
          return console.error(`無法讀取檔案 ${file}：`, err);
        }

        // 使用 Showdown 轉換 Markdown 到 HTML
        const html = converter.makeHtml(data);

        // 建立 HTML 檔案的路徑
        const destPath = path.join(destDir, `${path.basename(file, '.md')}.html`);

        // 將轉換後的 HTML 寫入檔案
        fs.writeFile(destPath, html, err => {
          if (err) {
            return console.error(`無法寫入檔案 ${destPath}：`, err);
          }

          console.log(`${file} 已轉換並儲存為 ${destPath}`);
        });
      });
    }
  });
});
