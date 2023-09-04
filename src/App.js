import React from 'react'
import './App.css'
import IndexRouter from './router/IndexRouter';
import { Provider } from 'react-redux';
import { persiststore, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {

  return <Provider store={store}>
    <PersistGate loading={null} persistor={persiststore}>
      <IndexRouter />
    </PersistGate>
  </Provider>
}

export default App;
