import React from 'react';
import styled from 'styled-components';
import Tab from './CategoriesTab';
import __t from '../../i18n/translator';

// const categoriesList = [
//   { href: 'architecture', text: __t('categories.li.0') },
//   { href: 'art', icon: FaPalette, text: __t('categories.li.1') },
//   { href: 'automotive', icon: FaCar, text: __t('categories.li.2') },
//   { href: 'business', icon: FaDonate, text: __t('categories.li.3') },
//   { href: 'culture', icon: FaToriiGate, text: __t('categories.li.4') },
//   { href: 'education', icon: FaGraduationCap, text: __t('categories.li.5') },
// ];

const List = () => (
  <Container>
    {/* {categoriesList.map((item) => (
      <Tab
        key={item.href}
        Icon={item.icon}
        text={item.text}
        href={item.href}
      />
    ))} */}
  </Container>
);

export default List;

const Container = styled.div``;
