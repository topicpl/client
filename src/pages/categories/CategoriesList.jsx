import React from 'react';
import styled from 'styled-components';
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
import Link from './CategoriesLink';
import __t from '../../i18n/translator';

const categoriesList = [
  { href: 'architecture', icon: FaArchway, text: __t('categories.li.0') },
  { href: 'art', icon: FaPalette, text: __t('categories.li.1') },
  { href: 'automotive', icon: FaCar, text: __t('categories.li.2') },
  { href: 'business', icon: FaDonate, text: __t('categories.li.3') },
  { href: 'culture', icon: FaToriiGate, text: __t('categories.li.4') },
  { href: 'education', icon: FaGraduationCap, text: __t('categories.li.5') },
  { href: 'fashion', icon: FaFemale, text: __t('categories.li.6') },
  { href: 'games', icon: FaGamepad, text: __t('categories.li.7') },
  { href: 'health', icon: FaHeartbeat, text: __t('categories.li.8') },
  { href: 'history', icon: FaChessRook, text: __t('categories.li.9') },
  { href: 'home', icon: FaHome, text: __t('categories.li.10') },
  { href: 'kids', icon: FaBaby, text: __t('categories.li.11') },
  { href: 'movies', icon: FaFilm, text: __t('categories.li.12') },
  { href: 'music', icon: FaGuitar, text: __t('categories.li.13') },
  { href: 'news', icon: FaIdCard, text: __t('categories.li.14') },
  { href: 'religion', icon: FaCross, text: __t('categories.li.15') },
  { href: 'science', icon: FaDna, text: __t('categories.li.16') },
  { href: 'sports', icon: FaFutbol, text: __t('categories.li.17') },
  { href: 'technology', icon: FaSatelliteDish, text: __t('categories.li.18') },
  { href: 'travel', icon: FaGlobeAmericas, text: __t('categories.li.19') },
];

const List = () => (
  <Container>
    {categoriesList.map((item) => (
      <Link
        key={item.href}
        Icon={item.icon}
        text={item.text}
        href={item.href}
      />
    ))}
  </Container>
);

export default List;

const Container = styled.div`
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 50px;
    position: absolute;
    top: 50%;
    transform: translate(-100px, -50%);
  }

  @media (min-width: 1280px) {
    grid-column-gap: 120px;
  }
`;
