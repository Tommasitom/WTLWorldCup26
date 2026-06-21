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

const episodes = [
  { number: 1, title: "Episode 1 – The Tournament Begins", file: "/podcast-ep1.mp3" },
];

const prizeIcons = {
  "First Red Card": "🟥",
  "First Hat Trick": "🎩",
  "First Missed Penalty": "❌",
  "Most Goals": "⚽",
  "First Own Goal": "🥅"
};

export default function Home() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [matches, setMatches] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [sidePrizes, setSidePrizes] = useState([]);

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
        const results = [];
        const upcoming = [];

        rows.forEach(row => {
          const cols = row.split(",");

          const teamA = cols[1]?.trim();
          const teamB = cols[2]?.trim();
          const scoreA = cols[3]?.trim();
          const scoreB = cols[4]?.trim();
          const status = cols[7]?.trim() || "";
          const playerA = cols[8]?.trim() || "";
          const playerB = cols[9]?.trim() || "";

          if (!teamA || !teamB) return;

          if (status === "SCHEDULED") {
            upcoming.push({ teamA, teamB, playerA, playerB });
          } else if (scoreA && scoreB && scoreA !== "-" && scoreB !== "-") {
            results.push({ teamA, teamB, scoreA, scoreB, playerA, playerB, status });
          }
        });

        setMatches(results.reverse());
        setFixtures(upcoming);
      });

    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vTfR46oVSmS9_cnX_4USgkAp01jXRSqvWg9kjXEKhFjviCQFh3gHhNz1vTuL9-ppDHWB-lcjbD5SPg6/pub?gid=1120915220&single=true&output=csv")
      .then(res => res.text())
      .then(text => {
        const rows = text.split("\n").slice(1);
        const data = rows.map(row => {
          const cols = row.split(",");
          return {
            event: cols[0]?.trim(),
            winner: cols[1]?.trim() || ""
          };
        }).filter(r => r.event);
        setSidePrizes(data);
      });

  }, []);

  return (
    <div style={styles.page}>

      {/* NAV */}
      <div style={styles.nav}>
        <a href="#fixtures" style={styles.navButton}>📅 Fixtures</a>
        <a href="#matches" style={styles.navButton}>⚽ Results</a>
        <a href="#leaderboard" style={styles.navButton}>🏆 Leaderboard</a>
        <a href="#podcast" style={styles.navButton}>🎙️ Podcast</a>
      </div>

      <div style={styles.header}>
        <img src="/wtl.logo.png" alt="WTL World Cup Logo" style={styles.logo} />
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

      {/* 💰 PRIZES */}
      <div style={styles.prizeContainer}>
        <div style={styles.prizeBox}>
          <div>🥇 €100</div>
          <div>🥈 €50</div>
          <div>🥉 €20</div>
          <div style={styles.spoonPrize}>🥄 €20</div>
        </div>

        <div style={styles.sidePrizes}>
          {sidePrizes.length > 0 ? sidePrizes.map((p, i) => (
            <div key={i} style={styles.sidePrizeItem}>
              <div>{prizeIcons[p.event] || "🏆"} {p.event} — €10</div>
              {p.winner ? (
                <div style={styles.prizeWinner}>🏅 {p.winner}</div>
              ) : (
                <div style={styles.prizeUnclaimed}>Unclaimed</div>
              )}
            </div>
          )) : (
            <>
              <div>🟥 First Red Card — €10</div>
              <div>🎩 First Hat-Trick — €10</div>
              <div>❌ First Missed Penalty — €10</div>
              <div>⚽ Most Goals — €10</div>
              <div>🥅 First Own Goal — €10</div>
            </>
          )}
        </div>
      </div>

      {/* WOODEN SPOON */}
      {leaderboard.length > 0 && (
        <div style={styles.wooden}>
          🥄 Wooden Spoon: <strong>{leaderboard[leaderboard.length - 1].player}</strong> ({leaderboard[leaderboard.length - 1].points} pts)
        </div>
      )}

      <h2 id="leaderboard" style={styles.section}>Leaderboard</h2>

      <table style={styles.table}>
        <tbody>
          {leaderboard.map((r, i) => (
            <tr key={i} style={i === 0 ? styles.leaderRow : (i % 2 ? styles.rowAlt : styles.row)}>
              <td style={styles.cell}>{r.player}</td>
              <td style={styles.cell}>{r.team1}</td>
              <td style={styles.cell}>{r.team2}</td>
              <td style={styles.cell}><strong>{r.points}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🎙️ PODCAST */}
      <h2 id="podcast" style={styles.section}>🎙️ Weekly Podcast</h2>

      {episodes.map((ep) => (
        <div key={ep.number} style={styles.episodeCard}>
          <p style={styles.episodeTitle}>{ep.title}</p>
          <audio controls style={{ width: "100%" }}>
            <source src={ep.file} type="audio/mpeg" />
          </audio>
        </div>
      ))}

      {/* ⚽ RESULTS */}
      <h2 id="matches" style={styles.section}>⚽ Match Centre</h2>

      {matches.map((m, i) => {
        const status = m.status;
        return (
          <div key={i} style={styles.card}>
            <div style={styles.left}>
              {getFlag(m.teamA)} {m.teamA}
            </div>
            <div style={styles.center}>
              <div style={styles.status}>
                <span style={status === "LIVE" ? styles.live : styles.ft}>
                  {status}
                </span>
              </div>
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

      {/* 📅 FIXTURES */}
      <h2 id="fixtures" style={styles.section}>📅 Upcoming Fixtures</h2>

      {fixtures.length === 0 && (
        <p style={{ opacity: 0.5, textAlign: "center" }}>No upcoming fixtures</p>
      )}

      {fixtures.map((f, i) => (
        <div key={i} style={styles.fixtureCard}>
          <div style={styles.left}>
            {getFlag(f.teamA)} {f.teamA}
          </div>
          <div style={styles.center}>
            <div style={styles.scheduledBadge}>UPCOMING</div>
            {f.playerA && f.playerB && (
              <div style={styles.players}>
                {f.playerA} vs {f.playerB}
              </div>
            )}
          </div>
          <div style={styles.right}>
            {f.teamB} {getFlag(f.teamB)}
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
    padding: "30px"
  },

  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap"
  },

  navButton: {
    background: "#1e293b",
    color: "white",
    padding: "8px 16px",
    borderRadius: "20px",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: "bold"
  },

  header: {
    marginBottom: "25px",
    textAlign: "center"
  },

  logo: {
    width: "100%",
    maxWidth: "500px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
    marginBottom: "15px"
  },

  subtitle: {
    opacity: 0.6
  },

  section: { marginTop: "20px", marginBottom: "10px" },

  podium: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: "20px",
    marginBottom: "20px"
  },

  box: {
    padding: "18px",
    borderRadius: "12px",
    textAlign: "center",
    background: "#1e293b"
  },

  first: {
    transform: "scale(1.4)",
    background: "#fbbf24",
    color: "#000"
  },

  second: { marginTop: "20px" },
  third: { marginTop: "40px", opacity: 0.8 },

  medal: { fontSize: "24px" },
  medalBig: { fontSize: "34px" },

  firstName: { fontWeight: "bold", fontSize: "18px" },

  prizeContainer: {
    marginBottom: "40px"
  },

  prizeBox: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    marginBottom: "15px",
    fontWeight: "bold",
    fontSize: "16px"
  },

  sidePrizes: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "15px",
    fontSize: "13px",
    opacity: 0.85
  },

  sidePrizeItem: {
    textAlign: "center",
    minWidth: "140px"
  },

  prizeWinner: {
    marginTop: "4px",
    color: "#fbbf24",
    fontWeight: "bold",
    fontSize: "12px"
  },

  prizeUnclaimed: {
    marginTop: "4px",
    opacity: 0.4,
    fontSize: "11px",
    fontStyle: "italic"
  },

  spoonPrize: {
    opacity: 0.7
  },

  wooden: {
    textAlign: "center",
    marginBottom: "30px",
    opacity: 0.7
  },

  table: { width: "100%", marginBottom: "40px" },

  leaderRow: {
    background: "#fbbf24",
    color: "#000",
    fontWeight: "bold"
  },

  row: { background: "#0f172a" },
  rowAlt: { background: "#020617" },

  cell: {
    padding: "10px",
    borderBottom: "1px solid #334155"
  },

  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 18px",
    marginBottom: "12px",
    borderRadius: "12px",
    background: "#1e293b"
  },

  fixtureCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 18px",
    marginBottom: "12px",
    borderRadius: "12px",
    background: "#0f2a1a",
    border: "1px solid #1e4d2b"
  },

  episodeCard: {
    background: "#1e293b",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "16px"
  },

  episodeTitle: {
    margin: "0 0 10px 0",
    fontWeight: "bold",
    fontSize: "14px"
  },

  status: { marginBottom: "4px" },

  scheduledBadge: {
    background: "#166534",
    padding: "2px 6px",
    borderRadius: "6px",
    fontSize: "10px",
    fontWeight: "bold",
    marginBottom: "4px",
    display: "inline-block"
  },

  live: {
    background: "#ef4444",
    padding: "2px 6px",
    borderRadius: "6px",
    fontSize: "10px",
    fontWeight: "bold"
  },

  liveDot: {
    display: "inline-block",
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#ef4444",
    marginRight: "5px",
    animation: "blink 1s infinite"
  },

  ft: {
    background: "#475569",
    padding: "2px 6px",
    borderRadius: "6px",
    fontSize: "10px"
  },

  left: { width: "35%" },
  right: { width: "35%", textAlign: "right" },
  center: { width: "30%", textAlign: "center" },

  players: { fontSize: "12px", opacity: 0.7 }
};
