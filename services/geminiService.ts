import { GoogleGenAI, Chat } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Chatbot will not function.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `You are an expert AI assistant for the "FRA Atlas & Decision Support System".
Your role is to help users, including government officials and community members, understand the Forest Rights Act (FRA), interpret the GIS data presented in the application, and learn about eligible government schemes.
When asked about specific data (e.g., "who owns plot 5?"), you should state that you can provide general information but cannot access real-time specific user data from the map for privacy reasons. Instead, instruct the user on how to find that information themselves using the map interface (e.g., "You can find the owner of a specific plot by clicking on it on the GIS Atlas map.").
Be helpful, concise, and professional. Do not answer questions outside the scope of Indian land rights, forestry, and related government schemes. If a question is off-topic, politely decline to answer.`;

// A single chat session for the lifecycle of the app.
// A more robust implementation might manage sessions per-user.
let chatSession: Chat | null = null;

function getChatSession(): Chat {
    if (!chatSession) {
        console.log("Creating new Gemini chat session.");
        chatSession = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: systemInstruction,
            },
        });
    }
    return chatSession;
}


export const sendMessageToGemini = async (message: string): Promise<string> => {
    if (!API_KEY) {
        return "Chatbot is not configured. Missing API Key.";
    }

    try {
        const chat = getChatSession();
        const result = await chat.sendMessage({ message });
        return result.text;
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        // If there's an error, the session might be corrupted. Reset it.
        chatSession = null; 
        return "Sorry, I'm having trouble connecting to the AI service right now. Please try again later.";
    }
};