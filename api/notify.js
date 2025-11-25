// 檔案位置：api/notify.js
export default async function handler(req, res) {
  const { message } = req.query; 
  const token = process.env.LINE_TOKEN; // 這裡不用改，之後去 Vercel 設定

  if (!token) return res.status(500).json({ error: '缺少 LINE Token' });

  try {
    await fetch('https://notify-api.line.me/api/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      },
      body: new URLSearchParams({ message })
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: '發送失敗' });
  }
}