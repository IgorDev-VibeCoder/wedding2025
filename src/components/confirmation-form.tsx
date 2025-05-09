"use client"

import type React from "react"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface ConfirmationFormProps {
  saveConfirmation: (formData: FormData) => Promise<{ success: boolean; message: string }>
}

export function ConfirmationForm({ saveConfirmation }: ConfirmationFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const result = await saveConfirmation(formData)

      if (result.success) {
        toast({
          title: result.message,
          variant: "success",
        })
        // Reset form
        e.currentTarget.reset()
      } else {
        toast({
          title: result.message || "Erro ao enviar confirmação",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar confirmação",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group fade-in" style={{ "--delay": 3 } as React.CSSProperties}>
        <label htmlFor="name" className="block mb-2 text-accent text-base font-medium tracking-wide">
          Nome Completo:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Digite seu nome completo"
          className="w-full py-3.5 px-4 border border-border rounded-lg text-base transition-colors focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(176,141,149,0.2)]"
        />
      </div>

      <div className="form-group fade-in" style={{ "--delay": 4 } as React.CSSProperties}>
        <label className="block mb-2 text-accent text-base font-medium tracking-wide">Confirma presença?</label>
        <div className="flex flex-col md:flex-row gap-4 md:gap-5 mt-2.5">
          <div className="relative block w-full">
            <input
              type="radio"
              id="confirm-yes"
              name="confirmation"
              value="sim"
              required
              className="absolute opacity-0 w-0 h-0"
            />
            <label
              htmlFor="confirm-yes"
              className="relative cursor-pointer py-4 px-5 rounded-lg bg-white text-text-color font-medium w-full flex items-center justify-center transition-all border-2 border-border hover:border-primary hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(176,141,149,0.2)]"
            >
              <i className="fas fa-check-circle mr-2 text-text-light"></i>
              Sim, confirmo presença
            </label>
          </div>

          <div className="relative block w-full">
            <input
              type="radio"
              id="confirm-no"
              name="confirmation"
              value="não"
              className="absolute opacity-0 w-0 h-0"
            />
            <label
              htmlFor="confirm-no"
              className="relative cursor-pointer py-4 px-5 rounded-lg bg-white text-text-color font-medium w-full flex items-center justify-center transition-all border-2 border-border hover:border-primary hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(176,141,149,0.2)]"
            >
              <i className="fas fa-times-circle mr-2 text-text-light"></i>
              Infelizmente não poderei ir
            </label>
          </div>
        </div>
      </div>

      <div className="form-group fade-in" style={{ "--delay": 5 } as React.CSSProperties}>
        <label htmlFor="guests" className="block mb-2 text-accent text-base font-medium tracking-wide">
          Número de acompanhantes:
        </label>
        <select
          id="guests"
          name="guests"
          className="w-full py-3.5 px-4 border border-border rounded-lg text-base transition-colors focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(176,141,149,0.2)] appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23B08D95%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_15px_center] bg-[length:20px] cursor-pointer"
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>

      <div className="form-group fade-in" style={{ "--delay": 6 } as React.CSSProperties}>
        <button type="submit" className="btn-submit" disabled={isLoading}>
          <span>
            {isLoading ? (
              <>
                <i className="fas fa-spinner animate-spin mr-2"></i> Enviando...
              </>
            ) : (
              "Confirmar Presença"
            )}
          </span>
        </button>
      </div>
    </form>
  )
}
