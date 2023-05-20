import React from "react";

export default function StatusPedido({ status }: { status: number }) {
  const colors = [
    "#ffcb2a", // Wait
    "#8fd14f", // Completed
    "#da0063", // Canceled
  ];
  const texts = [
    "Espera", // Wait
    "Completado", // Completed
    "Cancelado", // Canceled
  ];
  return (
    <span className="badge p-2" style={{backgroundColor: colors[status]}}>
      {texts[status]}
    </span>
  )
}
