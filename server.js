import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();
console.log("DB URL:", process.env.DATABASE_URL)
import pkg from 'pg'
import bcrypt from 'bcrypt'
const { Pool } = pkg
const app = express();
const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);     
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));



const sys_role = `
You are **Ask Baguio AI**, the virtual assistant for the Ask Baguio tourism platform.

You help visitors explore Baguio City by answering questions about tourist spots, local history, entrance fees, travel tips, and destination details.

Ask Baguio is a web-based tourism platform that helps users discover famous places in Baguio, learn the story behind each location, and get smart travel guidance through AI.

Your replies should sound natural and human, like a friendly local guide talking to a visitor. Keep your tone warm, simple, and helpful. Avoid sounding robotic or too scripted.

Do not use bullet points, dashes, or numbered formats in normal replies. Write in plain sentences and short paragraphs unless the user directly asks for a list or step-by-step answer.

If a user wants deeper guidance, more personalized recommendations, or full AI support, explain naturally that they need to **register first or create an account** on Ask Baguio to unlock the full guided experience.

Stay focused only on Ask Baguio and Baguio-related tourism concerns. If a question is unrelated, politely let the user know that you are designed to help only with Ask Baguio services and Baguio travel information.

Keep answers short, clear, and easy to understand.
Always be friendly, conversational, and professional.

For additional information:
This website or system was created by **John Andrei Mandapat**, with UI collaboration and frontend design support from **Tristan Dela Cruz**.
`;


app.post('/api/FrontendChatbot', async (req, res) => {
    console.log('1. Request received:', req.body)
    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                  { role: "system", content: sys_role },
                  { role: "user", content: "What is Ask Baguio?" },
                  { role: "assistant", content: "Ask Baguio is a web-based tourism platform that helps visitors explore tourist spots in Baguio, learn the history of each place, and get smart travel guidance through an AI assistant." },
                  { role: "user", content: req.body.message }
                ]
            })
        });

        const data = await response.json();
        res.json({ reply: data.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/api/register', async (req, res) => {
    const { email, password_hash } = req.body
    try {
        const hashedPassword = await bcrypt.hash(password_hash, 10)
        const result = await pool.query(
            'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
            [email, hashedPassword]
        )
        res.status(201).json({ user: result.rows[0] })
    } catch (error) {
        if (error.code === '23505') {
            res.status(400).json({ error: 'Email already exists' })
        } else {
            console.error(error)
            res.status(500).json({ error: 'Registration failed' })
        }
    }
});



app.post('/api/login', async (req, res) => {
    const { email, password_hash } = req.body
    try {
        // find user by email
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        )

        // check if user exists
        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Email not found' })
        }

        const user = result.rows[0]

        // compare password with hashed password
        const isMatch = await bcrypt.compare(password_hash, user.password_hash)

        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect password' })
        }

        res.json({ message: 'Login successful', user: { id: user.id, email: user.email } })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Login failed' })
    }

})
  app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Running on port ${PORT}`));