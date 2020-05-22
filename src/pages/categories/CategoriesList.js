import React from 'react';
import styled from 'styled-components';
import Link from './CategoriesLink.js';
import __t from '../../i18n/translator.js';
import { BsBuilding } from 'react-icons/bs';

const categoriesList = [
  { key: 'li0', icon: BsBuilding, text: __t('categories.li.0') },
  { key: 'li1', icon: BsBuilding, text: __t('categories.li.1') },
  { key: 'li2', icon: BsBuilding, text: __t('categories.li.2') },
  { key: 'li3', icon: BsBuilding, text: __t('categories.li.3') },
  { key: 'li4', icon: BsBuilding, text: __t('categories.li.4') },
  { key: 'li5', icon: BsBuilding, text: __t('categories.li.5') },
  { key: 'li6', icon: BsBuilding, text: __t('categories.li.6') },
  { key: 'li7', icon: BsBuilding, text: __t('categories.li.7') },
  { key: 'li8', icon: BsBuilding, text: __t('categories.li.8') },
  { key: 'li9', icon: BsBuilding, text: __t('categories.li.9') },
  { key: 'li10', icon: BsBuilding, text: __t('categories.li.10') },
  { key: 'li11', icon: BsBuilding, text: __t('categories.li.11') },
  { key: 'li12', icon: BsBuilding, text: __t('categories.li.12') },
  { key: 'li13', icon: BsBuilding, text: __t('categories.li.13') },
  { key: 'li14', icon: BsBuilding, text: __t('categories.li.14') },
  { key: 'li15', icon: BsBuilding, text: __t('categories.li.15') },
  { key: 'li16', icon: BsBuilding, text: __t('categories.li.16') },
  { key: 'li17', icon: BsBuilding, text: __t('categories.li.17') },
  { key: 'li18', icon: BsBuilding, text: __t('categories.li.18') },
  { key: 'li19', icon: BsBuilding, text: __t('categories.li.19') },
];

const List = () => {
  return (
    <Container>
      {categoriesList.map((item) => (
        <Link key={item.key} Icon={item.icon} text={item.text} />
      ))}
    </Container>
  );
};

export default List;

const Container = styled.div`
  margin-top: 50px;
`;
