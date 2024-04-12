const express = require('express');
const app = express();
const port = 3000;

// Sử dụng một đối tượng để lưu trữ các liên kết. Trong thực tế, bạn có thể muốn lưu trữ chúng trong một cơ sở dữ liệu.
let links = {};

app.use(express.json());

// API để tạo liên kết chuyển hướng
app.post('/create-link', (req, res) => {
  const { originalLink, numLinks } = req.body;
  const generatedLinks = [];

  for (let i = 0; i < numLinks; i++) {
    // Tạo một ID ngẫu nhiên cho mỗi liên kết chuyển hướng
    const redirectId = Math.random().toString(36).substring(2, 15);
    links[redirectId] = originalLink;
    generatedLinks.push(`http://localhost:${port}/r/${redirectId}`);
  }

  res.json({ generatedLinks });
});

// Xử lý chuyển hướng
app.get('/r/:redirectId', (req, res) => {
  const { redirectId } = req.params;
  const originalLink = links[redirectId];
  if (originalLink) {
    res.redirect(originalLink);
  } else {
    res.status(404).send('Link not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
