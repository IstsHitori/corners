import { matches } from "./matches";
import { cornerAnalysisRepository } from "./corner-analysis-repository";

export const recentMatchesData = {
  getafe: [
    {
      match: {
        id: "getafe_past1",
        competition: "LaLiga",
        date: "07/05/2025",
        time: "19:00",
        homeTeam: { id: "getafe", name: "Getafe CF" },
        awayTeam: { id: "mallorca", name: "RCD Mallorca" },
        homeCornerAvg: 4.9,
        awayCornerAvg: 5.2,
        totalCornerAvg: 9.2,
        stadium: "Coliseum",
        status: "finished",
        matchday: 34,
      },
      result: {
        homeGoals: 2,
        awayGoals: 1,
        homeCorners: 6,
        awayCorners: 4,
      },
      isHome: true,
    },
    {
      match: {
        id: "getafe_past2",
        competition: "LaLiga",
        date: "30/04/2025",
        time: "21:00",
        homeTeam: { id: "espanyol", name: "Espanyol" },
        awayTeam: { id: "getafe", name: "Getafe CF" },
        homeCornerAvg: 4.9,
        awayCornerAvg: 4.9,
        totalCornerAvg: 9.8,
        stadium: "RCDE Stadium",
        status: "FINISHED",
        matchday: 33,
      },
      result: {
        homeGoals: 0,
        awayGoals: 0,
        homeCorners: 5,
        awayCorners: 4,
      },
      isHome: false,
    },
    {
      match: {
        id: "getafe_past3",
        competition: "LaLiga",
        date: "23/04/2025",
        time: "19:00",
        homeTeam: { id: "getafe", name: "Getafe CF" },
        awayTeam: { id: "las-palmas", name: "UD Las Palmas" },
        homeCornerAvg: 4.9,
        awayCornerAvg: 5.2,
        totalCornerAvg: 9.5,
        stadium: "Coliseum",
        status: "FINISHED",
        matchday: 32,
      },
      result: {
        homeGoals: 1,
        awayGoals: 2,
        homeCorners: 5,
        awayCorners: 6,
      },
      isHome: true,
    },
    {
      match: {
        id: "getafe_past4",
        competition: "LaLiga",
        date: "16/04/2025",
        time: "19:00",
        homeTeam: { id: "celta", name: "Celta de Vigo" },
        awayTeam: { id: "getafe", name: "Getafe CF" },
        homeCornerAvg: 4.4,
        awayCornerAvg: 4.9,
        totalCornerAvg: 9.3,
        stadium: "Balaídos",
        status: "FINISHED",
        matchday: 31,
      },
      result: {
        homeGoals: 2,
        awayGoals: 2,
        homeCorners: 5,
        awayCorners: 4,
      },
      isHome: false,
    },
    {
      match: {
        id: "getafe_past5",
        competition: "LaLiga",
        date: "09/04/2025",
        time: "21:00",
        homeTeam: { id: "getafe", name: "Getafe CF" },
        awayTeam: { id: "rayo", name: "Rayo Vallecano" },
        homeCornerAvg: 4.9,
        awayCornerAvg: 5.1,
        totalCornerAvg: 9.4,
        stadium: "Coliseum",
        status: "FINISHED",
        matchday: 30,
      },
      result: {
        homeGoals: 1,
        awayGoals: 0,
        homeCorners: 4,
        awayCorners: 5,
      },
      isHome: true,
    },
  ],
  celta: [
    {
      match: {
        id: "celta_past1",
        competition: "LaLiga",
        date: "07/05/2025",
        time: "21:00",
        homeTeam: { id: "celta", name: "Celta de Vigo" },
        awayTeam: { id: "rayo", name: "Rayo Vallecano" },
        homeCornerAvg: 4.4,
        awayCornerAvg: 5.1,
        totalCornerAvg: 9.5,
        stadium: "Balaídos",
        status: "FINISHED",
        matchday: 34,
      },
      result: {
        homeGoals: 3,
        awayGoals: 1,
        homeCorners: 5,
        awayCorners: 3,
      },
      isHome: true,
    },
    {
      match: {
        id: "celta_past2",
        competition: "LaLiga",
        date: "30/04/2025",
        time: "19:00",
        homeTeam: { id: "mallorca", name: "RCD Mallorca" },
        awayTeam: { id: "celta", name: "Celta de Vigo" },
        homeCornerAvg: 5.2,
        awayCornerAvg: 4.4,
        totalCornerAvg: 9.6,
        stadium: "Son Moix",
        status: "FINISHED",
        matchday: 33,
      },
      result: {
        homeGoals: 1,
        awayGoals: 2,
        homeCorners: 6,
        awayCorners: 4,
      },
      isHome: false,
    },
    {
      match: {
        id: "celta_past3",
        competition: "LaLiga",
        date: "23/04/2025",
        time: "21:00",
        homeTeam: { id: "celta", name: "Celta de Vigo" },
        awayTeam: { id: "espanyol", name: "Espanyol" },
        homeCornerAvg: 4.4,
        awayCornerAvg: 4.9,
        totalCornerAvg: 9.3,
        stadium: "Balaídos",
        status: "FINISHED",
        matchday: 32,
      },
      result: {
        homeGoals: 0,
        awayGoals: 0,
        homeCorners: 4,
        awayCorners: 5,
      },
      isHome: true,
    },
    {
      match: {
        id: "celta_past4",
        competition: "LaLiga",
        date: "16/04/2025",
        time: "19:00",
        homeTeam: { id: "celta", name: "Celta de Vigo" },
        awayTeam: { id: "getafe", name: "Getafe CF" },
        homeCornerAvg: 4.4,
        awayCornerAvg: 4.9,
        totalCornerAvg: 9.3,
        stadium: "Balaídos",
        status: "FINISHED",
        matchday: 31,
      },
      result: {
        homeGoals: 2,
        awayGoals: 2,
        homeCorners: 5,
        awayCorners: 4,
      },
      isHome: true,
    },
    {
      match: {
        id: "celta_past5",
        competition: "LaLiga",
        date: "09/04/2025",
        time: "19:00",
        homeTeam: { id: "las-palmas", name: "UD Las Palmas" },
        awayTeam: { id: "celta", name: "Celta de Vigo" },
        homeCornerAvg: 5.2,
        awayCornerAvg: 4.4,
        totalCornerAvg: 9.6,
        stadium: "Gran Canaria",
        status: "FINISHED",
        matchday: 30,
      },
      result: {
        homeGoals: 1,
        awayGoals: 1,
        homeCorners: 6,
        awayCorners: 3,
      },
      isHome: false,
    },
  ],
  espanyol: [
    {
      match: {
        id: "espanyol_past1",
        competition: "LaLiga",
        date: "07/05/2025",
        time: "19:00",
        homeTeam: { id: "espanyol", name: "Espanyol" },
        awayTeam: { id: "las-palmas", name: "UD Las Palmas" },
        homeCornerAvg: 4.9,
        awayCornerAvg: 5.2,
        totalCornerAvg: 10.1,
        stadium: "RCDE Stadium",
        status: "FINISHED",
        matchday: 34,
      },
      result: {
        homeGoals: 2,
        awayGoals: 2,
        homeCorners: 6,
        awayCorners: 5,
      },
      isHome: true,
    },
    {
      match: {
        id: "espanyol_past2",
        competition: "LaLiga",
        date: "30/04/2025",
        time: "21:00",
        homeTeam: { id: "espanyol", name: "Espanyol" },
        awayTeam: { id: "getafe", name: "Getafe CF" },
        homeCornerAvg: 4.9,
        awayCornerAvg: 4.9,
        totalCornerAvg: 9.8,
        stadium: "RCDE Stadium",
        status: "FINISHED",
        matchday: 33,
      },
      result: {
        homeGoals: 0,
        awayGoals: 0,
        homeCorners: 5,
        awayCorners: 4,
      },
      isHome: true,
    },
    {
      match: {
        id: "espanyol_past3",
        competition: "LaLiga",
        date: "23/04/2025",
        time: "21:00",
        homeTeam: { id: "celta", name: "Celta de Vigo" },
        awayTeam: { id: "espanyol", name: "Espanyol" },
        homeCornerAvg: 4.4,
        awayCornerAvg: 4.9,
        totalCornerAvg: 9.3,
        stadium: "Balaídos",
        status: "FINISHED",
        matchday: 32,
      },
      result: {
        homeGoals: 0,
        awayGoals: 0,
        homeCorners: 4,
        awayCorners: 5,
      },
      isHome: false,
    },
    {
      match: {
        id: "espanyol_past4",
        competition: "LaLiga",
        date: "16/04/2025",
        time: "21:00",
        homeTeam: { id: "espanyol", name: "Espanyol" },
        awayTeam: { id: "mallorca", name: "RCD Mallorca" },
        homeCornerAvg: 4.9,
        awayCornerAvg: 5.2,
        totalCornerAvg: 10.1,
        stadium: "RCDE Stadium",
        status: "FINISHED",
        matchday: 31,
      },
      result: {
        homeGoals: 1,
        awayGoals: 2,
        homeCorners: 5,
        awayCorners: 6,
      },
      isHome: true,
    },
    {
      match: {
        id: "espanyol_past5",
        competition: "LaLiga",
        date: "09/04/2025",
        time: "19:00",
        homeTeam: { id: "rayo", name: "Rayo Vallecano" },
        awayTeam: { id: "espanyol", name: "Espanyol" },
        homeCornerAvg: 5.1,
        awayCornerAvg: 4.9,
        totalCornerAvg: 10.0,
        stadium: "Vallecas",
        status: "FINISHED",
        matchday: 30,
      },
      result: {
        homeGoals: 2,
        awayGoals: 0,
        homeCorners: 6,
        awayCorners: 3,
      },
      isHome: false,
    },
  ],
  "las-palmas": [
    {
      match: {
        id: "laspalmas_past1",
        competition: "LaLiga",
        date: "07/05/2025",
        time: "19:00",
        homeTeam: { id: "espanyol", name: "Espanyol" },
        awayTeam: { id: "las-palmas", name: "UD Las Palmas" },
        homeCornerAvg: 4.9,
        awayCornerAvg: 5.2,
        totalCornerAvg: 10.1,
        stadium: "RCDE Stadium",
        status: "FINISHED",
        matchday: 34,
      },
      result: {
        homeGoals: 2,
        awayGoals: 2,
        homeCorners: 6,
        awayCorners: 5,
      },
      isHome: false,
    },
    {
      match: {
        id: "laspalmas_past2",
        competition: "LaLiga",
        date: "30/04/2025",
        time: "19:00",
        homeTeam: { id: "las-palmas", name: "UD Las Palmas" },
        awayTeam: { id: "rayo", name: "Rayo Vallecano" },
        homeCornerAvg: 5.2,
        awayCornerAvg: 5.1,
        totalCornerAvg: 10.3,
        stadium: "Gran Canaria",
        status: "FINISHED",
        matchday: 33,
      },
      result: {
        homeGoals: 1,
        awayGoals: 0,
        homeCorners: 6,
        awayCorners: 4,
      },
      isHome: true,
    },
    {
      match: {
        id: "laspalmas_past3",
        competition: "LaLiga",
        date: "23/04/2025",
        time: "19:00",
        homeTeam: { id: "getafe", name: "Getafe CF" },
        awayTeam: { id: "las-palmas", name: "UD Las Palmas" },
        homeCornerAvg: 4.9,
        awayCornerAvg: 5.2,
        totalCornerAvg: 9.5,
        stadium: "Coliseum",
        status: "FINISHED",
        matchday: 32,
      },
      result: {
        homeGoals: 1,
        awayGoals: 2,
        homeCorners: 5,
        awayCorners: 6,
      },
      isHome: false,
    },
    {
      match: {
        id: "laspalmas_past4",
        competition: "LaLiga",
        date: "16/04/2025",
        time: "19:00",
        homeTeam: { id: "las-palmas", name: "UD Las Palmas" },
        awayTeam: { id: "mallorca", name: "RCD Mallorca" },
        homeCornerAvg: 5.2,
        awayCornerAvg: 5.2,
        totalCornerAvg: 10.4,
        stadium: "Gran Canaria",
        status: "FINISHED",
        matchday: 31,
      },
      result: {
        homeGoals: 2,
        awayGoals: 1,
        homeCorners: 7,
        awayCorners: 4,
      },
      isHome: true,
    },
    {
      match: {
        id: "laspalmas_past5",
        competition: "LaLiga",
        date: "09/04/2025",
        time: "19:00",
        homeTeam: { id: "las-palmas", name: "UD Las Palmas" },
        awayTeam: { id: "celta", name: "Celta de Vigo" },
        homeCornerAvg: 5.2,
        awayCornerAvg: 4.4,
        totalCornerAvg: 9.6,
        stadium: "Gran Canaria",
        status: "FINISHED",
        matchday: 30,
      },
      result: {
        homeGoals: 1,
        awayGoals: 1,
        homeCorners: 6,
        awayCorners: 3,
      },
      isHome: true,
    },
  ],
  rayo: [
    {
      match: {
        id: "rayo_past1",
        competition: "LaLiga",
        date: "07/05/2025",
        time: "21:00",
        homeTeam: { id: "celta", name: "Celta de Vigo" },
        awayTeam: { id: "rayo", name: "Rayo Vallecano" },
        homeCornerAvg: 4.4,
        awayCornerAvg: 5.1,
        totalCornerAvg: 9.5,
        stadium: "Balaídos",
        status: "FINISHED",
        matchday: 34,
      },
      result: {
        homeGoals: 3,
        awayGoals: 1,
        homeCorners: 5,
        awayCorners: 3,
      },
      isHome: false,
    },
    {
      match: {
        id: "rayo_past2",
        competition: "LaLiga",
        date: "30/04/2025",
        time: "19:00",
        homeTeam: { id: "las-palmas", name: "UD Las Palmas" },
        awayTeam: { id: "rayo", name: "Rayo Vallecano" },
        homeCornerAvg: 5.2,
        awayCornerAvg: 5.1,
        totalCornerAvg: 10.3,
        stadium: "Gran Canaria",
        status: "FINISHED",
        matchday: 33,
      },
      result: {
        homeGoals: 1,
        awayGoals: 0,
        homeCorners: 6,
        awayCorners: 4,
      },
      isHome: false,
    },
    {
      match: {
        id: "rayo_past3",
        competition: "LaLiga",
        date: "23/04/2025",
        time: "19:00",
        homeTeam: { id: "rayo", name: "Rayo Vallecano" },
        awayTeam: { id: "mallorca", name: "RCD Mallorca" },
        homeCornerAvg: 5.1,
        awayCornerAvg: 5.2,
        totalCornerAvg: 10.3,
        stadium: "Vallecas",
        status: "FINISHED",
        matchday: 32,
      },
      result: {
        homeGoals: 2,
        awayGoals: 1,
        homeCorners: 6,
        awayCorners: 5,
      },
      isHome: true,
    },
    {
      match: {
        id: "rayo_past4",
        competition: "LaLiga",
        date: "16/04/2025",
        time: "21:00",
        homeTeam: { id: "mallorca", name: "RCD Mallorca" },
        awayTeam: { id: "rayo", name: "Rayo Vallecano" },
        homeCornerAvg: 5.2,
        awayCornerAvg: 5.1,
        totalCornerAvg: 10.3,
        stadium: "Son Moix",
        status: "FINISHED",
        matchday: 31,
      },
      result: {
        homeGoals: 0,
        awayGoals: 2,
        homeCorners: 4,
        awayCorners: 7,
      },
      isHome: false,
    },
    {
      match: {
        id: "rayo_past5",
        competition: "LaLiga",
        date: "09/04/2025",
        time: "19:00",
        homeTeam: { id: "rayo", name: "Rayo Vallecano" },
        awayTeam: { id: "espanyol", name: "Espanyol" },
        homeCornerAvg: 5.1,
        awayCornerAvg: 4.9,
        totalCornerAvg: 10.0,
        stadium: "Vallecas",
        status: "FINISHED",
        matchday: 30,
      },
      result: {
        homeGoals: 2,
        awayGoals: 0,
        homeCorners: 6,
        awayCorners: 3,
      },
      isHome: true,
    },
  ],
  mallorca: [
    {
      match: {
        id: "mallorca_past1",
        competition: "LaLiga",
        date: "07/05/2025",
        time: "19:00",
        homeTeam: { id: "mallorca", name: "RCD Mallorca" },
        awayTeam: { id: "getafe", name: "Getafe CF" },
        homeCornerAvg: 5.2,
        awayCornerAvg: 4.9,
        totalCornerAvg: 9.6,
        stadium: "Son Moix",
        status: "FINISHED",
        matchday: 34,
      },
      result: {
        homeGoals: 1,
        awayGoals: 2,
        homeCorners: 6,
        awayCorners: 4,
      },
      isHome: false,
    },
    {
      match: {
        id: "mallorca_past2",
        competition: "LaLiga",
        date: "30/04/2025",
        time: "19:00",
        homeTeam: { id: "mallorca", name: "RCD Mallorca" },
        awayTeam: { id: "celta", name: "Celta de Vigo" },
        homeCornerAvg: 5.2,
        awayCornerAvg: 4.4,
        totalCornerAvg: 9.6,
        stadium: "Son Moix",
        status: "FINISHED",
        matchday: 33,
      },
      result: {
        homeGoals: 2,
        awayGoals: 1,
        homeCorners: 7,
        awayCorners: 4,
      },
      isHome: true,
    },
    {
      match: {
        id: "mallorca_past3",
        competition: "LaLiga",
        date: "23/04/2025",
        time: "19:00",
        homeTeam: { id: "mallorca", name: "RCD Mallorca" },
        awayTeam: { id: "espanyol", name: "Espanyol" },
        homeCornerAvg: 5.2,
        awayCornerAvg: 4.9,
        totalCornerAvg: 10.1,
        stadium: "Son Moix",
        status: "FINISHED",
        matchday: 32,
      },
      result: {
        homeGoals: 1,
        awayGoals: 2,
        homeCorners: 6,
        awayCorners: 5,
      },
      isHome: true,
    },
    {
      match: {
        id: "mallorca_past4",
        competition: "LaLiga",
        date: "16/04/2025",
        time: "21:00",
        homeTeam: { id: "mallorca", name: "RCD Mallorca" },
        awayTeam: { id: "rayo", name: "Rayo Vallecano" },
        homeCornerAvg: 5.2,
        awayCornerAvg: 5.1,
        totalCornerAvg: 10.3,
        stadium: "Son Moix",
        status: "FINISHED",
        matchday: 31,
      },
      result: {
        homeGoals: 0,
        awayGoals: 2,
        homeCorners: 4,
        awayCorners: 7,
      },
      isHome: true,
    },
    {
      match: {
        id: "mallorca_past5",
        competition: "LaLiga",
        date: "09/04/2025",
        time: "19:00",
        homeTeam: { id: "mallorca", name: "RCD Mallorca" },
        awayTeam: { id: "las-palmas", name: "UD Las Palmas" },
        homeCornerAvg: 5.2,
        awayCornerAvg: 5.2,
        totalCornerAvg: 10.4,
        stadium: "Son Moix",
        status: "FINISHED",
        matchday: 30,
      },
      result: {
        homeGoals: 1,
        awayGoals: 1,
        homeCorners: 6,
        awayCorners: 3,
      },
      isHome: true,
    },
  ],
};

export const matchRepository = {
  getUpcomingMatches: async (date: Date) => {
    console.log("Repository getting matches for date:", date);

    const dateStr = date
      .toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "/");

    console.log("Looking for matches on date:", dateStr);

    // SOLO FILTRAR POR JORNADA 38 - CAMBIO PRINCIPAL
    const jornada38Matches = matches.filter(
      (match) => match.matchday === 38 && match.status.toLowerCase() === "upcoming"
    );

    console.log(`Found ${jornada38Matches.length} matches from matchday 38`);
    
    return jornada38Matches;
  },

  getMatchById: async (id: string) => {
    console.log("Repository getting match by ID:", id);
    const match = matches.find((m) => m.id === id);
    console.log("Match found:", match ? "yes" : "no");
    return match || null;
  },

  getLastMatches: async (teamId: string, count = 5) => {
    console.log("Repository getting last matches for team:", teamId);
    const teamMatches =
      recentMatchesData[teamId as keyof typeof recentMatchesData] || [];
    return teamMatches.slice(0, count);
  },

  getAllRemainingMatches: async () => {
    // SOLO DEVOLVER JORNADA 38 - CAMBIO PRINCIPAL
    return matches
      .filter((match) => match.matchday === 38 && match.status === "upcoming")
      .sort((a, b) => {
        // Ordenar primero por fecha
        const [dayA, monthA, yearA] = a.date.split("/").map(Number);
        const [dayB, monthB, yearB] = b.date.split("/").map(Number);

        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);

        if (dateA.getTime() !== dateB.getTime()) {
          return dateA.getTime() - dateB.getTime();
        }

        // Si las fechas son iguales, ordenar por hora
        return a.time.localeCompare(b.time);
      });
  },

  getMatchesByMatchday: async (matchday: number) => {
    return matches.filter((match) => match.matchday === matchday);
  },

  getCornerAnalysisByMatchday: async (matchday: number) => {
    return cornerAnalysisRepository.getCornerAnalysisByMatchday(matchday);
  },
};