const isDev = process.env.NODE_ENV !== 'production';

const appConfig = {
  serverUrl: isDev ? 'http://localhost:3000' : 'http://139.59.137.236:3000',
  isDev,
};

export default appConfig;
