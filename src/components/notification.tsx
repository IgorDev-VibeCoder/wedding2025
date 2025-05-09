"use client"

import { useEffect, useState } from "react"

export function Notification() {
  const [notification, setNotification] = useState<{
    show: boolean
    message: string
    type: "success" | "error"
  }>({
    show: false,
    message: "",
    type: "success",
  })

  // Listen for custom events
  useEffect(() => {
    const handleCustomEvent = (e: CustomEvent) => {
      setNotification({
        show: true,
        message: e.detail.message,
        type: e.detail.type || "success",
      })

      // Auto hide after 4 seconds
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, show: false }))
      }, 4000)
    }

    // Add event listener
    window.addEventListener("notification" as any, handleCustomEvent as EventListener)

    // Cleanup
    return () => {
      window.removeEventListener("notification" as any, handleCustomEvent as EventListener)
    }
  }, [])

  const handleClose = () => {
    setNotification((prev) => ({ ...prev, show: false }))
  }

  return (
    <div
      id="notification"
      className={`notification ${notification.type === "success" ? "success" : "error"} ${notification.show ? "show" : ""}`}
    >
      <span className="notification-icon">
        {notification.type === "success" ? (
          <i className="fas fa-check-circle"></i>
        ) : (
          <i className="fas fa-exclamation-circle"></i>
        )}
      </span>
      <span className="notification-text">{notification.message}</span>
      <span className="notification-close" onClick={handleClose}>
        &times;
      </span>
    </div>
  )
}
