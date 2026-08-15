import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./portfolio.css";

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export default function PortfolioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${grotesk.variable} ${jetbrains.variable} portfolio-root`}>
      {children}
    </div>
  );
}
