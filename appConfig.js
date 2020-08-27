const isDev = process.env.NODE_ENV !== 'production';

const appConfig = {
  serverUrl: isDev ? 'http://localhost:3000' : 'https://thetopic.pl:3000',
  isDev,
  gaTrackingId: isDev ? 'UA-176397412-2' : 'UA-176397412-1',
};

export default appConfig;
