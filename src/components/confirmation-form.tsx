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

      } else {
        toast({
          title: result.message || "Erro ao enviar confirmação",
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Erro ao enviar confirmação",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-base font-semibold text-[#B08D95] mb-2">
          Nome Completo:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Digite seu nome completo"
          className="w-full px-4 py-3.5 rounded-lg border border-[#E7D9DB] focus:outline-none focus:ring-2 focus:ring-[#B08D95]/30 focus:border-[#B08D95] placeholder:text-[#c4b2b5] transition"
        />
      </div>

      <div>
        <label className="block text-base font-semibold text-[#B08D95] mb-2">Confirma presença?</label>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full">
            <input
              type="radio"
              id="confirm-yes"
              name="confirmation"
              value="sim"
              required
              className="sr-only peer"
            />
            <label
              htmlFor="confirm-yes"
              className="block w-full cursor-pointer rounded-lg border-2 border-[#E7D9DB] bg-white py-4 px-5 text-center text-[#5c4a4e] font-medium peer-checked:border-[#B08D95] peer-checked:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <i className="fas fa-check-circle mr-2 text-[#B08D95]"></i>
              Sim, confirmo presença
            </label>
          </div>

          <div className="relative w-full">
            <input
              type="radio"
              id="confirm-no"
              name="confirmation"
              value="não"
              className="sr-only peer"
            />
            <label
              htmlFor="confirm-no"
              className="block w-full cursor-pointer rounded-lg border-2 border-[#E7D9DB] bg-white py-4 px-5 text-center text-[#5c4a4e] font-medium peer-checked:border-[#B08D95] peer-checked:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <i className="fas fa-times-circle mr-2 text-[#B08D95]"></i>
              Infelizmente não poderei ir
            </label>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="guests" className="block text-base font-semibold text-[#B08D95] mb-2">
          Número de acompanhantes:
        </label>
        <select
          id="guests"
          name="guests"
          className="w-full p-4 rounded-lg border border-[#E7D9DB] text-base text-[#5c4a4e] appearance-none focus:outline-none focus:ring-2 focus:ring-[#B08D95]/30 focus:border-[#B08D95]"
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
