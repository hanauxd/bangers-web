import React from 'react';
import { Provider } from 'react-redux';

import Root from './modules/Root';
import store from './modules/store';

function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

export default App;
