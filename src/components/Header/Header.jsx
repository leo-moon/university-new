import { useState, useEffect, useRef } from 'react';
// import './header.css';
import dayjs from 'dayjs';
import logo from '/logo55x55.png';
import { styled } from 'styled-components';
import MenuButton from '../MenuButton/MenuButton';
import { modules } from '../../data';
import { faculties } from '../../faculties';

const menuItems = modules.map((m) => ({ id: m.id, title: m.name }));

const StyledHeader = styled.header`
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0.5rem 2rem;
  background-color: initial;
  background-image: linear-gradient(
    -225deg,
    rgb(0, 116, 116) 0%,
    rgb(0, 48, 104) 51%,
    rgb(0, 116, 116) 100% 100%
  );
  color: rgb(1, 245, 240);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
`;

const MenuOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 1000;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  padding: 1rem;
`;

const MenuPanel = styled.nav`
  width: min(340px, 100%);
  max-width: 360px;
  background: #ffffff;
  color: #102a43;
  border-radius: 18px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  overflow: hidden;
`;

const MenuPanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  color: #102a43;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  padding: 0.25rem;
  transition: color 0.2s ease;

  &:hover {
    color: #0b3d91;
  }
`;

const MenuTitle = styled.h2`
  margin: 0;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.75rem;
`;

const MenuItem = styled.li`
  border-radius: 14px;
  background: #f8fbff;
  box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.05);
`;

const MenuItemButton = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  background: transparent;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
`;

const logoStyle = {
  width: '45px',
  height: '45px',
};

const FacultySelect = styled.select`
  margin-left: 1rem;
  padding: 0.5rem 0.75rem;
  border-radius: 999px;
  border: 1px solid var(--button-border);
  background: var(--button-bg);
  color: inherit;
  cursor: pointer;
  font-size: 0.95rem;
  outline: none;
`;

export default function Header({
  currentModuleName = 'Модуль-1',
  onModuleSelect = () => {},
  currentTheme = 'light',
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
      if (event.key === 'Escape' && menuOpen) {
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

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
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
      <StyledHeader>
        <div
          style={{ marginTop: 8, marginRight: 8, marginLeft: '-16px' }}
          ref={buttonRef}
        >
          <MenuButton
            onClick={() => setMenuOpen((open) => !open)}
            isOpen={menuOpen}
          />
        </div>
        <h3 style={{ margin: 0, marginLeft: '1rem', marginRight: '0.5rem' }}>
          {currentModuleName}
        </h3>
        <a href="https://nlu.edu.ua" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="" style={logoStyle} />
        </a>
        <FacultySelect
          value={faculty}
          onChange={(event) => setFaculty(event.target.value)}
          aria-label="Выбор факультета"
        >
          {faculties.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </FacultySelect>
        <p style={{ marginLeft: 'auto', marginRight: '1rem' }}>
          User: John Doe
        </p>
        <button
          type="button"
          onClick={onToggleTheme}
          style={{
            marginRight: '1rem',
            padding: '0.5rem 0.75rem',
            borderRadius: '999px',
            border: '1px solid rgba(255,255,255,0.65)',
            background: 'rgba(255,255,255,0.16)',
            color: 'inherit',
            cursor: 'pointer',
          }}
        >
          {currentTheme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
        </button>
        <span style={{ justifyContent: 'flex-end' }}>
          Time: {now.format('HH:mm:ss')}
        </span>
      </StyledHeader>
      {menuOpen && (
        <MenuOverlay role="dialog" aria-modal="true" ref={menuRef}>
          <MenuPanel>
            <MenuPanelHeader>
              <MenuTitle>Модули</MenuTitle>
              <CloseButton
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </CloseButton>
            </MenuPanelHeader>
            <MenuList>
              {modules.map((module) => (
                <MenuItem key={module.id}>
                  <MenuItemButton
                    type="button"
                    onClick={() => handleModuleSelect(module.id)}
                  >
                    <span>{module.name}</span>
                  </MenuItemButton>
                </MenuItem>
              ))}
            </MenuList>
          </MenuPanel>
        </MenuOverlay>
      )}
    </>
  );
}
