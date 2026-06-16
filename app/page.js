"use client";

import { useEffect, useState } from "react";

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
            player: cols[0],
            team1: cols[1],
            team2: cols[2],
            points: cols[3],
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
            teamA: cols[1],
            teamB: cols[2],
            scoreA: cols[3],
            scoreB: cols[4],
            playerA: cols[13], // adjust if needed
            playerB: cols[14], // adjust if needed
          };
        });

        setMatches(data);
      });

  }, []);

  return (
    <div style={{
      background: "#0f172a",
      color: "white",
      minHeight: "100vh",
      padding: "30px",
      fontFamily: "Arial"
    }}>

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
          {leaderboard.map((r, i) => (
            <tr key={i}>
              <td style={cell}>{r.player}</td>
              <td style={cell}>{r.team1}</td>
              <td style={cell}>{r.team2}</td>
              <td style={cell}>{r.points}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ MATCH CENTRE */}
      <h2>⚽ Match Centre</h2>

      {matches.map((m, i) => (
        <div key={i} style={{
          display: "flex",
          justifyContent: "space-between",
          background: "#1e293b",
          padding: "12px",
          marginBottom: "10px",
          borderRadius: "8px"
        }}>
          <div>
            {m.teamA} <strong>{m.scoreA}</strong>
          </div>

          <div>
            <strong>{m.playerA}</strong> vs <strong>{m.playerB}</strong>
          </div>

          <div>
            <strong>{m.scoreB}</strong> {m.teamB}
          </div>
        </div>
      ))}
    </div>
  );
}

const cell = {
  padding: "10px",
  borderBottom: "1px solid #334155"
};
