import { LOCALES } from '../locales';

export default {
  [LOCALES.POLISH]: {
    lang: 'pl',
    categories: {
      heading: 'Wybierz temat na jaki chcesz rozmawiać.',
      tab: [
        {
          header: 'Sztuka',
          helper: [
            'Filmy',
            'Fotografia',
            'Muzyka',
            'Literatura',
            'Moda',
            'Architektura',
          ],
        },
        {
          header: 'Życie',
          helper: [
            'Hobby',
            'Dom',
            'Dzieci i rodzina',
            'Randki',
            'Podróże',
            'Jedzenie',
          ],
        },
        {
          header: 'Nauka',
          helper: [
            'Astronomia',
            'Technologia',
            'Matematyka',
            'Motoryzacja',
            'Biznes',
            'Finanse',
          ],
        },
        {
          header: 'Sport',
          helper: [
            'Rekreacja',
            'Dieta',
            'Zdrowie',
            'Fitnes',
            'Siłownia',
            'Samopoczucie',
          ],
        },
        {
          header: 'Świat',
          helper: [
            'Kultura',
            'Historia',
            'Wiadomości',
            'Polityka',
            'Religia',
            'Filozofia',
          ],
        },
        {
          header: 'Live',
          helper: ['Dostępne', 'wkrótce'],
        },
      ],
    },
  },
};
