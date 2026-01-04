
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are the "Nutri-Assistant" for Royal Harvest Dry Fruits in Edmonton. 
Your goal is to help customers choose the right dry fruits based on their health goals, dietary needs, or gifting occasions.

Context:
- We are based in Edmonton, Alberta.
- We offer: ${PRODUCTS.map(p => `${p.name} (${p.category})`).join(', ')}.
- Almonds: brain/heart health.
- Cashews: energy/minerals.
- Walnuts: Omega-3/mood.
- Dates: natural sweetness/fiber.
- Pistachios: antioxidants.

Rules:
1. Be professional, friendly, and helpful.
2. Recommend specific products from our list.
3. Keep answers concise.
4. Mention that we offer local delivery in Edmonton.
5. If someone asks for prices, give the approximate prices from the catalog.
`;

export async function getNutriAssistantResponse(userPrompt: string, history: { role: 'user' | 'model', text: string }[]) {
  try {
    const model = 'gemini-3-flash-preview';
    const response = await ai.models.generateContent({
      model,
      contents: [
        ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't process that. How else can I help you today?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Our Nutri-Assistant is taking a short break. Please feel free to browse our collection!";
  }
}
