import type React from "react"
import type { Metadata } from "next"

import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Confirmação de Presença - Alessandro & Fabyane",
  description: "Confirme sua presença no casamento de Alessandro e Fabyane",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="font-sans antialiased">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
