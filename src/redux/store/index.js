import configureStoreProd from './configure-store.prod';
import configureStoreDev from './configure-store.dev';

const configureStore = () => {
  if (process.env.NODE_ENV === 'production') {
    return configureStoreProd;
  } else {
    document.title = '[DEV] Community Technology Radar';
    return configureStoreDev;
  }
};

export default configureStore;
