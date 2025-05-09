"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Confirmation = {
  nome: string
  confirmacao: boolean
  acompanhantes: number
}

export function ConfirmationList() {
  const [confirmations, setConfirmations] = useState<Confirmation[]>([])
  const [displayedConfirmed, setDisplayedConfirmed] = useState(0)
  const [displayedGuests, setDisplayedGuests] = useState(0)

  useEffect(() => {
    async function fetchConfirmations() {
      const { data, error } = await supabase.from("convidados").select("*")
      if (error) {
        console.error("Erro ao buscar confirmações:", error)
        return
      }
      setConfirmations(data as Confirmation[])
    }

    fetchConfirmations()
  }, [])

  useEffect(() => {
    const confirmed = confirmations.filter((c) => c.confirmacao)
    const totalConfirmed = confirmed.length
    const totalGuests = confirmed.reduce((sum, c) => sum + c.acompanhantes, 0)

    let startTime: number | null = null
    const duration = 1500

    const animateCounters = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      setDisplayedConfirmed(Math.round(progress * totalConfirmed))
      setDisplayedGuests(Math.round(progress * totalGuests))

      if (progress < 1) {
        requestAnimationFrame(animateCounters)
      }
    }

    requestAnimationFrame(animateCounters)
  }, [confirmations])

  const confirmedGuests = confirmations
    .filter((c) => c.confirmacao)
    .sort((a, b) => a.nome.localeCompare(b.nome))

  return (
    <div className="confirmed-list">
      <div className="stats fade-in" style={{ "--delay": 3 } as React.CSSProperties}>
        <div className="stat-item">
          <span>{displayedConfirmed}</span>
          <label>Total Confirmados</label>
        </div>
        <div className="stat-item">
          <span>{displayedGuests}</span>
          <label>Acompanhantes</label>
        </div>
      </div>

      <div className="confirmed-table fade-in" style={{ "--delay": 4 } as React.CSSProperties}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
            <thead>
              <tr className="bg-gradient-to-r from-primary to-primary-dark text-white">
                <th className="py-4 px-5 text-left uppercase tracking-wider text-sm font-medium">
                  <i className="fas fa-user mr-2"></i> Nome
                </th>
                <th className="py-4 px-5 text-left uppercase tracking-wider text-sm font-medium">
                  <i className="fas fa-check-circle mr-2"></i> Confirmação
                </th>
                <th className="py-4 px-5 text-left uppercase tracking-wider text-sm font-medium">
                  <i className="fas fa-users mr-2"></i> Acompanhantes
                </th>
              </tr>
            </thead>
            <tbody>
              {confirmedGuests.length > 0 ? (
                confirmedGuests.map((person, index) => (
                  <tr
                    key={`${person.nome}-${index}`}
                    className="bg-white even:bg-secondary/50 hover:bg-primary/10 transition-colors"
                    style={{
                      opacity: 1,
                      transform: "translateY(0)",
                      transition: "opacity 0.5s ease, transform 0.5s ease",
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    <td className="py-4 px-5">{person.nome}</td>
                    <td className="py-4 px-5">
                      <span className="status-confirmed">
                        <i className="fas fa-check-circle"></i> Sim
                      </span>
                    </td>
                    <td className="py-4 px-5">{person.acompanhantes}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-8">
                    <div className="no-data">
                      <i className="fas fa-info-circle"></i> Nenhuma confirmação ainda.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
