import { useState, useEffect, useRef } from "react";
import "./header.css";
import dayjs from "dayjs";
import logo from "/logo55x55.png";
import MenuButton from "../MenuButton/MenuButton";
import { modules } from "../../data";
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
  const [faculty, setFaculty] = useState(faculties[0]);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (!menuOpen) {
        return;
      }
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleModuleSelect = (moduleId) => {
    const selected = modules.find((m) => m.id === moduleId);
    if (selected) {
      onModuleSelect(selected);
      setMenuOpen(false);
    }
  };

  return (
    <>
      <header className="header">
        <div className="header__menu-button" ref={buttonRef}>
          <MenuButton
            onClick={() => setMenuOpen((open) => !open)}
            isOpen={menuOpen}
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
          {currentTheme === "dark" ? "Светлая тема" : "Тёмная тема"}
        </button>
        <span className="header__time">Time: {now.format("HH:mm:ss")}</span>
      </header>
      {menuOpen && (
        <div
          className="menu-overlay"
          role="dialog"
          aria-modal="true"
          ref={menuRef}
        >
          <nav className="menu-panel">
            <div className="menu-panel__header">
              <h2 className="menu-title">Модули</h2>
              <button
                type="button"
                className="close-button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <ul className="menu-list">
              {modules.map((module) => (
                <li className="menu-item" key={module.id}>
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
