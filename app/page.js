"use client";

import { useEffect, useState } from "react";

function getFlag(team) {
  if (!team) return "";

  const t = team.toLowerCase();
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
``

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

          // ✅ FIXED
          const playerA = cols[8]?.trim();
          const playerB = cols[9]?.trim();

          if (!teamA || !teamB) return;
          if (!scoreA || !scoreB || scoreA === "-" || scoreB === "-") return;

          parsed.push({ teamA, teamB, scoreA, scoreB, playerA, playerB });
        });

        setMatches(parsed.reverse());
      });

  }, []);

  return (
    <div style={styles.page}>

      {/* ✅ HEADER */}
      <div style={styles.header}>
        <img src="/wtl-logo.png" style={styles.logo} />
        <p style={styles.subtitle}>Live leaderboard & match results</p>
      </div>

      {/* PODIUM */}
      <div style={styles.podium}>
        {top3[1] && <div style={{...styles.box, ...styles.second}}>
          <div style={styles.medal}>🥈</div>
          {top3[1].player}<br />{top3[1].points} pts
        </div>}

        {top3[0] && <div style={{...styles.box, ...styles.first}}>
          <div style={styles.medalBig}>🥇</div>
          <strong>{top3[0].player}</strong><br />{top3[0].points} pts
        </div>}

        {top3[2] && <div style={{...styles.box, ...styles.third}}>
          <div style={styles.medal}>🥉</div>
          {top3[2].player}<br />{top3[2].points} pts
        </div>}
      </div>

      {/* PRIZES */}
      <div style={styles.prizeContainer}>
        <div style={styles.prizeBox}>
          🥇 €100 🥈 €50 🥉 €20 🥄 €20
        </div>

        <div style={styles.sidePrizes}>
          🟥 Red Card €10 · 🎩 Hat-Trick €10 · ❌ Missed Pen €10 · ⚽ Most Goals €10 · 🥅 Own Goal €10
        </div>
      </div>

      <h2>⚽ Match Centre</h2>

      {matches.map((m,i)=>{
        const isLive = Math.random() < 0.05;
        const status = isLive ? "LIVE" : "FT";

        return (
        <div key={i} style={styles.card}>
          <div>{getFlag(m.teamA)} {m.teamA}</div>

          <div style={{textAlign:"center"}}>
            <span style={isLive ? styles.live : styles.ft}>{status}</span><br/>
            <strong>{m.scoreA} – {m.scoreB}</strong><br/>

            {m.playerA && m.playerB && (
              <small>{m.playerA} vs {m.playerB}</small>
            )}
          </div>

          <div>{m.teamB} {getFlag(m.teamB)}</div>
        </div>);
      })}

    </div>
  );
}

const styles = {
  page: {
    background:"#0f172a",
    color:"white",
    padding:"30px"
  },

  header:{ textAlign:"center", marginBottom:"20px" },

  logo:{
    width:"100%",
    maxWidth:"500px",
    borderRadius:"12px",
    marginBottom:"10px"
  },

  subtitle:{ opacity:0.6 },

  podium:{ display:"flex", justifyContent:"center", gap:"20px" },

  box:{ background:"#1e293b", padding:"15px", borderRadius:"10px" },

  first:{ transform:"scale(1.3)", background:"#fbbf24", color:"#000" },

  second:{ marginTop:"15px" },
  third:{ marginTop:"30px", opacity:0.7 },

  medal:{ fontSize:"22px" },
  medalBig:{ fontSize:"30px" },

  prizeContainer:{ margin:"30px 0" },
  prizeBox:{ textAlign:"center", fontWeight:"bold" },
  sidePrizes:{ textAlign:"center", fontSize:"12px", opacity:0.8 },

  card:{
    display:"flex",
    justifyContent:"space-between",
    background:"#1e293b",
    padding:"12px",
    marginBottom:"10px",
    borderRadius:"8px"
  },

  live:{ background:"red", padding:"2px 6px", borderRadius:"5px", fontSize:"10px" },
  ft:{ background:"#475569", padding:"2px 6px", borderRadius:"5px", fontSize:"10px" }
};
