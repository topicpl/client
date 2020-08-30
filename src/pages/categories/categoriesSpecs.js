import __t from '../../i18n/translator';
import artImg from '../../assets/images/categories/Art.png';
import lifeImg from '../../assets/images/categories/Life.png';
import scienceImg from '../../assets/images/categories/Science.png';
import sportImg from '../../assets/images/categories/Sport.png';
import worldImg from '../../assets/images/categories/World.png';

const categoriesSpecs = [
  {
    href: 'art',
    color: '#3D007A',
    img: artImg,
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
    img: lifeImg,
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
    img: scienceImg,
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
    img: sportImg,
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
    img: worldImg,
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
  {
    href: null,
    color: '#000',
    img: null,
    header: __t('categories.tab.5.header'),
    text: [__t('categories.tab.5.helper.0'), __t('categories.tab.5.helper.1')],
  },
];

export default categoriesSpecs;
