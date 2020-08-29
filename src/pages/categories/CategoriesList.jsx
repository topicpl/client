import React from 'react';
import styled from 'styled-components';
import Tab from './CategoriesTab';
import __t from '../../i18n/translator';

const categoriesList = [
  {
    href: 'art',
    color: '#3D007A',
    header: __t('categories.tab.0.header'),
    text: [
      __t('categories.tab.0.helper.0'),
      __t('categories.tab.0.helper.1'),
      __t('categories.tab.0.helper.2'),
      __t('categories.tab.0.helper.3'),
      __t('categories.tab.0.helper.4'),
      __t('categories.tab.0.helper.5'),
    ],
  },
  {
    href: 'life',
    color: '#FF3D2E',
    header: __t('categories.tab.1.header'),
    text: [
      __t('categories.tab.1.helper.0'),
      __t('categories.tab.1.helper.1'),
      __t('categories.tab.1.helper.2'),
      __t('categories.tab.1.helper.3'),
      __t('categories.tab.1.helper.4'),
      __t('categories.tab.1.helper.5'),
    ],
  },
  {
    href: 'science',
    color: '#0D0D0D',
    header: __t('categories.tab.2.header'),
    text: [
      __t('categories.tab.2.helper.0'),
      __t('categories.tab.2.helper.1'),
      __t('categories.tab.2.helper.2'),
      __t('categories.tab.2.helper.3'),
      __t('categories.tab.2.helper.4'),
      __t('categories.tab.2.helper.5'),
    ],
  },
  {
    href: 'sport',
    color: '#00FF86',
    header: __t('categories.tab.3.header'),
    text: [
      __t('categories.tab.3.helper.0'),
      __t('categories.tab.3.helper.1'),
      __t('categories.tab.3.helper.2'),
      __t('categories.tab.3.helper.3'),
      __t('categories.tab.3.helper.4'),
      __t('categories.tab.3.helper.5'),
    ],
  },
  {
    href: 'world',
    color: '#002564',
    header: __t('categories.tab.4.header'),
    text: [
      __t('categories.tab.4.helper.0'),
      __t('categories.tab.4.helper.1'),
      __t('categories.tab.4.helper.2'),
      __t('categories.tab.4.helper.3'),
      __t('categories.tab.4.helper.4'),
      __t('categories.tab.4.helper.5'),
    ],
  },
];

const List = () => (
  <Container>
    {categoriesList.map((item) => (
      <Tab
        key={'tab__' + item.href}
        header={item.header}
        href={item.href}
        text={item.text}
        color={item.color}
      />
    ))}
  </Container>
);

export default List;

const Container = styled.div``;
