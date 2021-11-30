export const API =
  process.env.REACT_APP_IS_LOCAL_INSTANCE == "true"
    ? process.env.REACT_APP_LOCALHOST
    : process.env.REACT_APP_PRODUCTION;
