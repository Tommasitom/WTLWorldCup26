
export const metadata = {
  title: "WTLWorldCup26",
  openGraph: {
    title: "WTL World Cup 26",
    description: "Weekly World Cup sweepstakes podcast & leaderboard",
    images: [
      {
        url: "https://wtl-world-cup26.vercel.app/wtl.logo.png",
      }
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
