import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import SideMenu from './components/SideMenu/SideMenu';
import ContentArea from './components/ContentArea/ContentArea';
import ToggleButton from './components/ToggleButton/ToggleButton';
import { modules } from './data';
import { themes } from './themes';

export default function App() {
  const [currentModule, setCurrentModule] = useState(modules[0]);
  const [currentSubitem, setCurrentSubitem] = useState(
    currentModule.menuItems[0].subitems[0]
  );
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const rootStyle = document.documentElement.style;
    const themeVariables = themes[theme];

    Object.entries(themeVariables).forEach(([key, value]) => {
      rootStyle.setProperty(key, value);
    });
  }, [theme]);

  const handleModuleSelect = (module) => {
    setCurrentModule(module);
    setCurrentSubitem(module.menuItems[0].subitems[0]);
  };

  const handleSubitemClick = (subitem) => {
    setCurrentSubitem(subitem);
  };

  return (
    <>
      <Header
        currentModuleName={currentModule.name}
        onModuleSelect={handleModuleSelect}
        currentTheme={theme}
        onToggleTheme={() =>
          setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
        }
      />
      <div style={{ display: 'flex', height: 'calc(100vh - 60px)' }}>
        {sidebarVisible && (
          <SideMenu
            module={currentModule}
            onSubitemClick={handleSubitemClick}
            activeSubitemId={currentSubitem.id}
          />
        )}
        <ContentArea subitem={currentSubitem} />
      </div>
      <ToggleButton
        onClick={() => setSidebarVisible((prev) => !prev)}
        isVisible={sidebarVisible}
      />
    </>
  );
}
