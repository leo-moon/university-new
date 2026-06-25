import { useState, useEffect } from "react";
import { styled } from "styled-components";

const SideMenuContainer = styled.aside`
  width: 300px;
  background: var(--surface);
  border-right: 1px solid var(--border);
  overflow-y: auto;
  padding: 1rem 0;
  flex-shrink: 0;
`;

const MenuItemContainer = styled.div`
  border-bottom: 1px solid var(--border);
`;

const MenuItemTitle = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  background: transparent;
  text-align: left;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--surface-hover);
  }
`;

const SubMenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  background: var(--surface-2);
`;

const SubMenuItem = styled.li`
  border-bottom: 1px solid var(--border);

  &:last-child {
    border-bottom: none;
  }
`;

const SubMenuLink = styled.button`
  width: 100%;
  padding: 0.75rem 1.5rem;
  border: none;
  background: transparent;
  text-align: left;
  font-size: 0.95rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: var(--surface-hover-2);
    color: var(--accent);
  }

  &.active {
    background-color: var(--surface-hover);
    color: var(--accent);
    font-weight: 500;
  }
`;

export default function SideMenu({ module, onSubitemClick, activeSubitemId }) {
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    const initial = {};
    module.menuItems
      .filter((item) => item.visible)
      .forEach((item) => {
        initial[item.id] = true;
      });
    setExpandedItems(initial);
  }, [module]);

  const toggleItem = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const visibleItems = module.menuItems.filter((item) => item.visible);

  return (
    <SideMenuContainer>
      {visibleItems.map((item) => (
        <MenuItemContainer key={item.id}>
          <MenuItemTitle onClick={() => toggleItem(item.id)}>
            <span>{item.title}</span>
            <span>{expandedItems[item.id] ? "▾" : "▸"}</span>
          </MenuItemTitle>
          <SubMenuList isOpen={expandedItems[item.id]}>
            {item.subitems
              .filter((subitem) => subitem.visible)
              .map((subitem) => (
                <SubMenuItem key={subitem.id}>
                  <SubMenuLink
                    className={activeSubitemId === subitem.id ? "active" : ""}
                    onClick={() => onSubitemClick(subitem)}
                  >
                    {subitem.title}
                  </SubMenuLink>
                </SubMenuItem>
              ))}
          </SubMenuList>
        </MenuItemContainer>
      ))}
    </SideMenuContainer>
  );
}
