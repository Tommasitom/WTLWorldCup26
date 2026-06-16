"use client";

import { useEffect, useState } from "react";

// ✅ FLAG FUNCTION (robust)
function getFlag(team) {
  if (!team) return "";

  const t = team.toLowerCase();

  if (t.includes("mexico")) return "🇲🇽";
  if (t.includes("spain")) return "🇪🇸";
  if (t.includes("germany")) return "🇩🇪";
  if (t.includes("brazil")) return "🇧🇷";
  if (t.includes("uruguay")) return "🇺🇾";
  if (t.includes("paraguay")) return "🇵🇾";
  if (t.includes("canada")) return "🇨🇦";
  if (t.includes("usa") || t.includes("united states")) return "🇺🇸";
  if (t.includes("south africa")) return "🇿🇦";
  if (t.includes("bosnia")) return "🇧🇦";
  if (t.includes("czech")) return "🇨🇿";
  if (t.includes("curacao") || t.includes("curaçao")) return "🇨🇼";
  if (t.includes("cabo verde") || t.includes("cape verde")) return "🇨🇻";
  if (t.includes("france")) return "🇫🇷";
  if (t.includes("england")) return "🏴";
  if (t.includes("argentina")) return "🇦🇷";
  if (t.includes("portugal")) return "🇵🇹";

  return "";
}

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
            scoreA: cols[3] || "-",
            scoreB: cols[4] || "-",
            playerA: cols[13],
            playerB: cols[14],
          };
        });

        setMatches(data.reverse()); // ✅ latest matches first
      });
  }, []);

  return (
    <div style={page}>

      {/* ✅ HEADER */}
      <h1 style={title}>
        🏆 WTL World Cup 2026
      </h1>

      {/* ✅ LEADERBOARD */}
      <h2 style={sectionTitle}>Leaderboard</h2>

      <table style={table}>
        <thead>
          <tr style={headerRow}>
            <th style={cell}>Player</th>
            <th style={cell}>Team 1</th>
            <th style={cell}>Team 2</th>
            <th style={cell}>Points</th>
          </tr>
        </thead>

        <tbody>
          {leaderboard.map((r, i) => (
            <tr key={i} style={i % 2 ? rowAlt : row}>
              <td style={cell}>{r.player}</td>
              <td style={cell}>{r.team1}</td>
              <td style={cell}>{r.team2}</td>
              <td style={cell}>{r.points}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ MATCH CENTRE */}
      <h2 style={sectionTitle}>⚽ Match Centre</h2>

      {matches.map((m, i) => (
        <div key={i} style={matchCard}>

          {/* LEFT TEAM */}
          <div style={teamLeft}>
            {getFlag(m.teamA)} {m.teamA}
          </div>

          {/* SCORE */}
          <div style={center}>
            <div style={score}>
              {m.scoreA} – {m.scoreB}
            </div>

            <div style={players}>
              {m.playerA} vs {m.playerB}
            </div>
          </div>

          {/* RIGHT TEAM */}
          <div style={teamRight}>
            {m.teamB} {getFlag(m.teamB)}
          </div>

        </div>
      ))}

    </div>
  );
}

/* ✅ STYLES (clean + professional) */

const page = {
  background: "#0f172a",
  color: "white",
  minHeight: "100vh",
  padding: "30px",
  fontFamily: "Arial"
};

const title = {
  fontSize: "28px",
  marginBottom: "20px"
};

const sectionTitle = {
  marginBottom: "10px"
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  marginBottom: "40px"
};

const headerRow = {
  background: "#1e293b"
};

const row = {
  background: "#0f172a"
};

const rowAlt = {
  background: "#020617"
};

const cell = {
  padding: "10px",
  borderBottom: "1px solid #334155"
};

const matchCard = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px",
  background: "#1e293b",
  marginBottom: "10px",
  borderRadius: "8px"
};

const teamLeft = {
  width: "35%"
};

const teamRight = {
  width: "35%",
  textAlign: "right"
};

const center = {
  width: "30%",
  textAlign: "center"
};

const score = {
  fontSize: "18px",
  fontWeight: "bold"
};

const players = {
  fontSize: "12px",
  opacity: 0.7
};
