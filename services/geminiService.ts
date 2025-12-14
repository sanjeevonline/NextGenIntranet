import { GoogleGenAI } from "@google/genai";
import { COMPANY_CONTEXT } from "../constants";
import { KnowledgeDoc } from "../types";

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const generateAssistantResponse = async (
  userPrompt: string, 
  history: {role: string, parts: {text: string}[]}[] = []
): Promise<string> => {
  const ai = getClient();
  
  try {
    const model = 'gemini-2.5-flash';
    
    // Create a chat session with history
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: COMPANY_CONTEXT,
        temperature: 0.7,
      },
      history: history
    });

    const result = await chat.sendMessage({ message: userPrompt });
    return result.text || "I'm processing that, but couldn't generate a text response.";
    
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the Nexus neural network. Please try again later.";
  }
};

// Updated function to accept dynamic docs
export const queryKnowledgeBase = async (query: string, docs: KnowledgeDoc[]): Promise<string> => {
  const ai = getClient();
  
  try {
    const context = docs.map(doc => `Title: ${doc.title}\nContent: ${doc.content}`).join('\n\n');
    
    const prompt = `
      You are an expert AI search engine for Nexus Corp. 
      Use the following internal documents to answer the employee's question.
      If the answer is not in the documents, state that you cannot find the specific information in the knowledge base.
      
      DOCUMENTS:
      ${context}
      
      QUESTION: ${query}
      
      ANSWER:
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "No results found.";
  } catch (error) {
    console.error("Knowledge Base Error:", error);
    return "Search system temporarily unavailable.";
  }
};
