// 檔案位置：api/notify.js
export default async function handler(req, res) {
  const { message } = req.query; 
  const token = process.env.LINE_TOKEN;

  // 🔴 必改！請把下面的網址改成妳 Vercel 提供的那個網址
  // 例如: "https://yun-you-win.vercel.app"
  const myAppUrl = "yunyoin.vercel.app"; 

  if (!token) return res.status(500).json({ error: '缺少 LINE Token' });

  // 組合訊息：原本的文字 + 換行 + 連結
  const fullMessage = `${message}\n\n👉 點此開啟：${myAppUrl}`;

  try {
    // 使用 Messaging API 的廣播功能 (Broadcast)
    const response = await fetch('https://api.line.me/v2/bot/message/broadcast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        messages: [
          {
            type: 'text',
            text: fullMessage 
          }
        ]
      })
    });

    if (!response.ok) {
        const errorData = await response.json();
        return res.status(500).json({ error: '發送失敗', details: errorData });
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({ error: '伺服器錯誤' });
  }
}