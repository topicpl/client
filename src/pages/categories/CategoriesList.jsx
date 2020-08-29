import React from 'react';
import styled from 'styled-components';
import Tab from './CategoriesTab';
import categoriesSpecs from './categoriesSpecs';

const List = () => (
  <Container>
    {categoriesSpecs.map((item) => (
      <Tab
        key={item.href}
        header={item.header}
        href={item.href}
        text={item.text}
        color={item.color}
        img={item.img}
      />
    ))}
  </Container>
);

export default List;

const Container = styled.div`
  display: grid;
  grid-gap: 50px;
  grid-row-gap: 80px;

  @media (min-width: 760px) {
    grid-gap: 100px;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1200px) {
    grid-gap: 100px;
    grid-template-columns: repeat(3, 1fr);
  }
`;
