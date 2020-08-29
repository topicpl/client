import { LOCALES } from '../locales';

export default {
  [LOCALES.ENGLISH]: {
    lang: 'en',
    categories: {
      heading: 'Pick a topic of conversation.',
      tab: [
        {
          header: 'Art',
          helper: [
            'Movies',
            'Photography',
            'Music',
            'Literature',
            'Fashion',
            'Architecture',
          ],
        },
        {
          header: 'Life',
          helper: [
            'Hobbies',
            'Home',
            'Kids & Family',
            'Dating',
            'Travel',
            'Food',
          ],
        },
        {
          header: 'Science',
          helper: [
            'Astronomy',
            'Technology',
            'Math',
            'Automotive',
            'Business',
            'Finance',
          ],
        },
        {
          header: 'Sport',
          helper: [
            'Recreation',
            'Diet',
            'Health',
            'Fitness',
            'Gym',
            'Wellbeing',
          ],
        },
        {
          header: 'World',
          helper: [
            'Culture',
            'History',
            'News',
            'Politics',
            'Religion',
            'Philosophy',
          ],
        },
      ],
    },
  },
};
