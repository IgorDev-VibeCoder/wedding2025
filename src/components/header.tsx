import type React from "react"
export function Header() {
  return (
    <div className="header fade-in" style={{ "--delay": 1 } as React.CSSProperties}>
      <h1 className="script font-greatVibes">Alessandro & Fabyane</h1>
      <div className="date font-cormorant">17 de Maio de 2025</div>
      <div className="venue font-cormorant">Igreja São José às 16h</div>
    </div>
  )
}
