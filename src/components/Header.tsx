import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header() {
  return (
    <nav className="navbar navbar-dark bg-dark text-white">
      <div className="container mx-auto d-flex justify-content-between">
        <a className="navbar-brand fw-bold" href="#" style={{ color: "#eb9e31", fontSize: "24px" }}>Frepay</a>
        <h3>Sistema administrado Frepay</h3>
        <div className="fw-bold">
          En Línea <FontAwesomeIcon icon={['fas', 'circle']} color="#8fd14f" />
        </div>
      </div>
    </nav>
  )
}
