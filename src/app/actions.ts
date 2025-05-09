"use server"

import { supabase } from "@/lib/supabase"
import { cookies } from "next/headers"



const ADMIN_PASSWORD = "casamento2025"

export async function saveConfirmation(formData: FormData) {
  const nome = formData.get("name")?.toString().trim() || ""
  const confirmacao = formData.get("confirmation")?.toString() || ""
  const acompanhantes = parseInt(formData.get("guests")?.toString() || "0", 10)

  if (!nome || !confirmacao) {
    return { success: false, message: "Preencha todos os campos obrigatórios." }
  }

  const confirmada = confirmacao === "sim"

  const { error } = await supabase.from("convidados").insert([
    {
      nome, // coluna text
      confirmacao: confirmada, // coluna bool
      acompanhantes, // coluna numeric
    },
  ])

  if (error) {
    console.error("Erro ao salvar no Supabase:", error)
    return { success: false, message: "Erro ao salvar confirmação." }
  }

  return {
    success: true,
    message: confirmada
      ? `Obrigado ${nome.split(" ")[0]}! Sua presença foi confirmada.`
      : `Obrigado ${nome.split(" ")[0]} pelo retorno. Sentiremos sua falta!`,
  }
}

export async function getConfirmations() {
  const { data, error } = await supabase.from("convidados").select("*")

  if (error) {
    throw new Error("Erro ao buscar confirmações")
  }

  return data
}

export async function authenticate(password: string) {
  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies()
    cookieStore.set("auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 dia
      path: "/",
    })
    return { success: true }
  }

  return { success: false }
}

// Logout
export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("auth")
  return { success: true }
}
