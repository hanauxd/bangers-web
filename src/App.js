import React from 'react';
import { Provider } from 'react-redux';

import Root from './modules/Root';

function App() {
  return (
    <Provider>
      <Root />
    </Provider>
  );
}

export default App;
