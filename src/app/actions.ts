"use server"

import fs from "fs/promises"
import path from "path"
import { cookies } from "next/headers"

const DATA_FILE = path.join(process.cwd(), "data", "confirmados.json")
const ADMIN_PASSWORD = "casamento2025"

// Ensure data directory exists
async function ensureDataDir() {
  const dir = path.join(process.cwd(), "data")
  try {
    await fs.access(dir)
  } catch {
    await fs.mkdir(dir, { recursive: true })
  }
}

// Helper to read the JSON file
async function readData() {
  await ensureDataDir()

  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8")
    return JSON.parse(raw)
  } catch (err) {
    // If file doesn't exist, create it with empty array
    await fs.writeFile(DATA_FILE, "[]")
    return []
  }
}

// Helper to write to the JSON file
async function writeData(data: any) {
  await ensureDataDir()
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2))
}

// Save a new confirmation
export async function saveConfirmation(formData: FormData) {
  const name = formData.get("name") as string
  const confirmation = formData.get("confirmation") as string
  const guests = Number.parseInt(formData.get("guests") as string, 10) || 0

  if (!name || !confirmation) {
    return { success: false, message: "Dados incompletos" }
  }

  const data = await readData()
  const confirmed = confirmation === "sim"

  data.push({
    id: Date.now(),
    name,
    confirmed,
    guests,
  })

  await writeData(data)

  return {
    success: true,
    message: confirmed
      ? `Obrigado ${name.split(" ")[0]}! Sua presença foi confirmada.`
      : `Obrigado ${name.split(" ")[0]} pelo retorno. Sentiremos sua falta!`,
  }
}

// Get all confirmations
export async function getConfirmations() {
  return await readData()
}

// Authenticate admin
export async function authenticate(password: string) {
  if (password === ADMIN_PASSWORD) {
    cookies().set("auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })
    return { success: true }
  }

  return { success: false }
}

// Logout
export async function logout() {
  cookies().delete("auth")
  return { success: true }
}
