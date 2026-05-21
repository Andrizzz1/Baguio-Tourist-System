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
    ssl: process.env.DB_SSL === 'true'
        ? { rejectUnauthorized: false }
        : false
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



const sys_role_explore = (place, weather) => {
    const mapsLink = `https://www.google.com/maps/search/?q=${encodeURIComponent(place.name + ' ' + place.location)}`
    return`
You are Ask Baguio AI, the virtual travel assistant built into the Ask Baguio tourism platform.

You are currently assigned as the dedicated AI guide for ${place.name}, located at ${place.location}.

YOUR DEDICATED SPOT:
Place: ${place.name}
Location: ${place.location}
Category: ${place.badge}
Opening Hours: ${place.hours}
Entry Fee: ${place.entry}
About: ${place.about}
Highlights: ${place.highlights.join(', ')}

Focus all your answers around ${place.name} unless the user asks about nearby food spots, directions, or general Baguio travel tips that are directly relevant to their visit.

CONVERSATION STATE:
You have already greeted the user. Do not say hello, hi, or any greeting at the start of your reply. Jump straight into answering naturally as if the conversation is already ongoing.

Your tone should be warm, friendly, and conversational — like a knowledgeable local guide, not a scripted bot. Write in natural sentences and short paragraphs. Avoid bullet points, dashes, or numbered lists unless the user specifically asks for one.

GOOGLE MAPS:
When a user asks for directions, a map, a location, or a Google Maps link, respond with a short helpful sentence and include this exact URL at the end:
${mapsLink}

Example reply: "Sure! Here's the location of ${place.name} on Google Maps: ${mapsLink}"
(if link is broken try to send the correct link)
Do not wrap it in brackets or any tags. Just include the plain URL in your reply.

WEATHER:
When a user asks about the current weather, temperature, or conditions, include this exact tag in your reply:
CURRENT BAGUIO WEATHER (live data):
Temperature: ${weather.main.temp}°C (feels like ${weather.main.feels_like}°C)
Condition: ${weather.weather[0].description}
Humidity: ${weather.main.humidity}%
Wind Speed: ${Math.round(weather.wind.speed * 3.6)} km/h
Write a natural sentence like "Let me check the current conditions for you." then place the tag. Do not make up weather details.

PLATFORM CONTEXT:
Ask Baguio is a web-based tourism platform for discovering famous and hidden places in Baguio, learning their stories, and getting smart AI travel guidance. It was created by John Andrei Mandapat, with UI and frontend design support from Tristan Dela Cruz.

If a user wants saved trips, full itinerary planning, or personalized recommendations, let them know they need to register or log in to unlock the full experience.

BOUNDARIES:
Stay focused on ${place.name} and Baguio-related tourism. If a question is completely off-topic, politely say you are only here to help with ${place.name} and Baguio travel.

Keep answers short, clear, and easy to understand. Always be friendly and professional.
For additional information:
This website or system was created by **John Andrei Mandapat**, with UI collaboration and frontend design support from **Tristan Dela Cruz**.
`};


const initialMessages = (place) => [
  {
    role: "user",
    content: `I just opened the details page for ${place.name}.`
  },
  {
    role: "assistant",
    content: `Sure! I'm here to help you learn more about ${place.name}. Feel free to ask me anything — whether it's about the best time to visit, how to get there, what to expect, or what's nearby.`
  },
  {
    role: "user",
    content: `What is the best time to visit ${place.name}?`
  },
  {
    role: "assistant",
    content: `The best time to visit ${place.name} is early in the morning, around 7 to 9 AM, when it's less crowded and the cool Baguio air is still fresh. Weekdays are generally quieter than weekends, so if you can, plan your visit on a Tuesday or Wednesday for a more relaxed experience.`
  },
  {
    role: "user",
    content: `How much is the entrance fee?`
  },
  {
    role: "assistant",
    content: `The entrance fee for ${place.name} is ${place.entry}. Pretty easy on the budget! Just make sure to bring exact change as some spots don't always have change ready at the gate.`
  },
  {
    role: "user",
    content: `What are the opening hours?`
  },
  {
    role: "assistant",
    content: `${place.name} is open ${place.hours}. I'd suggest arriving closer to opening time so you can enjoy it before the crowds start coming in, especially on weekends and holidays.`
  },
  {
    role: "user",
    content: `What can I do or see there?`
  },
  {
    role: "assistant",
    content: `There's quite a lot to enjoy at ${place.name}. Some of the highlights include ${place.highlights.join(', ')}. Whether you're there for sightseeing, photos, or just soaking in the atmosphere, you'll find something worth your time.`
  },
  {
    role: "user",
    content: `Is it family friendly?`
  },
  {
    role: "assistant",
    content: `Absolutely! ${place.name} is a great spot for families. It's accessible and has enough to keep both kids and adults entertained. Just bring a light jacket since Baguio can get chilly, especially in the morning and late afternoon.`
  },
  {
    role: "user",
    content: `Any food spots near ${place.name}?`
  },
  {
    role: "assistant",
    content: `There are several good options near ${place.name}. You'll find local carinderias and casual cafés within walking distance. If you're up for a short ride, Session Road has a wider selection of restaurants, cafés, and street food stalls that are very popular with both tourists and locals.`
  },
  {
    role: "user",
    content: `How do I get to ${place.name} from the city center?`
  },
  {
    role: "assistant",
    content: `Getting to ${place.name} from the city center is pretty straightforward. You can take a jeepney or a taxi from Session Road and it should take around 10 to 20 minutes depending on traffic. If you prefer, you can also book a Grab for a more convenient ride. Here's the map to help you out. [MAPS:${place.name} ${place.location}]`
  },
  {
    role: "user",
    content: `Is it worth visiting?`
  },
  {
    role: "assistant",
    content: `Definitely worth it. ${place.name} is one of those places that gives you a real feel of what Baguio is all about. Whether you're a first-time visitor or coming back for another trip, it's the kind of spot that always has something new to offer depending on the season and time of day.`
  },
]

app.post('/api/FrontendChatbot', async (req, res) => {
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
    const { username, email, password } = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const result = await pool.query(
            'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING users_id,username, email',
            [username, email, hashedPassword]
        )

        res.status(201).json({
            user: {
                id: result.rows[0].users_id,
                username: result.rows[0].username,
                email: result.rows[0].email
            }
})
    } catch (error) {
        if (error.code === '23505') {
            res.status(400).json({ error: 'Email already exists' })
        } else {
            console.error(error)
            res.status(500).json({ error: error.message })
        }
    }
})



app.post('/api/login', async (req, res) => {
    const { email, password } = req.body
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
        const isMatch = await bcrypt.compare(password, user.password_hash)

        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect password' })
        }

        res.json({ message: 'Login successful', user: { id: user.users_id, email: user.email,username: user.username } })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Login failed' })
    }

})


app.get("/api/community-stats", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT COUNT(*) AS total_members FROM users"
        );

        res.json({
            totalMembers: Number(result.rows[0].total_members),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/api/community-posts", async(req,res)=>{
    const { user_id, content, location, image_url } = req.body;
    if(!user_id){
        return res.status(400).json({ error: "user_id is required" });
    }
    try {
        const result = await pool.query(
            "INSERT INTO community_posts (user_id, content, location, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
            [user_id, content, location, image_url]
        );
        return res.status(201).json(result.rows[0]);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }   
    res.status(405).json({ error: "Method not allowed" });
});

app.get("/api/community-posts", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                community_posts.post_id,
                community_posts.content,
                community_posts.location,
                community_posts.image_url,
                community_posts.created_at,
                users.users_id,
                users.username,
                users.email
            FROM community_posts
            JOIN users on community_posts.user_id = users.users_id
            ORDER BY community_posts.created_at DESC        
        `);

       return res.status(200).json(result.rows);
    } catch (error) {
       return res.status(500).json({ error: error.message });
    }
});

app.get("/api/dasboard-post", async (req, res) =>{

    const { userId } = req.query;
       try{
        const result = await pool.query(`
               SELECT
                    community_posts.post_id,
                    community_posts.content,
                    community_posts.location,
                    community_posts.image_url,
                    community_posts.created_at,
                    users.users_id,
                    users.username,
                    users.email
                FROM community_posts
                JOIN users on community_posts.user_id = users.users_id
                WHERE community_posts.user_id = $1
                ORDER BY community_posts.created_at DESC   
            `,[userId]);
        
        return res.status(200).json(result.rows);
    }catch{
        return res.status(500).json({ error: error.message });
    }
})
app.get("/api/top-contributers", async (req, res) =>{
       try{
        const result = await pool.query(`
               SELECT	
                    COUNT(community_posts.content) AS total_post,
                    users.users_id,
                    users.username
                FROM community_posts
                JOIN users on community_posts.user_id = users.users_id
                GROUP BY users.users_id, users.username
                ORDER BY total_post DESC  
                LIMIT 5;  
            `);
        
        return res.status(200).json(result.rows);
    }catch{
        return res.status(500).json({ error: error.message });
    }
})

app.post("/api/social-login", async (req, res) =>{
    const { username, email, provider } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            const user = existingUser.rows[0];

            return res.status(200).json({
                message: "Login successful",
                user: {
                    id: user.users_id,
                    username: user.username,
                    email: user.email,
                    provider: provider || "google"
                }
            });
        }

        const newUser = await pool.query(
            `INSERT INTO users (username, email, password_hash)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [username || "Google User", email, "GOOGLE_AUTH_USER"]
        );

        const user = newUser.rows[0];

        return res.status(201).json({
            message: "Account created",
            user: {
                id: user.users_id,
                username: user.username,
                email: user.email,
                provider: provider || "google"
            }
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
    })

 
app.get("/api/community-trends", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT content
            FROM community_posts
            WHERE created_at >= NOW() - INTERVAL '7 days'
        `);

        const counts = {};

        result.rows.forEach((row) => {
            const hashtags = row.content?.match(/#[A-Za-z0-9_]+/g) || [];

            hashtags.forEach((tag) => {
                const cleanTag = tag.toLowerCase();
                counts[cleanTag] = (counts[cleanTag] || 0) + 1;
            });
        });

        const trends = Object.entries(counts)
            .map(([tag, count]) => ({ tag, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        res.json(trends);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/api/community-post-delete", async (req, res) => {
    const { postId } = req.query;
    const { user_id } = req.body;

    if (!postId) {
        return res.status(400).json({ error: "postId is required" });
    }

    if (!user_id) {
        return res.status(400).json({ error: "user_id is required" });
    }

    try {
        const result = await pool.query(
            `DELETE FROM community_posts
             WHERE post_id = $1 AND user_id = $2
             RETURNING *`,
            [postId, user_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Post not found or you are not allowed to delete this post"
            });
        }

        return res.status(200).json({
            message: "Post deleted successfully",
            deletedPost: result.rows[0]
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

app.post("/api/Explore-Chatbot", async(req, res) =>{
     try {
        const { message, place, weather } = req.body 

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: sys_role_explore(place, weather) },  
                    ...initialMessages(place),                     
                    { role: "user", content: message }              
                ]
            })
        })

        const data = await response.json()
        res.json({ reply: data.choices[0].message.content })

    } catch (err) {
        console.error(err) 
        res.status(500).json({ error: 'Internal server error' });
    }
})

  app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Running on port ${PORT}`));