import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Lumia Health & Beauty' });
});

// Revenue split config (Admin can change these in a real app, hardcoded here)
const REVENUE_SPLIT = {
  HOME_SERVICE: {
    LUMIA: 0.20,
    PROVIDER: 0.80
  },
  CENTER_SERVICE: {
    LUMIA: 0.15,
    CENTER: 0.25,
    PROVIDER: 0.60
  }
};

app.get('/api/config/revenue-split', (req, res) => {
  res.json(REVENUE_SPLIT);
});

// Lumia AI Wellness Assistant
app.post('/api/ai/wellness-assistant', async (req, res) => {
  const { prompt, history } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Gemini API key not configured' });
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-3.5-flash',
      config: {
        systemInstruction: `You are Lumia AI, a luxury wellness and beauty assistant for Lumia Health & Beauty. 
        Your goal is to provide personalized wellness recommendations, beauty tips, and health habit suggestions.
        You should be elegant, sophisticated, and professional.
        When a user describes a problem (e.g., "neck tension"), recommend specific services available on Lumia:
        - Massages: Swedish, Deep Tissue, Sports, Aromatherapy, Hot Stone, Prenatal, Reflexology
        - Beauty: Facials, Haircare, Makeup, Manicure, Pedicure
        - Wellness: Physiotherapy, Yoga, Meditation, Nutrition
        Be helpful and encouraging. Maintain a premium tone.`,
      },
      history: history || [],
    });

    const result = await chat.sendMessage({ message: prompt });
    res.json({ text: result.text });
  } catch (error: any) {
    console.error('AI Assistant Error:', error);
    res.status(500).json({ error: 'Failed to generate AI response' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
