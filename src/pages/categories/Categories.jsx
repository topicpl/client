import React from 'react';
import styled from 'styled-components';
import __t from '../../i18n/translator';
import List from './CategoriesList';
import Layout from '../../app/Layout';

const Categories = () => (
  <Layout>
    <Container>
      <Heading>{__t('categories.heading')}</Heading>
      <ListWrapper>
        <List />
      </ListWrapper>
    </Container>
  </Layout>
);

export default Categories;

const Container = styled.div`
  background: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.grey[950]};
  width: 100%;
  min-height: 100%;
  padding: 32px 0 0 12px;

  @media (min-width: 321px) {
    padding: 32px;
  }

  @media (min-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: center;
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
const ListWrapper = styled.div`
  margin-top: 50px;
  @media (min-width: 1024px) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
`;
