import React from 'react';
import styled from 'styled-components';
import __t from '../../i18n/translator.js';
import List from './CategoriesList.js';

const Categories = () => {
  return (
    <Container>
      <Heading>{__t('categories.heading')}</Heading>
      <List />
    </Container>
  );
};

export default Categories;

const Container = styled.div`
  background: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.grey};
  padding: 32px;
  width: 100%;
`;

const Heading = styled.div`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;
