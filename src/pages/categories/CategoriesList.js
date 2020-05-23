import React from 'react';
import styled from 'styled-components';
import Link from './CategoriesLink.js';
import __t from '../../i18n/translator.js';
import {
  FaArchway,
  FaPalette,
  FaCar,
  FaDonate,
  FaToriiGate,
  FaGraduationCap,
  FaFemale,
  FaGamepad,
  FaHeartbeat,
  FaChessRook,
  FaHome,
  FaBaby,
  FaFilm,
  FaGuitar,
  FaIdCard,
  FaCross,
  FaDna,
  FaFutbol,
  FaSatelliteDish,
  FaGlobeAmericas,
} from 'react-icons/fa';

const categoriesList = [
  { key: 'architecture', icon: FaArchway, text: __t('categories.li.0') },
  { key: 'art', icon: FaPalette, text: __t('categories.li.1') },
  { key: 'automotive', icon: FaCar, text: __t('categories.li.2') },
  { key: 'business', icon: FaDonate, text: __t('categories.li.3') },
  { key: 'culture', icon: FaToriiGate, text: __t('categories.li.4') },
  { key: 'education', icon: FaGraduationCap, text: __t('categories.li.5') },
  { key: 'fashion', icon: FaFemale, text: __t('categories.li.6') },
  { key: 'games', icon: FaGamepad, text: __t('categories.li.7') },
  { key: 'health', icon: FaHeartbeat, text: __t('categories.li.8') },
  { key: 'history', icon: FaChessRook, text: __t('categories.li.9') },
  { key: 'home', icon: FaHome, text: __t('categories.li.10') },
  { key: 'kids', icon: FaBaby, text: __t('categories.li.11') },
  { key: 'movies', icon: FaFilm, text: __t('categories.li.12') },
  { key: 'music', icon: FaGuitar, text: __t('categories.li.13') },
  { key: 'news', icon: FaIdCard, text: __t('categories.li.14') },
  { key: 'religion', icon: FaCross, text: __t('categories.li.15') },
  { key: 'science', icon: FaDna, text: __t('categories.li.16') },
  { key: 'sports', icon: FaFutbol, text: __t('categories.li.17') },
  { key: 'technology', icon: FaSatelliteDish, text: __t('categories.li.18') },
  { key: 'travel', icon: FaGlobeAmericas, text: __t('categories.li.19') },
];

const List = () => {
  return (
    <Container>
      {categoriesList.map((item) => (
        <Link
          key={item.key}
          Icon={item.icon}
          text={item.text}
          href={item.key}
        />
      ))}
    </Container>
  );
};

export default List;

const Container = styled.div`
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 50px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  @media (min-width: 1280px) {
    grid-column-gap: 120px;
  }
`;
