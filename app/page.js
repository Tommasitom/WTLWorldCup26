"use client";

import { useEffect, useState } from "react";

// ✅ SIMPLE SAFE FLAGS (only a few to avoid breaking anything)
function getFlag(team) {
  if (!team) return "";

  const t = team.toLowerCase();

  // ✅ REMOVE PREFIXES LIKE "IR ", "NZ ", etc.
  const clean = t.replace(/^[a-z]{2}\s+/i, "");

  const flags = {
    mexico: "🇲🇽",
    spain: "🇪🇸",
    germany: "🇩🇪",
    brazil: "🇧🇷",
    argentina: "🇦🇷",
    france: "🇫🇷",
    england: "🏴",
    portugal: "🇵🇹",
    belgium: "🇧🇪",
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
    uzbekistan: "🇺🇿",
    paraguay: "🇵🇾",
    canada: "🇨🇦",
    usa: "🇺🇸",
    "south africa": "🇿🇦",
    bosnia: "🇧🇦",
    czech: "🇨🇿",
    curacao: "🇨🇼",
    "curaçao": "🇨🇼",
    "cabo verde": "🇨🇻",
    uruguay: "🇺🇾",
    morocco: "🇲🇦",
    australia: "🇦🇺",
    turkey: "🇹🇷",
    scotland: "🏴",
    haiti: "🇭🇹",
    ivory: "🇨🇮",
    ecuador: "🇪🇨",
    korea: "🇰🇷"
  };

  for (const key in flags) {
    if (clean.includes(key)) return flags[key];
  }

  return "";
}

export default function Home() {
  const [leaderboard, setLeaderboard] = useState([]);
  
  const [matches, setMatches] = useState([]);
const top3 = leaderboard.slice(0, 3);

  useEffect(() => {

    // ✅ LEADERBOARD (unchanged)
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

    // ✅ MATCHES (your original structure + CLEAN fix)
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

      // ✅ skip invalid rows
      if (!teamA || !teamB) return;

      // ✅ skip matches that haven’t been played yet
      if (scoreA === "-" || scoreB === "-" || scoreA === "" || scoreB === "") return;

      parsed.push({
        teamA,
        teamB,
        scoreA,
        scoreB,
        playerA,
        playerB
      });
    });

    // ✅ latest matches FIRST
    setMatches(parsed.reverse());
  });

  }, []);

  return (
    <div style={styles.page}>

      <h1 style={styles.title}>🏆 WTL World Cup 2026</h1>
  {/* ✅ PODIUM */}
<div style={styles.podium}>

  {top3[1] && (
    <div style={{...styles.playerBox, order: 1}}>
      <div style={styles.medal}>🥈</div>
      <div>{top3[1].player}</div>
      <div style={styles.points}>{top3[1].points} pts</div>
    </div>
  )}

  {top3[0] && (
    <div style={{...styles.playerBox, order: 2, transform:"scale(1.1)"}}>
      <div style={styles.medal}>🥇</div>
      <div style={{fontWeight:"bold"}}>{top3[0].player}</div>
      <div style={styles.points}>{top3[0].points} pts</div>
    </div>
  )}

  {top3[2] && (
    <div style={{...styles.playerBox, order: 3}}>
      <div style={styles.medal}>🥉</div>
      <div>{top3[2].player}</div>
      <div style={styles.points}>{top3[2].points} pts</div>
    </div>
  )}

</div>

      {/* ✅ LEADERBOARD */}
      <h2>Leaderboard</h2>

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
              <td style={styles.cell}>{r.player}</td>
              <td style={styles.cell}>{r.team1}</td>
              <td style={styles.cell}>{r.team2}</td>
              <td style={styles.cell}>{r.points}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ MATCH CENTRE */}
      <h2>⚽ Match Centre</h2>

      {matches.map((m, i) => (
        <div key={i} style={styles.card}>

          <div style={styles.left}>
            {getFlag(m.teamA)} {m.teamA}
          </div>

          <div style={styles.center}>
            <strong>{m.scoreA} – {m.scoreB}</strong>
            <div style={styles.players}>
              {m.playerA} vs {m.playerB}
            </div>
          </div>

          <div style={styles.right}>
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
    marginBottom: "20px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "40px"
  },
  cell: {
    padding: "10px",
    borderBottom: "1px solid #334155"
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#1e293b",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "8px"
  },
  left: {
    width: "35%"
  },
  right: {
    width: "35%",
    textAlign: "right"
  },
  center: {
    width: "30%",
    textAlign: "center"
  },
  players: {
    fontSize: "12px",
    opacity: 0.7
  }
};
podium: {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginBottom: "30px"
},

playerBox: {
  background: "#1e293b",
  padding: "15px",
  borderRadius: "10px",
  textAlign: "center",
  width: "100px"
},

medal: {
  fontSize: "24px",
  marginBottom: "5px"
},

points: {
  fontSize: "12px",
  opacity: 0.7
},
