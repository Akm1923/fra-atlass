import React, { useState, useRef, useEffect } from 'react';
import { ChatBubbleIcon } from '../icons/ChatBubbleIcon';
import { XMarkIcon } from '../icons/XMarkIcon';
import { PaperAirplaneIcon } from '../icons/PaperAirplaneIcon';
import { ChatMessage } from '../../types';
import { sendMessageToGemini } from '../../services/geminiService';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: 'model',
            content: "Hello! I'm an AI assistant for the FRA Atlas. How can I help you understand the Forest Rights Act or navigate the platform today?"
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await sendMessageToGemini(input);
            const modelMessage: ChatMessage = { role: 'model', content: response };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            const errorMessage: ChatMessage = { role: 'model', content: "Sorry, something went wrong. Please try again." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Chat Window */}
            <div className={`fixed bottom-24 right-4 sm:right-8 w-[calc(100%-2rem)] sm:w-96 h-[70vh] max-h-[600px] bg-white rounded-xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out z-50 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                {/* Header */}
                <header className="bg-slate-800 text-white p-4 flex justify-between items-center rounded-t-xl">
                    <h3 className="font-bold text-lg">AI Assistant</h3>
                    <button onClick={toggleChat} className="p-1 rounded-full hover:bg-slate-700">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </header>
                
                {/* Messages */}
                <div className="flex-grow p-4 overflow-y-auto bg-slate-50">
                    <div className="flex flex-col space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs lg:max-w-sm px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-orange-500 text-white rounded-br-none' : 'bg-slate-200 text-slate-800 rounded-bl-none'}`}>
                                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="max-w-xs lg:max-w-sm px-4 py-3 rounded-2xl bg-slate-200 text-slate-800 rounded-bl-none">
                                    <div className="flex items-center space-x-1">
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></span>
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Form */}
                <footer className="p-4 border-t bg-white rounded-b-xl">
                    <form onSubmit={handleSend} className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask a question..."
                            disabled={isLoading}
                            className="w-full px-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
                        />
                        <button type="submit" disabled={isLoading || !input.trim()} className="p-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors">
                            <PaperAirplaneIcon className="w-5 h-5" />
                        </button>
                    </form>
                </footer>
            </div>

            {/* Floating Action Button */}
            <button
                onClick={toggleChat}
                className={`fixed bottom-6 right-4 sm:right-8 bg-orange-500 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600 transition-transform transform hover:scale-110 z-50 ${!isOpen ? 'animate-pulse-subtle' : ''}`}
                aria-label="Toggle AI Assistant"
            >
                {isOpen ? <XMarkIcon className="w-7 h-7" /> : <ChatBubbleIcon className="w-7 h-7" />}
            </button>
        </>
    );
};

export default Chatbot;