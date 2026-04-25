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

export default async function handler(req, res){
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    try{
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
        })

        const data = await response.json()
        res.json({ reply: data.choices[0].message.content })
    }catch{
        res.status(500).json({ error: 'Internal server error' });
    }

    
}

