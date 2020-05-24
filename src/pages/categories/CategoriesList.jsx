import React from 'react';
import styled from 'styled-components';
import { BsBuilding } from 'react-icons/bs';
import Link from './CategoriesLink';
import __t from '../../i18n/translator';

const categoriesList = [
  { urlKey: 'architecture', icon: BsBuilding, text: __t('categories.li.0') },
  { urlKey: 'art-and-literature', icon: BsBuilding, text: __t('categories.li.1') },
  { urlKey: 'automotive', icon: BsBuilding, text: __t('categories.li.2') },
  { urlKey: 'business-and-finance', icon: BsBuilding, text: __t('categories.li.3') },
  { urlKey: 'culture', icon: BsBuilding, text: __t('categories.li.4') },
  { urlKey: 'education', icon: BsBuilding, text: __t('categories.li.5') },
  { urlKey: 'fashion', icon: BsBuilding, text: __t('categories.li.6') },
  { urlKey: 'games-and-hobbies', icon: BsBuilding, text: __t('categories.li.7') },
  { urlKey: 'health-and-wellbeign', icon: BsBuilding, text: __t('categories.li.8') },
  { urlKey: 'history', icon: BsBuilding, text: __t('categories.li.9') },
  { urlKey: 'home-and-garden', icon: BsBuilding, text: __t('categories.li.10') },
  { urlKey: 'kids-and-family', icon: BsBuilding, text: __t('categories.li.11') },
  { urlKey: 'movies-and-photography', icon: BsBuilding, text: __t('categories.li.12') },
  { urlKey: 'music', icon: BsBuilding, text: __t('categories.li.13') },
  { urlKey: 'news-and-politics', icon: BsBuilding, text: __t('categories.li.14') },
  { urlKey: 'religion-and-philosophy', icon: BsBuilding, text: __t('categories.li.15') },
  { urlKey: 'science-and-math', icon: BsBuilding, text: __t('categories.li.16') },
  { urlKey: 'sports', icon: BsBuilding, text: __t('categories.li.17') },
  { urlKey: 'technology', icon: BsBuilding, text: __t('categories.li.18') },
  { urlKey: 'travel', icon: BsBuilding, text: __t('categories.li.19') },
];

const List = () => (
  <Container>
    {categoriesList.map((item) => (
      <Link key={item.urlKey} Icon={item.icon} urlKey={item.urlKey} text={item.text} />
    ))}
  </Container>
);

export default List;

const Container = styled.div`
  margin-top: 50px;
`;
