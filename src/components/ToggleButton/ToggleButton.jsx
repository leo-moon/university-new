import { styled } from 'styled-components';

const ToggleButtonStyled = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(0, 116, 116, 0.5);
  border: none;
  color: rgb(1, 245, 240);
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease, transform 0.2s ease;
  z-index: 50;

  &:hover {
    background: rgba(0, 116, 116, 0.7);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export default function ToggleButton({ onClick, isVisible }) {
  return (
    <ToggleButtonStyled
      onClick={onClick}
      title={isVisible ? 'Скрыть меню' : 'Показать меню'}
      aria-label={isVisible ? 'Hide sidebar' : 'Show sidebar'}
    >
      {isVisible ? '◀' : '▶'}
    </ToggleButtonStyled>
  );
}
