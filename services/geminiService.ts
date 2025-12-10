import { GoogleGenAI, Type } from "@google/genai";
import { LegalAnalysisResult } from "../types";

const SYSTEM_INSTRUCTION = `Você é um assistente jurídico de elite. Analise o texto do documento fornecido e retorne a resposta estritamente em formato JSON com dois campos:
1. 'resumo': Um resumo do processo com no MÁXIMO 100 palavras. Seja direto e técnico.
2. 'lista_fatos': Uma lista com as informações padrões (número do processo, partes, valor da causa, vara) e os pontos mais importantes. Esta lista deve ter no MÁXIMO 30 linhas/itens.
O tom deve ser formal e jurídico.`;

export const analyzeDocument = async (
  fileBase64: string,
  mimeType: string
): Promise<LegalAnalysisResult> => {
  if (!process.env.API_KEY) {
    throw new Error("Chave da API não configurada.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        role: "user",
        parts: [
          {
            inlineData: {
              data: fileBase64,
              mimeType: mimeType,
            },
          },
          {
            text: "Por favor, analise este documento jurídico conforme as instruções.",
          },
        ],
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            resumo: {
              type: Type.STRING,
              description: "Resumo executivo do processo, máximo 100 palavras.",
            },
            lista_fatos: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
              description:
                "Lista de fatos relevantes e metadados do processo.",
            },
          },
          required: ["resumo", "lista_fatos"],
        },
      },
    });

    const textResponse = response.text;
    if (!textResponse) {
        throw new Error("A IA não retornou texto.");
    }

    const jsonResult = JSON.parse(textResponse) as LegalAnalysisResult;
    return jsonResult;

  } catch (error) {
    console.error("Erro na API Gemini:", error);
    throw new Error("Falha ao processar o documento. Verifique se é um arquivo jurídico válido.");
  }
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Remove the "data:type/subtype;base64," prefix
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      } else {
        reject(new Error("Failed to read file"));
      }
    };
    reader.onerror = error => reject(error);
  });
};