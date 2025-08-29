import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Muhammad Anique - AI Engineer & Full Stack Developer",
  description:
    "Portfolio of Muhammad Anique, AI Engineer specializing in computer vision, machine learning, and full-stack development with LangGraph, FastAPI, Next.js, and YOLO.",
  keywords: "AI Engineer, Full Stack Developer, Computer Vision, Machine Learning, YOLO, LangGraph, FastAPI, Next.js",
  authors: [{ name: "Muhammad Anique" }],
  creator: "Muhammad Anique",
  icons: {
    icon: "/favicon_1.jpg"}
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
