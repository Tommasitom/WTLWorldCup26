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

          const playerA = cols[8]?.trim();
          const playerB = cols[9]?.trim();

          if (!teamA || !teamB) return;
          if (!scoreA || !scoreB || scoreA === "-" || scoreB === "-") return;

          parsed.push({
            teamA,
            teamB,
            scoreA,
            scoreB,
            playerA,
            playerB
          });
        });

        setMatches(parsed.reverse());
      });
  }, []);

  return (
    <div style={styles.page}>

      <div style={styles.header}>
        <p style={styles.subtitle}>Live leaderboard & match results</p>
      </div>

      {/* PODIUM */}
      <div style={styles.podium}>
        {top3[1] && (
          <div style={{...styles.box, ...styles.second}}>
            <div style={styles.medal}>🥈</div>
            <div>{top3[1].player}</div>
            <div>{top3[1].points} pts</div>
          </div>
        )}

        {top3[0] && (
          <div style={{...styles.box, ...styles.first}}>
            <div style={styles.medalBig}>🥇</div>
            <div style={styles.firstName}>{top3[0].player}</div>
            <div>{top3[0].points} pts</div>
          </div>
        )}

        {top3[2] && (
          <div style={{...styles.box, ...styles.third}}>
            <div style={styles.medal}>🥉</div>
            <div>{top3[2].player}</div>
            <div>{top3[2].points} pts</div>
          </div>
        )}
      </div>

      <h2 style={styles.section}>⚽ Match Centre</h2>

      {matches.map((m, i) => {
        return (
          <div key={i} style={styles.card}>
            <div style={styles.left}>
              {getFlag(m.teamA)} {m.teamA}
            </div>

            <div style={styles.center}>
              <strong>{m.scoreA} – {m.scoreB}</strong>
              {m.playerA && m.playerB && (
                <div style={styles.players}>
                  {m.playerA} vs {m.playerB}
                </div>
              )}
            </div>

            <div style={styles.right}>
              {m.teamB} {getFlag(m.teamB)}
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
    padding: "20px",
    overflowX: "hidden"
  },
  header: {
    textAlign: "center",
    marginBottom: "25px"
  },
  subtitle: {
    opacity: 0.6
  },
  podium: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px"
  },
  box: {
    background: "#1e293b",
    padding: "15px",
    borderRadius: "10px",
    textAlign: "center"
  },
  first: { transform: "scale(1.4)", background: "#fbbf24", color: "#000" },
  second: { marginTop: "20px" },
  third: { marginTop: "40px", opacity: 0.8 },
  medal: { fontSize: "24px" },
  medalBig: { fontSize: "34px" },
  firstName: { fontWeight: "bold" },
  section: { marginTop: "20px" },
  card: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "8px",
    background: "#1e293b"
  },
  left: { width: "35%" },
  right: { width: "35%", textAlign: "right" },
  center: { width: "30%", textAlign: "center" },
  players: { fontSize: "12px", opacity: 0.7 }
};
