import type React from "react"
import { saveConfirmation } from "@/app/actions"
import { ConfirmationForm } from "@/components/confirmation-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Notification } from "@/components/notification"

export default function Home() {
  return (
    <div className="container mx-auto max-w-2xl">
      <div className="card">
        <Header />

        <div className="content fade-in" style={{ "--delay": 2 } as React.CSSProperties}>
          <h2 className="text-center text-3xl font-semibold mb-6 text-primary relative inline-block w-full font-cormorant">
            Confirmação de Presença
          </h2>
          <p className="text-center mb-8 text-text-light text-lg font-cormorant">
            É com grande alegria que convidamos você para celebrar este momento especial conosco.
          </p>

          <ConfirmationForm saveConfirmation={saveConfirmation} />
        </div>

        <Footer />
      </div>

      <Notification />
    </div>
  )
}
