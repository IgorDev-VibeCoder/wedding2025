"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authenticate } from "@/app/actions"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Notification } from "@/components/notification"
import { useToast } from "@/hooks/use-toast"

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await authenticate(password)

      if (result.success) {
        toast({
          title: "Login realizado com sucesso!",
          variant: "success",
        })

        setTimeout(() => {
          router.push("/confirmados")
        }, 1500)
      } else {
        setError("Senha incorreta. Tente novamente.")
        toast({
          title: "Senha incorreta. Tente novamente.",
          variant: "destructive",
        })
        setPassword("")
      }
    } catch {
      setError("Erro ao fazer login. Tente novamente.")
      toast({
        title: "Erro ao fazer login. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-2xl">
      <div className="card">
        <Header />

        <div className="content fade-in" style={{ "--delay": 2 } as React.CSSProperties}>
          <h2 className="text-center text-3xl font-semibold mb-6 text-primary relative inline-block w-full font-cormorant">
            Acesso dos Noivos
          </h2>
          <p className="text-center mb-8 text-text-light text-lg font-cormorant">
            Digite a senha para acessar a lista de confirmações.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group fade-in" style={{ "--delay": 3 } as React.CSSProperties}>
              <label htmlFor="password" className="block mb-2 text-accent text-base font-medium tracking-wide">
                <i className="fas fa-key mr-2"></i> Senha:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Digite a senha de acesso"
                className={`w-full py-3.5 px-4 border border-border rounded-lg text-base transition-colors focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(176,141,149,0.2)] ${error ? "border-error shadow-[0_0_0_3px_rgba(214,40,40,0.2)] animate-shake" : ""}`}
              />
            </div>

            <div className="form-group fade-in" style={{ "--delay": 4 } as React.CSSProperties}>
              <button type="submit" className="btn-submit w-full" disabled={isLoading}>
                <span>
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner animate-spin mr-2"></i> Acessando...
                    </>
                  ) : (
                    "Acessar Lista"
                  )}
                </span>
              </button>
            </div>
          </form>

          {error && (
            <div className="error-message mt-4 text-center text-error text-sm font-medium py-2 px-3 rounded bg-error/10">
              {error}
            </div>
          )}
        </div>

        <Footer />
      </div>

      <Notification />
    </div>
  )
}
