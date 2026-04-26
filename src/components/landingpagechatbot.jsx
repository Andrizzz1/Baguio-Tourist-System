import { useState,useEffect,useRef } from 'react'
import { XMarkIcon, PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/solid'

const INITIAL_MESSAGES = [
    { from: 'bot', text: 'Hi there! 👋 I\'m Ask Baguio Bot, your smart travel guide for the City of Pines. How can I help you today?' },
]

const CHIPS = ['Top Tourist Spots', 'History of The Mansion', 'Travel Tips', 'Best Restaurants', 'Weather in Baguio']

export const ChatbotModal = ({ onClose }) => {
    const [messages, setMessages] = useState(INITIAL_MESSAGES)
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [showChips, setShowchips] = useState(true)
    const bottomRef = useRef(null) 
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])
    async function sendToAI(msg) {
        try {
            const response = await fetch("/api/FrontendChatbot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: msg })
            });

            // ADD THESE DEBUG LINES
            console.log("Status:", response.status);
            const data = await response.json();
            console.log("Full response:", data);  // see exactly what's coming back

            if (!response.ok) {
                return `API Error: ${data.error?.message || response.status}`;
            }

            return data.reply

        } catch (error) {
            console.error("Fetch Error:", error);
            return "Error contacting AI";
        }

    }

    const sendMessage = async(text) => {
        const userMsg = text.trim() || input.trim()
        
        if (!userMsg) return
        setMessages(prev => [
            ...prev,
            { from: 'user', text: userMsg }
        ])
        setLoading(true)
        const aiReply = await sendToAI(userMsg)
        setLoading(false)
        setMessages(prev =>[...prev, { text: aiReply, from: "bot" }])
        setInput('')
    }

    return (
        <div className="fixed inset-0 z-50 flex justify-end items-end  px-4 shadow-2xl">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">

                {/* Header */}
                <div className="bg-green-900 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-700 p-2 rounded-xl">
                            <img className='h-6' src="/imgs/chatbotLogo.png" alt="Chatlogo" />
                        </div>
                        <div>
                            <h2 className="text-white font-bold text-lg leading-tight">Ask Baguio Bot</h2>
                            <p className="text-green-300 text-xs">Your smart travel guide for Baguio</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-green-300 hover:text-white hover:bg-green-800 p-1.5 rounded-xl transition-colors"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3 bg-green-50">
                    
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                            
                            {msg.from === 'bot' && (
                                <div className="w-7 h-7 rounded-full bg-green-900 flex items-center justify-center mr-2 mt-1 shrink-0">
                                     <img className='h-6' src="/imgs/chatbotLogo.png" alt="Chatlogo" />
                                </div>
                            )}
                           
                            <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm
                                ${msg.from === 'user'
                                    ? 'bg-green-900 text-white rounded-br-sm'
                                    : 'bg-white text-gray-700 rounded-bl-sm border border-gray-100'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                     {loading && (
                        <div className="flex justify-start">
                        <div className="border-green-300 px-4 py-3 rounded-2xl flex gap-1 items-center">
                            <span className="w-2 h-2 bg-[#67e548] rounded-full animate-bounce [animation-delay:0ms]"></span>
                            <span className="w-2 h-2 bg-[#67e548] rounded-full animate-bounce [animation-delay:150ms]"></span>
                            <span className="w-2 h-2 bg-[#67e548] rounded-full animate-bounce [animation-delay:300ms]"></span>
                        </div>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>
                
                
       
                {/* Suggestion Chips */}
                {showChips == true? (
                <div className="px-5 py-3 flex gap-2 flex-wrap border-t border-gray-100 bg-white">
                    {CHIPS.map(chip => (
                        <button
                            key={chip}
                            onClick={() => sendMessage(chip)}
                            className="text-xs bg-green-50 text-green-800 border border-green-200 px-3 py-1.5 rounded-full hover:bg-green-100 transition-colors font-medium"
                        >
                            {chip}
                        </button>
                    ))}
                </div>
                ):
                null
}
                {/* Input */}
                <div className="px-5 py-4 bg-white border-t border-gray-100 flex gap-3 items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                        onClick={()=> setShowchips(false)}
                        placeholder="Ask me anything about Baguio..."
                        className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700 bg-green-50"
                    />
                    <button
                        onClick={() => sendMessage(input)}
                        className="bg-green-900 hover:bg-green-700 transition-colors text-white p-2.5 rounded-xl shrink-0"
                    >
                        <PaperAirplaneIcon className="w-5 h-5" />
                    </button>
                </div>

            </div>
        </div>
    )
}
