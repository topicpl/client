export const getQueryVariable = (variable) => {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  const varsWithValues = vars.reduce((acc, pair) => {
    const [key, value] = pair.split('=');
    return { ...acc, [decodeURIComponent(key)]: decodeURIComponent(value) };
  }, {});

  return varsWithValues[variable] || null;
};
