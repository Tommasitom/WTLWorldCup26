"use client";

import { useEffect, useState } from "react";

// ✅ FLAG FUNCTION
function getFlag(team) {
  if (!team) return "";

  const t = team
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const flags = {
    mexico: "🇲🇽",
    spain: "🇪🇸",
    germany: "🇩🇪",
    brazil: "🇧🇷",
    uruguay: "🇺🇾",
    paraguay: "🇵🇾",
    canada: "🇨🇦",
    usa: "🇺🇸",
    "south africa": "🇿🇦",
    bosnia: "🇧🇦",
    czech: "🇨🇿",
    curacao: "🇨🇼",
    "cabo verde": "🇨🇻",
    france: "🇫🇷",
    england: "🏴",
    argentina: "🇦🇷",
    portugal: "🇵🇹",
    belgium: "🇧🇪",
    morocco: "🇲🇦",
    australia: "🇦🇺",
    turkey: "🇹🇷",
    netherlands: "🇳🇱",
    japan: "🇯🇵",
    sweden: "🇸🇪",
    tunisia: "🇹🇳",
    egypt: "🇪🇬",
    iran: "🇮🇷",
    "new zealand": "🇳🇿",
    senegal: "🇸🇳",
    norway: "🇳🇴",
    algeria: "🇩🇿",
    croatia: "🇭🇷",
    ghana: "🇬🇭",
    panama: "🇵🇦",
    colombia: "🇨🇴",
    switzerland: "🇨🇭",
    qatar: "🇶🇦",
    saudi: "🇸🇦",
    iraq: "🇮🇶",
    uzbekistan: "🇺🇿"
  };

  for (const key in flags) {
    if (t.includes(key)) return flags[key];
  }

  return "";
}

export default function Home() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {

    // ✅ LEADERBOARD
    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vTfR46oVSmS9_cnX_4USgkAp01jXRSqvWg9kjXEKhFjviCQFh3gHhNz1vTuL9-ppDHWB-lcjbD5SPg6/pub?gid=1476826283&single=true&output=csv")
      .then(res => res.text())
      .then(text => {
        const rows = text.split("\n").slice(1);

        const data = rows.map(row => {
          const cols = row.split(",");
          return {
            player: cols[0],
            team1: cols[1],
            team2: cols[2],
            points: cols[3]
          };
        });

        setLeaderboard(data);
      });

    // ✅ MATCH RESULTS (FIXED + FILTERED)
    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vTfR46oVSmS9_cnX_4USgkAp01jXRSqvWg9kjXEKhFjviCQFh3gHhNz1vTuL9-ppDHWB-lcjbD5SPg6/pub?gid=1047828395&single=true&output=csv")
      .then(res => res.text())
      .then(text => {

        const rows = text.split("\n").slice(1);
        const parsed = [];

        rows.forEach(row => {
          const cols = row.split(",");

          const teamA = cols[1];
          const teamB = cols[2];
          const scoreA = cols[3];
          const scoreB = cols[4];
          const playerA = cols[13];
          const playerB = cols[14];

          // ✅ SKIP BAD ROWS
          if (!teamA || !teamB) return;

          // ✅ SKIP FAKE DATA ROWS (fixes 2–2 issue)
          if (scoreA === "2" && scoreB === "2") return;

          parsed.push({
            teamA: teamA.trim(),
            teamB: teamB.trim(),
            scoreA: scoreA?.trim() || "-",
            scoreB: scoreB?.trim() || "-",
            playerA: playerA?.trim() || "",
            playerB: playerB?.trim() || ""
          });
        });

        // ✅ CORRECT ORDER (latest FIRST)
        setMatches(parsed.reverse());
      });

  }, []);

  return (
    <div style={styles.page}>

      <h1 style={styles.title}>🏆 WTL World Cup 2026</h1>

      {/* ✅ LEADERBOARD */}
      <h2 style={styles.section}>Leaderboard</h2>

      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.cell}>Player</th>
            <th style={styles.cell}>Team 1</th>
            <th style={styles.cell}>Team 2</th>
            <th style={styles.cell}>Points</th>
          </tr>
        </thead>

        <tbody>
          {leaderboard.map((r, i) => (
            <tr key={i} style={i % 2 ? styles.rowAlt : styles.row}>
              <td style={styles.cell}>{r.player}</td>
              <td style={styles.cell}>{r.team1}</td>
              <td style={styles.cell}>{r.team2}</td>
              <td style={styles.cell}>{r.points}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ MATCH CENTRE */}
      <h2 style={styles.section}>⚽ Match Centre</h2>

      {matches.map((m, i) => (
        <div key={i} style={styles.card}>

          <div style={styles.teamLeft}>
            {getFlag(m.teamA)} {m.teamA}
          </div>

          <div style={styles.center}>
            <div style={styles.score}>
              {m.scoreA} – {m.scoreB}
            </div>
            <div style={styles.players}>
              {m.playerA} vs {m.playerB}
            </div>
          </div>

          <div style={styles.teamRight}>
            {m.teamB} {getFlag(m.teamB)}
          </div>

        </div>
      ))}

    </div>
  );
}

const styles = {
  page: {
    background: "#0f172a",
    color: "white",
    minHeight: "100vh",
    padding: "30px",
    fontFamily: "Arial"
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px"
  },
  section: {
    marginBottom: "12px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "40px"
  },
  headerRow: {
    background: "#1e293b"
  },
  row: {
    background: "#0f172a"
  },
  rowAlt: {
    background: "#020617"
  },
  cell: {
    padding: "10px",
    borderBottom: "1px solid #334155"
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    background: "#1e293b",
    marginBottom: "10px",
    borderRadius: "8px"
  },
  teamLeft: {
    width: "35%"
  },
  teamRight: {
    width: "35%",
    textAlign: "right"
  },
  center: {
    width: "30%",
    textAlign: "center"
  },
  score: {
    fontSize: "18px",
    fontWeight: "bold"
  },
  players: {
    fontSize: "12px",
    opacity: 0.7
  }
};
