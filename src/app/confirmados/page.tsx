import type React from "react"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { getConfirmations } from "@/app/actions"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Notification } from "@/components/notification"
import { ConfirmationList } from "@/components/confirmation-list"

export default async function ConfirmadosPage() {
  const cookieStore = cookies()
  const isAuthenticated = cookieStore.get("auth")?.value === "true"

  if (!isAuthenticated) {
    redirect("/admin")
  }

  const confirmations = await getConfirmations()

  return (
    <div className="container mx-auto max-w-2xl">
      <div className="card">
        <Header />

        <div className="content fade-in" style={{ "--delay": 2 } as React.CSSProperties}>
          <h2 className="text-center text-3xl font-semibold mb-6 text-primary relative inline-block w-full font-cormorant">
            Lista de Confirmações
          </h2>
          <p className="text-center mb-8 text-text-light text-lg font-cormorant">
            Pessoas que confirmaram presença em nosso momento especial:
          </p>

          <ConfirmationList confirmations={confirmations} />
        </div>

        <Footer isAdmin={true} />
      </div>

      <Notification />
    </div>
  )
}
