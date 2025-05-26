import { NextResponse } from "next/server";
import OpenAI from "openai";
import type { Team, TeamStats } from "@/lib/types";

// Ruta de API para generar predicciones con ChatGPT
export async function POST(request: Request) {
  try {
    // Obtener datos del cuerpo de la solicitud
    const { homeTeam, awayTeam, homeStats, awayStats } = await request.json();

    // Validar que se recibieron todos los datos necesarios
    if (!homeTeam || !awayTeam || !homeStats || !awayStats) {
      return NextResponse.json(
        { error: "Faltan datos necesarios para la predicción" },
        { status: 400 }
      );
    }

    // Crear el prompt para ChatGPT
    const prompt = createPrompt(homeTeam, awayTeam, homeStats, awayStats);
    console.log("Prompt enviado a ChatGPT:", prompt);

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Asegúrate de tener la clave API configurada
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // o gpt-4.1-mini
      messages: [
        {
          role: "system",
          content:
            "Eres un experto analista de fútbol especializado en predicciones de córners en LaLiga.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 2000, // límite de tokens en la respuesta
      temperature: 0.7,
      stop: null,
    });
    console.log(response);
    
    // Procesar la respuesta
    const result = parseAIResponse(response.choices[0].message.content!);
    console.log(result);

    // Devolver el resultado
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error en la API de predicción:", error);
    return NextResponse.json(
      { error: "Error al generar la predicción" },
      { status: 500 }
    );
  }
}

// Función para crear el prompt para ChatGPT
function createPrompt(
  homeTeam: Team,
  awayTeam: Team,
  homeStats: TeamStats,
  awayStats: TeamStats
): string {
  return `
  Eres un experto analista de fútbol especializado en predicciones de corners en LaLiga.
  Predicción de corners para el siguiente partido:
  Local: ${homeTeam.name} (Pos: ${homeStats.position}, Forma: ${homeStats.form})
  - Corners a favor: ${homeStats.cornersFor}, en contra: ${homeStats.cornersAgainst}
  - Posesión: ${homeStats.possession}%, Ataques: ${homeStats.attacks}, Contraataques: ${homeStats.counterAttacks}
  Visitante: ${awayTeam.name} (Pos: ${awayStats.position}, Forma: ${awayStats.form})
  - Corners a favor: ${awayStats.cornersFor}, en contra: ${awayStats.cornersAgainst}
  - Posesión: ${awayStats.possession}%, Ataques: ${awayStats.attacks}, Contraataques: ${awayStats.counterAttacks}
  Estadio: ${homeTeam.name}
  Proporciona tu predicción en el siguiente formato:
  1. Número total de corners esperados (con un decimal)
  2. Explicación detallada basada en el estilo de juego y estadísticas
  3. Nivel de confianza (0.5 a 0.95)
  `;
}

// Función para procesar la respuesta de ChatGPT
function parseAIResponse(response: string): {
  totalCorners: number;
  explanation: string;
  confidence: number;
} {
  try {
    // Intentar extraer el número de corners
    const cornersMatch = response.match(/(\d+\.\d+)/);
    const totalCorners = cornersMatch
      ? Number.parseFloat(cornersMatch[1])
      : 9.0;

    // Intentar extraer el nivel de confianza
    const confidenceMatch =
      response.match(/confianza[:\s]+(\d+\.\d+)/i) ||
      response.match(/(\d+\.\d+)(?=[^\d]*$)/);
    const confidence = confidenceMatch
      ? Math.min(0.95, Math.max(0.5, Number.parseFloat(confidenceMatch[1])))
      : 0.7;

    // La explicación es todo el texto, limpiando números al principio y final
    let explanation = response
      .replace(/^\s*\d+\.\d+\s*/g, "") // Eliminar número al inicio
      .replace(/\s*\d+\.\d+\s*$/g, "") // Eliminar número al final
      .trim();


    return {
      totalCorners,
      explanation,
      confidence,
    };
  } catch (error) {
    console.error("Error parsing AI response:", error);
    return {
      totalCorners: 9.0,
      explanation: response || "Predicción generada con IA.",
      confidence: 0.7,
    };
  }
}
