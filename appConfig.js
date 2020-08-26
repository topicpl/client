const isDev = process.env.NODE_ENV !== 'production';

const appConfig = {
  serverUrl: isDev ? 'http://localhost:3000' : 'http://localhost:3000',
  isDev,
};

export default appConfig;
