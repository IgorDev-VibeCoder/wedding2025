"use client"

import type React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { logout } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"

interface FooterProps {
  isAdmin?: boolean
}

export function Footer({ isAdmin = false }: FooterProps) {
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = async () => {
    await logout()
    toast({
      title: "Você saiu da área de administração",
      variant: "success",
    })
    setTimeout(() => {
      router.push("/")
    }, 1500)
  }

  return (
    <div className="footer fade-in" style={{ "--delay": isAdmin ? 6 : 7 } as React.CSSProperties}>
      {isAdmin ? (
        <>
          <Link href="/" className="link-voltar">
            <i className="fas fa-arrow-left"></i> Voltar para confirmação
          </Link>
          <a href="#" onClick={handleLogout} className="link-logout ml-4">
            <i className="fas fa-sign-out-alt"></i> Sair
          </a>
        </>
      ) : (
        <Link href="/admin" className="link-confirmados">
          <i className="fas fa-lock"></i> Área dos Noivos
        </Link>
      )}
      <div className="hearts">❤ ❤ ❤</div>
    </div>
  )
}
