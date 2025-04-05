const express = require('express');
const { OpenAIApi, Configuration } = require('openai');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: userMessage }]
  });

  res.json({ reply: response.data.choices[0].message.content });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
