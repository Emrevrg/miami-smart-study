import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { getApiKey } from './apiKeyService';

const getAiInstance = () => {
    const apiKey = getApiKey();
    if (!apiKey) {
        throw new Error("API Anahtarı bulunamadı. Lütfen ayarlardan geçerli bir anahtar ekleyin veya platform anahtarlarının yüklendiğinden emin olun.");
    }
    return new GoogleGenAI({ apiKey });
}

/**
 * A centralized function to call the Gemini API for text-only prompts.
 * @param prompt The user's prompt to send to the model.
 * @returns The generated text content from the model.
 */
export const generateContent = async (prompt: string): Promise<string> => {
  try {
    const ai = getAiInstance();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `Yapay zeka ile iletişim kurarken bir hata oluştu: ${error.message}`;
    }
    return "Yapay zeka ile iletişim kurarken bilinmeyen bir hata oluştu.";
  }
};

/**
 * Calls the Gemini API with a multimodal prompt (text and an image).
 * @param prompt The user's text prompt.
 * @param imageBase64 The base64-encoded image data.
 * @param mimeType The MIME type of the image.
 * @returns The generated text content from the model.
 */
export const generateContentWithImage = async (prompt: string, imageBase64: string, mimeType: string): Promise<string> => {
  try {
    const ai = getAiInstance();
    const imagePart = {
      inlineData: {
        data: imageBase64,
        mimeType: mimeType,
      },
    };
    const textPart = {
      text: prompt
    };
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [textPart, imagePart] },
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API with image:", error);
    if (error instanceof Error) {
        return `Yapay zeka ile iletişim kurarken bir hata oluştu: ${error.message}`;
    }
    return "Yapay zeka ile iletişim kurarken bilinmeyen bir hata oluştu.";
  }
};
