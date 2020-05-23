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
  { key: 'li0', icon: FaArchway, text: __t('categories.li.0') },
  { key: 'li1', icon: FaPalette, text: __t('categories.li.1') },
  { key: 'li2', icon: FaCar, text: __t('categories.li.2') },
  { key: 'li3', icon: FaDonate, text: __t('categories.li.3') },
  { key: 'li4', icon: FaToriiGate, text: __t('categories.li.4') },
  { key: 'li5', icon: FaGraduationCap, text: __t('categories.li.5') },
  { key: 'li6', icon: FaFemale, text: __t('categories.li.6') },
  { key: 'li7', icon: FaGamepad, text: __t('categories.li.7') },
  { key: 'li8', icon: FaHeartbeat, text: __t('categories.li.8') },
  { key: 'li9', icon: FaChessRook, text: __t('categories.li.9') },
  { key: 'li10', icon: FaHome, text: __t('categories.li.10') },
  { key: 'li11', icon: FaBaby, text: __t('categories.li.11') },
  { key: 'li12', icon: FaFilm, text: __t('categories.li.12') },
  { key: 'li13', icon: FaGuitar, text: __t('categories.li.13') },
  { key: 'li14', icon: FaIdCard, text: __t('categories.li.14') },
  { key: 'li15', icon: FaCross, text: __t('categories.li.15') },
  { key: 'li16', icon: FaDna, text: __t('categories.li.16') },
  { key: 'li17', icon: FaFutbol, text: __t('categories.li.17') },
  { key: 'li18', icon: FaSatelliteDish, text: __t('categories.li.18') },
  { key: 'li19', icon: FaGlobeAmericas, text: __t('categories.li.19') },
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
