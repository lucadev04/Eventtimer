import { useEffect } from "react";
import { Tooltip } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";


const Sidebar = () => {
  // Initialisiert Bootstrap-Tooltips für alle Elemente mit dem Attribut 'data-bs-toggle="tooltip"'
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new Tooltip(tooltipTriggerEl);
    });
  }, []);

  return (
    <div className="d-flex flex-column flex-shrink-0 bg-dark p-3" style={{ width: "14rem", height: "100vh"}}>
      {/* Logo-Icon mit Tooltip */}
      <a href="/" className="d-flex align-items-center mb-3 link-light text-decoration-none">
        <i className="bi bi-bootstrap" style={{ fontSize: "2rem", marginRight: "10px" }}></i>
        <span className="fs-4">Eventtimer</span>
      </a>
      
      {/* Navigationselemente als Liste */}
      <ul className="nav nav-pills flex-column mb-auto">
        {[
          { href: "#", icon: "bi-house-door", label: "Home", active: true },
          { href: "#", icon: "bi-plus", label: "New Event"},
          { href: "#", icon: "bi-image", label: "Background" },
          { href: "#", icon: "bi-music-note-beamed", label: "Music" },
          { href: "#", icon: "bi-magic", label: "Effects" },
        ].map((item, index) => (
          <li className="nav-item" key={index}>
            <a
              href={item.href}
              className={`nav-link d-flex align-items-center ${item.active ? "active" : "link-light"}`}
              title={item.label}
            >
              <i className={`bi ${item.icon}`} style={{ fontSize: "1.5rem", marginRight: "30px" }}></i>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
