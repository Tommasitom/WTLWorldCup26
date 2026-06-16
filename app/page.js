"use client";

import { useEffect, useState } from "react";

// ✅ Flag helper
function getFlag(team) {
  if (!team) return "";
  const t = team.toLowerCase();

  const map = {
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
  };

  for (let key in map) {
    if (t.includes(key)) return map[key];
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
        const rows = text.split("\n");
        const headers = rows[0].split(",");

        const data = rows.slice(1).map(row => {
          const values = row.split(",");
          const obj = {};
          headers.forEach((h, i) => obj[h.trim()] = values[i]);
          return obj;
        });

        setLeaderboard(data);
      });

    // ✅ MATCHES (header-based parsing)
    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vTfR46oVSmS9_cnX_4USgkAp01jXRSqvWg9kjXEKhFjviCQFh3gHhNz1vTuL9-ppDHWB-lcjbD5SPg6/pub?gid=1047828395&single=true&output=csv")
      .then(res => res.text())
      .then(text => {

        const rows = text.split("\n");
        const headers = rows[0].split(",");

        const data = rows.slice(1).map(row => {
          const values = row.split(",");
          const obj = {};
          headers.forEach((h, i) => obj[h.trim()] = values[i]);
          return obj;
        });

        setMatches(data.reverse()); // ✅ newest first
      });

  }, []);

  return (
    <div style={styles.page}>

      <h1 style={styles.title}>🏆 WTL World Cup 2026</h1>

      {/* ✅ LEADERBOARD */}
      <h2 style={styles.section}>Leaderboard</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.cell}>Player</th>
            <th style={styles.cell}>Team 1</th>
            <th style={styles.cell}>Team 2</th>
            <th style={styles.cell}>Points</th>
          </tr>
        </thead>

        <tbody>
          {leaderboard.map((r, i) => (
            <tr key={i}>
              <td style={styles.cell}>{r.Player}</td>
              <td style={styles.cell}>{r["Team 1"]}</td>
              <td style={styles.cell}>{r["Team 2"]}</td>
              <td style={styles.cell}>{r.Points}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ MATCH CENTRE */}
      <h2 style={styles.section}>⚽ Match Centre</h2>

      {matches.map((m, i) => {

        const teamA = m["Team A"] || m.TeamA || "";
        const teamB = m["Team B"] || m.TeamB || "";
        const scoreA = m["Score A"] || m.ScoreA || "-";
        const scoreB = m["Score B"] || m.ScoreB || "-";
        const playerA = m["Player A"] || "";
        const playerB = m["Player B"] || "";

        return (
          <div key={i} style={styles.card}>

            <div style={styles.teamLeft}>
              {getFlag(teamA)} {teamA}
            </div>

            <div style={styles.center}>
              <div style={styles.score}>{scoreA} – {scoreB}</div>
              <div style={styles.players}>
                {playerA} vs {playerB}
              </div>
            </div>

            <div style={styles.teamRight}>
              {teamB} {getFlag(teamB)}
            </div>

          </div>
        );
      })}

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
    marginBottom: "40px",
    borderCollapse: "collapse"
  },
  cell: {
    padding: "10px",
    borderBottom: "1px solid #334155"
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px",
    marginBottom: "10px",
    background: "#1e293b",
    borderRadius: "8px"
  },
  teamLeft: { width: "35%" },
  teamRight: { width: "35%", textAlign: "right" },
  center: { width: "30%", textAlign: "center" },
  score: { fontWeight: "bold", fontSize: "18px" },
  players: { fontSize: "12px", opacity: 0.7 }
};
