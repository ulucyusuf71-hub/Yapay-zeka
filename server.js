const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default:fetch})=>fetch(...args));
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/ask', async (req, res) => {
  const question = req.body.question;
  const r = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: question }],
      max_tokens: 800
    })
  });
  const data = await r.json();
  res.json({ answer: data.choices[0].message.content });
});

app.listen(3000, ()=> console.log("Server 3000 portunda"));
