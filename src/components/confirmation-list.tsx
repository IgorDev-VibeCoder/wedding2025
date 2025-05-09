"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface Confirmation {
  id: number
  name: string
  confirmed: boolean
  guests: number
}

interface ConfirmationListProps {
  confirmations: Confirmation[]
}

export function ConfirmationList({ confirmations }: ConfirmationListProps) {
  const [stats, setStats] = useState({ totalConfirmed: 0, totalGuests: 0 })
  const [displayedConfirmed, setDisplayedConfirmed] = useState(0)
  const [displayedGuests, setDisplayedGuests] = useState(0)

  // Calculate stats
  useEffect(() => {
    const confirmed = confirmations.filter((c) => c.confirmed)
    const totalConfirmed = confirmed.length
    const totalGuests = confirmed.reduce((sum, c) => sum + c.guests, 0)

    setStats({ totalConfirmed, totalGuests })

    // Animate counters
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

  // Filter only confirmed guests and sort by name
  const confirmedGuests = confirmations.filter((c) => c.confirmed).sort((a, b) => a.name.localeCompare(b.name))

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
                    key={person.id}
                    className="bg-white even:bg-secondary/50 hover:bg-primary/10 transition-colors"
                    style={{
                      opacity: 0,
                      transform: "translateY(10px)",
                      transition: "opacity 0.5s ease, transform 0.5s ease",
                      transitionDelay: `${index * 100}ms`,
                    }}
                    onLoad={(e) => {
                      const target = e.currentTarget
                      setTimeout(() => {
                        target.style.opacity = "1"
                        target.style.transform = "translateY(0)"
                      }, 100)
                    }}
                  >
                    <td className="py-4 px-5">{person.name}</td>
                    <td className="py-4 px-5">
                      <span className="status-confirmed">
                        <i className="fas fa-check-circle"></i> Sim
                      </span>
                    </td>
                    <td className="py-4 px-5">{person.guests}</td>
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
