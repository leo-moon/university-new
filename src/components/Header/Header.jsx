import { useState, useEffect, useRef } from "react";
import "./header.css";
import dayjs from "dayjs";
import logo from "/logo55x55.png";
import MenuButton from "../MenuButton/MenuButton";
import modules from "../../Modules";
import { faculties } from "../../faculties";

const menuItems = modules.map((m) => ({ id: m.id, title: m.name }));

export default function Header({
  currentModuleName = "Модуль-1",
  onModuleSelect = () => {},
  currentTheme = "light",
  onToggleTheme = () => {},
}) {
  const [now, setNow] = useState(dayjs());
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [faculty, setFaculty] = useState(faculties[0]);
  const menuRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const openMenu = () => {
    setIsClosing(false);
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setIsClosing(true);
    window.setTimeout(() => {
      setMenuOpen(false);
      setIsClosing(false);
    }, 240);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && (menuOpen || isClosing)) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen, isClosing]);

  const handleModuleSelect = (moduleId) => {
    const selected = modules.find((m) => m.id === moduleId);
    if (selected) {
      onModuleSelect(selected);
      closeMenu();
    }
  };

  return (
    <>
      <header className="header">
        <div className="header__menu-button">
          <MenuButton
            onClick={() => {
              if (menuOpen && !isClosing) {
                closeMenu();
              } else {
                openMenu();
              }
            }}
            isOpen={menuOpen && !isClosing}
          />
        </div>
        <h3 className="header__module-title">{currentModuleName}</h3>
        <a href="https://nlu.edu.ua" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="" className="header__logo" />
        </a>
        <select
          className="header__faculty-select"
          value={faculty}
          onChange={(event) => setFaculty(event.target.value)}
          aria-label="Выбор факультета"
        >
          {faculties.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <p className="header__user-info">User: John Doe</p>
        <button
          type="button"
          onClick={onToggleTheme}
          className="header__theme-toggle"
        >
          {currentTheme === "dark" ? "Light" : "Dark"}
        </button>
        <span className="header__time">Time: {now.format("HH:mm:ss")}</span>
      </header>
      {(menuOpen || isClosing) && (
        <div
          className="menu-overlay"
          role="dialog"
          aria-modal="true"
          onClick={closeMenu}
        >
          <nav
            className={`menu-panel ${isClosing ? "closing" : "open"}`}
            ref={menuRef}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="menu-panel__header">
              <h2 className="menu-title">Модули</h2>
              <button
                type="button"
                className="close-button"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <ul className="menu-list">
              {modules.map((module) => (
                <li
                  className="menu-item"
                  key={module.id}
                  visible={
                    module.menuItems.some((item) => item.visible)
                      ? "true"
                      : "false"
                  }
                >
                  <button
                    type="button"
                    className="menu-item__button"
                    onClick={() => handleModuleSelect(module.id)}
                  >
                    <span>{module.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
