import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StackRover | Premium Digital Agency",
  description: "We craft digital experiences that inspire. A premier agency specializing in web development, design, and brand strategy for forward-thinking companies.",
  keywords: ["digital agency", "web development", "UI/UX design", "brand identity", "mobile apps"],
  authors: [{ name: "StackRover" }],
  openGraph: {
    title: "StackRover | Premium Digital Agency",
    description: "Crafting digital experiences that inspire and transform brands.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
