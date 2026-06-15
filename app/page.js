"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vTfR46oVSmS9_cnX_4USgkAp01jXRSqvWg9kjXEKhFjviCQFh3gHhNz1vTuL9-ppDHWB-lcjbD5SPg6/pub?gid=1476826283&single=true&output=csv")
      .then((res) => res.text())
      .then((text) => {
        const data = text.split("\n").slice(1);

        const parsed = data.map((row) => {
          const cols = row.split(",");
          return {
            player: cols[0],
            team1: cols[1],
            team2: cols[2],
            points: cols[3],
          };
        });

        setRows(parsed);
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
      <h1 style={{ marginBottom: "20px" }}>
        🏆 Sweepstake Dashboard
      </h1>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#1e293b" }}>
            <th style={cell}>Player</th>
            <th style={cell}>Team 1</th>
            <th style={cell}>Team 2</th>
            <th style={cell}>Points</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: i % 2 ? "#020617" : "#0f172a" }}>
              <td style={cell}>{r.player}</td>
              <td style={cell}>{r.team1}</td>
              <td style={cell}>{r.team2}</td>
              <td style={cell}>{r.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cell = {
  padding: "12px",
  borderBottom: "1px solid #334155"
};
