import { styled } from 'styled-components';
// контейнер для контента, который будет отображаться в зависимости от выбранного пункта меню

const ContentContainer = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  background: var(--page-bg);
`;

const ContentTitle = styled.h1`
  margin: 0 0 1rem 0;
  color: var(--text-primary);
  font-size: 2rem;
`;

const ContentText = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 1rem;
`;

export default function ContentArea({ subitem }) {
  return (
    <ContentContainer>
      {subitem ? (
        <>
          <ContentTitle>{subitem.title}</ContentTitle>
          <ContentText>{subitem.content}</ContentText>
        </>
      ) : (
        <ContentText>Выберите пункт меню</ContentText>
      )}
    </ContentContainer>
  );
}
