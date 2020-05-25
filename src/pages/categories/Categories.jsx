import React from 'react';
import styled from 'styled-components';
import __t from '../../i18n/translator';
import List from './CategoriesList';

const Categories = () => (
  <Container>
    <Heading>{__t('categories.heading')}</Heading>
    <List />
  </Container>
);

export default Categories;

const Container = styled.div`
  background: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.grey};
  padding: 32px;
  width: 100%;

  @media (min-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: 1024px) {
    height: 100%;
  }
`;

const Heading = styled.div`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.font.weight.bold};

  margin: 50px 0;

  @media (min-width: 1024px) {
    font-size: 2.5rem;
  }
`;
