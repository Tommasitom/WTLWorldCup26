"use client";

import { useEffect, useState } from "react";

const flags = {
  Spain: "🇪🇸",
  Germany: "🇩🇪",
  Mexico: "🇲🇽",
  Brazil: "🇧🇷",
  Uruguay: "🇺🇾",
  "South Africa": "🇿🇦",
  Paraguay: "🇵🇾",
  USA: "🇺🇸",
  Canada: "🇨🇦",
  Bosnia: "🇧🇦",
  "Curaçao": "🇨🇼",
  Curacao: "🇨🇼",
  "Cabo Verde": "🇨🇻",
  "Cape Verde Islands": "🇨🇻"
};

export default function Home() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // ✅ LEADERBOARD
    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vTfR46oVSmS9_cnX_4USgkAp01jXRSqvWg9kjXEKhFjviCQFh3gHhNz1vTuL9-ppDHWB-lcjbD5SPg6/pub?gid=1476826283&single=true&output=csv")
      .then((res) => res.text())
      .then((text) => {
        const rows = text.split("\n").slice(1);
        const data = rows.map((row) => {
          const cols = row.split(",");
          return {
            player: cols[0] || "",
            team1: cols[1] || "",
            team2: cols[2] || "",
            points: cols[3] || "",
          };
        });
        setLeaderboard(data);
      });

    // ✅ MATCHES
    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vTfR46oVSmS9_cnX_4USgkAp01jXRSqvWg9kjXEKhFjviCQFh3gHhNz1vTuL9-ppDHWB-lcjbD5SPg6/pub?gid=1047828395&single=true&output=csv")
      .then((res) => res.text())
      .then((text) => {
        const rows = text.split("\n").slice(1);
        const data = rows.map((row) => {
          const cols = row.split(",");
          return {
            teamA: cols[1] || "",
            teamB: cols[2] || "",
            scoreA: cols[3] || "-",
            scoreB: cols[4] || "-",
            playerA: cols[13] || "",
            playerB: cols[14] || "",
          };
        });
        setMatches(data);
      });
  }, []);

  return (
    <div
      style={{
        background: "#0f172a",
        color: "white",
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >

      <h1>🏆 WTL World Cup 2026</h1>

      {/* ✅ LEADERBOARD */}
      <h2>Leaderboard</h2>

      <table style={{ width: "100%", marginBottom: "40px" }}>
        <thead>
          <tr>
            <th>Player</th>
            <th>Team 1</th>
            <th>Team 2</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((p, i) => (
            <tr key={i}>
              <td>{p.player}</td>
              <td>{p.team1}</td>
              <td>{p.team2}</td>
              <td>{p.points}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ MATCH CENTRE */}
      <h2>⚽ Match Centre</h2>

      {matches.map((m, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#1e293b",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <div>
            {flags[m.teamA] ? flags[m.teamA] + " " : ""}
            {m.teamA}
          </div>

          <div style={{ textAlign: "center" }}>
            <strong>{m.scoreA} – {m.scoreB}</strong>
            <div style={{ fontSize: "12px" }}>
              {m.playerA} vs {m.playerB}
            </div>
          </div>

          <div>
            {m.teamB}
            {flags[m.teamB] ? " " + flags[m.teamB] : ""}
          </div>
        </div>
      ))}

    </div>
  );
}
