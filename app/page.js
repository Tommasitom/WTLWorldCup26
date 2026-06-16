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

    // ✅ MATCH RESULTS
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
      {/* ✅ TITLE */}
      <h1 style={{ marginBottom: "20px" }}>
        🏆 WTL World Cup 2026
      </h1>

      {/* ✅ LEADERBOARD */}
      <h2>Leaderboard</h2>

      <table style={{ width: "100%", marginBottom: "40px" }}>
        <thead>
          <tr>
            <th style={cell}>Player</th>
            <th style={cell}>Team 1</th>
            <th style={cell}>Team 2</th>
            <th style={cell}>Points</th>
          </tr>
        </thead>

        <tbody>
          {leaderboard.map((r, i) => {
            return (
              <tr key={i}>
                <td style={cell}>{r.player}</td>
                <td style={cell}>{r.team1}</td>
                <td style={cell}>{r.team2}</td>
                <td style={cell}>{r.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* ✅ MATCH CENTRE */}
     <h2>⚽ Match Centre</h2>

<div>
  {matches.map((m, i) => {
    return (
      <div
        key={i}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#1e293b",
          padding: "10px 15px",
          marginBottom: "10px",
          borderRadius: "8px"
        }}
      >

        {/* LEFT TEAM */}
        <div style={{ width: "35%", textAlign: "left" }}>
          {flags[m.teamA] ? flags[m.teamA] + " " : ""}
          {m.teamA}
        </div>

        {/* SCORE */}
        <div style={{ width: "30%", textAlign: "center" }}>
          <div style={{ fontWeight: "bold", fontSize: "18px" }}>
            {m.scoreA} – {m.scoreB}
          </div>

          <div style={{ fontSize: "12px", opacity: 0.7 }}>
            {m.playerA} vs {m.playerB}
          </div>
        </div>

        {/* RIGHT TEAM */}
        <div style={{ width: "35%", textAlign: "right" }}>
          {m.teamB}
          {flags[m.teamB] ? " " + flags[m.teamB] : ""}
      </div>
      );
    })}
  </div>
</div>
);
}


const cell = {
  padding: "10px",
  borderBottom: "1px solid #334155",
};
